import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Companies from './pages/Companies';
import RegisterCompany from './pages/RegisterCompany';
import DataConnections from './pages/DataConnections';
import ConnectCompany from './pages/ConnectCompany';
import CompanyDetail from './pages/CompanyDetail';
import Explore from './pages/Explore';
import CompanyProfile from './pages/CompanyProfile';
import RequestDetail from './pages/RequestDetail';
import Onboarding from './pages/Onboarding';
import PolicyUpload from './pages/PolicyUpload';
import ComplianceScore from './pages/ComplianceScore';
import Remediation from './pages/Remediation';
import Certificate from './pages/Certificate';
import DSRManagement from './pages/DSRManagement';
import CitizenRequest from './pages/CitizenRequest';
import NITDAComplaint from './pages/NITDAComplaint';
import QuickCompliance from './pages/QuickCompliance';
import SystemStatus from './pages/SystemStatus';
import Login from './pages/Login';
import Register from './pages/Register';
import ConsentManagement from './pages/ConsentManagement';
import ActionHistory from './pages/ActionHistory';
import DataUsageMonitor from './pages/DataUsageMonitor';
import RealTimeDataUsage from './pages/RealTimeDataUsage';
import History from './pages/History';
import Settings from './pages/Settings';
import UserProfile from './pages/UserProfile';
import ConsentHub from './pages/ConsentHub';
import DataFlowVisualization from './pages/DataFlowVisualization';
import BreachResponse from './pages/BreachResponse';
import PrivacyRiskCalculator from './pages/PrivacyRiskCalculator';
import CrossBorderMonitor from './pages/CrossBorderMonitor';
import TrackingPage from './pages/TrackingPage';
import APIService from './services/api';
import MockAuthService from './services/mockAuth';
import Notifications from './pages/Notifications';
import ProtectedRoute from './components/ProtectedRoute';
import AIChatbot from './components/AIChatbot';
import TopNavbar from './components/TopNavbar';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import { UserProvider } from './contexts/UserContext';
import NavigationLoader from './components/NavigationLoader';

const ChatbotWrapper = () => {
  const location = useLocation();
  const excludedPaths = ['/', '/login', '/signup'];
  
  if (excludedPaths.includes(location.pathname)) {
    return null;
  }
  
  return <AIChatbot />;
};

const AppContent = () => {
  const { isNavigating } = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    APIService.clearAuthToken();
    MockAuthService.clearAuthToken();
    setUser(null);
    setSidebarOpen(false);
  };
  
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        {isNavigating && <NavigationLoader />}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={!user ? <Register onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
          
          {/* Tracking Page Route with Sidebar */}
          <Route path="/tracking/:trackingId" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <TrackingPage />
              </Layout>
            </ProtectedRoute>
          } />
          
          {/* Protected Routes with Sidebar */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <Dashboard user={user} />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/notifications" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <Notifications />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/companies" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <Companies />
              </Layout>
            </>
          } />
          
          <Route path="/data-usage-monitor" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <DataUsageMonitor />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/real-time-data-usage" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <RealTimeDataUsage />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/history" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <History />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <Settings />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/user-profile" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <UserProfile />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/policy-upload" element={
            <>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <PolicyUpload />
              </Layout>
            </>
          } />
          
          <Route path="/action-history" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <ActionHistory user={user} />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Other existing routes */}
          <Route path="/register-company" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <RegisterCompany />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/data-connections" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <DataConnections />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/connect-company" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <ConnectCompany />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/compliance-score" element={<ComplianceScore />} />
          <Route path="/remediation" element={<Remediation />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/nitda-complaint" element={<NITDAComplaint />} />
          
          <Route path="/citizen-request" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <CitizenRequest />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/dsr-management" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <DSRManagement user={user} />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/company/:id" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <CompanyDetail user={user} />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/explore" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <Explore user={user} />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/profile/:companyId" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <CompanyProfile user={user} />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/request/:id" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <RequestDetail user={user} />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/quick-compliance" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <QuickCompliance />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/system-status" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <SystemStatus />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/consent-management" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <ConsentManagement />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/consent-hub" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <ConsentHub />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/data-flow-visualization" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <DataFlowVisualization />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/breach-response" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <BreachResponse />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/privacy-risk-calculator" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <PrivacyRiskCalculator />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/cross-border-monitor" element={
            <ProtectedRoute>
              <Sidebar user={user} isOpen={sidebarOpen} onToggle={toggleSidebar} onLogout={handleLogout} />
              <Layout sidebarOpen={sidebarOpen} fullWidth={true}>
                <CrossBorderMonitor />
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
        
        {/* AI Chatbot - show on protected routes */}
        <ChatbotWrapper />
      </div>
    </Router>
  );
};

function App() {
  return (
    <UserProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </UserProvider>
  );
}

export default App;