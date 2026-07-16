import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUser } from '../../context/UserContext.jsx';

const DailyFoldersTable = ({ messages, selectedIds, onSelectRow }) => {
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
  const newParams = new URLSearchParams(searchParams);
  
  // Use .set() to overwrite existing 'equal' or .append() to keep both
  newParams.set('equal', `folder,${folder}`); 
  
  setSearchParams(newParams);
};

const handleDayOfWeekClick = (dayOfWeek) => {
  const newParams = new URLSearchParams(searchParams);
  
  // Use .set() to overwrite existing 'equal' or .append() to keep both
  newParams.set('equal', `dayOfWeek,${dayOfWeek}`);
  
  setSearchParams(newParams);
};
  return (
    <>
      {/* Scope-safe component styles */}
      <style>{styles}</style>

      <div className="tableWrapper">
        <table className="responsiveTable">
          <thead>
            <tr>
              <th></th>
              <th>FOLDER</th>
              <th>DAY OF WEEK</th>
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
                  onClick={() => onSelectRow(msg.$id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectRow(msg.$id);
                    }
                  }}
                  className={`clickableRow ${isSelected ? 'selectedRow' : ''}`}
                >
                  <td data-label="">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      style={{ accentColor: 'var(--discord-blurple)' }}
                      onClick={(e) => e.stopPropagation()}
                      onChange={() => onSelectRow(msg.$id)}
                    />
                  </td>

                  <td
                    data-label="folder"
                    className="linkCell"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFolderClick(msg.folder);
                    }}
                  >
                    {msg.folder}
                  </td>

                  <td
                    data-label="dayOfWeek"
                    className="linkCell"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDayOfWeekClick(msg.dayOfWeek);
                    }}
                  >
                    {msg.dayOfWeek}
                  </td>

                  <td
                    data-label="created"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {msg.$createdAt ? getRelativeTime(new Date(msg.$createdAt)) : ""}
                  </td>

                  <td
                    data-label="seen"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {msg.seen ? getRelativeTime(new Date(msg.seen)) : ""}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

// Embedded Plain CSS Styles (Fixed typos from original source code)
const styles = `
.tableWrapper {
  width: 100%;
  overflow-x: auto;
  background: transparent;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.responsiveTable {
  width: 100%;
  border-collapse: collapse;
  background-color: var(--bg-color);
  color: var(--text-color);
  font-size: 0.95rem;
  table-layout: fixed;
}

.responsiveTable th,
.responsiveTable td {
  padding: 12px 16px;
  text-align: center;
  border-bottom: 1px solid var(--text-color);
  opacity: 0.9;
}

.responsiveTable th {
  background-color: rgba(var(--text-color), 0.05);
  font-weight: 600;
  border-bottom: 2px solid var(--accent-color);
}

.responsiveTable td {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.clickableRow:hover {
  background-color: rgba(var(--text-color), 0.04);
}

.clickableRow:focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: -2px;
}

.selectedRow {
  background-color: rgba(var(--accent-color), 0.08) !important;
}

.linkCell {
  cursor: pointer;
  color: var(--accent-color);
}

.responsiveTable a {
  color: var(--accent-color);
  text-decoration: underline;
}

.responsiveTable a:hover {
  opacity: 0.8;
}

.responsiveTable input[type="checkbox"] {
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .tableWrapper {
    box-shadow: none;
    overflow-x: hidden;
    width: 100%;
  }

  .responsiveTable {
    display: flex !important;
    flex-direction: column;
    width: 100% !important;
    border: 0 !important;
  }

  .responsiveTable tbody {
    display: flex !important;
    flex-direction: column;
    width: 100% !important;
  }

  .responsiveTable thead {
    display: none !important;
  }

  .responsiveTable tr {
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

  .responsiveTable tr td {
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

  .responsiveTable tr td:last-child {
    border-bottom: 0;
  }

  .responsiveTable td::before {
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

export default DailyFoldersTable;
