import React, { useState, useEffect } from 'react';

const Quota = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your actual API endpoint
    const url = 'https://evabot.koyeb.app/messages'; 

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData) => {
        console.log(jsonData);
        setData(jsonData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // Empty array ensures this runs once on mount

  if (loading) return <div>Loading data...</div>;
  if (error) return <div>Error fetching data: {error}</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Fetched Data Results</h2>
      
      {/* Option 1: Render raw formatted JSON */}
      <pre style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
        {JSON.stringify(data, null, 2)}
      </pre>

      {/* Option 2: Render as a list (Uncomment if data is an array) */}
      {/* 
      <ul>
        {Array.isArray(data) && data.map((item) => (
          <li key={item.id}>{item.name || item.title}</li>
        ))}
      </ul> 
      */}
    </div>
  );
};

export default Quota;
