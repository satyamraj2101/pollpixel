// C:\Users\KIIT\WebstormProjects\PollPixel\frontend\src\context\AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode'; // Recommend installing jwt-decode package

interface TokenPayload {
  userId: number;
  iat: number;
  exp: number;
}

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isTokenValid: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const isTokenValid = () => {
    if (!token) return false;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp > currentTime;
    } catch (error) {
      console.error("Invalid token", error);
      return false;
    }
  };

  const login = (newToken: string) => {
    try {
      // Validate token before storing
      const decoded = jwtDecode<TokenPayload>(newToken);
      localStorage.setItem('authToken', newToken);
      setToken(newToken);
    } catch (error) {
      console.error("Invalid token format", error);
      logout(); // Clear any invalid token
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('authToken');
      setToken(null);
    } catch (error) {
      console.error("Error removing token from localStorage", error);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      // Validate saved token on app initialization
      try {
        const decoded = jwtDecode<TokenPayload>(savedToken);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp > currentTime) {
          setToken(savedToken);
        } else {
          logout(); // Auto logout if token is expired
        }
      } catch (error) {
        console.error("Saved token is invalid", error);
        logout();
      }
    }
  }, []);

  return (
      <AuthContext.Provider value={{ token, login, logout, isTokenValid }}>
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};