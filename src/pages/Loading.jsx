export default function Loading() {
  return (
    <div 
      style={styles.container} 
      aria-live="polite" 
      aria-busy="true"
    >
      {/* Injecting keyframe animations dynamically */}
      <style>{animations}</style>

      {/* 1. Pulsing Rounded Image */}
      <img 
        src="/eba.png" 
        alt="Loading..." 
        style={styles.image}
      />
      
      {/* 2. Spinner positioned directly underneath */}
      <div style={styles.spinner} />
    </div>
  );
}

// Inline Style Objects
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    height: '100dvh',
    width: '100%',
    gap: '20px',
  },
  image: {
    maxWidth: '120px',
    height: 'auto',
    borderRadius: '12px',
    animation: 'shrinkGrow 2s ease-in-out infinite',
  },
  spinner: {
    width: '32px',
    height: '32px',
    border: '3px solid #e5e7eb',
    borderTopColor: '#5865F2',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
};

// CSS Keyframes String
const animations = `
  @keyframes shrinkGrow {
    0%, 100% { transform: scale(0.95); }
    50% { transform: scale(1.05); }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
