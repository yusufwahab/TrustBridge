import React from 'react';
import AuthBg from '../assets/Trustbridge_authpages_img.png';

const NavigationLoader = () => {
  return (
    <div 
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${AuthBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-white/20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-800 font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default NavigationLoader;