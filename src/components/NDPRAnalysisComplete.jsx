import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, Eye, Download, Volume2, VolumeX } from 'lucide-react';

const NDPRAnalysisComplete = ({ analysisResult, onClose, onViewReport, onNewAnalysis }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const mockResult = analysisResult || {
    compliance_score: 72,
    risk_level: 'medium',
    issues: [
      {
        severity: 'high',
        type: 'data_retention',
        title: 'DATA RETENTION',
        description: 'No clear data retention policy specified. NDPR requires explicit retention periods for all data categories.'
      },
      {
        severity: 'medium',
        type: 'consent',
        title: 'CONSENT MECHANISM',
        description: 'Consent mechanism needs explicit user approval. Current implementation may not meet NDPR standards.'
      },
      {
        severity: 'low',
        type: 'transparency',
        title: 'TRANSPARENCY',
        description: 'Additional transparency about third-party sharing recommended to enhance user understanding.'
      }
    ]
  };

  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'high':
        return { bg: 'bg-red-100', border: 'border-red-200', icon: 'text-red-600', text: 'text-red-700' };
      case 'medium':
        return { bg: 'bg-yellow-100', border: 'border-yellow-200', icon: 'text-yellow-600', text: 'text-yellow-700' };
      default:
        return { bg: 'bg-blue-100', border: 'border-blue-200', icon: 'text-blue-600', text: 'text-blue-700' };
    }
  };

  const getRiskConfig = (risk) => {
    switch (risk) {
      case 'low':
        return { bg: 'bg-green-100', text: 'text-green-800' };
      case 'high':
        return { bg: 'bg-red-100', text: 'text-red-800' };
      default:
        return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
    }
  };

  const getIssueCounts = () => {
    const critical = mockResult.issues.filter(i => i.severity === 'high').length;
    const warnings = mockResult.issues.filter(i => i.severity === 'medium').length;
    const info = mockResult.issues.filter(i => i.severity === 'low').length;
    return { critical, warnings, info };
  };

  const counts = getIssueCounts();
  const riskConfig = getRiskConfig(mockResult.risk_level);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
        <div className="p-8 space-y-8">
          
          {/* Header Section */}
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              NDPR Analysis <span className="text-blue-600">Complete</span>
            </h2>
            <p className="text-gray-600">Your privacy policy has been thoroughly analyzed against NDPR requirements</p>
          </div>

          {/* Score Display Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-200">
            <div className="grid grid-cols-3 gap-8 items-center">
              <div className="text-center">
                <div className="text-5xl font-black text-blue-600 mb-2">{mockResult.compliance_score}%</div>
                <div className="text-sm font-semibold text-gray-600">NDPR Compliance Score</div>
              </div>
              <div className="flex justify-center">
                <div className="w-px h-16 bg-gray-300"></div>
              </div>
              <div className="text-center">
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${riskConfig.bg} ${riskConfig.text} mb-2`}>
                  {mockResult.risk_level.toUpperCase()} RISK
                </div>
                <div className="text-sm font-semibold text-gray-600">Risk Assessment</div>
              </div>
            </div>
          </div>

          {/* Issues Found Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-gray-900">AI-Identified Issues</h3>
            <div className="space-y-4">
              {mockResult.issues.map((issue, index) => {
                const config = getSeverityConfig(issue.severity);
                return (
                  <div key={index} className="bg-white border border-gray-200 rounded-3xl p-6 hover:border-blue-300 transition-colors duration-200">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${config.bg}`}>
                        <AlertTriangle className={`h-5 w-5 ${config.icon}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2">{issue.title}</h4>
                        <p className="text-gray-600 leading-relaxed">{issue.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary Stats Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
              <div className="text-2xl font-black text-red-600 mb-1">{counts.critical}</div>
              <div className="text-sm font-semibold text-red-700">Critical Issues</div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
              <div className="text-2xl font-black text-yellow-600 mb-1">{counts.warnings}</div>
              <div className="text-sm font-semibold text-yellow-700">Warnings</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
              <div className="text-2xl font-black text-blue-600 mb-1">{counts.info}</div>
              <div className="text-sm font-semibold text-blue-700">Info Items</div>
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className="space-y-4">
            <div className="flex gap-4">
              <button 
                onClick={onViewReport}
                className="flex-1 flex items-center justify-center gap-3 p-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all duration-200"
              >
                <Eye className="h-5 w-5" />
                View Full NDPR Compliance Report
              </button>
              <button className="p-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-all duration-200">
                <Download className="h-5 w-5" />
              </button>
            </div>
            
            <button 
              onClick={() => setIsSpeaking(!isSpeaking)}
              className="w-full flex items-center justify-center gap-3 p-4 bg-green-100 text-green-700 rounded-2xl font-bold hover:bg-green-200 transition-all duration-200"
            >
              {isSpeaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              {isSpeaking ? 'Stop Reading Results' : 'Read Analysis Results'}
            </button>
            
            <button 
              onClick={onNewAnalysis}
              className="w-full p-4 bg-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-300 transition-all duration-200"
            >
              Analyze Another Policy
            </button>
          </div>

          {/* Footer Note */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
            <p className="text-blue-700">
              <span className="font-bold">Next Steps:</span> Review the detailed report and implement recommended changes to improve your NDPR compliance score.
            </p>
          </div>

          {/* Close Button */}
          <div className="text-center">
            <button 
              onClick={onClose}
              className="px-6 py-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NDPRAnalysisComplete;