import React, { useState, useEffect } from 'react';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('tesla_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('tesla_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#111',
      color: '#fff',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 9999,
      borderTop: '1px solid #333',
      flexWrap: 'wrap',
      gap: '1rem'
    }}>
      <p style={{ margin: 0, fontSize: '0.85rem', color: '#ccc', flex: 1, minWidth: '250px' }}>
        We use cookies to ensure you get the best experience on our website, handle secure sessions, and analyze traffic.
        By continuing to use this site, you consent to our use of cookies.
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <a href="/privacy" style={{ color: '#fff', fontSize: '0.85rem', textDecoration: 'underline', alignSelf: 'center' }}>Learn More</a>
        <button onClick={acceptCookies} style={{
          backgroundColor: '#e31937', color: '#fff', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
        }}>
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
