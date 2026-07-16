import React from 'react';

const PaginationUtilityBar = ({ offset, onPageChange, totalRows }) => {
  // Check if screen width is mobile (less than or equal to 768px)
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Inline Styles object containing all CSS and media query logic
  const styles = {
    paginationUtilityBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 0',
      marginTop: '1rem',
      borderTop: '1px solid #e0e0e0',
      ...(isMobile && { gap: '1rem' }),
    },
    btnPage: (disabled) => ({
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontSize: '0.875rem',
      backgroundColor: '#f4f5f7',
      color: '#344054',
      border: '1px solid #d0d5dd',
      textTransform: 'uppercase',
      fontWeight: 600,
      opacity: disabled ? 0.5 : 1,
      transition: 'background-color 0.2s, color 0.2s',
      ...(isMobile && { flex: 1, maxWidth: '140px' }),
    }),
    pageIndicator: {
      ...(isMobile && { flex: '0 0 auto', textAlign: 'center', fontWeight: 600 }),
    },
  };

  // Hover effect handlers for inline styles
  const handleMouseEnter = (e, disabled) => {
    if (!disabled) {
      e.currentTarget.style.backgroundColor = '#344054';
      e.currentTarget.style.color = '#fff';
    }
  };

  const handleMouseLeave = (e, disabled) => {
    if (!disabled) {
      e.currentTarget.style.backgroundColor = '#f4f5f7';
      e.currentTarget.style.color = '#344054';
    }
  };

  const isPrevDisabled = offset === 0;
  const isNextDisabled = totalRows < 25;

  return (
    <div style={styles.paginationUtilityBar}>
      <button
        onClick={() => onPageChange(offset - 25)}
        disabled={isPrevDisabled}
        style={styles.btnPage(isPrevDisabled)}
        onMouseEnter={(e) => handleMouseEnter(e, isPrevDisabled)}
        onMouseLeave={(e) => handleMouseLeave(e, isPrevDisabled)}
      >
        &larr; Previous
      </button>

      <span style={styles.pageIndicator}>
        Page {Math.floor(offset / 25) + 1}
      </span>

      <button
        onClick={() => onPageChange(offset + 25)}
        disabled={isNextDisabled}
        style={styles.btnPage(isNextDisabled)}
        onMouseEnter={(e) => handleMouseEnter(e, isNextDisabled)}
        onMouseLeave={(e) => handleMouseLeave(e, isNextDisabled)}
      >
        Next &rarr;
      </button>
    </div>
  );
};

export default PaginationUtilityBar;
