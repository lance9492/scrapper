import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Recycle, Sparkles, Zap, Star } from 'lucide-react';
import UserMenu from './UserMenu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHover, setActiveHover] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { 
      path: '/marketplace', 
      label: 'RecycleMart', 
      icon: Recycle,
      gradient: 'from-emerald-400 to-teal-500',
      description: 'Trade recyclables'
    },
    { 
      path: '/salvage', 
      label: 'SalvageHub', 
      icon: Zap,
      gradient: 'from-purple-400 to-pink-500',
      description: 'Quality parts & equipment'
    },
    { 
      path: '/about', 
      label: 'About Us', 
      icon: Star,
      gradient: 'from-blue-400 to-indigo-500',
      description: 'Our story'
    },
    { 
      path: '/pricing', 
      label: 'Pricing', 
      icon: Sparkles,
      gradient: 'from-orange-400 to-red-500',
      description: 'Simple & transparent'
    },
    { 
      path: '/contact', 
      label: 'Contact', 
      icon: Sparkles,
      gradient: 'from-pink-400 to-rose-500',
      description: 'Get in touch'
    }
  ];

  return (
    <>
      {/* Glassmorphism Navbar */}
      <nav className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out
        ${scrolled 
          ? 'bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-2xl shadow-black/5' 
          : 'bg-white/95 backdrop-blur-sm border-b border-gray-100/50'
        }
      `}>
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-blue-500/5 animate-pulse"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo with premium animations */}
            <Link to="/" className="flex items-center gap-3 group relative">
              <div className="relative">
                {/* Animated glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF3B81] to-purple-600 rounded-full blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-300 animate-pulse"></div>
                
                {/* Main logo container */}
                <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#FF3B81] to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Recycle className="w-6 h-6 text-white group-hover:animate-spin" />
                  
                  {/* Sparkle effects */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping delay-150"></div>
                </div>
              </div>
              
              {/* Brand name with gradient text */}
              <div className="relative">
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-[#FF3B81] to-purple-600 bg-clip-text text-transparent group-hover:from-[#FF3B81] group-hover:via-purple-600 group-hover:to-blue-600 transition-all duration-500">
                  Scrapper
                </span>
                
                {/* Animated underline */}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF3B81] to-purple-600 group-hover:w-full transition-all duration-500 ease-out"></div>
              </div>
            </Link>

            {/* Desktop Navigation with premium effects */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                const hovered = activeHover === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative group"
                    onMouseEnter={() => setActiveHover(item.path)}
                    onMouseLeave={() => setActiveHover(null)}
                  >
                    {/* Animated background */}
                    <div className={`
                      absolute inset-0 rounded-xl transition-all duration-300 ease-out
                      ${active 
                        ? `bg-gradient-to-r ${item.gradient} shadow-lg` 
                        : hovered 
                          ? `bg-gradient-to-r ${item.gradient} opacity-10` 
                          : 'bg-transparent'
                      }
                    `}></div>
                    
                    {/* Glow effect */}
                    {(active || hovered) && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-xl blur-xl opacity-20 animate-pulse`}></div>
                    )}
                    
                    {/* Content */}
                    <div className={`
                      relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300
                      ${active 
                        ? 'text-white transform scale-105' 
                        : 'text-gray-700 hover:text-gray-900'
                      }
                    `}>
                      <Icon className={`w-4 h-4 transition-transform duration-300 ${hovered ? 'rotate-12 scale-110' : ''}`} />
                      <span className="font-medium">{item.label}</span>
                      
                      {/* Active indicator */}
                      {active && (
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      )}
                    </div>
                    
                    {/* Hover tooltip */}
                    {hovered && !active && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 animate-fadeIn whitespace-nowrap">
                        {item.description}
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right side with UserMenu and Mobile toggle */}
            <div className="flex items-center gap-4">
              <UserMenu />
              
              {/* Mobile menu button with premium animation */}
              <button 
                onClick={toggleMenu}
                className="lg:hidden relative p-2 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 hover:from-[#FF3B81]/10 hover:to-purple-600/10 transition-all duration-300 group"
              >
                <Menu className={`w-5 h-5 text-gray-700 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : 'group-hover:scale-110'}`} />
                
                {/* Animated border */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-[#FF3B81] to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'xor'
                }}></div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu with stunning animations */}
      <div className={`
        lg:hidden fixed inset-0 z-40 transition-all duration-500 ease-out
        ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}>
        {/* Backdrop with blur */}
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        ></div>
        
        {/* Menu panel */}
        <div className={`
          absolute top-16 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden
          transition-all duration-500 ease-out transform
          ${isMenuOpen ? 'translate-y-0 scale-100' : '-translate-y-4 scale-95'}
        `}>
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-blue-500/5"></div>
          
          <div className="relative p-6 space-y-4">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="group relative block"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Background with gradient */}
                  <div className={`
                    absolute inset-0 rounded-xl transition-all duration-300
                    ${active 
                      ? `bg-gradient-to-r ${item.gradient} shadow-lg` 
                      : 'bg-transparent group-hover:bg-gray-50'
                    }
                  `}></div>
                  
                  {/* Content */}
                  <div className={`
                    relative flex items-center gap-4 p-4 rounded-xl transition-all duration-300
                    ${active ? 'text-white transform translate-x-2' : 'text-gray-700'}
                  `}>
                    <div className={`
                      flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300
                      ${active 
                        ? 'bg-white/20 shadow-lg' 
                        : `bg-gradient-to-br ${item.gradient} opacity-10 group-hover:opacity-20`
                      }
                    `}>
                      <Icon className={`w-5 h-5 transition-transform duration-300 ${active ? 'text-white' : 'text-gray-600'} group-hover:scale-110`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="font-semibold">{item.label}</div>
                      <div className={`text-sm ${active ? 'text-white/80' : 'text-gray-500'}`}>
                        {item.description}
                      </div>
                    </div>
                    
                    {/* Arrow indicator */}
                    <div className={`
                      w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                      ${active ? 'bg-white/20' : 'bg-gray-100 group-hover:bg-gray-200'}
                    `}>
                      <div className={`w-2 h-2 border-r-2 border-b-2 transform rotate-45 transition-colors duration-300 ${active ? 'border-white' : 'border-gray-400'}`}></div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Navbar;