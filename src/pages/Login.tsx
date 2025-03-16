
import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';

const Login = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-center md:justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative h-8 w-8 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
              </div>
              <div className="absolute inset-0 border-2 border-primary rounded-full"></div>
            </div>
            <span className="text-xl font-bold">
              Stock<span className="text-primary">Guard</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/signup" className="text-sm text-muted-foreground hover:text-primary">
              Don't have an account?
            </Link>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <AuthForm defaultMode="login" />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-4 px-6 border-t border-white/10 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} StockGuard. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Login;
