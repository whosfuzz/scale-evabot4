import React from 'react';

const ActionsManagementBar = ({ 
  selectionCount, totalCount, isAllSelected, 
  onSelectAll, onDelete, onEdit, onShuffle, onCreate 
}) => {
  return (
    <>
      {/* Embedded CSS Styles */}
      <style>{`
        .actions-management-bar {
          position: sticky;
          top: 84px;
          z-index: 10;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background-color: var(--bg-color);
          width: 100%;
          box-sizing: border-box;
          margin-bottom: 8px; 
          border: 1px solid var(--text-color);
          border-radius: 8px;
        }

        .select-all-label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-color);
          cursor: pointer;
          user-select: none;
          font-weight: 500;
        }

        .action-buttons-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }
      `}</style>

      {/* Component Markup */}
      <div className="actions-management-bar">
        <label className="select-all-label">
          <input 
            type="checkbox" 
            style={{ accentColor: 'var(--discord-blurple)' }} 
            checked={isAllSelected} 
            onChange={onSelectAll} 
          />
          <span>
            {isAllSelected ? "Deselect All" : "Select All"} ({selectionCount}/{totalCount})
          </span>
        </label>

        <div className="action-buttons-group">
          {selectionCount > 0 ? (
            selectionCount === 1 ? (
              <>
                <button onClick={onEdit} className='btn'>Edit</button>
                <button onClick={onDelete} className='btn'>Delete</button>
                <button onClick={onShuffle} className='btn'>Shuffle</button>
              </>
            ) : (
              <>
                <button onClick={onDelete} className="btn">Delete All</button>
                <button onClick={onShuffle} className="btn">Shuffle All</button>
              </>
            )
          ) : (
            <button onClick={onCreate} className="btn">Create</button>
          )}
        </div>
      </div>
    </>
  );
};

export default ActionsManagementBar;
