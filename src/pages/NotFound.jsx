import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', color: '#fff', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem', letterSpacing: '0.2rem' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#888' }}>PAGE NOT FOUND</h2>
      <p style={{ marginBottom: '3rem', color: '#666' }}>The page you are looking for doesn't exist or has been moved.</p>
      <button 
        onClick={() => navigate('/')} 
        style={{ padding: '1rem 3rem', backgroundColor: '#e31937', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold', letterSpacing: '1px' }}
      >
        BACK TO HOME
      </button>
    </div>
  );
};

export default NotFound;
