import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useVehicles } from '../context/VehicleContext';

const Admin = () => {
  const { user, token } = useAuth();
  const { vehicles, refreshVehicles } = useVehicles();
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState(null);
  const [newPrice, setNewPrice] = useState('');

  if (!user || !user.isAdmin) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem', color: '#fff' }}>
        <h2>Access Denied</h2>
        <p>You must be an administrator to view this page.</p>
        <button onClick={() => navigate('/')} style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#333', color: '#fff', border: 'none', cursor: 'pointer' }}>Go Home</button>
      </div>
    );
  }

  const handleUpdate = async (id) => {
    if (!newPrice) return;
    try {
      const res = await fetch(`/api/vehicles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ price: newPrice })
      });
      if (res.ok) {
        setEditingId(null);
        setNewPrice('');
        refreshVehicles(); // Fetch updated inventory from DB
      } else {
        alert('Failed to update price');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating price');
    }
  };

  return (
    <div className="admin-page" style={{ padding: '2rem 5rem', color: '#fff', minHeight: '100vh', background: '#050505' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Admin Dashboard - Inventory Pricing</h1>
        <button onClick={() => navigate('/')} style={{ padding: '0.5rem 1rem', background: '#333', color: '#fff', border: 'none', cursor: 'pointer' }}>Exit Admin</button>
      </header>

      <div className="admin-table-wrapper">
      <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #333' }}>
            <th style={{ padding: '1rem' }}>Vehicle</th>
            <th style={{ padding: '1rem' }}>Current Price</th>
            <th style={{ padding: '1rem' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(v => (
            <tr key={v._id} style={{ borderBottom: '1px solid #222' }}>
              <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={v.image} alt={v.name} style={{ width: '80px' }} />
                <span>{v.name}</span>
              </td>
              <td style={{ padding: '1rem' }}>
                {editingId === v._id ? (
                  <input 
                    type="text" 
                    value={newPrice} 
                    onChange={e => setNewPrice(e.target.value)} 
                    placeholder="e.g. $45,000"
                    style={{ background: '#111', color: '#fff', border: '1px solid #444', padding: '0.5rem' }}
                  />
                ) : (
                  v.price
                )}
              </td>
              <td style={{ padding: '1rem' }}>
                {editingId === v._id ? (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => handleUpdate(v._id)} style={{ background: '#28a745', color: '#fff', padding: '0.5rem 1rem', border: 'none', cursor: 'pointer' }}>Save</button>
                    <button onClick={() => setEditingId(null)} style={{ background: '#dc3545', color: '#fff', padding: '0.5rem 1rem', border: 'none', cursor: 'pointer' }}>Cancel</button>
                  </div>
                ) : (
                  <button 
                    onClick={() => { setEditingId(v._id); setNewPrice(v.price); }} 
                    style={{ background: '#007bff', color: '#fff', padding: '0.5rem 1rem', border: 'none', cursor: 'pointer' }}>
                    Edit Price
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Admin;
