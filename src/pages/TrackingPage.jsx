import React from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Shield, Copy, AlertTriangle, CheckCircle, Eye, Download } from 'lucide-react';
import { useState } from 'react';

const TrackingPage = () => {
  const { trackingId } = useParams();
  const [searchParams] = useSearchParams();
  const companyName = searchParams.get('company');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTrackingReport = () => {
    const reportData = {
      trackingId: trackingId,
      company: companyName,
      connectionDate: new Date().toLocaleDateString(),
      dataEntriesFound: 9,
      dataTypes: ['Personal Information', 'Purchase History', 'Location Data', 'Device Information', 'Preferences'],
      status: 'Active'
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `TrustBridge_Tracking_Report_${trackingId}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🎉 Connection Successful!
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your data tracking with <span className="font-semibold text-blue-600">{companyName}</span> has been established. 
            Keep this tracking ID safe for future reference.
          </p>
        </div>

        {/* Tracking ID Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-blue-100">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Tracking ID</h2>
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-6 mb-6">
              <div className="text-3xl font-mono font-bold text-gray-900 mb-4 tracking-wider">
                {trackingId}
              </div>
              <button 
                onClick={copyToClipboard}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                <Copy className="h-4 w-4 mr-2" />
                {copied ? 'Copied!' : 'Copy ID'}
              </button>
            </div>
            
            {/* Warning Box */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div className="text-left">
                  <h3 className="font-semibold text-amber-800 mb-1">Important Notice</h3>
                  <p className="text-sm text-amber-700">
                    Keep this tracking ID secure. You'll need it to report any data breaches or 
                    privacy concerns related to your data with {companyName}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connection Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-bold text-gray-900">Connection Status</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Company:</span>
                <span className="font-semibold">{companyName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Data Entries Found:</span>
                <span className="font-semibold text-blue-600">9 entries</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Connection Date:</span>
                <span className="font-semibold">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                  Active
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">Data Types Tracked</h3>
            </div>
            <div className="space-y-2">
              {['Personal Information', 'Purchase History', 'Location Data', 'Device Information', 'Preferences'].map((type, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <button 
            onClick={downloadTrackingReport}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
          >
            <Download className="h-4 w-4" />
            Download Report
          </button>
          <button 
            onClick={goToDashboard}
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all"
          >
            <Eye className="h-4 w-4" />
            View Dashboard
          </button>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">What's Next?</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Monitor Usage</h4>
              <p className="text-sm text-gray-600">Track how {companyName} uses your data in real-time</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Stay Informed</h4>
              <p className="text-sm text-gray-600">Receive notifications about data processing activities</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Report Issues</h4>
              <p className="text-sm text-gray-600">Use your tracking ID to report any privacy concerns</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Need help? Contact our support team with your tracking ID.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all">
              Contact Support
            </button>
            <button 
              onClick={goToDashboard}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;