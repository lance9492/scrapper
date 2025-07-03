import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, Settings, Package, Truck, Users, Star, Sparkles, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        {/* Desktop view - EPIC REDESIGNED BUTTONS */}
        <div className="hidden sm:flex sm:items-center sm:space-x-4">
          {/* REGISTER BUTTON - Pink Gradient with Sparkles */}
          <Link
            to="/register"
            className="group relative overflow-hidden"
          >
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            
            {/* Main button */}
            <div className="relative flex items-center gap-2 bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 text-white px-6 py-3 rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold border border-pink-400/30">
              <Sparkles className="w-4 h-4 group-hover:animate-spin" />
              <span>Register</span>
              
              {/* Sparkle effects */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping delay-150"></div>
            </div>
          </Link>

          {/* LOGIN BUTTON - Black/Purple Gradient with Lightning */}
          <Link
            to="/login"
            className="group relative overflow-hidden"
          >
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-purple-800 to-black rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Main button */}
            <div className="relative flex items-center gap-2 bg-gradient-to-r from-gray-900 via-purple-800 to-black text-white px-6 py-3 rounded-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold border border-purple-400/30">
              <Zap className="w-4 h-4 group-hover:animate-pulse" />
              <span>Login</span>
              
              {/* Lightning effects */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-purple-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            </div>
          </Link>
        </div>

        {/* Mobile view - REDESIGNED MOBILE MENU */}
        <div className="sm:hidden relative" ref={menuRef}>
          <button
            onClick={toggleMenu}
            className="group relative overflow-hidden"
          >
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-600 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            
            {/* Main button */}
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 via-purple-600 to-black flex items-center justify-center text-white shadow-xl transform group-hover:scale-110 transition-all duration-300 border border-pink-400/30">
              <User size={18} />
              
              {/* Sparkle effect */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
            </div>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-pink-200/50 overflow-hidden z-50">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-50/80 via-purple-50/80 to-blue-50/80"></div>
              
              <div className="relative p-4 space-y-3">
                {/* REGISTER BUTTON - Mobile */}
                <Link
                  to="/register"
                  className="group relative block"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative flex items-center gap-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white p-4 rounded-xl shadow-lg transform group-hover:scale-105 transition-all duration-300">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold">Register</div>
                      <div className="text-xs opacity-90">Join the platform</div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                  </div>
                </Link>

                {/* LOGIN BUTTON - Mobile */}
                <Link
                  to="/login"
                  className="group relative block"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-purple-800 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative flex items-center gap-3 bg-gradient-to-r from-gray-900 via-purple-800 to-black text-white p-4 rounded-xl shadow-lg transform group-hover:scale-105 transition-all duration-300">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold">Login</div>
                      <div className="text-xs opacity-90">Access your account</div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-purple-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="group relative overflow-hidden"
      >
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
        
        {/* Main avatar */}
        <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 flex items-center justify-center text-white shadow-xl transform group-hover:scale-110 transition-all duration-300 border-2 border-white/20">
          {user.email ? user.email.charAt(0).toUpperCase() : <User size={18} />}
          
          {/* Online indicator */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
        </div>
        
        {/* Username display for larger screens */}
        <span className="hidden md:inline-block ml-3 font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
          {user.email ? user.email.split('@')[0] : 'User'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden z-50">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 via-pink-50/80 to-blue-50/80"></div>
          
          <div className="relative">
            {/* User info header */}
            <div className="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {user.email ? user.email.charAt(0).toUpperCase() : <User size={20} />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.email || 'User'}
                  </p>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-500">Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu items */}
            <div className="p-2">
              <Link
                to="/dashboard/profile"
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 rounded-xl transition-all duration-200 group"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Settings className="w-4 h-4 text-purple-600" />
                </div>
                <span className="font-medium">Account Settings</span>
              </Link>

              <Link
                to="/dashboard/containers"
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 rounded-xl transition-all duration-200 group"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Package className="w-4 h-4 text-green-600" />
                </div>
                <span className="font-medium">My Containers</span>
              </Link>

              <Link
                to="/dashboard/agents"
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 rounded-xl transition-all duration-200 group"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-4 h-4 text-pink-600" />
                </div>
                <span className="font-medium">My Sales Agents</span>
              </Link>

              <Link
                to="/dashboard/collections"
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 rounded-xl transition-all duration-200 group"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Truck className="w-4 h-4 text-blue-600" />
                </div>
                <span className="font-medium">Collection History</span>
              </Link>

              {/* Divider */}
              <div className="my-2 border-t border-gray-200/50"></div>

              {/* Sign out button */}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 rounded-xl transition-all duration-200 group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-red-100 to-pink-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <LogOut className="w-4 h-4 text-red-600" />
                </div>
                <span className="font-medium">Sign out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;