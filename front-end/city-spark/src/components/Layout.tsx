import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-bold">CitySpark</span>
              </Link>
            </div>
            <div className="flex items-center">
              <Link to="/auth/login" className="text-gray-700 hover:text-gray-900 px-3 py-2">
                Login
              </Link>
              <Link to="/auth/signup" className="text-gray-700 hover:text-gray-900 px-3 py-2">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default Layout; 