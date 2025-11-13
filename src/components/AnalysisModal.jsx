import React, { useState, useEffect } from 'react';
import { FileText, Search, Shield, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const AnalysisModal = ({ isOpen, onComplete, companyName }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const analysisSteps = [
    {
      id: 1,
      title: 'Document Processing',
      description: 'Extracting and parsing policy content',
      icon: FileText,
      duration: 2000
    },
    {
      id: 2,
      title: 'NDPR Analysis',
      description: 'Analyzing against NDPR requirements',
      icon: Search,
      duration: 3000
    },
    {
      id: 3,
      title: 'Compliance Scoring',
      description: 'Calculating compliance score',
      icon: Shield,
      duration: 2500
    },
    {
      id: 4,
      title: 'Report Generation',
      description: 'Generating detailed report',
      icon: CheckCircle,
      duration: 1500
    }
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setCompletedSteps([]);
      return;
    }

    let stepIndex = 0;
    const processStep = () => {
      if (stepIndex < analysisSteps.length) {
        setCurrentStep(stepIndex);
        
        setTimeout(() => {
          setCompletedSteps(prev => [...prev, stepIndex]);
          stepIndex++;
          
          if (stepIndex < analysisSteps.length) {
            processStep();
          } else {
            setTimeout(() => {
              onComplete();
            }, 500);
          }
        }, analysisSteps[stepIndex].duration);
      }
    };

    processStep();
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border border-white/20 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Analyzing Policy</h2>
          <p className="text-gray-600">{companyName}</p>
        </div>

        <div className="space-y-4">
          {analysisSteps.map((step, index) => {
            const isActive = currentStep === index;
            const isCompleted = completedSteps.includes(index);
            const IconComponent = step.icon;

            return (
              <div 
                key={step.id}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                  isActive ? 'bg-blue-50 border-2 border-blue-200' : 
                  isCompleted ? 'bg-green-50 border-2 border-green-200' : 
                  'bg-gray-50 border-2 border-gray-200'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                  isCompleted ? 'bg-green-600' :
                  isActive ? 'bg-blue-600' : 'bg-gray-400'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="h-6 w-6 text-white" />
                  ) : isActive ? (
                    <div className="animate-spin">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                  ) : (
                    <IconComponent className="h-6 w-6 text-white" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className={`font-bold transition-colors ${
                    isCompleted ? 'text-green-800' :
                    isActive ? 'text-blue-800' : 'text-gray-600'
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm transition-colors ${
                    isCompleted ? 'text-green-600' :
                    isActive ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.description}
                  </p>
                </div>

                {isActive && (
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((completedSteps.length + (currentStep >= 0 ? 1 : 0)) / analysisSteps.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            {completedSteps.length === analysisSteps.length ? 'Analysis Complete!' : 'Processing...'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalysisModal;