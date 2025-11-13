import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Clock, User, Building2, MapPin, Wifi, Smartphone, Monitor, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const RealTimeDataUsage = () => {
  const [liveNotifications, setLiveNotifications] = useState([]);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    // Simulate real-time notifications
    const generateNotification = () => {
      const companies = ['Jumia Nigeria', 'GTBank', 'Flutterwave', 'Paystack', 'Kuda Bank', 'Interswitch'];
      const dataTypes = ['Personal Information', 'Transaction History', 'Contact Details', 'Location Data', 'Device Information'];
      const locations = ['Lagos, Nigeria', 'Abuja, Nigeria', 'Port Harcourt, Nigeria', 'Kano, Nigeria', 'Ibadan, Nigeria'];
      const devices = ['Mobile App', 'Web Browser', 'API Access', 'Third-party Service'];
      
      const notification = {
        id: Date.now(),
        company: companies[Math.floor(Math.random() * companies.length)],
        dataType: dataTypes[Math.floor(Math.random() * dataTypes.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        device: devices[Math.floor(Math.random() * devices.length)],
        timestamp: new Date(),
        status: Math.random() > 0.7 ? 'blocked' : Math.random() > 0.5 ? 'approved' : 'pending',
        ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        purpose: 'Service delivery and user experience enhancement'
      };

      setLiveNotifications(prev => [notification, ...prev.slice(0, 19)]);
    };

    let interval;
    if (isLive) {
      // Generate initial notifications
      for (let i = 0; i < 5; i++) {
        setTimeout(() => generateNotification(), i * 1000);
      }
      
      // Continue generating notifications
      interval = setInterval(generateNotification, 3000 + Math.random() * 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLive]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'blocked': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'blocked': return <XCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getDeviceIcon = (device) => {
    if (device.includes('Mobile')) return <Smartphone className="h-4 w-4" />;
    if (device.includes('Web')) return <Monitor className="h-4 w-4" />;
    return <Wifi className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-6xl mx-auto px-2 sm:px-0">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 mb-2">
                Real-Time Data <span className="text-blue-600">Usage</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Live monitoring of your data access across the internet
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-xs sm:text-sm font-semibold text-gray-700">
                  {isLive ? 'Live Monitoring' : 'Monitoring Paused'}
                </span>
              </div>
              <div className="flex gap-2 sm:gap-3">
                <Link
                  to="/citizen-request"
                  className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg sm:rounded-xl font-semibold hover:bg-blue-700 transition-all text-sm sm:text-base"
                >
                  Data Rights
                </Link>
                <button
                  onClick={() => setIsLive(!isLive)}
                  className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl font-semibold transition-all text-sm sm:text-base ${
                    isLive 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {isLive ? 'Pause' : 'Resume'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-blue-100 rounded-lg sm:rounded-xl">
                <Globe className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <span className="text-lg sm:text-2xl font-black text-gray-900">
                {liveNotifications.length}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Total Accesses</h3>
            <p className="text-xs sm:text-sm text-gray-600">In the last hour</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-2xl font-black text-gray-900">
                {liveNotifications.filter(n => n.status === 'approved').length}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900">Approved</h3>
            <p className="text-sm text-gray-600">Automatically granted</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-xl">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <span className="text-2xl font-black text-gray-900">
                {liveNotifications.filter(n => n.status === 'pending').length}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900">Pending</h3>
            <p className="text-sm text-gray-600">Awaiting approval</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <span className="text-2xl font-black text-gray-900">
                {liveNotifications.filter(n => n.status === 'blocked').length}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900">Blocked</h3>
            <p className="text-sm text-gray-600">Access denied</p>
          </div>
        </div>

        {/* Live Feed */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-black text-gray-900 mb-6">
            Live Data Access <span className="text-blue-600">Feed</span>
          </h2>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {liveNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 animate-fadeIn"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Building2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{notification.company}</h3>
                      <p className="text-sm text-gray-600">Accessing: {notification.dataType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(notification.status)}`}>
                      {getStatusIcon(notification.status)}
                      {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">{notification.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getDeviceIcon(notification.device)}
                    <span className="text-gray-700">{notification.device}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">{notification.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1 text-xs text-gray-500">
                      <span>IP: {notification.ipAddress}</span>
                      <span>Purpose: {notification.purpose}</span>
                    </div>
                    <Link
                      to="/data-usage-monitor"
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-all"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {liveNotifications.length === 0 && (
            <div className="text-center py-12">
              <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No recent activity</h3>
              <p className="text-gray-600">
                {isLive ? 'Waiting for data access events...' : 'Monitoring is paused'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RealTimeDataUsage;