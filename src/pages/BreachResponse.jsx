import React, { useState, useEffect } from 'react';
import { AlertTriangle, Shield, Clock, CheckCircle, XCircle, Bell, Lock, Unlock, RefreshCw } from 'lucide-react';

const BreachResponse = () => {
  const [breaches, setBreaches] = useState([]);
  const [selectedBreach, setSelectedBreach] = useState(null);
  const [autoActions, setAutoActions] = useState({
    revokeConsent: true,
    freezeAccounts: true,
    notifyContacts: false
  });

  useEffect(() => {
    const mockBreaches = [
      {
        id: 1,
        company: 'Jumia Nigeria',
        severity: 'high',
        dataTypes: ['Email', 'Phone', 'Purchase History', 'Payment Methods'],
        affectedUsers: 2500000,
        discoveredAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        reportedAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
        status: 'active',
        description: 'Unauthorized access to customer database containing personal and payment information',
        impact: 'Your email, phone number, and recent purchase history may have been accessed',
        recommendations: [
          'Change your Jumia account password immediately',
          'Monitor your bank statements for unauthorized transactions',
          'Enable two-factor authentication on your account',
          'Consider freezing your credit cards temporarily'
        ],
        actionsTaken: ['consent_revoked', 'notifications_sent'],
        estimatedResolution: new Date(Date.now() + 24 * 60 * 60 * 1000)
      },
      {
        id: 2,
        company: 'GTBank',
        severity: 'critical',
        dataTypes: ['Account Numbers', 'Transaction History', 'Personal Information'],
        affectedUsers: 150000,
        discoveredAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
        reportedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
        status: 'contained',
        description: 'Security incident affecting mobile banking platform with potential financial data exposure',
        impact: 'Your account information and transaction history may have been compromised',
        recommendations: [
          'Change your mobile banking PIN and password',
          'Review all recent transactions carefully',
          'Contact GTBank customer service immediately',
          'Consider temporarily disabling mobile banking'
        ],
        actionsTaken: ['consent_revoked', 'accounts_frozen', 'notifications_sent'],
        estimatedResolution: new Date(Date.now() + 12 * 60 * 60 * 1000)
      },
      {
        id: 3,
        company: 'Flutterwave',
        severity: 'medium',
        dataTypes: ['Email', 'Transaction Metadata'],
        affectedUsers: 50000,
        discoveredAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
        reportedAt: new Date(Date.now() - 10 * 60 * 60 * 1000),
        status: 'resolved',
        description: 'Data exposure in payment processing logs affecting transaction metadata',
        impact: 'Limited transaction information may have been exposed, no financial details compromised',
        recommendations: [
          'Monitor your payment accounts for unusual activity',
          'Update your Flutterwave account password',
          'Review recent payment notifications'
        ],
        actionsTaken: ['notifications_sent'],
        estimatedResolution: new Date(Date.now() - 2 * 60 * 60 * 1000)
      }
    ];

    setBreaches(mockBreaches);

    // Simulate new breach alert
    const alertTimeout = setTimeout(() => {
      const newBreach = {
        id: 4,
        company: 'Paystack',
        severity: 'high',
        dataTypes: ['Email', 'Payment Methods'],
        affectedUsers: 75000,
        discoveredAt: new Date(),
        reportedAt: new Date(),
        status: 'active',
        description: 'Potential unauthorized access to payment processing system',
        impact: 'Your email and saved payment methods may be at risk',
        recommendations: [
          'Remove saved payment methods from Paystack',
          'Change your account password',
          'Monitor your bank statements closely'
        ],
        actionsTaken: [],
        estimatedResolution: new Date(Date.now() + 48 * 60 * 60 * 1000)
      };

      setBreaches(prev => [newBreach, ...prev]);
    }, 5000);

    return () => clearTimeout(alertTimeout);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-800 bg-red-100 border-red-200';
      case 'high': return 'text-orange-800 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-800 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-blue-800 bg-blue-100 border-blue-200';
      default: return 'text-gray-800 bg-gray-100 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-red-600 bg-red-100 border-red-200';
      case 'contained': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'resolved': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const executeAutoAction = (breachId, action) => {
    setBreaches(prev => prev.map(breach => {
      if (breach.id === breachId) {
        return {
          ...breach,
          actionsTaken: [...breach.actionsTaken, action]
        };
      }
      return breach;
    }));
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) return `${hours}h ${minutes}m ago`;
    return `${minutes}m ago`;
  };

  return (
    <div className="min-h-screen bg-blue-50 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-3 sm:mb-4">
            Breach <span className="text-red-600">Response</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">
            Instant alerts and automated protection for data breaches
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <AlertTriangle className="h-4 w-4 sm:h-6 sm:w-6 text-red-600" />
              <span className="text-lg sm:text-2xl font-black text-gray-900">
                {breaches.filter(b => b.status === 'active').length}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Active Breaches</h3>
            <p className="text-xs sm:text-sm text-gray-600">Requiring attention</p>
          </div>

          <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <Shield className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
              <span className="text-lg sm:text-2xl font-black text-gray-900">
                {breaches.reduce((acc, b) => acc + b.actionsTaken.length, 0)}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Auto Actions</h3>
            <p className="text-xs sm:text-sm text-gray-600">Executed automatically</p>
          </div>

          <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <CheckCircle className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
              <span className="text-lg sm:text-2xl font-black text-gray-900">
                {breaches.filter(b => b.status === 'resolved').length}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Resolved</h3>
            <p className="text-xs sm:text-sm text-gray-600">Successfully handled</p>
          </div>

          <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <Bell className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600" />
              <span className="text-lg sm:text-2xl font-black text-gray-900">
                {breaches.reduce((acc, b) => acc + b.affectedUsers, 0).toLocaleString()}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Total Affected</h3>
            <p className="text-xs sm:text-sm text-gray-600">Users impacted</p>
          </div>
        </div>

        {/* Auto Response Settings */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Automatic Response Settings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={autoActions.revokeConsent}
                onChange={(e) => setAutoActions(prev => ({ ...prev, revokeConsent: e.target.checked }))}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <div>
                <span className="font-semibold text-gray-900">Revoke Consent</span>
                <p className="text-xs text-gray-600">Automatically revoke data permissions</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={autoActions.freezeAccounts}
                onChange={(e) => setAutoActions(prev => ({ ...prev, freezeAccounts: e.target.checked }))}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <div>
                <span className="font-semibold text-gray-900">Freeze Accounts</span>
                <p className="text-xs text-gray-600">Temporarily freeze affected accounts</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={autoActions.notifyContacts}
                onChange={(e) => setAutoActions(prev => ({ ...prev, notifyContacts: e.target.checked }))}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <div>
                <span className="font-semibold text-gray-900">Notify Contacts</span>
                <p className="text-xs text-gray-600">Alert emergency contacts</p>
              </div>
            </label>
          </div>
        </div>

        {/* Breach Alerts */}
        <div className="space-y-4 sm:space-y-6">
          {breaches.map((breach) => (
            <div key={breach.id} className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">{breach.company}</h3>
                    <p className="text-sm text-gray-600">Discovered {getTimeAgo(breach.discoveredAt)}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border w-fit ${getSeverityColor(breach.severity)}`}>
                    {breach.severity.toUpperCase()}
                  </span>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border w-fit ${getStatusColor(breach.status)}`}>
                    {breach.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm sm:text-base text-gray-700 mb-3">{breach.description}</p>
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">Impact on Your Data:</h4>
                  <p className="text-sm text-red-700">{breach.impact}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Affected Data Types:</h4>
                  <div className="flex flex-wrap gap-1">
                    {breach.dataTypes.map((type, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Actions Taken:</h4>
                  <div className="space-y-1">
                    {breach.actionsTaken.map((action, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span className="text-xs text-gray-600 capitalize">
                          {action.replace('_', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Recommended Actions:</h4>
                <ul className="space-y-1">
                  {breach.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span className="text-sm text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setSelectedBreach(breach)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                >
                  View Details
                </button>
                {breach.status === 'active' && (
                  <>
                    <button
                      onClick={() => executeAutoAction(breach.id, 'consent_revoked')}
                      disabled={breach.actionsTaken.includes('consent_revoked')}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 text-sm"
                    >
                      <Lock className="h-4 w-4" />
                      Revoke Consent
                    </button>
                    <button
                      onClick={() => executeAutoAction(breach.id, 'accounts_frozen')}
                      disabled={breach.actionsTaken.includes('accounts_frozen')}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 text-sm"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Freeze Account
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Breach Details Modal */}
        {selectedBreach && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Breach Details - {selectedBreach.company}</h3>
                <button
                  onClick={() => setSelectedBreach(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Affected Users:</span>
                    <p className="text-gray-600">{selectedBreach.affectedUsers.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Estimated Resolution:</span>
                    <p className="text-gray-600">{selectedBreach.estimatedResolution.toLocaleString()}</p>
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-gray-700">Full Description:</span>
                  <p className="text-gray-600 mt-1">{selectedBreach.description}</p>
                </div>

                <div>
                  <span className="font-semibold text-gray-700">Your Data Impact:</span>
                  <p className="text-gray-600 mt-1">{selectedBreach.impact}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedBreach(null)}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BreachResponse;