import React, { useState, useEffect } from 'react';

const CheckConnection = (props) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div>
      {isOnline ? (
        props.children
      ) : (
        <div style={{ padding: '10px', textAlign: 'center' }}>
          <h1>No Connection</h1>
          <h4>Please check your internet connection</h4>
        </div>
      )}
    </div>
  );
};

export default CheckConnection;
