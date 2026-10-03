import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { login, register, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    let result;
    if (isLogin) {
      result = await login(email, password);
    } else {
      if (password !== confirmPassword) {
        setFormError('Passwords do not match.');
        return;
      }
      const isAlphanumeric = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(password);
      if (!isAlphanumeric) {
        setFormError('Password must be alphanumeric (contain at least one letter, one number, and no special characters).');
        return;
      }
      result = await register(email, password, name);
    }
    
    if (result && result.success) {
      if (result.user && result.user.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-nav" onClick={() => navigate('/')}>
        <ArrowLeft size={16} /> BACK
      </div>

      <div className="auth-container fade-in">
        <h1 className="auth-title">TESLA</h1>
        <h2>{isLogin ? 'Sign In' : 'Create Account'}</h2>
        
        {formError && <div style={{ color: '#e31937', marginBottom: '1rem', fontSize: '0.9rem' }}>{formError}</div>}
        {error && <div style={{ color: '#e31937', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
          )}
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="password-input-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <button 
                type="button" 
                className="password-toggle-btn" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          {!isLogin && (
            <div className="form-group">
              <label>Confirm Password</label>
              <div className="password-input-wrapper">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  required 
                />
                <button 
                  type="button" 
                  className="password-toggle-btn" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          )}
          
          <button type="submit" className="btn-auth">
            {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <button 
          className="btn-auth-secondary" 
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'CREATE ACCOUNT' : 'SIGN IN'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
