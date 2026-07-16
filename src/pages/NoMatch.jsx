import React from 'react';

const NoMatch = () => {
  const containerStyle = {
    maxWidth: '800px',
    margin: '0px auto',
    padding: '10px',
    lineHeight: '1.6',
  };

  const sectionStyle = {
    marginBottom: '0px',
  };

  const highlightBox = {
    backgroundColor: 'rgba(37, 99, 235, 0.08)', // Adapts softly by using alpha opacity of accent
    borderLeft: '4px solid var(--discord-blurple)',
    padding: '15px',
    borderRadius: '4px',
    margin: '20px 0',
  };

  const linkStyle = {
    color: 'var(--accent-color)',
    textDecoration: 'underline',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      {/* ========================================================================= */}
      {/* ERROR / NO MATCH SECTION                                                  */}
      {/* ========================================================================= */}
      <section style={sectionStyle}>
        <h1 style={{ color: 'var(--accent-color)' }}>
          404 - Page Not Found
        </h1>
        
        <div style={highlightBox}>
          <strong>An error occurred</strong>
        </div>

        <p>
          The page you are looking for does not exist, has been removed, or has changed address. 
          Please check the URL or navigate back to safety.
        </p>

        <p style={{ marginTop: '20px' }}>
          <a href="/" style={linkStyle}>
            Return to Homepage
          </a>
        </p>
      </section>
    </div>
  );
};

export default NoMatch;
