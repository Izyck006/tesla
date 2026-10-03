import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Privacy = () => {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '4rem', backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '2rem', color: '#888' }} onClick={() => navigate('/')}>
        <ArrowLeft size={16} /> BACK
      </div>
      <h1>Privacy Policy</h1>
      <p style={{ marginTop: '2rem', lineHeight: '1.6', color: '#aaa' }}>
        This is a placeholder for the Privacy Policy. We take your privacy seriously and ensure all your data is encrypted and securely stored. We do not sell your personal information.
      </p>
    </div>
  );
};

export default Privacy;
