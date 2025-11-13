import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Clock, CheckCircle, XCircle, AlertTriangle, Eye, Building2, Calendar, Filter } from 'lucide-react';

const DataUsageMonitor = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('today');

  useEffect(() => {
    // Simulate real-time notifications
    const mockNotifications = [
      {
        id: 1,
        company: 'Jumia Nigeria',
        action: 'Data Access',
        dataType: 'Personal Information',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        status: 'active',
        autoRevoke: new Date(Date.now() + 25 * 60 * 1000),
        purpose: 'Order Processing',
        location: 'Lagos, Nigeria',
        ipAddress: '197.210.85.45',
        device: 'Mobile App (Android)',
        accessMethod: 'API Request'
      },
      {
        id: 2,
        company: 'Flutterwave',
        action: 'Data Processing',
        dataType: 'Transaction History',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        status: 'completed',
        autoRevoke: null,
        purpose: 'Payment Verification',
        location: 'Abuja, Nigeria',
        ipAddress: '41.203.72.15',
        device: 'Web Browser (Chrome)',
        accessMethod: 'Direct Database Query'
      },
      {
        id: 3,
        company: 'GTBank',
        action: 'Data Sharing',
        dataType: 'Account Information',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: 'pending',
        autoRevoke: new Date(Date.now() + 28 * 60 * 1000),
        purpose: 'Credit Assessment',
        location: 'Victoria Island, Lagos',
        ipAddress: '196.46.32.108',
        device: 'Banking Portal',
        accessMethod: 'Secure API'
      },
      {
        id: 4,
        company: 'Paystack',
        action: 'Data Access',
        dataType: 'Contact Details',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        status: 'revoked',
        autoRevoke: null,
        purpose: 'Marketing Communications',
        location: 'Yaba, Lagos',
        ipAddress: '154.113.16.142',
        device: 'Web Application',
        accessMethod: 'REST API'
      }
    ];

    setNotifications(mockNotifications);
  }, []);

  const handleGrantAccess = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id 
          ? { ...notif, status: 'active', autoRevoke: new Date(Date.now() + 30 * 60 * 1000) }
          : notif
      )
    );
  };

  const handleRevokeAccess = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id 
          ? { ...notif, status: 'revoked', autoRevoke: null }
          : notif
      )
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'revoked':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'completed':
        return <Shield className="h-5 w-5 text-blue-600" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'revoked':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTimeRemaining = (autoRevoke) => {
    if (!autoRevoke) return null;
    
    const now = new Date();
    const diff = autoRevoke - now;
    
    if (diff <= 0) return 'Expired';
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m remaining`;
    }
    return `${minutes}m remaining`;
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    return notif.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-6xl mx-auto px-2 sm:px-0">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 mb-2">
                Data Usage <span className="text-blue-600">Monitor</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Monitor where, when, and how companies access your personal data
              </p>
            </div>
            <Link 
              to="/data-usage-monitor" 
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl font-bold hover:bg-blue-700 transition-all duration-200 gap-2 text-sm sm:text-base"
            >
              <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
              View Monitor
            </Link>
          </div>
        </div>

        {/* Auto-Revoke Alert */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-100 rounded-xl">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-orange-800 mb-2">Auto-Revoke Policy</h3>
              <p className="text-orange-700 mb-3">
                Companies will be automatically revoked access if you don't respond to their data requests within 30 minutes. This ensures your data remains protected.
              </p>
              <div className="text-sm text-orange-600 font-semibold">
                ⏰ Current pending requests will expire automatically
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className="p-2 sm:p-3 bg-green-100 rounded-lg sm:rounded-xl">
                <CheckCircle className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <span className="text-lg sm:text-2xl font-black text-gray-900">
                {notifications.filter(n => n.status === 'active').length}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Active Access</h3>
            <p className="text-xs sm:text-sm text-gray-600">Currently accessing data</p>
          </div>

          <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className="p-2 sm:p-3 bg-yellow-100 rounded-lg sm:rounded-xl">
                <Clock className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-600" />
              </div>
              <span className="text-lg sm:text-2xl font-black text-gray-900">
                {notifications.filter(n => n.status === 'pending').length}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Pending Requests</h3>
            <p className="text-xs sm:text-sm text-gray-600">Awaiting your approval</p>
          </div>

          <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className="p-2 sm:p-3 bg-blue-100 rounded-lg sm:rounded-xl">
                <Shield className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <span className="text-lg sm:text-2xl font-black text-gray-900">
                {notifications.filter(n => n.status === 'completed').length}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Completed</h3>
            <p className="text-xs sm:text-sm text-gray-600">Finished processing</p>
          </div>

          <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className="p-2 sm:p-3 bg-red-100 rounded-lg sm:rounded-xl">
                <XCircle className="h-4 w-4 sm:h-6 sm:w-6 text-red-600" />
              </div>
              <span className="text-lg sm:text-2xl font-black text-gray-900">
                {notifications.filter(n => n.status === 'revoked').length}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Revoked</h3>
            <p className="text-xs sm:text-sm text-gray-600">Access denied/removed</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 flex-shrink-0" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="revoked">Revoked</option>
              </select>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 flex-shrink-0" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3 sm:space-y-4">
          {filteredNotifications.map((notification) => (
            <div key={notification.id} className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex items-start gap-3 sm:gap-4 flex-1 w-full">
                  <div className="p-2 sm:p-3 bg-blue-100 rounded-lg sm:rounded-xl flex-shrink-0">
                    <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                      <h3 className="text-sm sm:text-base font-bold text-gray-900">{notification.company}</h3>
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(notification.status)} w-fit`}>
                        {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-sm sm:text-base text-gray-600 mb-2">
                      <span className="font-semibold">{notification.action}</span> - {notification.dataType}
                    </p>
                    
                    <p className="text-xs sm:text-sm text-gray-500 mb-3">
                      Purpose: {notification.purpose}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-semibold">Location:</span> {notification.location}
                      </div>
                      <div>
                        <span className="font-semibold">Device:</span> {notification.device}
                      </div>
                      <div>
                        <span className="font-semibold">IP Address:</span> {notification.ipAddress}
                      </div>
                      <div>
                        <span className="font-semibold">Access Method:</span> {notification.accessMethod}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-gray-500">
                      <span>{notification.timestamp.toLocaleString()}</span>
                      {notification.autoRevoke && (
                        <span className="text-orange-600 font-semibold">
                          {formatTimeRemaining(notification.autoRevoke)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-4">
                  {getStatusIcon(notification.status)}
                  
                  {notification.status === 'pending' && (
                    <div className="flex gap-2 flex-1 sm:flex-none">
                      <button
                        onClick={() => handleGrantAccess(notification.id)}
                        className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs sm:text-sm font-semibold"
                      >
                        Grant
                      </button>
                      <button
                        onClick={() => handleRevokeAccess(notification.id)}
                        className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs sm:text-sm font-semibold"
                      >
                        Deny
                      </button>
                    </div>
                  )}
                  
                  {notification.status === 'active' && (
                    <button
                      onClick={() => handleRevokeAccess(notification.id)}
                      className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs sm:text-sm font-semibold"
                    >
                      Revoke
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="bg-white p-8 sm:p-12 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 text-center">
            <Eye className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">No notifications found</h3>
            <p className="text-sm sm:text-base text-gray-600">No data usage notifications match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataUsageMonitor;