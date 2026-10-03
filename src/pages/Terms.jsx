import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Terms = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '4rem', backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '2rem', color: '#888' }} onClick={() => navigate('/')}>
        <ArrowLeft size={16} /> BACK
      </div>
      <h1>Terms & Conditions</h1>
      <p style={{ marginTop: '2rem', lineHeight: '1.6', color: '#aaa' }}>
        This is a placeholder for the Terms & Conditions. By using this platform, you agree to our policies. All vehicle images and brands belong to their respective owners.
      </p>
    </div>
  );
};

export default Terms;
