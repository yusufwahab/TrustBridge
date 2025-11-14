import React, { useState, useEffect } from 'react';
import { Globe, MapPin, AlertTriangle, Shield, Flag, Clock, CheckCircle, XCircle } from 'lucide-react';

const CrossBorderMonitor = () => {
  const [transfers, setTransfers] = useState([]);
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [filterCountry, setFilterCountry] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const mockTransfers = [
      {
        id: 1,
        company: 'Jumia Nigeria',
        dataType: 'Personal Information',
        sourceCountry: 'Nigeria',
        destinationCountry: 'Germany',
        purpose: 'Order Processing & Analytics',
        legalBasis: 'Adequate Decision',
        protectionLevel: 'GDPR Compliant',
        transferDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: 'active',
        dataVolume: '2.5MB',
        retention: '2 years',
        safeguards: ['Standard Contractual Clauses', 'Data Encryption'],
        riskLevel: 'low'
      },
      {
        id: 2,
        company: 'GTBank',
        dataType: 'Financial Data',
        sourceCountry: 'Nigeria',
        destinationCountry: 'United States',
        purpose: 'Fraud Detection & Compliance',
        legalBasis: 'Legitimate Interest',
        protectionLevel: 'Partial Adequacy',
        transferDate: new Date(Date.now() - 6 * 60 * 60 * 1000),
        status: 'pending_approval',
        dataVolume: '1.2MB',
        retention: '7 years',
        safeguards: ['Binding Corporate Rules', 'Data Minimization'],
        riskLevel: 'medium'
      },
      {
        id: 3,
        company: 'Flutterwave',
        dataType: 'Transaction Data',
        sourceCountry: 'Nigeria',
        destinationCountry: 'United Kingdom',
        purpose: 'Payment Processing',
        legalBasis: 'Contractual Necessity',
        protectionLevel: 'GDPR Compliant',
        transferDate: new Date(Date.now() - 12 * 60 * 60 * 1000),
        status: 'completed',
        dataVolume: '850KB',
        retention: '5 years',
        safeguards: ['Standard Contractual Clauses', 'Pseudonymization'],
        riskLevel: 'low'
      },
      {
        id: 4,
        company: 'Meta (Facebook)',
        dataType: 'Behavioral Data',
        sourceCountry: 'Nigeria',
        destinationCountry: 'United States',
        purpose: 'Advertising & Analytics',
        legalBasis: 'Consent',
        protectionLevel: 'Privacy Shield (Invalidated)',
        transferDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
        status: 'blocked',
        dataVolume: '5.2MB',
        retention: 'Indefinite',
        safeguards: ['Privacy Policy', 'User Controls'],
        riskLevel: 'high'
      }
    ];

    setTransfers(mockTransfers);

    // Simulate new transfer
    const newTransferTimeout = setTimeout(() => {
      const newTransfer = {
        id: 5,
        company: 'Google Nigeria',
        dataType: 'Location Data',
        sourceCountry: 'Nigeria',
        destinationCountry: 'Ireland',
        purpose: 'Service Improvement',
        legalBasis: 'Consent',
        protectionLevel: 'GDPR Compliant',
        transferDate: new Date(),
        status: 'active',
        dataVolume: '3.1MB',
        retention: '18 months',
        safeguards: ['Standard Contractual Clauses', 'Data Encryption'],
        riskLevel: 'low'
      };

      setTransfers(prev => [newTransfer, ...prev]);
    }, 3000);

    return () => clearTimeout(newTransferTimeout);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100 border-green-200';
      case 'pending_approval': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'completed': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'blocked': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProtectionColor = (protection) => {
    if (protection.includes('GDPR')) return 'text-green-600 bg-green-100';
    if (protection.includes('Partial')) return 'text-orange-600 bg-orange-100';
    if (protection.includes('Invalidated')) return 'text-red-600 bg-red-100';
    return 'text-blue-600 bg-blue-100';
  };

  const filteredTransfers = transfers.filter(transfer => {
    const matchesCountry = filterCountry === 'all' || transfer.destinationCountry === filterCountry;
    const matchesStatus = filterStatus === 'all' || transfer.status === filterStatus;
    return matchesCountry && matchesStatus;
  });

  const countries = [...new Set(transfers.map(t => t.destinationCountry))];

  return (
    <div className="min-h-screen bg-blue-50 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-3 sm:mb-4">
            Cross-Border <span className="text-blue-600">Monitor</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">
            Track international transfers of your personal data
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <Globe className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
              <span className="text-lg sm:text-2xl font-black text-gray-900">
                {transfers.filter(t => t.status === 'active').length}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Active Transfers</h3>
            <p className="text-xs sm:text-sm text-gray-600">Currently transferring</p>
          </div>

          <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <Flag className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
              <span className="text-lg sm:text-2xl font-black text-gray-900">
                {countries.length}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Countries</h3>
            <p className="text-xs sm:text-sm text-gray-600">Receiving your data</p>
          </div>

          <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <AlertTriangle className="h-4 w-4 sm:h-6 sm:w-6 text-red-600" />
              <span className="text-lg sm:text-2xl font-black text-gray-900">
                {transfers.filter(t => t.riskLevel === 'high').length}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">High Risk</h3>
            <p className="text-xs sm:text-sm text-gray-600">Transfers flagged</p>
          </div>

          <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <Shield className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600" />
              <span className="text-lg sm:text-2xl font-black text-gray-900">
                {transfers.filter(t => t.protectionLevel.includes('GDPR')).length}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">GDPR Protected</h3>
            <p className="text-xs sm:text-sm text-gray-600">Adequate protection</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Country</label>
              <select
                value={filterCountry}
                onChange={(e) => setFilterCountry(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="all">All Countries</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending_approval">Pending Approval</option>
                <option value="completed">Completed</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
          </div>
        </div>

        {/* Transfer List */}
        <div className="space-y-4 sm:space-y-6">
          {filteredTransfers.map((transfer) => (
            <div key={transfer.id} className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">{transfer.company}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {transfer.sourceCountry} → {transfer.destinationCountry}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border w-fit ${getStatusColor(transfer.status)}`}>
                    {transfer.status.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold w-fit ${getRiskColor(transfer.riskLevel)}`}>
                    {transfer.riskLevel.toUpperCase()} RISK
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <span className="text-xs font-semibold text-gray-700">Data Type:</span>
                  <p className="text-sm text-gray-900">{transfer.dataType}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-700">Purpose:</span>
                  <p className="text-sm text-gray-900">{transfer.purpose}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-700">Legal Basis:</span>
                  <p className="text-sm text-gray-900">{transfer.legalBasis}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-700">Data Volume:</span>
                  <p className="text-sm text-gray-900">{transfer.dataVolume}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-semibold text-gray-700">Protection Level:</span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getProtectionColor(transfer.protectionLevel)}`}>
                    {transfer.protectionLevel}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {transfer.safeguards.map((safeguard, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {safeguard}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{transfer.transferDate.toLocaleString()}</span>
                  </div>
                  <span>Retention: {transfer.retention}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedTransfer(transfer)}
                    className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                  >
                    View Details
                  </button>
                  {transfer.status === 'active' && (
                    <button className="px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm">
                      Block Transfer
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTransfers.length === 0 && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
            <Globe className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No transfers found</h3>
            <p className="text-gray-600">No cross-border data transfers match your current filters.</p>
          </div>
        )}

        {/* Transfer Details Modal */}
        {selectedTransfer && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Transfer Details - {selectedTransfer.company}</h3>
                <button
                  onClick={() => setSelectedTransfer(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold text-gray-700">Source Country:</span>
                    <p className="text-gray-600">{selectedTransfer.sourceCountry}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Destination Country:</span>
                    <p className="text-gray-600">{selectedTransfer.destinationCountry}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Data Volume:</span>
                    <p className="text-gray-600">{selectedTransfer.dataVolume}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Retention Period:</span>
                    <p className="text-gray-600">{selectedTransfer.retention}</p>
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-gray-700">Transfer Purpose:</span>
                  <p className="text-gray-600 mt-1">{selectedTransfer.purpose}</p>
                </div>

                <div>
                  <span className="font-semibold text-gray-700">Legal Basis:</span>
                  <p className="text-gray-600 mt-1">{selectedTransfer.legalBasis}</p>
                </div>

                <div>
                  <span className="font-semibold text-gray-700">Safeguards Applied:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedTransfer.safeguards.map((safeguard, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                        {safeguard}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedTransfer(null)}
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

export default CrossBorderMonitor;