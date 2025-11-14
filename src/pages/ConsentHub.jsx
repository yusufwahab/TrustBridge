import React, { useState, useEffect } from 'react';
import { Shield, Settings, Clock, CheckCircle, XCircle, AlertTriangle, ToggleLeft, ToggleRight, Calendar } from 'lucide-react';

const ConsentHub = () => {
  const [consents, setConsents] = useState([]);
  const [bulkAction, setBulkAction] = useState('');
  const [selectedCompanies, setSelectedCompanies] = useState(new Set());

  useEffect(() => {
    // Mock consent data
    const mockConsents = [
      {
        id: 1,
        company: 'Jumia Nigeria',
        dataTypes: {
          personal: { granted: true, expiry: '2024-12-31' },
          location: { granted: true, expiry: '2024-06-30' },
          financial: { granted: false, expiry: null },
          behavioral: { granted: true, expiry: '2024-09-15' }
        },
        lastUpdated: '2024-01-15',
        riskLevel: 'low'
      },
      {
        id: 2,
        company: 'GTBank',
        dataTypes: {
          personal: { granted: true, expiry: null },
          location: { granted: false, expiry: null },
          financial: { granted: true, expiry: '2025-01-31' },
          behavioral: { granted: false, expiry: null }
        },
        lastUpdated: '2024-01-20',
        riskLevel: 'medium'
      },
      {
        id: 3,
        company: 'Flutterwave',
        dataTypes: {
          personal: { granted: true, expiry: '2024-08-20' },
          location: { granted: false, expiry: null },
          financial: { granted: true, expiry: '2024-12-31' },
          behavioral: { granted: true, expiry: '2024-07-10' }
        },
        lastUpdated: '2024-01-10',
        riskLevel: 'high'
      }
    ];
    setConsents(mockConsents);
  }, []);

  const toggleConsent = (companyId, dataType) => {
    setConsents(prev => prev.map(consent => {
      if (consent.id === companyId) {
        const newExpiry = !consent.dataTypes[dataType].granted ? 
          new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : null;
        
        return {
          ...consent,
          dataTypes: {
            ...consent.dataTypes,
            [dataType]: {
              granted: !consent.dataTypes[dataType].granted,
              expiry: newExpiry
            }
          },
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return consent;
    }));
  };

  const handleBulkAction = () => {
    if (!bulkAction || selectedCompanies.size === 0) return;

    setConsents(prev => prev.map(consent => {
      if (selectedCompanies.has(consent.id)) {
        const newDataTypes = { ...consent.dataTypes };
        Object.keys(newDataTypes).forEach(dataType => {
          if (bulkAction === 'grant_all') {
            newDataTypes[dataType] = {
              granted: true,
              expiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            };
          } else if (bulkAction === 'revoke_all') {
            newDataTypes[dataType] = { granted: false, expiry: null };
          }
        });
        return { ...consent, dataTypes: newDataTypes, lastUpdated: new Date().toISOString().split('T')[0] };
      }
      return consent;
    }));

    setSelectedCompanies(new Set());
    setBulkAction('');
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getExpiryStatus = (expiry) => {
    if (!expiry) return { status: 'permanent', color: 'text-blue-600', text: 'Permanent' };
    
    const expiryDate = new Date(expiry);
    const now = new Date();
    const daysLeft = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) return { status: 'expired', color: 'text-red-600', text: 'Expired' };
    if (daysLeft <= 30) return { status: 'expiring', color: 'text-orange-600', text: `${daysLeft} days left` };
    return { status: 'active', color: 'text-green-600', text: `${daysLeft} days left` };
  };

  return (
    <div className="min-h-screen bg-blue-50 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-3 sm:mb-4">
            Consent <span className="text-blue-600">Hub</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">
            Manage your data consent across all connected companies
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <Shield className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
              <span className="text-lg sm:text-2xl font-black text-gray-900">
                {consents.reduce((acc, c) => acc + Object.values(c.dataTypes).filter(d => d.granted).length, 0)}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Active Consents</h3>
            <p className="text-xs sm:text-sm text-gray-600">Currently granted</p>
          </div>

          <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <Clock className="h-4 w-4 sm:h-6 sm:w-6 text-orange-600" />
              <span className="text-lg sm:text-2xl font-black text-gray-900">
                {consents.reduce((acc, c) => {
                  return acc + Object.values(c.dataTypes).filter(d => {
                    if (!d.expiry || !d.granted) return false;
                    const daysLeft = Math.ceil((new Date(d.expiry) - new Date()) / (1000 * 60 * 60 * 24));
                    return daysLeft <= 30 && daysLeft > 0;
                  }).length;
                }, 0)}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Expiring Soon</h3>
            <p className="text-xs sm:text-sm text-gray-600">Within 30 days</p>
          </div>

          <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <AlertTriangle className="h-4 w-4 sm:h-6 sm:w-6 text-red-600" />
              <span className="text-lg sm:text-2xl font-black text-gray-900">
                {consents.filter(c => c.riskLevel === 'high').length}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">High Risk</h3>
            <p className="text-xs sm:text-sm text-gray-600">Companies</p>
          </div>

          <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <Settings className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
              <span className="text-lg sm:text-2xl font-black text-gray-900">{consents.length}</span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Total Companies</h3>
            <p className="text-xs sm:text-sm text-gray-600">Connected</p>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Bulk Actions</h3>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <select
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
              className="flex-1 px-3 sm:px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            >
              <option value="">Select bulk action...</option>
              <option value="grant_all">Grant All Permissions</option>
              <option value="revoke_all">Revoke All Permissions</option>
            </select>
            <button
              onClick={handleBulkAction}
              disabled={!bulkAction || selectedCompanies.size === 0}
              className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              Apply to Selected ({selectedCompanies.size})
            </button>
          </div>
        </div>

        {/* Consent Management */}
        <div className="space-y-4 sm:space-y-6">
          {consents.map((consent) => (
            <div key={consent.id} className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <input
                    type="checkbox"
                    checked={selectedCompanies.has(consent.id)}
                    onChange={(e) => {
                      const newSelected = new Set(selectedCompanies);
                      if (e.target.checked) {
                        newSelected.add(consent.id);
                      } else {
                        newSelected.delete(consent.id);
                      }
                      setSelectedCompanies(newSelected);
                    }}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">{consent.company}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Last updated: {consent.lastUpdated}</p>
                  </div>
                </div>
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${getRiskColor(consent.riskLevel)}`}>
                  {consent.riskLevel.toUpperCase()} RISK
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(consent.dataTypes).map(([dataType, data]) => {
                  const expiryInfo = getExpiryStatus(data.expiry);
                  return (
                    <div key={dataType} className="p-3 sm:p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-900 capitalize">
                          {dataType.replace('_', ' ')} Data
                        </span>
                        <button
                          onClick={() => toggleConsent(consent.id, dataType)}
                          className="flex items-center"
                        >
                          {data.granted ? (
                            <ToggleRight className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                          ) : (
                            <ToggleLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                          )}
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        {data.granted ? (
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                        )}
                        <span className="text-xs text-gray-600">
                          {data.granted ? 'Granted' : 'Denied'}
                        </span>
                      </div>
                      {data.granted && data.expiry && (
                        <div className="mt-2 flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-gray-400" />
                          <span className={`text-xs ${expiryInfo.color}`}>
                            {expiryInfo.text}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsentHub;