import React, { createContext, useContext, useState, useEffect } from 'react';
import APIService from '../services/api';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await APIService.getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to initialize user:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await APIService.login(credentials);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    setUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};