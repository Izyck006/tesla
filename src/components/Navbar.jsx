import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <h1>Tesla</h1>
      </div>
      <div className="nav-links">
        <a href="#vehicles" onClick={() => setIsMenuOpen(false)}>Vehicles</a>
        {user?.isAdmin && <a href="/admin" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); navigate('/admin'); }}>Admin Panel</a>}
      </div>
      <div className="nav-right">
        {user ? (
          <>
            <span className="user-greeting" style={{ fontSize: '0.9rem', fontWeight: 500 }}>Hi, {user.name}</span>
            <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', marginLeft: '1rem' }} onClick={() => { setIsMenuOpen(false); logout(); }}>Sign Out</button>
          </>
        ) : (
          <button className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem' }} onClick={() => { setIsMenuOpen(false); navigate('/auth'); }}>Sign In</button>
        )}
      </div>
      <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-nav-dropdown ${isMenuOpen ? 'open' : ''}`}>
        <a href="#vehicles" onClick={() => setIsMenuOpen(false)}>Vehicles</a>
        {user?.isAdmin && <a href="/admin" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); navigate('/admin'); }}>Admin Panel</a>}
        
        <div className="mobile-nav-footer">
          {user ? (
            <>
              <span style={{ display: 'block', marginBottom: '1rem', color: '#888' }}>Hi, {user.name}</span>
              <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => { setIsMenuOpen(false); logout(); }}>Sign Out</button>
            </>
          ) : (
            <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => { setIsMenuOpen(false); navigate('/auth'); }}>Sign In</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
