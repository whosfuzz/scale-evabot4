import React from 'react';
import { useNavigate, useSearchParams} from 'react-router-dom';
import { useUser } from '../../context/UserContext.jsx';
// Injected styles to replace MessagesTable.module.css
const styles = {
  tableWrapper: 'msg-table-wrapper',
  responsiveTable: 'msg-responsive-table',
  clickableRow: 'msg-clickable-row',
  selectedRow: 'msg-selected-row',
  linkCell: 'msg-link-cell',
};

const stylesCSS = `
  .msg-table-wrapper {
    width: 100%;
    overflow-x: auto;
    background: transparent;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .msg-responsive-table {
    width: 100%;
    border-collapse: collapse;
    background-color: var(--bg-color);
    color: var(--text-color);
    font-size: 0.95rem;
    table-layout: fixed;
  }

  .msg-responsive-table th,
  .msg-responsive-table td {
    padding: 12px 16px;
    text-align: center;
    border-bottom: 1px solid var(--text-color);
    opacity: 0.9;
  }

  .msg-responsive-table th {
    background-color: rgba(var(--text-color), 0.05);
    font-weight: 600;
    border-bottom: 2px solid var(--accent-color);
  }

  .msg-responsive-table td {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .msg-clickable-row:hover {
    background-color: rgba(var(--text-color), 0.04);
  }

  .msg-clickable-row:focus-visible {
    outline: 2px solid var(--accent-color);
    outline-offset: -2px;
  }

  .msg-selected-row {
    background-color: rgba(var(--accent-color), 0.08) !important;
  }

  .msg-link-cell {
    cursor: pointer;
    color: var(--accent-color);
  }

  .msg-responsive-table a {
    color: var(--accent-color);
    text-decoration: underline;
  }

  .msg-responsive-table a:hover {
    opacity: 0.8;
  }

  .msg-responsive-table input[type="checkbox"] {
    transform: scale(1.2);
  }

  @media (max-width: 768px) {
    .msg-table-wrapper {
      box-shadow: none;
      overflow-x: hidden;
      width: 100%;
    }

    .msg-responsive-table {
      display: flex !important;
      flex-direction: column;
      width: 100% !important;
      border: 0 !important;
    }

    .msg-responsive-table tbody {
      display: flex !important;
      flex-direction: column;
      width: 100% !important;
    }

    .msg-responsive-table thead {
      display: none !important;
    }

    .msg-responsive-table tr {
      display: flex !important;
      flex-direction: column;
      width: 100% !important;
      margin-bottom: 1rem;
      border: 1px solid var(--text-color);
      border-radius: 8px;
      padding: 8px;
      background-color: rgba(var(--text-color), 0.02);
      box-sizing: border-box;
    }

    .msg-responsive-table tr td {
      display: grid !important;
      grid-template-columns: auto minmax(0, 1fr);
      gap: 16px;
      align-items: center;
      padding: 12px 8px;
      width: 100% !important;
      box-sizing: border-box;
      border-bottom: 1px solid rgba(128, 128, 128, 0.2);
      overflow: hidden;
      text-align: right;
      opacity: 1;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .msg-responsive-table tr td:last-child {
      border-bottom: 0;
    }

    .msg-responsive-table td::before {
      content: attr(data-label);
      font-weight: bold;
      color: var(--accent-color);
      text-transform: uppercase;
      font-size: 0.8rem;
      letter-spacing: 0.5px;
      text-align: left;
      grid-column: 1;
    }
  }
`;

const MessagesTable = ({ messages, selectedIds, onSelectRow }) => {
  const { user } = useUser();
  const navigate = useNavigate();
const [searchParams, setSearchParams] = useSearchParams();

function getRelativeTime(date) {
  const now = Date.now();
  // Use Math.abs to calculate thresholds purely on magnitude
  const diffInSeconds = (date.getTime() - now) / 1000;
  const absSeconds = Math.abs(diffInSeconds);
  
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  
  // Define thresholds based on the actual cutoff limits
  const thresholds = [
    { unit: 'year', seconds: 31536000 },
    { unit: 'month', seconds: 2592000 },
    { unit: 'day', seconds: 86400 },
    { unit: 'hour', seconds: 3600 },
    { unit: 'minute', seconds: 60 },
    { unit: 'second', seconds: 1 },
  ];

  for (const { unit, seconds } of thresholds) {
    // Only match if the absolute difference exceeds the unit size 
    // (or if we fall all the way down to seconds)
    if (absSeconds >= seconds || unit === 'second') {
      const value = Math.round(diffInSeconds / seconds);
      return rtf.format(value, unit);
    }
  }
}


const handleFolderClick = (folder) => {
  // 1. Get current search parameters from the window location
  const searchParams = new URLSearchParams(window.location.search);
  
  // 2. Set or update the 'equal' parameter
  searchParams.set('equal', `folder,${folder}`);
  
  // 3. Navigate using the updated parameter string
  navigate(`/messages?${searchParams.toString()}`);
};
  const handleMessageClick = (message) => {
    if (message.startsWith("https://")) {
      window.location.href = message;
    }
  };

  return (
    <div className={styles.tableWrapper}>
      {/* Injects the CSS classes inside this file context */}
      <style>{stylesCSS}</style>
      
      <table className={styles.responsiveTable}>
        <thead>
          <tr>
            <th></th>
            <th>FOLDER</th>
            <th>MESSAGE</th>
            {/*<th>owner</th>*/}
            <th>CREATED</th>
            <th>SEEN</th>
          </tr>
        </thead>

        <tbody>
          {messages.map((msg) => {
            const isSelected = selectedIds.has(msg.$id);

            return (
              <tr
                key={msg.$id}
                tabIndex={0}
                onClick={() => {
                  onSelectRow(msg.$id);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectRow(msg.$id);
                  }
                }}
                className={`${styles.clickableRow} ${isSelected ? styles.selectedRow : ''}`}
              >
                <td data-label="">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    style={{ accentColor: 'var(--discord-blurple)' }}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => {
                      onSelectRow(msg.$id);
                    }}
                  />
                </td>

                <td
                  data-label="folder"
                  className={styles.linkCell}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFolderClick(msg.folder);
                  }}
                >
                  {msg.folder}
                </td>

                <td
                  data-label="message"
                  className={msg.message.startsWith("https://") ? styles.linkCell : ""}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMessageClick(msg.message);
                  }}
                >
                  {msg.message}
                </td>

                <td
                  data-label="created"
                  onClick={(e) => { e.stopPropagation(); }}
                >
                  {msg.$createdAt
                    ? getRelativeTime(new Date(msg.$createdAt))
                    : ""}
                </td>

                <td
                  data-label="seen"
                  onClick={(e) => { e.stopPropagation(); }}
                >
                  {msg.seen
                    ? getRelativeTime(new Date(msg.seen))
                    : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MessagesTable;
