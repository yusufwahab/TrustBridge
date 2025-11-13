import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileText, CheckCircle, AlertTriangle, Shield, Eye, Download, ArrowRight, Volume2, VolumeX, Mic, Square, Trash2, Play, Search, FileCheck, Brain, Award, Clock, Pause } from 'lucide-react';
import APIService from '../services/api';
import GroqAIService from '../services/groqAI';
import NDPRAnalysisService from '../services/ndprAnalysis';
import { extractTextFromPDF } from '../services/pdfExtractor';
import NDPRComplianceReport from '../components/NDPRComplianceReport';

const PolicyUpload = () => {
  const [activeTab, setActiveTab] = useState('text');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [policyText, setPolicyText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showDetailedReport, setShowDetailedReport] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showTimeout, setShowTimeout] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);
  const chunksRef = useRef([]);

  const tabs = [
    { id: 'text', label: 'Text Input', icon: FileText },
    { id: 'file', label: 'File Upload', icon: Upload },
    { id: 'pdf', label: 'PDF Analysis', icon: FileCheck },
    { id: 'voice', label: 'Voice Recording', icon: Mic }
  ];

  const analysisSteps = [
    { icon: Search, title: 'Scanning Document', description: 'Reading and parsing your privacy policy' },
    { icon: FileCheck, title: 'NDPR Compliance Check', description: 'Analyzing against Nigerian data protection requirements' },
    { icon: Brain, title: 'AI Analysis', description: 'Identifying gaps and compliance issues' },
    { icon: Award, title: 'Generating Report', description: 'Compiling recommendations and score' }
  ];

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      startAnalysis();
    }
  };

  const handleTextSubmit = async () => {
    if (policyText.trim()) {
      startAnalysis();
    }
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setError(null);
    setProgress(0);
    setCurrentStep(0);
    setElapsedTime(0);
    setShowTimeout(false);
  };

  // Analysis progress effect
  useEffect(() => {
    if (!isAnalyzing) return;

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

    // Complete analysis after 6 seconds
    const completeTimer = setTimeout(async () => {
      try {
        let text = '';
        
        if (uploadedFile) {
          if (uploadedFile.type === 'application/pdf') {
            const pdfResult = await extractTextFromPDF(uploadedFile);
            if (pdfResult.success) {
              text = pdfResult.text;
            } else {
              throw new Error(pdfResult.error);
            }
          } else {
            const reader = new FileReader();
            text = await new Promise((resolve, reject) => {
              reader.onload = (e) => resolve(e.target.result);
              reader.onerror = reject;
              reader.readAsText(uploadedFile);
            });
          }
        } else if (policyText.trim()) {
          text = policyText.trim();
        } else if (audioBlob) {
          text = await GroqAIService.transcribeAudio(audioBlob);
        }
        
        const analysisData = {
          company_name: 'User Company',
          company_size: 'medium',
          document_text: text,
          document_type: 'privacy_policy',
          industry: 'Technology',
          processing_scope: 'Standard data processing',
          target_users: 'General Public'
        };
        
        const result = await NDPRAnalysisService.performComprehensiveNDPRAnalysis(analysisData);
        setProgress(100);
        setAnalysisResult(result);
        setIsAnalyzing(false);
        setAnalysisComplete(true);
      } catch (error) {
        console.error('Analysis failed:', error);
        setError('Failed to analyze policy. Please try again.');
        setIsAnalyzing(false);
        setProgress(0);
      }
    }, 6000);

    return () => {
      clearInterval(timer);
      clearInterval(stepTimer);
      clearTimeout(completeTimer);
    };
  }, [isAnalyzing, elapsedTime, showTimeout, uploadedFile, policyText, audioBlob]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setIsPaused(false);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setError('Could not access microphone. Please check permissions.');
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        timerRef.current = setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);
      } else {
        mediaRecorderRef.current.pause();
        clearInterval(timerRef.current);
      }
      setIsPaused(!isPaused);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      clearInterval(timerRef.current);
    }
  };

  const analyzeVoice = async () => {
    if (audioBlob) {
      startAnalysis();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetAll = () => {
    setUploadedFile(null);
    setPolicyText('');
    setAudioBlob(null);
    setAnalysisComplete(false);
    setAnalysisResult(null);
    setError(null);
    setProgress(0);
    setRecordingTime(0);
    setCurrentStep(0);
    setShowTimeout(false);
    setElapsedTime(0);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-4">
            Policy <span className="text-blue-600">Analysis</span>
          </h1>
          <p className="text-xl text-gray-600">Upload your privacy policy for AI-powered NDPR compliance analysis</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* Text Input Tab */}
            {activeTab === 'text' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Enter Policy Text</h3>
                  <textarea
                    value={policyText}
                    onChange={(e) => setPolicyText(e.target.value)}
                    placeholder="Type or paste your privacy policy text here..."
                    className="w-full h-64 p-6 border-2 border-gray-300 rounded-2xl focus:border-blue-500 focus:outline-none resize-none text-gray-700"
                  />
                </div>
                <button
                  onClick={handleTextSubmit}
                  disabled={!policyText.trim() || isAnalyzing}
                  className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 mx-auto block"
                >
                  Analyze
                </button>
              </div>
            )}

            {/* File Upload Tab */}
            {activeTab === 'file' && (
              <div className="space-y-6">
                <div className="border-2 border-dashed border-blue-300 rounded-3xl p-12 bg-blue-50 text-center">
                  <input
                    type="file"
                    id="policy-upload"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="policy-upload" className="cursor-pointer flex flex-col items-center">
                    <Upload className="h-16 w-16 text-blue-600 mb-4" />
                    <span className="text-xl font-bold text-blue-600 mb-2">Choose File</span>
                    <span className="text-gray-500">PDF, DOC, DOCX, TXT up to 10MB</span>
                  </label>
                </div>
              </div>
            )}

            {/* PDF Analysis Tab */}
            {activeTab === 'pdf' && (
              <div className="space-y-6">
                <div className="text-center">
                  <FileCheck className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-4">PDF Document Analysis</h3>
                  <p className="text-gray-600 mb-6">Upload PDF documents for advanced text extraction and analysis</p>
                </div>
                <div className="border-2 border-dashed border-green-300 rounded-2xl p-8 bg-green-50 text-center">
                  <input
                    type="file"
                    id="pdf-upload"
                    className="hidden"
                    accept=".pdf"
                    onChange={handleFileUpload}
                  />
                  <label htmlFor="pdf-upload" className="cursor-pointer flex flex-col items-center">
                    <FileText className="h-12 w-12 text-green-600 mb-4" />
                    <span className="text-lg font-bold text-green-600 mb-2">Upload PDF</span>
                    <span className="text-gray-600">PDF files only</span>
                  </label>
                </div>
              </div>
            )}

            {/* Voice Recording Tab */}
            {activeTab === 'voice' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Record Your Policy</h3>
                  <p className="text-gray-600 mb-6">Record yourself reading your privacy policy for analysis</p>
                </div>
                
                <div className="border-2 border-dashed border-green-300 rounded-2xl p-8 bg-green-50 text-center">
                  {!isRecording && !audioBlob ? (
                    <div>
                      <Mic className="h-16 w-16 text-green-600 mx-auto mb-4" />
                      <button
                        onClick={startRecording}
                        className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all duration-200"
                      >
                        Start Recording
                      </button>
                      <p className="text-sm text-gray-600 mt-2">Click to start recording your policy</p>
                    </div>
                  ) : isRecording ? (
                    <div>
                      <div className={`w-16 h-16 ${isPaused ? 'bg-yellow-600' : 'bg-red-600'} rounded-full flex items-center justify-center mx-auto mb-4 ${!isPaused ? 'animate-pulse' : ''}`}>
                        <Mic className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-red-600 mb-4">{formatTime(recordingTime)}</div>
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={pauseRecording}
                          className={`px-4 py-2 ${isPaused ? 'bg-green-600 hover:bg-green-700' : 'bg-yellow-600 hover:bg-yellow-700'} text-white rounded-xl font-bold transition-all duration-200`}
                        >
                          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={stopRecording}
                          className="px-4 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all duration-200"
                        >
                          <Square className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {isPaused ? 'Recording paused' : 'Recording in progress...'}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                      <div className="text-lg font-bold text-gray-900 mb-4">Recording Complete ({formatTime(recordingTime)})</div>
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => {
                            const audio = new Audio(URL.createObjectURL(audioBlob));
                            audio.play();
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all duration-200"
                        >
                          <Play className="h-4 w-4 inline mr-2" />
                          Play
                        </button>
                        <button
                          onClick={analyzeVoice}
                          className="px-4 py-2 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all duration-200"
                        >
                          <ArrowRight className="h-4 w-4 inline mr-2" />
                          Analyze
                        </button>
                        <button
                          onClick={() => {
                            setAudioBlob(null);
                            setRecordingTime(0);
                          }}
                          className="px-4 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all duration-200"
                        >
                          <Trash2 className="h-4 w-4 inline mr-2" />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-gray-900">AI Analysis in Progress</h2>
                  <p className="text-gray-600 mt-1">NDPR compliance analysis</p>
                </div>
                <button onClick={() => setIsAnalyzing(false)} className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-xl font-semibold transition-all">
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
                  {React.createElement(analysisSteps[currentStep].icon, { className: "h-6 w-6 text-blue-600" })}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{analysisSteps[currentStep].title}</h3>
                  <p className="text-sm text-gray-600">{analysisSteps[currentStep].description}</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {analysisSteps.map((step, index) => (
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
          </div>
        )}

        {/* Analysis Results */}
        {analysisComplete && analysisResult && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="text-center mb-8">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Analysis Complete</h3>
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                      <circle
                        cx="50" cy="50" r="40"
                        stroke={
                          (analysisResult.compliance_score || 78) >= 80 ? '#10b981' :
                          (analysisResult.compliance_score || 78) >= 60 ? '#f59e0b' : '#ef4444'
                        }
                        strokeWidth="8" fill="none"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - (analysisResult.compliance_score || 78) / 100)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-black text-gray-900">{analysisResult.compliance_score || 78}%</span>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-gray-600">Compliance Score</div>
                </div>
                <div className="text-center">
                  <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                    (analysisResult.risk_level || 'medium') === 'low' ? 'bg-green-100 text-green-800' :
                    (analysisResult.risk_level || 'medium') === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {(analysisResult.risk_level || 'MEDIUM').toUpperCase()} RISK
                  </div>
                </div>
              </div>
            </div>

            {/* Issues Found */}
            <div className="space-y-4 mb-8">
              <h4 className="text-xl font-black text-gray-900">AI-Identified Issues</h4>
              {analysisResult.issues && analysisResult.issues.length > 0 ? (
                analysisResult.issues.map((issue, index) => {
                  const getSeverityConfig = (severity) => {
                    switch (severity) {
                      case 'high':
                        return { bg: 'bg-red-100', border: 'border-red-200', icon: 'text-red-600' };
                      case 'medium':
                        return { bg: 'bg-yellow-100', border: 'border-yellow-200', icon: 'text-yellow-600' };
                      default:
                        return { bg: 'bg-blue-100', border: 'border-blue-200', icon: 'text-blue-600' };
                    }
                  };
                  const config = getSeverityConfig(issue.severity);
                  return (
                    <div key={index} className={`flex items-start gap-4 p-6 ${config.bg} rounded-2xl ${config.border} border`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${config.bg}`}>
                        <AlertTriangle className={`h-4 w-4 ${config.icon}`} />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-bold text-gray-900 mb-1">{issue.title}</h5>
                        <p className="text-gray-600 text-sm">{issue.description}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 bg-green-50 rounded-2xl border border-green-200">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h5 className="font-bold text-green-800 mb-2">No Critical Issues Found</h5>
                  <p className="text-green-600 text-sm">Your policy appears to be well-structured for NDPR compliance.</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button 
                onClick={() => setShowDetailedReport(true)}
                className="flex-1 flex items-center justify-center gap-3 p-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all duration-200"
              >
                <Eye className="h-5 w-5" />
                View Detailed Report
              </button>
              <button 
                onClick={resetAll}
                className="px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-all duration-200"
              >
                New Analysis
              </button>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <AlertTriangle className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Analysis Failed</h3>
            <p className="text-red-600 mb-6">{error}</p>
            <button
              onClick={() => {
                setError(null);
                resetAll();
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all duration-200"
            >
              Try Again
            </button>
          </div>
        )}

        {/* NDPR Compliance Report Modal */}
        {showDetailedReport && analysisResult && (
          <NDPRComplianceReport 
            analysisResult={analysisResult}
            onClose={() => setShowDetailedReport(false)}
          />
        )}
      </div>
    </div>
  );
};

export default PolicyUpload;