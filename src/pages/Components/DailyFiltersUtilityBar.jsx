import React from 'react';

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const DailyFiltersUtilityBar = ({ 
  folderQuery, 
  setFolderQuery, 
  dayOfWeekQuery, 
  setDayOfWeekQuery, 
  sortBy, 
  setSortBy,
  onSearchSubmit
}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit();
    }
  };

  return (
    <>
      {/* Scope-contained Stylesheet */}
      <style>{`
        .filtersUtilityBar {
          display: flex;
          background-color: var(--bg-color);
          border: 1px solid var(--text-color);
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 1rem;
        }

        .inputsGridWrapper {
          display: flex;
          gap: 12px;
          width: 100%;
        }

        .filterInput, 
        .filterSelect, 
        .submitButton {
          flex: 1;
          min-width: 0;
          box-sizing: border-box;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 0.9rem;
        }

        .filterInput, 
        .filterSelect {
          border: 1px solid rgba(128, 128, 128, 0.4);
          background-color: transparent;
          color: var(--text-color);
        }

        .filterSelect { 
          cursor: pointer; 
          background-color: var(--bg-color); 
        }

        .filterSelect option {
          background-color: var(--bg-color);
          color: var(--text-color);
        }

        .submitButton {
          border: none;
          background-color: var(--accent-color);
          color: white;
          font-weight: 600;
          cursor: pointer;
        }

        .submitButton:hover {
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .inputsGridWrapper { 
            flex-direction: column;
          }
        }
      `}</style>

      {/* Component JSX */}
      <form onSubmit={handleSubmit} className="filtersUtilityBar"> 
        <div className="inputsGridWrapper">
          <input 
            type="text" 
            placeholder="Search folders..." 
            value={folderQuery} 
            onChange={(e) => setFolderQuery(e.target.value)} 
            className="filterInput" 
          />
          
          <select 
            value={dayOfWeekQuery} 
            onChange={(e) => setDayOfWeekQuery(e.target.value)} 
            className="filterSelect"
          >
            <option value="">All Days</option>
            {DAYS_OF_WEEK.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>

          <select 
            id="sort-select" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)} 
            className="filterSelect"
          >
            <option value="default">Default</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="fresh">Fresh</option>
            <option value="stale">Stale</option>
          </select>

          <button type="submit" className="submitButton">
            Search
          </button>
        </div>
      </form>
    </>
  );
};

export default DailyFiltersUtilityBar;
