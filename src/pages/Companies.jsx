import { Link } from 'react-router-dom';
import { Building2, MapPin, Star, Shield, TrendingUp, Users, Award, CheckCircle, Loader2, Check, AlertCircle } from 'lucide-react';
import { useState } from 'react';

// Import company assets
import JumiaLogo from '../assets/Jumia_logo.jpg';
import JumiaBuild from '../assets/Jumia_build.jpeg';
import FlutterwaveLogo from '../assets/Flutterwave_logo.png';
import FlutterwaveBuild from '../assets/Flutterwave_build.jpg';
import PaystackLogo from '../assets/Paystack_logo.png';
import PaystackBuild from '../assets/Paystack_build.jpg';
import KudaLogo from '../assets/Kuda_logo.png';
import KudaBuild from '../assets/Kuda_build.jpg';
import InterswitchLogo from '../assets/interswitch_logo.jpg';
import InterswitchBuild from '../assets/Interswitch_build.png';
import GTBankLogo from '../assets/Gtbank_logo.png';
import GTBankBuild from '../assets/GTBank_building.jpeg';

const Companies = () => {
  const [connectionModal, setConnectionModal] = useState(null);
  const [connectionStep, setConnectionStep] = useState(1);
  const [foundData, setFoundData] = useState(null);
  const [trackingId, setTrackingId] = useState(null);

  const companies = [
    {
      id: 1,
      name: 'Jumia Nigeria',
      description: 'Africa\'s leading e-commerce platform connecting millions of consumers and sellers',
      industry: 'E-commerce',
      location: 'Lagos, Nigeria',
      complianceScore: 92,
      logo: JumiaLogo,
      buildImage: JumiaBuild,
      employees: '5,000+',
      founded: '2012',
      verified: true
    },
    {
      id: 2,
      name: 'Flutterwave',
      description: 'Leading fintech company providing payment infrastructure for global merchants',
      industry: 'Fintech',
      location: 'Lagos, Nigeria',
      complianceScore: 95,
      logo: FlutterwaveLogo,
      buildImage: FlutterwaveBuild,
      employees: '1,000+',
      founded: '2016',
      verified: true
    },
    {
      id: 3,
      name: 'Paystack',
      description: 'Modern online and offline payments for Africa, now part of Stripe',
      industry: 'Fintech',
      location: 'Lagos, Nigeria',
      complianceScore: 94,
      logo: PaystackLogo,
      buildImage: PaystackBuild,
      employees: '500+',
      founded: '2015',
      verified: true
    },
    {
      id: 4,
      name: 'Kuda Bank',
      description: 'Digital-first bank built for Africans, offering seamless banking experience',
      industry: 'Banking',
      location: 'Lagos, Nigeria',
      complianceScore: 89,
      logo: KudaLogo,
      buildImage: KudaBuild,
      employees: '300+',
      founded: '2019',
      verified: true
    },
    {
      id: 5,
      name: 'Interswitch',
      description: 'Integrated digital payments and commerce company across Africa',
      industry: 'Fintech',
      location: 'Lagos, Nigeria',
      complianceScore: 87,
      logo: InterswitchLogo,
      buildImage: InterswitchBuild,
      employees: '2,000+',
      founded: '2002',
      verified: true
    },
    {
      id: 6,
      name: 'GTBank',
      description: 'Leading financial institution providing innovative banking solutions',
      industry: 'Banking',
      location: 'Lagos, Nigeria',
      complianceScore: 91,
      logo: GTBankLogo,
      buildImage: GTBankBuild,
      employees: '10,000+',
      founded: '1990',
      verified: true
    }
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 90) return 'bg-emerald-100';
    if (score >= 80) return 'bg-blue-100';
    if (score >= 70) return 'bg-amber-100';
    return 'bg-red-100';
  };

  function handleConnect(company) {
    setConnectionModal(company);
    setConnectionStep(1);
  }

  function handleConsent() {
    setConnectionStep(2);
    setTimeout(() => {
      const mockData = {
        count: 9,
        types: ['Personal Information', 'Purchase History', 'Location Data', 'Device Information', 'Preferences']
      };
      setFoundData(mockData);
      setConnectionStep(3);
    }, 3000);
  }

  function generateTrackingId() {
    const id = 'TB-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setTrackingId(id);
    setConnectionStep(4);
  }

  function navigateToTracking() {
    window.location.href = `/tracking/${trackingId}?company=${connectionModal.name}`;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 py-12 sm:py-20">
          <div className="text-center">
            <div className="inline-flex items-center px-3 py-1 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              NDPR Compliant
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 tracking-tight">
              Trusted <span className="text-blue-300">Companies</span>
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed px-4">
              Discover companies committed to data protection.
            </p>
            <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link 
                to="/register-company"
                className="inline-flex items-center px-4 py-3 sm:px-6 sm:py-4 bg-white text-blue-600 rounded-xl sm:rounded-2xl font-bold hover:bg-gray-100 transition-all duration-200 text-sm sm:text-base"
              >
                <Building2 className="h-4 w-4 mr-2" />
                Register Company
              </Link>
              <Link 
                to="/connect-company"
                className="inline-flex items-center px-4 py-3 sm:px-6 sm:py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl sm:rounded-2xl font-semibold hover:bg-white/30 transition-all duration-200 border border-white/30 text-sm sm:text-base"
              >
                <Users className="h-4 w-4 mr-2" />
                Connect
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-20 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-8 sm:py-16">
        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-8 sm:mb-16">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-blue-600 mb-1 sm:mb-2">1,247</div>
            <div className="text-gray-600 font-medium text-xs sm:text-sm">Companies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-600 mb-1 sm:mb-2">89%</div>
            <div className="text-gray-600 font-medium text-xs sm:text-sm">Compliance</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-purple-600 mb-1 sm:mb-2">2.4M</div>
            <div className="text-gray-600 font-medium text-xs sm:text-sm">Connections</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-orange-600 mb-1 sm:mb-2">24/7</div>
            <div className="text-gray-600 font-medium text-xs sm:text-sm">Monitoring</div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="premium-card rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-12">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search companies..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white transition-all duration-200 text-sm sm:text-base"
              />
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <div className="flex gap-2 sm:gap-3">
              <select className="flex-1 px-3 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 font-medium text-sm">
                <option>Industry</option>
                <option>Fintech</option>
                <option>Banking</option>
              </select>
              <select className="flex-1 px-3 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 font-medium text-sm">
                <option>Location</option>
                <option>Lagos</option>
                <option>Abuja</option>
              </select>
            </div>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {companies.map((company) => (
            <div key={company.id} className="group premium-card rounded-xl sm:rounded-2xl overflow-hidden">
              {/* Company Header with Building Background */}
              <div className="relative p-4 sm:p-6 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)), url(${company.buildImage})`}}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden shadow-lg bg-white p-2 border-2 border-white">
                      <img 
                        src={company.logo} 
                        alt={`${company.name} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    {company.verified && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                        <CheckCircle className="h-3 w-3 text-blue-600" />
                        <span className="text-xs font-semibold text-gray-700">Verified</span>
                      </div>
                    )}
                  </div>
                  <div className={`px-2 sm:px-3 py-1 sm:py-2 ${getScoreBg(company.complianceScore)} rounded-xl`}>
                    <div className={`text-lg sm:text-xl font-black ${getScoreColor(company.complianceScore)}`}>
                      {company.complianceScore}%
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-2">{company.name}</h3>
                <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">{company.location}</span>
                    <span className="sm:hidden">Lagos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                    {company.employees}
                  </div>
                </div>
              </div>

              {/* Company Details */}
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                    {company.industry}
                  </span>
                  <span className="text-sm text-gray-500">Founded {company.founded}</span>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base line-clamp-2">{company.description}</p>
                
                {/* Compliance Indicators */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold text-gray-600">NDPR</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <Award className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold text-gray-600">Certified</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 mx-auto mb-1" />
                    <div className="text-xs font-semibold text-gray-600">Live</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 sm:gap-3">
                  <button 
                    onClick={() => handleConnect(company)}
                    className="flex-1 px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white text-center rounded-xl font-bold hover:bg-blue-700 transition-all duration-200 text-sm sm:text-base"
                  >
                    Connect
                  </button>
                  <button className="px-3 py-2 sm:px-4 sm:py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all duration-200">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="premium-card rounded-3xl p-12 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="max-w-3xl mx-auto">
              <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 floating">
                <Building2 className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-6">
                Ready to Join the Platform?
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Register your company on TrustBridge and showcase your commitment to data protection and transparency.
              </p>
              <Link 
                to="/register-company"
                className="inline-flex items-center px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <Building2 className="h-6 w-6 mr-3" />
                Register Your Company
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Connection Modal */}
      {connectionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 transform transition-all shadow-2xl">
            {connectionStep === 1 && (
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Connect to {connectionModal.name}</h3>
                <p className="text-gray-600 mb-6">Give TrustBridge consent to access and scan your data with {connectionModal.name} to ensure transparency.</p>
                <div className="space-y-3">
                  <button 
                    onClick={handleConsent}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
                  >
                    Grant Consent
                  </button>
                  <button 
                    onClick={() => setConnectionModal(null)}
                    className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {connectionStep === 2 && (
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Sending Connection Request</h3>
                <p className="text-gray-600 mb-4">Connecting to {connectionModal.name}...</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                </div>
              </div>
            )}

            {connectionStep === 3 && foundData && (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Data Found!</h3>
                <p className="text-gray-600 mb-4">We found <span className="font-bold text-blue-600">{foundData.count} data entries</span> that {connectionModal.name} possesses about you.</p>
                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <div className="text-sm text-gray-600 space-y-1">
                    {foundData.types.map((type, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>{type}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button 
                  onClick={generateTrackingId}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
                >
                  Generate Tracking ID
                </button>
              </div>
            )}

            {connectionStep === 4 && trackingId && (
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Tracking ID Generated</h3>
                <p className="text-gray-600 mb-4">Your tracking ID has been created. You'll be redirected to store it securely.</p>
                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <div className="text-lg font-mono font-bold text-gray-900">{trackingId}</div>
                </div>
                <button 
                  onClick={navigateToTracking}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
                >
                  Continue to Tracking Page
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Companies;