import { useState, useEffect } from 'react';
import TrustBridgeLogo from '../assets/TrustBridgeLogo.png';
import AuthBg from '../assets/Trustbridge_authpages_img.png';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 200);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${AuthBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="text-center">
        <div className="mb-6 sm:mb-8">
          <img 
            src={TrustBridgeLogo} 
            alt="TrustBridge" 
            className="w-20 h-20 sm:w-24 sm:h-24 mx-auto animate-bounce" 
          />
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 animate-pulse">TrustBridge</h2>
        
        <div className="w-64 sm:w-80 bg-gray-600 rounded-full h-3 mx-auto mb-4">
          <div 
            className="bg-blue-400 h-3 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="text-sm text-gray-300">{progress}% Complete</p>
      </div>
    </div>
  );
};

export default LoadingScreen;