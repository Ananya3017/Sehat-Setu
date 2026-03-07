import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  abhaId?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Attempt to verify token on load if it exists.
    // In a real app, you would make a call to /api/auth/me here.
    // For now, if there is a token, we assume logged in.
    if (token) {
      // Mock user restore from token
      setUser({ id: "1", name: "Ramesh Kumar", email: "ramesh@example.com" });
    }
    setLoading(false);
  }, [token]);

  const login = async (data: any) => {
    try {
      const res = await api.post('/auth/login', data);
      const newToken = res.data.token || "mock_token";
      setToken(newToken);
      localStorage.setItem('token', newToken);
      setUser(res.data.user || { id: "1", name: "Ramesh Kumar", email: data.email });
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const register = async (data: any) => {
    try {
      const res = await api.post('/auth/register', data);
      const newToken = res.data.token || "mock_token";
      setToken(newToken);
      localStorage.setItem('token', newToken);
      setUser(res.data.user || { id: "1", name: data.name, email: data.email });
      navigate('/dashboard');
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
