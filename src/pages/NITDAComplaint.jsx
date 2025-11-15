import { useState } from 'react';
import { AlertTriangle, Upload, Send, CheckCircle, X, Menu, Loader2, XCircle, Hash } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const NITDAComplaint = () => {
  const [formData, setFormData] = useState({
    // Complainant Identity
    fullName: '',
    email: '',
    phone: '',
    address: '',
    complaintType: 'individual',
    
    // Respondent Information
    respondentName: '',
    trackingId: '',
    respondentType: 'controller',
    respondentAddress: '',
    sector: '',
    
    // Violation Details
    violationCategory: '',
    dataType: '',
    violationDate: '',
    description: '',
    
    // Impact Assessment
    harmSuffered: '',
    amountLost: '',
    numberAffected: 'just_me',
    
    // Remedy Sought
    remedySought: '',
    
    // Consent
    consentProcessing: false,
    accuracyDeclaration: false
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');
  const [proofFiles, setProofFiles] = useState([]);

  const companies = [
    { value: 'gtbank', label: 'Guaranty Trust Bank (GTBank)' },
    { value: 'access_bank', label: 'Access Bank' },
    { value: 'first_bank', label: 'First Bank of Nigeria' },
    { value: 'zenith_bank', label: 'Zenith Bank' },
    { value: 'uba', label: 'United Bank for Africa (UBA)' },
    { value: 'mtn', label: 'MTN Nigeria' },
    { value: 'airtel', label: 'Airtel Nigeria' },
    { value: 'jumia', label: 'Jumia Nigeria' },
    { value: 'paystack', label: 'Paystack' },
    { value: 'flutterwave', label: 'Flutterwave' },
    { value: 'facebook', label: 'Meta (Facebook)' },
    { value: 'google', label: 'Google Nigeria' },
    { value: 'other', label: 'Other (specify in description)' }
  ];

  const violationCategories = [
    { value: 'unauthorized_access', label: 'Unauthorized Access' },
    { value: 'data_breach', label: 'Data Breach' },
    { value: 'identity_theft', label: 'Identity Theft' },
    { value: 'denial_dsar', label: 'Denial of Data Subject Access Request' },
    { value: 'inaccurate_data', label: 'Inaccurate Data' },
    { value: 'unsolicited_marketing', label: 'Unsolicited Marketing' },
    { value: 'child_data', label: 'Child Data Violation' },
    { value: 'surveillance_abuse', label: 'Surveillance Abuse' },
    { value: 'lack_privacy_policy', label: 'Lack of Privacy Policy' },
    { value: 'other', label: 'Other' }
  ];

  const dataTypes = [
    { value: 'pii', label: 'Personal Identifiable Information (PII)' },
    { value: 'financial', label: 'Financial Data' },
    { value: 'health', label: 'Health Data' },
    { value: 'biometric', label: 'Biometric Data' },
    { value: 'location', label: 'Location Data' },
    { value: 'employment', label: 'Employment Data' },
    { value: 'education', label: 'Education Data' },
    { value: 'communications', label: 'Communications Data' },
    { value: 'child_data', label: 'Child Data' }
  ];

  const harmTypes = [
    { value: 'financial_loss', label: 'Financial Loss' },
    { value: 'reputation', label: 'Reputation Damage' },
    { value: 'health', label: 'Health Impact' },
    { value: 'employment', label: 'Employment Impact' },
    { value: 'none', label: 'No Direct Harm' }
  ];

  const remedyOptions = [
    { value: 'data_deletion', label: 'Data Deletion' },
    { value: 'rectification', label: 'Data Rectification' },
    { value: 'apology', label: 'Public Apology' },
    { value: 'compensation', label: 'Financial Compensation' },
    { value: 'policy_change', label: 'Policy Change' },
    { value: 'investigation', label: 'Full Investigation' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setProofFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setProofFiles(prev => prev.filter((_, i) => i !== index));
  };

  const generateReferenceNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `NDPC-CC-${year}-${month}${day}-${random}-1`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoadingModal(true);
    
    setTimeout(() => {
      setShowLoadingModal(false);
      setShowRejectionModal(true);
    }, 3000);
  };

  const isFormValid = () => {
    return formData.fullName && 
           formData.email && 
           formData.phone && 
           formData.respondentName && 
           formData.violationCategory && 
           formData.dataType && 
           formData.description.length >= 100 && 
           formData.consentProcessing && 
           formData.accuracyDeclaration;
  };

  return (
    <div className="min-h-screen bg-blue-50">


      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="lg:ml-64 p-3 sm:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8 mt-16 lg:mt-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-3 sm:mb-4">
              File NDPR <span className="text-blue-600">Complaint</span>
            </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">
            Report violations of the Nigerian Data Protection Regulation to NITDA
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
          {/* Complainant Identity */}
          <div className="mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-blue-600" />
              Complainant Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-sm sm:text-base"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-sm sm:text-base"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-sm sm:text-base"
                  placeholder="+234 XXX XXX XXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Complaint Type</label>
                <select
                  name="complaintType"
                  value={formData.complaintType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-sm sm:text-base"
                >
                  <option value="individual">Individual</option>
                  <option value="organization">Organization</option>
                  <option value="civil_society">Civil Society</option>
                </select>
              </div>
            </div>
          </div>

          {/* Respondent Information */}
          <div className="mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Respondent Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Company/Organization Name *</label>
                <select
                  name="respondentName"
                  value={formData.respondentName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                >
                  <option value="">Select company/organization...</option>
                  {companies.map(company => (
                    <option key={company.value} value={company.value}>{company.label}</option>
                  ))}
                </select>
              </div>
              {formData.respondentName && (
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Tracking ID</label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="trackingId"
                      value={formData.trackingId}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                      placeholder="TB-XXXXXXXXX"
                    />
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Entity Type</label>
                <select
                  name="respondentType"
                  value={formData.respondentType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-sm sm:text-base"
                >
                  <option value="controller">Data Controller</option>
                  <option value="processor">Data Processor</option>
                  <option value="individual">Individual</option>
                </select>
              </div>
            </div>
          </div>

          {/* Violation Details */}
          <div className="mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Violation Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Violation Category *</label>
                <select
                  name="violationCategory"
                  value={formData.violationCategory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-sm sm:text-base"
                >
                  <option value="">Select violation type...</option>
                  {violationCategories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Data Type Affected *</label>
                <select
                  name="dataType"
                  value={formData.dataType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-sm sm:text-base"
                >
                  <option value="">Select data type...</option>
                  {dataTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-900 mb-2">Date of Violation</label>
              <input
                type="date"
                name="violationDate"
                value={formData.violationDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Detailed Description * (minimum 100 characters)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none resize-none text-sm sm:text-base"
                placeholder="Provide a detailed description of the NDPR violation..."
              />
              <div className="text-xs text-gray-500 mt-1">
                {formData.description.length}/100 characters minimum
              </div>
            </div>

            {/* Proof Upload Section */}
            <div className="mt-6">
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Upload Supporting Evidence
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Upload screenshots, documents, or other proof</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="proof-upload"
                />
                <label
                  htmlFor="proof-upload"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors text-sm"
                >
                  Choose Files
                </label>
              </div>
              
              {proofFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {proofFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="text-sm text-gray-700 truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Impact Assessment */}
          <div className="mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Impact Assessment</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Harm Suffered</label>
                <select
                  name="harmSuffered"
                  value={formData.harmSuffered}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-sm sm:text-base"
                >
                  <option value="">Select harm type...</option>
                  {harmTypes.map(harm => (
                    <option key={harm.value} value={harm.value}>{harm.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Financial Loss (₦)</label>
                <input
                  type="number"
                  name="amountLost"
                  value={formData.amountLost}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-sm sm:text-base"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Remedy Sought */}
          <div className="mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Remedy Sought</h3>
            <select
              name="remedySought"
              value={formData.remedySought}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none text-sm sm:text-base"
            >
              <option value="">Select desired remedy...</option>
              {remedyOptions.map(remedy => (
                <option key={remedy.value} value={remedy.value}>{remedy.label}</option>
              ))}
            </select>
          </div>

          {/* Consent & Declaration */}
          <div className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h4 className="font-bold text-gray-900 mb-4">Consent & Declaration</h4>
            <div className="space-y-3">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="consentProcessing"
                  checked={formData.consentProcessing}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  I consent to NITDA processing my personal data for the purpose of investigating this complaint
                </span>
              </label>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="accuracyDeclaration"
                  checked={formData.accuracyDeclaration}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  I declare that the information provided is accurate and truthful to the best of my knowledge
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Send className="h-5 w-5" />
            Submit Complaint to NITDA
          </button>
          </form>
        </div>
      </div>

      {/* Loading Modal */}
      {showLoadingModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-4">
                Analyzing Complaint
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Please wait while we analyze your complaint and supporting evidence...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {showRejectionModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-4">
                Complaint Cannot Be Processed
              </h2>
              <div className="bg-red-50 rounded-xl p-4 mb-6 text-left">
                <h3 className="font-bold text-red-800 mb-2">Issues Found:</h3>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Insufficient supporting evidence provided</li>
                  <li>• Complaint lacks specific details about the violation</li>
                  <li>• Additional documentation required for processing</li>
                </ul>
              </div>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Please review your complaint, add more detailed evidence, and resubmit with comprehensive supporting documentation.
              </p>
              <button
                onClick={() => setShowRejectionModal(false)}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all text-sm sm:text-base"
              >
                Revise Complaint
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NITDAComplaint;