import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Menu, 
  X, 
  Home, 
  LayoutGrid, 
  Heart, 
  PenSquare, 
  User, 
  LogOut, 
  LogIn, 
  UserPlus 
} from 'lucide-react';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { to: '/posts', label: 'Posts', icon: <LayoutGrid className="h-4 w-4 mr-1" /> },
    { to: '/posts/liked', label: 'Liked Posts', icon: <Heart className="h-4 w-4 mr-1" />, authRequired: false },
    { to: '/posts/create', label: 'Create Post', icon: <PenSquare className="h-4 w-4 mr-1" />, authRequired: false },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 w-full">
        <div className="flex justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Home className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-lg md:text-xl font-bold text-blue-600">Social Posts</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navLinks.map((link) => (
                (!link.authRequired || isAuthenticated) && (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-xs md:text-sm font-medium ${
                      location.pathname === link.to
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="hidden md:flex text-xs md:text-sm text-gray items-center">
                  <User className="h-4 w-4 mr-1" />
                  Hello, {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 cursor-pointer rounded-md text-xs md:text-sm font-medium text-red-600 hover:text-red-800 flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className={`px-3 py-2 rounded-md text-xs md:text-sm font-medium flex items-center ${
                    location.pathname === '/login'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-3 py-2 rounded-md text-xs md:text-sm font-medium flex items-center ${
                    location.pathname === '/register'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              (!link.authRequired || isAuthenticated) && (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-sm md:text-base font-medium flex items-center ${
                    location.pathname === link.to
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon}
                  {link.label}
                </Link>
              )
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? ( 
              <div className="space-y-1">
                <div className="block px-4 py-2 text-sm md:text-base font-medium text-gray-500 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Hello, {user?.name}
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm md:text-base font-medium text-red-600 hover:text-red-800 flex items-center"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                <Link
                  to="/login"
                  className={`block px-4 py-2 text-sm md:text-base font-medium flex items-center ${
                    location.pathname === '/login'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`block px-4 py-2 text-sm md:text-base font-medium flex items-center ${
                    location.pathname === '/register'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <UserPlus className="h-5 w-5 mr-2" />
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
} 