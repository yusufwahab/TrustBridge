import { Link } from 'react-router-dom';
import { Upload, Award, Shield, AlertTriangle, CheckCircle, Clock, FileText, Building2, TrendingUp, Users, Zap, Eye, Bell, Activity, Calendar, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import APIService from '../services/api';

// Import company logos
import JumiaLogo from '../assets/Jumia_logo.jpg';
import FlutterwaveLogo from '../assets/Flutterwave_logo.png';
import PaystackLogo from '../assets/Paystack_logo.png';
import KudaLogo from '../assets/Kuda_logo.png';
import GTBankLogo from '../assets/Gtbank_logo.png';
import InterswitchLogo from '../assets/interswitch_logo.jpg';

const Dashboard = () => {
  const { user, loading } = useUser();
  const [userName, setUserName] = useState('');
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await APIService.getCurrentUser();
        setUserName(userData.name || userData.fullName || userData.firstName || 'User');
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setUserName('User');
      } finally {
        setUserLoading(false);
      }
    };

    if (localStorage.getItem('authToken')) {
      fetchUserData();
    } else {
      setUserLoading(false);
    }
  }, []);

  const complianceScore = 78;
  const pendingRequests = 3;
  const totalCompanies = 5;
  const certificateStatus = 'Active';
  
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({ passed: 0, warnings: 0, critical: 0 });
  const [animatedQuickStats, setAnimatedQuickStats] = useState({ score: 0, companies: 0, requests: 0 });
  const [notifications] = useState(3);

  useEffect(() => {
    // Animate compliance score
    const scoreTimer = setTimeout(() => {
      let current = 0;
      const increment = complianceScore / 60;
      const scoreInterval = setInterval(() => {
        current += increment;
        if (current >= complianceScore) {
          setAnimatedScore(complianceScore);
          clearInterval(scoreInterval);
        } else {
          setAnimatedScore(current);
        }
      }, 25);
    }, 500);

    // Animate overview stats
    const statsTimer = setTimeout(() => {
      const statsInterval = setInterval(() => {
        setAnimatedStats(prev => {
          const newStats = {
            passed: Math.min(prev.passed + 1, 12),
            warnings: Math.min(prev.warnings + 1, 3),
            critical: Math.min(prev.critical + 1, 2)
          };
          if (newStats.passed === 12 && newStats.warnings === 3 && newStats.critical === 2) {
            clearInterval(statsInterval);
          }
          return newStats;
        });
      }, 100);
    }, 1000);

    // Animate quick stats cards
    const quickStatsTimer = setTimeout(() => {
      const quickInterval = setInterval(() => {
        setAnimatedQuickStats(prev => {
          const newStats = {
            score: Math.min(prev.score + 2, complianceScore),
            companies: Math.min(prev.companies + 1, totalCompanies),
            requests: Math.min(prev.requests + 1, pendingRequests)
          };
          if (newStats.score === complianceScore && newStats.companies === totalCompanies && newStats.requests === pendingRequests) {
            clearInterval(quickInterval);
          }
          return newStats;
        });
      }, 50);
    }, 200);

    return () => {
      clearTimeout(scoreTimer);
      clearTimeout(statsTimer);
      clearTimeout(quickStatsTimer);
    };
  }, [complianceScore, totalCompanies, pendingRequests]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-3 sm:px-6 py-4 sm:py-8">
        {/* Welcome Header */}
        <div className="mb-4 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <div>
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-1 sm:mb-2">
                Welcome, <span className="text-blue-600">{userLoading ? 'Loading...' : userName}</span>
              </h1>
              <p className="text-sm sm:text-lg text-gray-600">Manage <span className="text-blue-600 font-semibold">NDPR</span> <span className="text-blue-600 font-semibold">compliance</span></p>
            </div>
            <Link to="/notifications" className="relative p-2 sm:p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 self-start sm:self-auto">
              <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {notifications}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-8">
          <div className="premium-card rounded-xl sm:rounded-2xl p-3 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-l-2 sm:border-l-4 border-blue-500">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-4">
              <div className="p-2 sm:p-3 bg-blue-600 rounded-lg sm:rounded-xl mb-2 sm:mb-0 self-start">
                <Shield className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-left sm:text-right">
                <div className="text-lg sm:text-2xl lg:text-3xl font-black text-gray-900">{Math.round(animatedQuickStats.score)}%</div>
                <div className="text-xs sm:text-sm font-semibold text-blue-600">Score</div>
              </div>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-1 sm:h-2">
              <div 
                className="bg-blue-600 h-1 sm:h-2 rounded-full transition-all duration-1000" 
                style={{ width: `${animatedQuickStats.score}%` }}
              ></div>
            </div>
          </div>
          
          <div className="premium-card rounded-xl sm:rounded-2xl p-3 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-l-2 sm:border-l-4 border-blue-500">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-4">
              <div className="p-2 sm:p-3 bg-blue-600 rounded-lg sm:rounded-xl mb-2 sm:mb-0 self-start">
                <Building2 className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-left sm:text-right">
                <div className="text-lg sm:text-2xl lg:text-3xl font-black text-gray-900">{animatedQuickStats.companies}</div>
                <div className="text-xs sm:text-sm font-semibold text-blue-600">Companies</div>
              </div>
            </div>
          </div>

          <div className="premium-card rounded-xl sm:rounded-2xl p-3 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-l-2 sm:border-l-4 border-blue-500">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-4">
              <div className="p-2 sm:p-3 bg-blue-600 rounded-lg sm:rounded-xl mb-2 sm:mb-0 self-start">
                <Clock className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-left sm:text-right">
                <div className="text-lg sm:text-2xl lg:text-3xl font-black text-gray-900">{animatedQuickStats.requests}</div>
                <div className="text-xs sm:text-sm font-semibold text-blue-600">Requests</div>
              </div>
            </div>
          </div>

          <div className="premium-card rounded-xl sm:rounded-2xl p-3 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-l-2 sm:border-l-4 border-blue-500">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-4">
              <div className="p-2 sm:p-3 bg-blue-600 rounded-lg sm:rounded-xl mb-2 sm:mb-0 self-start">
                <Award className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-left sm:text-right">
                <div className="text-sm sm:text-lg lg:text-xl font-black text-gray-900">{certificateStatus}</div>
                <div className="text-xs sm:text-sm font-semibold text-blue-600">Status</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-3 sm:gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-6">
            {/* Compliance Overview */}
            <div className="premium-card rounded-xl sm:rounded-2xl p-4 sm:p-8">
              <h2 className="text-lg sm:text-2xl font-black text-gray-900 mb-4 sm:mb-6">
                Compliance <span className="text-blue-600">Overview</span>
              </h2>
              
              <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-8 mb-4 sm:mb-8">
                <div className="relative w-20 h-20 sm:w-32 sm:h-32 mx-auto">
                  <svg className="w-20 h-20 sm:w-32 sm:h-32 transform -rotate-90" viewBox="0 0 160 160">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="#3b82f6"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 70}`}
                      strokeDashoffset={`${2 * Math.PI * 70 * (1 - animatedScore / 100)}`}
                      className="transition-all duration-1000 ease-out"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center bg-white rounded-full w-16 h-16 sm:w-24 sm:h-24 flex flex-col items-center justify-center shadow-lg">
                      <span className="text-sm sm:text-xl font-black text-blue-600">{Math.round(animatedScore)}</span>
                      <span className="text-xs text-gray-500 font-semibold">/100</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-lg sm:text-xl font-black text-blue-600 mb-2">Good Progress!</h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4">Address remaining issues for full compliance.</p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <Link 
                      to="/policy-upload" 
                      className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <Upload className="h-4 w-4" />
                      Upload
                    </Link>
                    <Link 
                      to="/remediation" 
                      className="px-4 py-2 sm:px-6 sm:py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <Zap className="h-4 w-4" />
                      Fix Issues
                    </Link>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div className="text-center p-3 sm:p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 mx-auto mb-2" />
                  <div className="text-lg sm:text-2xl font-black text-gray-900 mb-1">{animatedStats.passed}</div>
                  <div className="text-xs sm:text-sm font-semibold text-emerald-600">Passed</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600 mx-auto mb-2" />
                  <div className="text-lg sm:text-2xl font-black text-gray-900 mb-1">{animatedStats.warnings}</div>
                  <div className="text-xs sm:text-sm font-semibold text-amber-600">Warnings</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-red-50 rounded-xl border border-red-200">
                  <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 mx-auto mb-2" />
                  <div className="text-lg sm:text-2xl font-black text-gray-900 mb-1">{animatedStats.critical}</div>
                  <div className="text-xs sm:text-sm font-semibold text-red-600">Critical</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="premium-card rounded-xl sm:rounded-2xl p-4 sm:p-8">
              <h2 className="text-lg sm:text-2xl font-black text-gray-900 mb-4 sm:mb-6">
                Recent <span className="text-blue-600">Activity</span>
              </h2>
              <div className="space-y-4">
                {[
                  {
                    icon: Shield,
                    title: 'Policy Analysis Completed',
                    description: 'NDPR compliance analysis finished for TechCorp Nigeria Ltd',
                    time: '2 hours ago',
                    color: 'blue'
                  },
                  {
                    icon: CheckCircle,
                    title: 'Data Request Processed',
                    description: 'Successfully processed data access request from citizen',
                    time: '5 hours ago',
                    color: 'green'
                  },
                  {
                    icon: Building2,
                    title: 'New Company Connected',
                    description: 'Paystack has been added to your data connections',
                    time: '1 day ago',
                    color: 'purple'
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      activity.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      activity.color === 'green' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      <activity.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{activity.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{activity.description}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link 
                to="/action-history" 
                className="block mt-6 text-center px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
              >
                View Full History
              </Link>
            </div>

            {/* Data Usage Insights */}
            <div className="premium-card rounded-xl sm:rounded-2xl p-4 sm:p-8">
              <h2 className="text-lg sm:text-2xl font-black text-gray-900 mb-4 sm:mb-6">
                Data Usage <span className="text-blue-600">Insights</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Globe className="h-6 w-6 text-blue-600" />
                    <h3 className="font-bold text-gray-900">Most Active Company</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <img src={JumiaLogo} alt="Jumia" className="w-8 h-8 rounded object-contain bg-white p-1" />
                    <div>
                      <div className="font-semibold text-gray-900">Jumia Nigeria</div>
                      <div className="text-sm text-gray-600">24 data accesses this week</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                    <h3 className="font-bold text-gray-900">Data Requests</h3>
                  </div>
                  <div className="text-2xl font-black text-green-600 mb-1">12</div>
                  <div className="text-sm text-gray-600">Processed this month</div>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-1">Pending Action Required</h4>
                    <p className="text-yellow-700 text-sm">Flutterwave is requesting access to your transaction history. Review and respond within 30 minutes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-3 sm:space-y-6">
            {/* Quick Actions */}
            <div className="premium-card rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-4">
                Quick <span className="text-blue-600">Actions</span>
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <Link 
                  to="/policy-upload" 
                  className="w-full flex items-center gap-3 p-3 sm:p-4 bg-blue-50 hover:bg-blue-100 rounded-xl text-gray-900 font-semibold transition-all duration-200 border border-blue-200 text-sm sm:text-base"
                >
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Upload className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <span>Upload Policy</span>
                </Link>
                <Link 
                  to="/companies" 
                  className="w-full flex items-center gap-3 p-3 sm:p-4 bg-blue-50 hover:bg-blue-100 rounded-xl text-gray-900 font-semibold transition-all duration-200 border border-blue-200 text-sm sm:text-base"
                >
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Building2 className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <span>Companies</span>
                </Link>
                <Link 
                  to="/data-usage-monitor" 
                  className="w-full flex items-center gap-3 p-3 sm:p-4 bg-blue-50 hover:bg-blue-100 rounded-xl text-gray-900 font-semibold transition-all duration-200 border border-blue-200 text-sm sm:text-base"
                >
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <span>Data Monitor</span>
                </Link>
              </div>
            </div>

            {/* Connected Companies */}
            <div className="premium-card rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-4">
                Connected <span className="text-blue-600">Companies</span>
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Jumia Nigeria', logo: JumiaLogo, score: 92, status: 'Active' },
                  { name: 'Flutterwave', logo: FlutterwaveLogo, score: 95, status: 'Active' },
                  { name: 'GTBank', logo: GTBankLogo, score: 88, status: 'Active' },
                  { name: 'Paystack', logo: PaystackLogo, score: 94, status: 'Active' },
                  { name: 'Interswitch', logo: InterswitchLogo, score: 87, status: 'Active' }
                ].map((company, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-white border border-gray-200 flex items-center justify-center">
                      <img src={company.logo} alt={company.name} className="w-8 h-8 object-contain" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-sm">{company.name}</div>
                      <div className="text-xs text-gray-600">{company.score}% Compliant</div>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                ))}
              </div>
              <Link 
                to="/data-connections" 
                className="block mt-4 text-center text-blue-600 hover:text-blue-700 font-semibold text-sm"
              >
                View All Connections
              </Link>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Dashboard;