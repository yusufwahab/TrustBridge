import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const DataFlowDiagram = () => {
  const navigate = useNavigate();
  const [dataFlow, setDataFlow] = useState([]);
  const [activities, setActivities] = useState([]);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [particles, setParticles] = useState([]);

  // Initialize data
  useEffect(() => {
    const initialFlow = [
      { name: 'Personal Info', you: 100, companies: 0, thirdParty: 0 },
      { name: 'Browsing Data', you: 100, companies: 0, thirdParty: 0 },
      { name: 'Location', you: 100, companies: 0, thirdParty: 0 },
      { name: 'Preferences', you: 100, companies: 0, thirdParty: 0 },
      { name: 'Analytics', you: 100, companies: 0, thirdParty: 0 }
    ];
    
    setDataFlow(initialFlow);
  }, []);

  // Company data usage
  const companies = [
    { name: 'Jumia', activity: 'Order processing', color: '#10b981' },
    { name: 'GTBank', activity: 'Transaction verification', color: '#3b82f6' },
    { name: 'Uber', activity: 'Location tracking', color: '#f59e0b' },
    { name: 'Netflix', activity: 'Content recommendation', color: '#ef4444' },
    { name: 'WhatsApp', activity: 'Message encryption', color: '#10b981' }
  ];

  // Animate data flow and company usage
  useEffect(() => {
    const interval = setInterval(() => {
      setDataFlow(prev => prev.map(item => ({
        ...item,
        companies: Math.min(100, item.companies + Math.random() * 15),
        thirdParty: Math.min(80, item.thirdParty + Math.random() * 10)
      })));
      
      // Rotate current company
      setCurrentCompany(companies[Math.floor(Math.random() * companies.length)]);
      
      // Generate particles
      setParticles(prev => [
        ...prev.slice(-15),
        {
          id: Date.now(),
          x: 50 + Math.random() * 200,
          y: 50 + Math.random() * 100,
          targetX: 200 + Math.random() * 100,
          targetY: 50 + Math.random() * 100,
          progress: 0
        }
      ]);
      
      // Add activity
      const activities = [
        '🔄 Personal data processed by TechCorp',
        '📊 Analytics shared with third party',
        '🎯 Ad targeting data updated',
        '☁️ Backup created in cloud storage',
        '🔒 Data encrypted and secured'
      ];
      
      setActivities(prev => [
        { 
          id: Date.now(), 
          text: activities[Math.floor(Math.random() * activities.length)], 
          time: new Date().toLocaleTimeString(),
          type: Math.random() > 0.7 ? 'warning' : 'info'
        },
        ...prev.slice(0, 4)
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Update particle positions
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          progress: particle.progress + 0.02,
          x: particle.x + (particle.targetX - particle.x) * 0.02,
          y: particle.y + (particle.targetY - particle.y) * 0.02
        })).filter(particle => particle.progress < 1)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { id: 'you', x: 50, y: 75, label: 'You', color: '#3b82f6' },
    { id: 'company1', x: 150, y: 50, label: 'Jumia', color: '#10b981' },
    { id: 'company2', x: 150, y: 100, label: 'GTBank', color: '#f59e0b' },
    { id: 'third1', x: 250, y: 40, label: 'Analytics', color: '#ef4444' },
    { id: 'third2', x: 250, y: 80, label: 'Ads', color: '#8b5cf6' },
    { id: 'third3', x: 250, y: 120, label: 'Cloud', color: '#06b6d4' }
  ];

  const connections = [
    { from: 'you', to: 'company1' },
    { from: 'you', to: 'company2' },
    { from: 'company1', to: 'third1' },
    { from: 'company1', to: 'third2' },
    { from: 'company2', to: 'third2' },
    { from: 'company2', to: 'third3' }
  ];

  const handleClick = () => {
    navigate('/data-flow-visualization');
  };

  return (
    <div 
      className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 shadow-xl cursor-pointer hover:shadow-2xl transition-all duration-300"
      onClick={handleClick}
    >
      <motion.h3 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-gray-900 mb-6 text-center"
      >
        Real-Time Data Flow Analytics
      </motion.h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Animated Bar Chart */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg p-4 shadow-lg"
        >
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Data Distribution</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dataFlow}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  color: 'white', 
                  borderRadius: '8px',
                  border: 'none'
                }}
              />
              <Bar dataKey="you" fill="#10b981" name="Your Control" radius={[4, 4, 0, 0]} />
              <Bar dataKey="companies" fill="#3b82f6" name="Companies" radius={[4, 4, 0, 0]} />
              <Bar dataKey="thirdParty" fill="#f59e0b" name="Third Party" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Animated Node Flow */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg p-4 shadow-lg"
        >
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Data Flow Network</h4>
          <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 h-48">
            <svg width="100%" height="100%" viewBox="0 0 300 150">
              {connections.map((conn, index) => {
                const fromNode = nodes.find(n => n.id === conn.from);
                const toNode = nodes.find(n => n.id === conn.to);
                return (
                  <line
                    key={index}
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke="#e5e7eb"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    className="animate-pulse"
                  />
                );
              })}
              
              {particles.map(particle => (
                <circle
                  key={particle.id}
                  cx={particle.x}
                  cy={particle.y}
                  r="3"
                  fill="#3b82f6"
                  opacity="0.8"
                >
                  <animate
                    attributeName="r"
                    values="2;5;2"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
              
              {nodes.map(node => (
                <g key={node.id}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="12"
                    fill={node.color}
                    opacity="0.8"
                  >
                    <animate
                      attributeName="r"
                      values="10;14;10"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <text
                    x={node.x}
                    y={node.y + 20}
                    textAnchor="middle"
                    className="text-xs font-medium fill-gray-700"
                  >
                    {node.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Company Usage */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-4 shadow-lg"
        >
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Currently Using Your Data</h4>
          <AnimatePresence mode="wait">
            {currentCompany && (
              <motion.div
                key={currentCompany.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center p-6"
              >
                <div 
                  className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-white"
                  style={{ backgroundColor: currentCompany.color }}
                >
                  {currentCompany.name.charAt(0)}
                </div>
                <h5 className="text-xl font-bold text-gray-900 mb-2">{currentCompany.name}</h5>
                <p className="text-gray-600 mb-2">{currentCompany.activity}</p>
                <p className="text-sm text-gray-500">3 mins ago</p>
                <div className="mt-4 flex justify-center">
                  <div className="flex space-x-1">
                    {[1,2,3].map(i => (
                      <div 
                        key={i}
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ 
                          backgroundColor: currentCompany.color,
                          animationDelay: `${i * 0.2}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="mt-4 space-y-2">
            {companies.slice(0, 3).map((company, index) => (
              <div key={company.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: company.color }}
                  />
                  <span className="text-gray-700">{company.name}</span>
                </div>
                <span className="text-gray-500">{Math.floor(Math.random() * 30) + 1}m ago</span>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Live Activity Feed */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-4 shadow-lg"
        >
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Live Data Activity</h4>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            <AnimatePresence>
              {activities.map(activity => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.9 }}
                  className={`p-3 rounded-lg border-l-4 ${
                    activity.type === 'warning' 
                      ? 'bg-orange-50 border-orange-400' 
                      : 'bg-blue-50 border-blue-400'
                  }`}
                >
                  <p className="text-sm text-gray-800 font-medium">{activity.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DataFlowDiagram;