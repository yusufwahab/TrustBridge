import React, { useState, useEffect, useRef } from 'react';
import { Search, FileCheck, Brain, Award, Clock } from 'lucide-react';

const AnalysisProgress = ({ progress = 0, onCancel, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTimeout, setShowTimeout] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const hasStarted = useRef(false);

  const steps = [
    { icon: Search, title: 'Scanning Document', description: 'Reading and parsing your privacy policy' },
    { icon: FileCheck, title: 'NDPR Compliance Check', description: 'Analyzing against Nigerian data protection requirements' },
    { icon: Brain, title: 'AI Analysis', description: 'Identifying gaps and compliance issues' },
    { icon: Award, title: 'Generating Report', description: 'Compiling recommendations and score' }
  ];

  useEffect(() => {
    console.log('AnalysisProgress useEffect called, hasStarted:', hasStarted.current);
    
    // Prevent multiple calls in development mode
    if (hasStarted.current) {
      console.log('Analysis already started, returning');
      return;
    }
    hasStarted.current = true;
    
    console.log('Starting analysis timeout...');
    // Start actual analysis immediately
    setTimeout(() => {
      console.log('Timeout reached, calling onComplete');
      if (onComplete) {
        onComplete();
      }
    }, 100);
    
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 100);
      
      if (elapsedTime >= 3000 && !showTimeout) {
        setShowTimeout(true);
      }
      
      // Progress is now controlled by parent component
    }, 100);

    const stepTimer = setInterval(() => {
      setCurrentStep(prev => (prev < 3 ? prev + 1 : prev));
    }, 750);

    return () => {
      clearInterval(timer);
      clearInterval(stepTimer);
    };
  }, []);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-gray-900">AI Analysis in Progress</h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1">NDPR compliance analysis</p>
        </div>
        <button onClick={onCancel} className="px-4 sm:px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg sm:rounded-xl font-semibold transition-all text-sm sm:text-base flex-shrink-0">
          Cancel
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 mb-2">
          <span className="text-sm sm:text-base font-semibold text-gray-700">{Math.round(progress)}% Complete</span>
          <span className="text-xs sm:text-sm text-gray-500">This may take 30-60 seconds</span>
        </div>
        <div className="w-full h-2 sm:h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-500 ease-out animate-pulse" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-blue-50 rounded-xl sm:rounded-2xl border border-blue-200">
        <div className="animate-bounce flex-shrink-0">
          {React.createElement(steps[currentStep].icon, { className: "h-5 w-5 sm:h-6 sm:w-6 text-blue-600" })}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm sm:text-base font-bold text-gray-900">{steps[currentStep].title}</h3>
          <p className="text-xs sm:text-sm text-gray-600">{steps[currentStep].description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {steps.map((step, index) => (
          <div key={index} className={`p-2 sm:p-4 rounded-lg sm:rounded-xl text-center transition-all duration-300 ${index <= currentStep ? 'bg-blue-100 border border-blue-300' : 'bg-gray-100 border border-gray-300'}`}>
            {React.createElement(step.icon, { className: `h-4 w-4 sm:h-6 sm:w-6 mx-auto mb-1 sm:mb-2 transition-colors duration-300 ${index <= currentStep ? 'text-blue-600' : 'text-gray-400'}` })}
            <p className={`text-xs font-semibold transition-colors duration-300 ${index <= currentStep ? 'text-blue-700' : 'text-gray-600'}`}>{step.title}</p>
          </div>
        ))}
      </div>

      {showTimeout && (
        <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-yellow-50 rounded-xl sm:rounded-2xl border border-yellow-200 animate-in slide-in-from-top duration-300">
          <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600 flex-shrink-0" />
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-gray-900">Still Processing...</h3>
            <p className="text-xs sm:text-sm text-gray-600">Analysis is taking longer than expected. Please wait while our AI completes the comprehensive review.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisProgress;