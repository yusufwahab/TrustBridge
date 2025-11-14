import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, TrendingDown, AlertTriangle, Shield, Target, BarChart3, Lightbulb } from 'lucide-react';

const PrivacyRiskCalculator = () => {
  const [riskScore, setRiskScore] = useState(0);
  const [riskLevel, setRiskLevel] = useState('low');
  const [riskFactors, setRiskFactors] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    calculateRisk();
  }, []);

  const calculateRisk = () => {
    // Mock risk calculation based on user data patterns
    const mockFactors = [
      {
        category: 'Data Sharing',
        risk: 75,
        description: 'High number of companies with access to personal data',
        impact: 'high',
        details: '12 companies have access to your personal information'
      },
      {
        category: 'Consent Management',
        risk: 45,
        description: 'Some consents are permanent without expiry dates',
        impact: 'medium',
        details: '3 companies have permanent access to your data'
      },
      {
        category: 'Data Types',
        risk: 85,
        description: 'Sensitive data types shared with multiple companies',
        impact: 'high',
        details: 'Financial and biometric data shared with 5+ companies'
      },
      {
        category: 'Company Trust',
        risk: 30,
        description: 'Most connected companies have good compliance scores',
        impact: 'low',
        details: 'Average company trust score: 87%'
      },
      {
        category: 'Cross-border Transfers',
        risk: 60,
        description: 'Data being transferred to countries with weaker privacy laws',
        impact: 'medium',
        details: '4 companies transfer your data internationally'
      }
    ];

    const totalRisk = mockFactors.reduce((acc, factor) => acc + factor.risk, 0) / mockFactors.length;
    
    setRiskScore(Math.round(totalRisk));
    setRiskFactors(mockFactors);
    
    if (totalRisk >= 70) setRiskLevel('high');
    else if (totalRisk >= 40) setRiskLevel('medium');
    else setRiskLevel('low');

    // Generate recommendations based on risk factors
    const mockRecommendations = [
      {
        priority: 'high',
        action: 'Revoke consent for non-essential data sharing',
        impact: 'Reduce risk by 25 points',
        effort: 'Easy',
        category: 'Data Sharing'
      },
      {
        priority: 'high',
        action: 'Set expiry dates for permanent consents',
        impact: 'Reduce risk by 15 points',
        effort: 'Easy',
        category: 'Consent Management'
      },
      {
        priority: 'medium',
        action: 'Review companies with access to financial data',
        impact: 'Reduce risk by 20 points',
        effort: 'Medium',
        category: 'Data Types'
      },
      {
        priority: 'low',
        action: 'Monitor cross-border data transfers',
        impact: 'Reduce risk by 10 points',
        effort: 'Easy',
        category: 'Cross-border Transfers'
      }
    ];

    setRecommendations(mockRecommendations);

    // Mock historical data
    const mockHistory = [
      { date: '2024-01-01', score: 45 },
      { date: '2024-01-15', score: 52 },
      { date: '2024-02-01', score: 48 },
      { date: '2024-02-15', score: 65 },
      { date: '2024-03-01', score: totalRisk }
    ];

    setHistoricalData(mockHistory);
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-3 sm:mb-4">
            Privacy Risk <span className="text-blue-600">Calculator</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">
            Assess and monitor your personal privacy risks across all data sharing
          </p>
        </div>

        {/* Risk Score Overview */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-6 sm:mb-8">
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke={riskLevel === 'high' ? '#dc2626' : riskLevel === 'medium' ? '#ea580c' : '#16a34a'}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(riskScore / 100) * 251.2} 251.2`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-black text-gray-900">{riskScore}</div>
                    <div className="text-xs sm:text-sm text-gray-600">Risk Score</div>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Your Privacy Risk Level
            </h2>
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold border ${getRiskColor(riskLevel)}`}>
              {riskLevel.toUpperCase()} RISK
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <Calculator className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-900">Risk Factors</div>
              <div className="text-sm text-gray-600">{riskFactors.length} categories analyzed</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <Target className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-900">Recommendations</div>
              <div className="text-sm text-gray-600">{recommendations.length} actions suggested</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-gray-900">Trend</div>
              <div className="text-sm text-gray-600">
                {historicalData.length > 1 && historicalData[historicalData.length - 1].score > historicalData[historicalData.length - 2].score ? 'Increasing' : 'Decreasing'}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Risk Factors */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Risk Factor Analysis</h3>
            <div className="space-y-4">
              {riskFactors.map((factor, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{factor.category}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getImpactColor(factor.impact)} bg-opacity-20`}>
                      {factor.impact.toUpperCase()}
                    </span>
                  </div>
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Risk Level</span>
                      <span className="text-sm font-semibold text-gray-900">{factor.risk}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          factor.risk >= 70 ? 'bg-red-500' : 
                          factor.risk >= 40 ? 'bg-orange-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${factor.risk}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{factor.description}</p>
                  <p className="text-xs text-gray-500">{factor.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Improvement Recommendations</h3>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(rec.priority)}`}>
                        {rec.priority.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{rec.effort}</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{rec.action}</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Impact:</span>
                      <span className="ml-2 font-semibold text-green-600">{rec.impact}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Category:</span>
                      <span className="ml-2 text-gray-900">{rec.category}</span>
                    </div>
                  </div>
                  <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm">
                    Apply Recommendation
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Trend Chart */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mt-6 sm:mt-8">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Risk Trend Analysis
          </h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {historicalData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-full rounded-t ${
                    data.score >= 70 ? 'bg-red-500' : 
                    data.score >= 40 ? 'bg-orange-500' : 'bg-green-500'
                  }`}
                  style={{ height: `${(data.score / 100) * 200}px` }}
                ></div>
                <div className="mt-2 text-xs text-gray-600 text-center">
                  {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="text-xs font-semibold text-gray-900">{data.score}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mt-6 sm:mt-8">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Quick Risk Reduction Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Shield className="h-5 w-5 text-green-600" />
              <div className="text-left">
                <div className="font-semibold text-gray-900">Review Consents</div>
                <div className="text-xs text-gray-600">Check all permissions</div>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div className="text-left">
                <div className="font-semibold text-gray-900">Audit Data Sharing</div>
                <div className="text-xs text-gray-600">Review shared data</div>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <TrendingDown className="h-5 w-5 text-blue-600" />
              <div className="text-left">
                <div className="font-semibold text-gray-900">Reduce Exposure</div>
                <div className="text-xs text-gray-600">Minimize data sharing</div>
              </div>
            </button>
            <button 
              onClick={calculateRisk}
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Calculator className="h-5 w-5 text-purple-600" />
              <div className="text-left">
                <div className="font-semibold text-gray-900">Recalculate Risk</div>
                <div className="text-xs text-gray-600">Update assessment</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyRiskCalculator;