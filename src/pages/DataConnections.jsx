import React, { useState } from 'react';
import { Building2, CheckCircle, Clock, AlertCircle, Eye, Shield, Download, Plus, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import company logos
import JumiaLogo from '../assets/Jumia_logo.jpg';
import GTBankLogo from '../assets/Gtbank_logo.png';
import FlutterwaveLogo from '../assets/Flutterwave_logo.png';
import PaystackLogo from '../assets/Paystack_logo.png';
import InterswitchLogo from '../assets/interswitch_logo.jpg';

const DataConnections = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const connections = [
    {
      id: 1,
      company: 'Jumia Nigeria',
      logo: JumiaLogo,
      status: 'connected',
      dataTypes: ['Email', 'Phone', 'Purchase History', 'Delivery Address'],
      connectedDate: '2024-01-15',
      lastActivity: '2 hours ago',
      complianceScore: 92
    },
    {
      id: 2,
      company: 'GTBank',
      logo: GTBankLogo,
      status: 'pending',
      dataTypes: ['Account Info', 'Transaction History', 'KYC Data'],
      connectedDate: '2024-01-20',
      lastActivity: '1 day ago',
      complianceScore: 88
    },
    {
      id: 3,
      company: 'Flutterwave',
      logo: FlutterwaveLogo,
      status: 'connected',
      dataTypes: ['Payment Info', 'Transaction Data', 'Merchant Details'],
      connectedDate: '2024-01-10',
      lastActivity: '5 hours ago',
      complianceScore: 95
    },
    {
      id: 4,
      company: 'Paystack',
      logo: PaystackLogo,
      status: 'invited',
      dataTypes: ['Payment Methods', 'Transaction History'],
      connectedDate: '2024-01-22',
      lastActivity: 'Never',
      complianceScore: 90
    },
    {
      id: 5,
      company: 'Interswitch',
      logo: InterswitchLogo,
      status: 'disconnected',
      dataTypes: ['Profile Data', 'Payment History'],
      connectedDate: '2023-12-05',
      lastActivity: '2 weeks ago',
      complianceScore: 75
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'invited': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'disconnected': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'invited': return <Eye className="h-4 w-4" />;
      case 'disconnected': return <AlertCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const filteredConnections = connections.filter(connection => {
    const matchesSearch = connection.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || connection.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: connections.length,
    connected: connections.filter(c => c.status === 'connected').length,
    pending: connections.filter(c => c.status === 'pending').length,
    invited: connections.filter(c => c.status === 'invited').length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-gray-900 mb-2 sm:mb-4">
              My Data <span className="text-blue-600">Connections</span>
            </h1>
            <p className="text-base sm:text-xl text-gray-600">Manage your data connections with companies</p>
          </div>
          <Link 
            to="/connect-company"
            className="flex items-center justify-center gap-3 px-4 sm:px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
          >
            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
            Connect Company
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="premium-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-black text-blue-600 mb-1 sm:mb-2">{stats.total}</div>
            <div className="text-xs sm:text-sm font-semibold text-gray-600">Total Companies</div>
          </div>
          <div className="premium-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-black text-green-600 mb-1 sm:mb-2">{stats.connected}</div>
            <div className="text-xs sm:text-sm font-semibold text-gray-600">Connected</div>
          </div>
          <div className="premium-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-black text-yellow-600 mb-1 sm:mb-2">{stats.pending}</div>
            <div className="text-xs sm:text-sm font-semibold text-gray-600">Pending</div>
          </div>
          <div className="premium-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-black text-blue-600 mb-1 sm:mb-2">{stats.invited}</div>
            <div className="text-xs sm:text-sm font-semibold text-gray-600">Invited</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="premium-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base min-w-0"
              >
                <option value="all">All Status</option>
                <option value="connected">Connected</option>
                <option value="pending">Pending</option>
                <option value="invited">Invited</option>
                <option value="disconnected">Disconnected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Connections List */}
        <div className="premium-card rounded-2xl sm:rounded-3xl p-4 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-4 sm:mb-6">
            Company <span className="text-blue-600">Connections</span>
          </h2>
          
          <div className="space-y-4 sm:space-y-6">
            {filteredConnections.map((connection) => (
              <div key={connection.id} className="p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-200">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center border border-gray-200 overflow-hidden flex-shrink-0">
                      <img src={connection.logo} alt={`${connection.company} logo`} className="w-8 h-8 sm:w-12 sm:h-12 object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl font-black text-gray-900 truncate">{connection.company}</h3>
                      <p className="text-sm sm:text-base text-gray-600">Connected on {new Date(connection.connectedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <div className="text-left sm:text-right">
                      <div className="text-xs sm:text-sm font-semibold text-gray-600">Compliance Score</div>
                      <div className="text-xl sm:text-2xl font-black text-blue-600">{connection.complianceScore}%</div>
                    </div>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 whitespace-nowrap ${getStatusColor(connection.status)}`}>
                      {getStatusIcon(connection.status)}
                      <span className="hidden sm:inline">{connection.status.charAt(0).toUpperCase() + connection.status.slice(1)}</span>
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-2">Data Types Shared</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {connection.dataTypes.map((type, index) => (
                      <span key={index} className="px-2 sm:px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-sm font-semibold border border-blue-200">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="text-xs sm:text-sm text-gray-600">
                    Last activity: {connection.lastActivity}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-50 text-blue-600 rounded-lg sm:rounded-xl font-semibold hover:bg-blue-100 transition-all duration-200 text-sm">
                      <Eye className="h-4 w-4" />
                      <span className="hidden sm:inline">View Details</span>
                      <span className="sm:hidden">View</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-gray-50 text-gray-600 rounded-lg sm:rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 text-sm">
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">Export Data</span>
                      <span className="sm:hidden">Export</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredConnections.length === 0 && (
            <div className="text-center py-12">
              <Shield className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No connections found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <Link 
                to="/connect-company"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all duration-200"
              >
                <Plus className="h-5 w-5" />
                Connect Your First Company
              </Link>
            </div>
          )}
        </div>
    </div>
  );
};

export default DataConnections;