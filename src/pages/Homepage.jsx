import { Link } from 'react-router-dom';
import { Shield, ArrowRight, Play, Star, CheckCircle, Users, Building2, TrendingUp, Award, AlertTriangle, Clock, Zap, Target, Globe, Lock, FileCheck, BarChart3, BookOpen, Settings, Bell, GraduationCap, Eye, HeadphonesIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import trustBridgeLogo from "../assets/TrustBridgeLogo.png";
import AuthBg from '../assets/Trustbridge_authpages_img.png';

// Import company logos
import FlutterwaveLogo from '../assets/Flutterwave_logo.png';
import PaystackLogo from '../assets/Paystack_logo.png';
import KudaLogo from '../assets/Kuda_logo.png';
import InterswitchLogo from '../assets/interswitch_logo.jpg';
import GTBankLogo from '../assets/Gtbank_logo.png';

const Homepage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({ companies: 0, compliance: 0, connections: 0 });
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  useEffect(() => {
    setIsVisible(true);
    
    const statsTimer = setTimeout(() => {
      let companies = 0, compliance = 0, connections = 0;
      const interval = setInterval(() => {
        companies = Math.min(companies + 25, 1247);
        compliance = Math.min(compliance + 2, 89);
        connections = Math.min(connections + 50000, 2400000);
        
        setAnimatedStats({ companies, compliance, connections });
        
        if (companies === 1247 && compliance === 89 && connections === 2400000) {
          clearInterval(interval);
        }
      }, 50);
    }, 1000);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      clearTimeout(statsTimer);
      observer.disconnect();
    };
  }, []);



  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="glass-effect fixed w-full top-0 z-50 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center gap-2 sm:gap-4">
              <img src={trustBridgeLogo} alt="TrustBridge Logo" className="h-10 sm:h-12 lg:h-16 w-auto" />
              <div>
                <span className="text-lg sm:text-2xl lg:text-3xl font-black text-blue-600">TrustBridge</span>
                <div className="text-xs text-gray-500 font-semibold -mt-1 hidden sm:block">NDPR COMPLIANCE</div>
              </div>
            </div>
            <nav className="flex items-center space-x-2 sm:space-x-4 lg:space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 font-semibold transition-colors text-sm sm:text-base hidden md:inline">Features</a>
              <a href="#companies" className="text-gray-600 hover:text-blue-600 font-semibold transition-colors text-sm sm:text-base hidden md:inline">Companies</a>
              <Link to="/login" className="text-gray-600 hover:text-blue-600 font-semibold transition-colors text-sm sm:text-base hidden sm:inline">Login</Link>
              <Link to="/login" className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-xl sm:rounded-2xl font-bold hover:bg-blue-700 transition-all text-sm sm:text-base">Get Started</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 overflow-hidden"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${AuthBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-6 sm:mb-8 leading-tight">
              Nigerian Data<br />
              <span className="text-white">Compliance</span><br />
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-200 font-light">Simplified</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4">
              TrustBridge <span className="font-semibold text-blue-600">empowers</span> organizations and citizens with <span className="font-semibold text-blue-600">real-time</span> data usage alerts, AI-powered NDPR policy analysis, and actionable compliance insights, giving users <span className="font-semibold text-blue-600">control</span>, businesses clarity, and everyone <span className="font-semibold text-blue-600">confidence</span> in data privacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16 px-4">
              <Link 
                to="/login" 
                className="inline-flex items-center justify-center px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 bg-blue-600 text-white text-base sm:text-lg lg:text-xl rounded-xl sm:rounded-2xl font-bold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Start Free Compliance Check
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 ml-2 sm:ml-3 text-white" />
              </Link>
              <button 
                onClick={() => window.open('https://youtu.be/lstCbWgqU8k', '_blank')}
                className="inline-flex items-center justify-center px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 bg-white border-2 border-blue-600 text-blue-600 text-base sm:text-lg lg:text-xl rounded-xl sm:rounded-2xl font-bold hover:bg-blue-50 transition-all duration-200"
              >
                <Play className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 mr-2 sm:mr-3 text-blue-600" />
                Watch Demo
              </button>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-200">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-10 h-10 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center text-white text-sm font-bold transform hover:scale-110">
                      <Users className="h-4 w-4" />
                    </div>
                  ))}
                </div>
                <Star className="h-6 w-6 text-blue-600 fill-current" />
                <span className="font-semibold">Trusted by <span className="text-blue-400 animate-pulse">{animatedStats.companies.toLocaleString()}+</span> businesses</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section id="problem" ref={el => sectionRefs.current.problem = el} className="py-12 sm:py-16 lg:py-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${visibleSections.has('problem') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 sm:mb-6">
              The <span className="text-blue-600">Problem</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto px-4">
              Critical challenges in data transparency and NDPR compliance
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className={`premium-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center bg-white border-2 border-blue-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('problem') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '200ms'}}>
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4">Lack of Transparency</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Most citizens are unaware when or how their personal data is accessed or shared. This <span className="text-blue-600 font-semibold">lack of transparency</span> weakens trust and makes it hard for individuals to exercise their NDPR rights.
              </p>
            </div>
            
            <div className={`premium-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center bg-white border-2 border-blue-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('problem') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '400ms'}}>
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4">Costly Legal Compliance</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Organizations often rely on <span className="text-blue-600 font-semibold">expensive legal consultations</span> to interpret NDPR laws and draft compliant policies, slowing down operations and increasing costs.
              </p>
            </div>
            
            <div className={`premium-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center bg-white border-2 border-blue-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('problem') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '600ms'}}>
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4">No Compliance Insights</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Companies struggle to assess how compliant they really are or track improvements over time. <span className="text-blue-600 font-semibold">Manual reviews</span> provide little visibility into real NDPR performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" ref={el => sectionRefs.current.solution = el} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${visibleSections.has('solution') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Our <span className="text-blue-600">Solution</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              TrustBridge addresses these challenges with innovative solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`premium-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center bg-blue-50 border-2 border-blue-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('solution') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '200ms'}}>
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4">Real-Time Notifications</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                <span className="text-blue-600 font-semibold">TrustBridge Real-Time Data Usage Notifications</span> give users instant alerts whenever their data is accessed, processed, or shared — fostering trust and accountability.
              </p>
            </div>
            
            <div className={`premium-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center bg-blue-50 border-2 border-blue-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('solution') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '400ms'}}>
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4">AI-Powered Analysis</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                <span className="text-blue-600 font-semibold">AI-Powered Policy Analysis</span> automates NDPR interpretation, identifies compliance gaps, and suggests corrective actions in seconds — eliminating costly legal assistance.
              </p>
            </div>
            
            <div className={`premium-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center bg-blue-50 border-2 border-blue-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('solution') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '600ms'}}>
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4">Analytics Dashboard</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                <span className="text-blue-600 font-semibold">TrustBridge Compliance Analytics Dashboard</span> delivers statistical NDPR insights — showing compliance scores, risk levels, and progress metrics in real time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={el => sectionRefs.current.features = el} className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${visibleSections.has('features') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 sm:mb-6">
              Comprehensive <span className="text-blue-600">Features</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              Automate <span className="text-blue-600 font-semibold">NDPR compliance</span> with AI-powered analysis. 
              Empower <span className="text-blue-600 font-semibold">citizens</span> to control their data rights with transparency and trust.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className={`premium-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('features') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '100ms'}}>
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4">NDPR Compliance Toolkit</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Complete toolkit with <span className="text-blue-600 font-semibold">ready-to-use templates</span> and comprehensive guides for NDPR compliance implementation
              </p>
            </div>
            
            <div className={`premium-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('features') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '200ms'}}>
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4">Policy Creation & Management</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                <span className="text-blue-600 font-semibold">Create and manage</span> data protection policies with AI-powered suggestions and automated updates
              </p>
            </div>
            
            <div className={`premium-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('features') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '300ms'}}>
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4">Breach Response Tools</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                <span className="text-blue-600 font-semibold">Automated breach detection</span> and notification tools to ensure rapid response and regulatory compliance
              </p>
            </div>
            
            <div className={`premium-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('features') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '400ms'}}>
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4">Training & Awareness</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Comprehensive <span className="text-blue-600 font-semibold">employee training programs</span> and awareness campaigns for data protection best practices
              </p>
            </div>
            
            <div className={`premium-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('features') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '500ms'}}>
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4">Ongoing Monitoring</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                <span className="text-blue-600 font-semibold">Real-time monitoring</span> and compliance tracking with automated alerts and detailed reporting
              </p>
            </div>
            
            <div className={`premium-card p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200 transform transition-all duration-700 hover:scale-105 ${visibleSections.has('features') ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{transitionDelay: '600ms'}}>
              <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4">Expert Guidance</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                <span className="text-blue-600 font-semibold">Expert guidance and support</span> for data protection and NDPR compliance from certified professionals
              </p>
            </div>
          </div>
          
          <div className={`text-center mt-16 transform transition-all duration-1000 ${visibleSections.has('features') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{transitionDelay: '700ms'}}>
            <Link 
              to="/login" 
              className="inline-flex items-center px-10 py-5 bg-blue-600 text-white text-xl rounded-2xl font-bold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Explore All Features
              <ArrowRight className="h-6 w-6 ml-3 text-white" />
            </Link>
          </div>
        </div>
      </section>



      {/* Companies Section */}
      <section id="companies" ref={el => sectionRefs.current.companies = el} className="py-12 sm:py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className={`text-center mb-12 sm:mb-16 transform transition-all duration-1000 ${visibleSections.has('companies') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 sm:mb-6">
              Trusted by <span className="text-blue-600">Leading Companies</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto px-4">
              Join Nigeria's top companies in achieving <span className="text-blue-600 font-semibold">NDPR compliance</span>
            </p>
          </div>
          
          <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 items-center transform transition-all duration-1000 ${visibleSections.has('companies') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{transitionDelay: '300ms'}}>
            {[
              { logo: FlutterwaveLogo, name: 'Flutterwave' },
              { logo: PaystackLogo, name: 'Paystack' },
              { logo: KudaLogo, name: 'Kuda Bank' },
              { logo: InterswitchLogo, name: 'Interswitch' },
              { logo: GTBankLogo, name: 'GTBank' }
            ].map((company, index) => (
              <div key={company.name} className={`bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${visibleSections.has('companies') ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{transitionDelay: `${400 + index * 100}ms`}}>
                <img src={company.logo} alt={`${company.name} logo`} className="h-12 w-auto mx-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-black text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-2xl text-blue-100 mb-10 leading-relaxed">
            Join thousands of Nigerian businesses ensuring NDPR compliance with TrustBridge
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/login"
              className="inline-flex items-center px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
            >
              <Building2 className="h-6 w-6 mr-3 text-blue-600" />
              Start Free Trial
            </Link>
            <Link 
              to="/companies"
              className="inline-flex items-center px-10 py-5 bg-transparent border-2 border-white text-white rounded-2xl font-bold text-xl hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              <TrendingUp className="h-6 w-6 mr-3" />
              View Companies
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <img src={trustBridgeLogo} alt="TrustBridge Logo" className="h-12 w-auto" />
                <div>
                  <span className="text-3xl font-black text-white">TrustBridge</span>
                  <div className="text-xs text-gray-400 font-semibold -mt-1">NDPR COMPLIANCE</div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                Making <span className="text-blue-400 font-semibold">Nigerian data compliance</span> simple, transparent, and accessible for everyone.
              </p>
            </div>
            
            <div>
              <h3 className="font-black text-white mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><Link to="/companies" className="text-gray-400 hover:text-blue-400 transition-colors">Companies</Link></li>
                <li><Link to="/register-company" className="text-gray-400 hover:text-blue-400 transition-colors">Register Company</Link></li>
                <li><Link to="/citizen-request" className="text-gray-400 hover:text-blue-400 transition-colors">Data Rights</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-black text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors">About Us</li>
                <li className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors">Contact</li>
                <li className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors">Privacy Policy</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400">
                © 2024 <span className="text-blue-400 font-semibold">TrustBridge</span>. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;