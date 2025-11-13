import React, { useState, useEffect } from 'react';
import { Search, FileCheck, Brain, Award, Clock } from 'lucide-react';

const AnalysisProgress = ({ onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showTimeout, setShowTimeout] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const steps = [
    { icon: Search, title: 'Scanning Document', description: 'Reading and parsing your privacy policy' },
    { icon: FileCheck, title: 'NDPR Compliance Check', description: 'Analyzing against Nigerian data protection requirements' },
    { icon: Brain, title: 'AI Analysis', description: 'Identifying gaps and compliance issues' },
    { icon: Award, title: 'Generating Report', description: 'Compiling recommendations and score' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 100);
      
      if (elapsedTime >= 3000 && !showTimeout) {
        setShowTimeout(true);
      }
      
      setProgress(prev => {
        if (prev < 90) {
          return prev + Math.random() * 3;
        }
        return prev;
      });
    }, 100);

    const stepTimer = setInterval(() => {
      setCurrentStep(prev => (prev < 3 ? prev + 1 : prev));
    }, 750);

    return () => {
      clearInterval(timer);
      clearInterval(stepTimer);
    };
  }, [elapsedTime, showTimeout]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-gray-900">AI Analysis in Progress</h2>
          <p className="text-gray-600 mt-1">NDPR compliance analysis</p>
        </div>
        <button onClick={onCancel} className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-xl font-semibold transition-all">
          Cancel
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">{Math.round(progress)}% Complete</span>
          <span className="text-xs text-gray-500">This may take 30-60 seconds</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="flex items-center gap-4 p-6 bg-blue-50 rounded-2xl border border-blue-200">
        <div className="animate-bounce">
          {React.createElement(steps[currentStep].icon, { className: "h-6 w-6 text-blue-600" })}
        </div>
        <div>
          <h3 className="font-bold text-gray-900">{steps[currentStep].title}</h3>
          <p className="text-sm text-gray-600">{steps[currentStep].description}</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {steps.map((step, index) => (
          <div key={index} className={`p-4 rounded-xl text-center transition-all duration-300 ${index <= currentStep ? 'bg-blue-100 border border-blue-300' : 'bg-gray-100 border border-gray-300'}`}>
            {React.createElement(step.icon, { className: `h-6 w-6 mx-auto mb-2 transition-colors duration-300 ${index <= currentStep ? 'text-blue-600' : 'text-gray-400'}` })}
            <p className={`text-xs font-semibold transition-colors duration-300 ${index <= currentStep ? 'text-blue-700' : 'text-gray-600'}`}>{step.title}</p>
          </div>
        ))}
      </div>

      {showTimeout && (
        <div className="flex items-center gap-4 p-6 bg-yellow-50 rounded-2xl border border-yellow-200 animate-in slide-in-from-top duration-300">
          <Clock className="h-6 w-6 text-yellow-600 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-gray-900">Still Processing...</h3>
            <p className="text-sm text-gray-600">Analysis is taking longer than expected. Please wait while our AI completes the comprehensive review.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisProgress;