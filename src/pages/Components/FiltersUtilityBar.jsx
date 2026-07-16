import React from 'react';

const FiltersUtilityBar = ({ 
  folderQuery, 
  setFolderQuery, 
  messageQuery, 
  setMessageQuery, 
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

  // Inline Styles JavaScript Object
  const styles = {
    filtersUtilityBar: {
      display: 'flex',
      backgroundColor: 'var(--bg-color)',
      border: '1px solid var(--text-color)',
      borderRadius: '8px',
      padding: '12px',
      marginBottom: '1rem',
    },
    inputsGridWrapper: {
      display: 'flex',
      gap: '12px',
      width: '100%',
      // Media query simulation logic can be injected here if needed, 
      // but native flex-wrap works beautifully for pure CSS encapsulation:
      flexWrap: 'wrap', 
    },
    baseItem: {
      flex: '1 1 200px', // Forces 25% width on desktop, breaks to full width automatically under ~768px
      minWidth: 0, 
      boxSizing: 'border-box',
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: '0.9rem',
    },
    filterInput: {
      border: '1px solid rgba(128, 128, 128, 0.4)',
      backgroundColor: 'transparent',
      color: 'var(--text-color)',
    },
    filterSelect: {
      border: '1px solid rgba(128, 128, 128, 0.4)',
      cursor: 'pointer',
      backgroundColor: 'var(--bg-color)',
      color: 'var(--text-color)',
    },
    searchBtn: {
      border: 'none',
      backgroundColor: 'var(--accent-color)',
      color: 'white',
      fontWeight: 600,
      cursor: 'pointer',
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.filtersUtilityBar}> 
      <div style={styles.inputsGridWrapper}>
        <input 
          type="text" 
          placeholder="Search folders..." 
          value={folderQuery} 
          onChange={(e) => setFolderQuery(e.target.value)} 
          style={{ ...styles.baseItem, ...styles.filterInput }} 
        />
        <input 
          type="text" 
          placeholder="Search messages..." 
          value={messageQuery} 
          onChange={(e) => setMessageQuery(e.target.value)} 
          style={{ ...styles.baseItem, ...styles.filterInput }} 
        />

        <select 
          id="sort-select" 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)} 
          style={{ ...styles.baseItem, ...styles.filterSelect }}
        >
          <option value="default" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>Default</option>
          <option value="newest" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>Newest</option>
          <option value="oldest" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>Oldest</option>
          <option value="fresh" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>Fresh</option>
          <option value="stale" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>Stale</option>
        </select>

        <button 
          type="submit" 
          style={{ ...styles.baseItem, ...styles.searchBtn }}
          onMouseEnter={(e) => e.target.style.opacity = '0.9'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default FiltersUtilityBar;
