
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define user type
interface User {
  id: string;
  email: string;
  name: string;
  plan?: string;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

// Hook for using the auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('stockguard_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function - in a real app, this would connect to a backend
  const login = async (email: string, password: string) => {
    try {
      // Simulate API call
      setIsLoading(true);
      
      // Simple validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // For demo purposes, create a mock user
      const mockUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        email,
        name: email.split('@')[0],
        plan: 'Free Trial'
      };
      
      // Save user to localStorage
      localStorage.setItem('stockguard_user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simple validation
      if (!name || !email || !password) {
        throw new Error('All fields are required');
      }
      
      // Create a new user
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        email,
        name,
        plan: 'Free Trial'
      };
      
      // Save user to localStorage
      localStorage.setItem('stockguard_user', JSON.stringify(newUser));
      setUser(newUser);
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('stockguard_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
