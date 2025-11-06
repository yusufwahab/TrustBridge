import TrustBridgeLogo from '../assets/TrustBridgeLogo.png';
import AuthBg from '../assets/Trustbridge_authpages_img.png';

const NavigationLoader = () => {
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
        <div className="mb-4">
          <img 
            src={TrustBridgeLogo} 
            alt="TrustBridge" 
            className="w-12 h-12 sm:w-16 sm:h-16 mx-auto animate-bounce" 
          />
        </div>
        <h3 className="text-lg sm:text-xl font-black text-white animate-pulse">TrustBridge</h3>
      </div>
    </div>
  );
};

export default NavigationLoader;