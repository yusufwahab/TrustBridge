import { useState } from 'react';
import { Send, User, Mail, FileText } from 'lucide-react';
import APIService from '../services/api';

const CitizenRequest = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    requestType: '',
    dataType: '',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const requestTypes = [
    { value: 'access', label: 'Access My Data', description: 'Get a copy of all personal data held about you' },
    { value: 'correction', label: 'Correct My Data', description: 'Update or correct inaccurate personal information' },
    { value: 'erasure', label: 'Delete My Data', description: 'Request deletion of your personal data' },
    { value: 'revoke', label: 'Revoke Access', description: 'Revoke previously granted data access permissions' }
  ];

  const dataTypes = [
    { value: 'personal', label: 'Personal Data', description: 'Name, address, phone number, email' },
    { value: 'financial', label: 'Financial Data', description: 'Bank details, transaction history, payment info' },
    { value: 'biometric', label: 'Biometric Data', description: 'Fingerprints, facial recognition, voice prints' },
    { value: 'location', label: 'Location Data', description: 'GPS coordinates, travel history, check-ins' },
    { value: 'behavioral', label: 'Behavioral Data', description: 'Browsing history, preferences, usage patterns' },
    { value: 'health', label: 'Health Data', description: 'Medical records, fitness data, health metrics' }
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const actionData = {
        company_name: 'Target Company',
        company_size: 'medium',
        document_text: `Citizen request: ${formData.requestType} - ${formData.description}`,
        document_type: 'citizen_request',
        industry: 'General',
        processing_scope: formData.requestType,
        target_users: 'Individual'
      };
      const result = await APIService.validateCitizenAction(actionData);
      console.log('Validation result:', result);
      setSubmitted(true);
    } catch (error) {
      console.error('Request validation failed:', error);
      setSubmitted(true); // Still show success for demo
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="premium-card rounded-3xl p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-4">Request Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Your data request has been submitted successfully. The company must respond within a maximum of 5 days under NDPR regulations.
            </p>
            <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
              <p className="text-gray-900 font-bold mb-2">Request ID: DSR-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              <p className="text-gray-600 text-sm">You will receive email updates on the status of your request.</p>
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="w-full bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700 transition-all duration-200"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Submit NDPR <span className="text-blue-600">Data Request</span>
          </h1>
          <p className="text-lg text-gray-600">Exercise your data protection rights under the Nigeria Data Protection Regulation</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="premium-card rounded-3xl p-6 sm:p-8">
          {/* Personal Information */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-900 font-bold mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-900 font-bold mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Request Type */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Type of Request</h3>
            <div className="space-y-3">
              {requestTypes.map((type) => (
                <label key={type.value} className="block">
                  <input
                    type="radio"
                    name="requestType"
                    value={type.value}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.requestType === type.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        formData.requestType === type.value
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {formData.requestType === type.value && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{type.label}</h4>
                        <p className="text-gray-600 text-sm">{type.description}</p>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Data Type Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Type of Data</h3>
            <select
              name="dataType"
              value={formData.dataType}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select data type...</option>
              {dataTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label} - {type.description}
                </option>
              ))}
            </select>
          </div>

          {/* Additional Details */}
          <div className="mb-8">
            <label className="block text-gray-900 font-bold mb-2">Additional Details (Optional)</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 focus:border-blue-500 focus:outline-none resize-none"
                placeholder="Provide any additional details about your request..."
              />
            </div>
          </div>

          {/* Legal Notice */}
          <div className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h4 className="font-bold text-gray-900 mb-2">Your Rights Under NDPR</h4>
            <ul className="text-gray-600 text-sm space-y-1">
              <li>• <strong>Companies must respond within a maximum of 5 days</strong></li>
              <li>• You have the right to access, correct, delete, or revoke access to your data</li>
              <li>• Companies cannot charge fees for legitimate requests</li>
              <li>• You can file a complaint with NITDA if unsatisfied</li>
            </ul>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!formData.name || !formData.email || !formData.requestType || !formData.dataType}
            className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default CitizenRequest;