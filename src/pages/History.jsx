import React, { useState } from 'react';
import { Calendar, Filter, Download, Eye, FileText, Shield, Clock, CheckCircle } from 'lucide-react';

const History = () => {
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('month');

  const historyData = [
    {
      id: 1,
      type: 'policy_analysis',
      title: 'Privacy Policy Analysis',
      description: 'Completed NDPR compliance analysis for TechCorp Nigeria Ltd',
      timestamp: new Date('2024-01-15T10:30:00'),
      status: 'completed',
      score: 78,
      icon: Shield
    },
    {
      id: 2,
      type: 'data_request',
      title: 'Data Access Request',
      description: 'Processed data access request from citizen ID: NG123456789',
      timestamp: new Date('2024-01-14T14:20:00'),
      status: 'completed',
      icon: Eye
    },
    {
      id: 3,
      type: 'company_connection',
      title: 'Company Connected',
      description: 'Successfully connected to Paystack for data monitoring',
      timestamp: new Date('2024-01-13T09:15:00'),
      status: 'active',
      icon: CheckCircle
    },
    {
      id: 4,
      type: 'certificate_generated',
      title: 'Compliance Certificate',
      description: 'Generated NDPR compliance certificate for Q4 2023',
      timestamp: new Date('2024-01-12T16:45:00'),
      status: 'completed',
      icon: FileText
    },
    {
      id: 5,
      type: 'policy_analysis',
      title: 'Policy Update Analysis',
      description: 'Re-analyzed privacy policy after updates',
      timestamp: new Date('2024-01-10T11:00:00'),
      status: 'completed',
      score: 85,
      icon: Shield
    },
    {
      id: 6,
      type: 'data_request',
      title: 'Data Correction Request',
      description: 'Processed data correction request from citizen',
      timestamp: new Date('2024-01-08T13:30:00'),
      status: 'pending',
      icon: Eye
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'active':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'policy_analysis':
        return 'bg-blue-100 text-blue-600';
      case 'data_request':
        return 'bg-green-100 text-green-600';
      case 'company_connection':
        return 'bg-purple-100 text-purple-600';
      case 'certificate_generated':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredHistory = historyData.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 mb-2">
            Activity <span className="text-blue-600">History</span>
          </h1>
          <p className="text-gray-600">
            Complete history of your NDPR compliance activities and data requests
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-2xl font-black text-gray-900">
                {historyData.filter(item => item.type === 'policy_analysis').length}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900">Policy Analyses</h3>
            <p className="text-sm text-gray-600">Completed assessments</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-2xl font-black text-gray-900">
                {historyData.filter(item => item.type === 'data_request').length}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900">Data Requests</h3>
            <p className="text-sm text-gray-600">Citizen requests handled</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-2xl font-black text-gray-900">
                {historyData.filter(item => item.type === 'company_connection').length}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900">Connections</h3>
            <p className="text-sm text-gray-600">Company integrations</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
              <span className="text-2xl font-black text-gray-900">
                {historyData.filter(item => item.type === 'certificate_generated').length}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900">Certificates</h3>
            <p className="text-sm text-gray-600">Generated documents</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Activities</option>
                <option value="policy_analysis">Policy Analysis</option>
                <option value="data_request">Data Requests</option>
                <option value="company_connection">Connections</option>
                <option value="certificate_generated">Certificates</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <Calendar className="h-5 w-5 text-gray-600" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>

              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* History Timeline */}
        <div className="space-y-4">
          {filteredHistory.map((item, index) => (
            <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${getTypeColor(item.type)}`}>
                  <item.icon className="h-6 w-6" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {item.score && (
                        <div className="text-right">
                          <div className="text-lg font-black text-blue-600">{item.score}%</div>
                          <div className="text-xs text-gray-500">Score</div>
                        </div>
                      )}
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {item.timestamp.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-200 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No activities found</h3>
            <p className="text-gray-600">No activities match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;