import React, { useState, useEffect } from 'react';
import { ArrowRight, Share2, Database, Globe, AlertCircle, Eye, Filter, Play, Pause } from 'lucide-react';

const DataFlowVisualization = () => {
  const [isLive, setIsLive] = useState(true);
  const [selectedFlow, setSelectedFlow] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [dataFlows, setDataFlows] = useState([]);

  useEffect(() => {
    const mockFlows = [
      {
        id: 1,
        source: 'You',
        destination: 'Jumia Nigeria',
        dataType: 'Personal Info',
        purpose: 'Order Processing',
        timestamp: new Date(),
        status: 'active',
        thirdParties: ['DHL', 'Paystack'],
        retention: '2 years',
        location: 'Lagos, Nigeria'
      },
      {
        id: 2,
        source: 'Jumia Nigeria',
        destination: 'Paystack',
        dataType: 'Payment Data',
        purpose: 'Payment Processing',
        timestamp: new Date(Date.now() - 5000),
        status: 'completed',
        thirdParties: [],
        retention: '7 years',
        location: 'Lagos, Nigeria'
      },
      {
        id: 3,
        source: 'You',
        destination: 'GTBank',
        dataType: 'Financial Data',
        purpose: 'Account Management',
        timestamp: new Date(Date.now() - 10000),
        status: 'active',
        thirdParties: ['NIBSS', 'CBN'],
        retention: '10 years',
        location: 'Victoria Island, Lagos'
      }
    ];

    setDataFlows(mockFlows);

    if (isLive) {
      const interval = setInterval(() => {
        const newFlow = {
          id: Date.now(),
          source: Math.random() > 0.5 ? 'You' : ['Jumia Nigeria', 'GTBank', 'Flutterwave'][Math.floor(Math.random() * 3)],
          destination: ['Jumia Nigeria', 'GTBank', 'Flutterwave', 'Paystack'][Math.floor(Math.random() * 4)],
          dataType: ['Personal Info', 'Financial Data', 'Location Data', 'Behavioral Data'][Math.floor(Math.random() * 4)],
          purpose: ['Order Processing', 'Payment Processing', 'Marketing', 'Analytics'][Math.floor(Math.random() * 4)],
          timestamp: new Date(),
          status: Math.random() > 0.7 ? 'blocked' : 'active',
          thirdParties: Math.random() > 0.5 ? ['Third Party Co.'] : [],
          retention: ['1 year', '2 years', '5 years', '7 years'][Math.floor(Math.random() * 4)],
          location: ['Lagos, Nigeria', 'Abuja, Nigeria', 'Port Harcourt, Nigeria'][Math.floor(Math.random() * 3)]
        };

        setDataFlows(prev => [newFlow, ...prev.slice(0, 19)]);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isLive]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100 border-green-200';
      case 'blocked': return 'text-red-600 bg-red-100 border-red-200';
      case 'completed': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const filteredFlows = dataFlows.filter(flow => {
    if (filterType === 'all') return true;
    return flow.status === filterType;
  });

  return (
    <div className="min-h-screen bg-blue-50 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-3 sm:mb-4">
                Data Flow <span className="text-blue-600">Visualization</span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                Track how your data moves between companies in real-time
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-sm font-semibold text-gray-700">
                  {isLive ? 'Live Tracking' : 'Paused'}
                </span>
              </div>
              <button
                onClick={() => setIsLive(!isLive)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                  isLive 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {isLive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isLive ? 'Pause' : 'Resume'}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <Share2 className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
              <span className="text-lg sm:text-2xl font-black text-gray-900">
                {dataFlows.filter(f => f.status === 'active').length}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Active Flows</h3>
            <p className="text-xs sm:text-sm text-gray-600">Currently transferring</p>
          </div>

          <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <Database className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
              <span className="text-lg sm:text-2xl font-black text-gray-900">
                {dataFlows.filter(f => f.status === 'completed').length}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Completed</h3>
            <p className="text-xs sm:text-sm text-gray-600">Successfully transferred</p>
          </div>

          <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <AlertCircle className="h-4 w-4 sm:h-6 sm:w-6 text-red-600" />
              <span className="text-lg sm:text-2xl font-black text-gray-900">
                {dataFlows.filter(f => f.status === 'blocked').length}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Blocked</h3>
            <p className="text-xs sm:text-sm text-gray-600">Access denied</p>
          </div>

          <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <Globe className="h-4 w-4 sm:h-6 sm:w-6 text-purple-600" />
              <span className="text-lg sm:text-2xl font-black text-gray-900">
                {dataFlows.reduce((acc, f) => acc + f.thirdParties.length, 0)}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900">Third Parties</h3>
            <p className="text-xs sm:text-sm text-gray-600">Involved in transfers</p>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-center gap-4">
            <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 sm:px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            >
              <option value="all">All Flows</option>
              <option value="active">Active Only</option>
              <option value="completed">Completed Only</option>
              <option value="blocked">Blocked Only</option>
            </select>
          </div>
        </div>

        {/* Data Flow Timeline */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
            Live Data <span className="text-blue-600">Flow Timeline</span>
          </h2>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredFlows.map((flow) => (
              <div 
                key={flow.id} 
                className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => setSelectedFlow(flow)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">{flow.source}</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-semibold text-gray-900">{flow.destination}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(flow.status)}`}>
                      {flow.status.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{flow.timestamp.toLocaleTimeString()}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Data Type:</span>
                    <span className="ml-2 text-gray-600">{flow.dataType}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Purpose:</span>
                    <span className="ml-2 text-gray-600">{flow.purpose}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Location:</span>
                    <span className="ml-2 text-gray-600">{flow.location}</span>
                  </div>
                </div>

                {flow.thirdParties.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-semibold text-orange-700">
                        Shared with third parties: {flow.thirdParties.join(', ')}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFlows.length === 0 && (
            <div className="text-center py-12">
              <Share2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No data flows found</h3>
              <p className="text-gray-600">
                {isLive ? 'Waiting for data transfer events...' : 'Monitoring is paused'}
              </p>
            </div>
          )}
        </div>

        {/* Flow Details Modal */}
        {selectedFlow && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Data Flow Details</h3>
                <button
                  onClick={() => setSelectedFlow(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-900">{selectedFlow.source}</span>
                  <ArrowRight className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-gray-900">{selectedFlow.destination}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Data Type:</span>
                    <p className="text-gray-600">{selectedFlow.dataType}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Purpose:</span>
                    <p className="text-gray-600">{selectedFlow.purpose}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Retention:</span>
                    <p className="text-gray-600">{selectedFlow.retention}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Location:</span>
                    <p className="text-gray-600">{selectedFlow.location}</p>
                  </div>
                </div>

                {selectedFlow.thirdParties.length > 0 && (
                  <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-800 mb-2">Third Party Sharing</h4>
                    <ul className="text-sm text-orange-700">
                      {selectedFlow.thirdParties.map((party, index) => (
                        <li key={index}>• {party}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedFlow(null)}
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

export default DataFlowVisualization;