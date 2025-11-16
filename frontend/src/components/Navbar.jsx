import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Receipt, FolderOpen, Settings } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/transactions', label: 'Transactions', icon: Receipt },
    { path: '/categories', label: 'Categories', icon: FolderOpen },
    { path: '/budget', label: 'Budget Settings', icon: Settings }
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-pink-400 flex items-center justify-center">
              <span className="text-white font-bold text-lg">$</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-pink-600 bg-clip-text text-transparent">
              Budget Planner
            </span>
          </div>
          <div className="flex space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-400 to-pink-400 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden md:inline">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
