import { Link, useLocation } from 'react-router-dom';
import { Home, Building2, FileText, BarChart3, Shield, Users, LogOut, Menu, PlusCircle, Zap, Activity, Bell, Settings, User, Monitor, History, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import trustBridgeLogo from '../assets/TrustBridgeLogo.png';
import { useNavigation } from '../contexts/NavigationContext';

const Sidebar = ({ user, isOpen = true, onToggle, onLogout }) => {
  const location = useLocation();
  const { startNavigation } = useNavigation();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && window.innerWidth < 640 && !event.target.closest('.sidebar-container')) {
        onToggle();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggle]);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/companies', label: 'Companies', icon: Building2 },
    { path: '/data-connections', label: 'My Data', icon: Shield },
    { path: '/policy-upload', label: 'Policy Upload', icon: FileText },
    { path: '/action-history', label: 'Action History', icon: Activity },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile hamburger button */}
      {!isOpen && (
        <button 
          onClick={onToggle}
          className="fixed top-4 right-4 z-50 p-2 bg-white rounded-xl shadow-lg border border-gray-200 sm:hidden"
        >
          <Menu className="h-5 w-5 text-gray-600" />
        </button>
      )}
      
      <div className={`sidebar-container fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-40 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-0 sm:w-16'
      } ${!isOpen ? 'overflow-hidden' : ''}`}>
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        {isOpen ? (
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-3">
              <img src={trustBridgeLogo} alt="TrustBridge Logo" className="h-10 w-auto" />
              <div>
                <span className="text-xl font-black text-blue-600">TrustBridge</span>
                <div className="text-xs text-gray-500 font-semibold -mt-1">NDPR COMPLIANCE</div>
              </div>
            </Link>
            <button 
              onClick={onToggle}
              className="hidden lg:flex p-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center gap-3">
            <img src={trustBridgeLogo} alt="TrustBridge Logo" className="h-8 w-auto" />
            <button 
              onClick={onToggle}
              className="hidden lg:flex p-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
            >
              <Menu className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-1 sm:p-2 overflow-y-auto" style={{ height: 'calc(100vh - 200px)' }}>
        <div className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => {
                startNavigation();
                if (window.innerWidth < 640) onToggle();
              }}
              className={`flex items-center ${isOpen ? 'gap-3 px-3 sm:px-4' : 'justify-center px-1 sm:px-2'} py-2 sm:py-3 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base ${
                isActive(item.path)
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
              title={!isOpen ? item.label : ''}
            >
              <item.icon className="h-5 w-5" />
              {isOpen && item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* User Info */}
      <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-gray-200">
        {isOpen ? (
          <>
            <Link 
              to="/user-profile"
              onClick={() => {
                startNavigation();
                if (window.innerWidth < 640) onToggle();
              }}
              className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-blue-50 rounded-xl mb-2 transition-all duration-200 cursor-pointer"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-gray-900">{user?.name || 'User'}</div>
                <div className="text-xs text-gray-500">NDPR Platform</div>
              </div>
            </Link>
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl font-semibold transition-all duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm">Sign Out</span>
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Link 
              to="/user-profile"
              onClick={() => {
                startNavigation();
                if (window.innerWidth < 640) onToggle();
              }}
              className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer"
              title="Profile"
            >
              <User className="h-5 w-5 text-white" />
            </Link>
            <button 
              onClick={onLogout}
              className="p-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Sidebar;