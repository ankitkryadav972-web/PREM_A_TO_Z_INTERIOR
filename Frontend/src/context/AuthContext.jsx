import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('prem_user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('prem_token') || null);
  const [loading, setLoading] = useState(true);

  // Check auth validity on mount
  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem('prem_token');
      if (storedToken) {
        try {
          const res = await apiService.getMe();
          if (res && res.user) {
            setUser(res.user);
            localStorage.setItem('prem_user', JSON.stringify(res.user));
          }
        } catch (err) {
          console.warn('[Auth] Session expired or invalid, logging out.');
          logout();
        }
      }
      setLoading(false);
    };

    verifyUser();
  }, []);

  const login = async (credentials) => {
    const res = await apiService.login(credentials);
    if (res && res.token) {
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem('prem_token', res.token);
      localStorage.setItem('prem_user', JSON.stringify(res.user));
      return res.user;
    }
    throw new Error(res.message || 'Login failed');
  };

  const register = async (userData) => {
    const res = await apiService.register(userData);
    if (res && res.token) {
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem('prem_token', res.token);
      localStorage.setItem('prem_user', JSON.stringify(res.user));
      return res.user;
    }
    throw new Error(res.message || 'Registration failed');
  };

  const logout = () => {
    try {
      apiService.logout();
    } catch {}
    setToken(null);
    setUser(null);
    localStorage.removeItem('prem_token');
    localStorage.removeItem('prem_user');
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
