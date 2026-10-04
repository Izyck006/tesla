import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('tesla_user');
    const storedToken = localStorage.getItem('tesla_token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('tesla_user', JSON.stringify(data.user));
      localStorage.setItem('tesla_token', data.token);
      setError(null);
      return { success: true, user: data.user };
    } catch (err) {
      setError(err.message);
      return { success: false };
    }
  };

  const register = async (email, password, name) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('tesla_user', JSON.stringify(data.user));
      localStorage.setItem('tesla_token', data.token);
      setError(null);
      return { success: true, user: data.user };
    } catch (err) {
      setError(err.message);
      return { success: false };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('tesla_user');
    localStorage.removeItem('tesla_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
