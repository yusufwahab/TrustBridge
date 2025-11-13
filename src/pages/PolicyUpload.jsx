import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileText, CheckCircle, AlertTriangle, Shield, Eye, Download, ArrowRight, Volume2, VolumeX, Mic, Square, Trash2, Play, Search, FileCheck, Brain, Award, Clock, Pause } from 'lucide-react';
import APIService from '../services/api';
import GroqAIService from '../services/groqAI';
import NDPRAnalysisService from '../services/ndprAnalysis';
import { extractTextFromPDF } from '../services/pdfExtractor';
import NDPRComplianceReport from '../components/NDPRComplianceReport';
import AnalysisProgress from '../components/AnalysisProgress';

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
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);
  const chunksRef = useRef([]);

  const tabs = [
    { id: 'text', label: 'Text Input', icon: FileText },
    { id: 'file', label: 'File Upload', icon: Upload },
    { id: 'pdf', label: 'PDF Analysis', icon: FileCheck },
    { id: 'voice', label: 'Voice Recording', icon: Mic }
  ];

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file && !isAnalyzing && !showAnalysisModal) {
      setUploadedFile(file);
      setShowAnalysisModal(true);
    }
  };

  const handleTextSubmit = async () => {
    console.log('handleTextSubmit called');
    if (policyText.trim() && !isAnalyzing && !showAnalysisModal) {
      console.log('Opening analysis modal');
      setShowAnalysisModal(true);
    }
  };

  const handleAnalysisComplete = async () => {
    console.log('handleAnalysisComplete called, isAnalyzing:', isAnalyzing);
    
    // Prevent multiple calls
    if (isAnalyzing) {
      console.log('Analysis already in progress, returning');
      return;
    }
    
    console.log('Starting analysis...');
    setShowAnalysisModal(false);
    setIsAnalyzing(true);
    setError(null);
    setProgress(0);
    
    try {
      let text = '';
      
      if (uploadedFile) {
        console.log('Processing uploaded file:', uploadedFile.name);
        if (uploadedFile.type === 'application/pdf') {
          setProgress(20);
          const pdfResult = await extractTextFromPDF(uploadedFile);
          if (pdfResult.success) {
            text = pdfResult.text;
            setProgress(40);
          } else {
            throw new Error(pdfResult.error);
          }
        } else {
          setProgress(20);
          const reader = new FileReader();
          text = await new Promise((resolve, reject) => {
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsText(uploadedFile);
          });
          setProgress(40);
        }
      } else if (policyText.trim()) {
        console.log('Using policy text, length:', policyText.length);
        text = policyText.trim();
        setProgress(40);
      } else if (audioBlob) {
        console.log('Processing audio blob');
        setProgress(20);
        text = await GroqAIService.transcribeAudio(audioBlob);
        setProgress(40);
      }
      
      if (!text.trim()) {
        throw new Error('No text content found to analyze');
      }
      
      // Check if text is actually a policy document
      const policyKeywords = ['privacy', 'policy', 'data', 'personal', 'information', 'collect', 'process', 'consent', 'protection', 'gdpr', 'ndpr', 'terms', 'service'];
      const textLower = text.toLowerCase();
      const hasKeywords = policyKeywords.some(keyword => textLower.includes(keyword));
      
      // Check if it's error logs, code, or unrelated content
      const nonPolicyIndicators = ['error:', 'exception:', 'stack trace', 'console.log', 'function', 'undefined', 'null', 'react', 'javascript', 'html', 'css'];
      const hasNonPolicyContent = nonPolicyIndicators.some(indicator => textLower.includes(indicator));
      
      if (!hasKeywords || hasNonPolicyContent) {
        throw new Error('What you entered does not have to do with policy, please input an actual policy');
      }
      
      console.log('Text extracted, length:', text.length);
      
      const analysisData = {
        company_name: 'User Company',
        company_size: 'medium',
        document_text: text,
        document_type: 'privacy_policy',
        industry: 'Technology',
        processing_scope: 'Standard data processing',
        target_users: 'General Public'
      };
      
      console.log('Calling NDPR analysis API...');
      setProgress(60);
      const result = await NDPRAnalysisService.performComprehensiveNDPRAnalysis(analysisData);
      console.log('Analysis complete, result:', result);
      
      setProgress(100);
      setAnalysisResult(result);
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    } catch (error) {
      console.error('Analysis failed:', error);
      setError(error.message || 'Failed to analyze policy. Please try again.');
      setIsAnalyzing(false);
      setProgress(0);
    }
  };

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
    if (audioBlob && !isAnalyzing && !showAnalysisModal) {
      setShowAnalysisModal(true);
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
    setIsAnalyzing(false);
    setShowAnalysisModal(false);
    setShowDetailedReport(false);
    
    // Clear file inputs
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => input.value = '');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-6xl mx-auto px-2 sm:px-0">
        {/* Header - Hidden when analysis is complete */}
        {!analysisComplete && (
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl lg:text-4xl font-black text-gray-900 mb-3 sm:mb-4">
            Policy <span className="text-blue-600">Analysis</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600">Upload your privacy policy for AI-powered NDPR compliance analysis</p>
        </div>
        )}

        {/* Tabs - Hidden when analysis is complete */}
        {!analysisComplete && (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 mb-6 sm:mb-8">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1 sm:gap-3 px-2 sm:px-6 py-3 sm:py-4 font-semibold transition-all duration-200 whitespace-nowrap min-w-0 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <tab.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm lg:text-base hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            {/* Text Input Tab */}
            {activeTab === 'text' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Enter Policy Text</h3>
                  <textarea
                    value={policyText}
                    onChange={(e) => setPolicyText(e.target.value)}
                    placeholder="Type or paste your privacy policy text here..."
                    className="w-full h-48 sm:h-64 p-4 sm:p-6 border-2 border-gray-300 rounded-xl sm:rounded-2xl focus:border-blue-500 focus:outline-none resize-none text-gray-700 text-sm sm:text-base"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between">
                  <button
                    onClick={() => {
                      if (policyText.trim()) {
                        const utterance = new SpeechSynthesisUtterance(policyText);
                        speechSynthesis.speak(utterance);
                      }
                    }}
                    disabled={!policyText.trim()}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gray-500 text-white rounded-xl sm:rounded-2xl font-bold hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 text-sm sm:text-base"
                  >
                    <Volume2 className="h-4 w-4 inline mr-2" />
                    Read Aloud
                  </button>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button
                      onClick={handleTextSubmit}
                      disabled={!policyText.trim() || isAnalyzing || showAnalysisModal}
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white rounded-xl sm:rounded-2xl font-bold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 text-sm sm:text-base"
                    >
                      {isAnalyzing || showAnalysisModal ? 'Analyzing...' : 'Analyze Policy'}
                    </button>
                    <button
                      onClick={() => setPolicyText('')}
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gray-100 text-gray-700 rounded-xl sm:rounded-2xl font-bold hover:bg-gray-200 transition-all duration-200 text-sm sm:text-base"
                    >
                      Clear Text
                    </button>
                  </div>
                </div>
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
                          disabled={isAnalyzing || showAnalysisModal}
                          className="px-4 py-2 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
                        >
                          <ArrowRight className="h-4 w-4 inline mr-2" />
                          {isAnalyzing || showAnalysisModal ? 'Analyzing...' : 'Analyze'}
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
        )}



        {/* Analysis Results - Replaces entire page content */}
        {analysisComplete && analysisResult && (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">NDPR Compliance Report</h1>
                  <p className="text-gray-600">Analysis completed on {new Date().toLocaleDateString()}</p>
                </div>
                <button 
                  onClick={resetAll}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all duration-200 w-full sm:w-auto"
                >
                  New Analysis
                </button>
              </div>
            </div>

            {/* Score Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="35" stroke="#e5e7eb" strokeWidth="10" fill="none" />
                    <circle
                      cx="50" cy="50" r="35"
                      stroke={(
                        (analysisResult.compliance_score || 0) >= 80 ? '#10b981' :
                        (analysisResult.compliance_score || 0) >= 60 ? '#f59e0b' : '#ef4444'
                      )}
                      strokeWidth="10" fill="none"
                      strokeDasharray={`${2 * Math.PI * 35}`}
                      strokeDashoffset={`${2 * Math.PI * 35 * (1 - (analysisResult.compliance_score || 0) / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-black text-gray-900">{analysisResult.compliance_score || 0}%</span>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Compliance Score</h3>
                <p className="text-sm text-gray-600">Overall NDPR compliance</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  (analysisResult.risk_level || 'medium') === 'low' ? 'bg-green-100' :
                  (analysisResult.risk_level || 'medium') === 'medium' ? 'bg-yellow-100' :
                  'bg-red-100'
                }`}>
                  <AlertTriangle className={`h-8 w-8 ${
                    (analysisResult.risk_level || 'medium') === 'low' ? 'text-green-600' :
                    (analysisResult.risk_level || 'medium') === 'medium' ? 'text-yellow-600' :
                    'text-red-600'
                  }`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{(analysisResult.risk_level || 'Medium').toUpperCase()} Risk</h3>
                <p className="text-sm text-gray-600">Compliance risk level</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{analysisResult.gaps?.length || 3} Issues</h3>
                <p className="text-sm text-gray-600">Compliance gaps found</p>
              </div>
            </div>

            {/* Key Issues */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Key Compliance Issues</h2>
              <div className="space-y-4">
                {(analysisResult.gaps || [
                  { title: 'Data Retention Policy', severity: 'High', description: 'No clear data retention policy specified' },
                  { title: 'Consent Mechanism', severity: 'Medium', description: 'Consent mechanism needs explicit user approval' },
                  { title: 'Transparency Requirements', severity: 'Low', description: 'Additional transparency recommended' }
                ]).slice(0, 3).map((issue, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold w-fit ${
                      issue.severity === 'Critical' || issue.severity === 'High' ? 'bg-red-100 text-red-800' :
                      issue.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {issue.severity}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{issue.title}</h3>
                      <p className="text-sm text-gray-600">{issue.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button 
                onClick={() => setShowDetailedReport(true)}
                className="flex-1 flex items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-600 text-white rounded-xl sm:rounded-2xl font-bold hover:bg-blue-700 transition-all duration-200 text-sm sm:text-base"
              >
                <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                View Full Report
              </button>
              <button 
                className="flex-1 flex items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 bg-green-600 text-white rounded-xl sm:rounded-2xl font-bold hover:bg-green-700 transition-all duration-200 text-sm sm:text-base"
              >
                <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                Download PDF
              </button>
              <button 
                onClick={() => {
                  if (analysisResult) {
                    const resultText = `Compliance Score: ${analysisResult.compliance_score || 0}%. Risk Level: ${analysisResult.risk_level || 'Medium'}. ${analysisResult.gaps?.length || 3} issues found.`;
                    const utterance = new SpeechSynthesisUtterance(resultText);
                    speechSynthesis.speak(utterance);
                  }
                }}
                className="flex-1 flex items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-500 text-white rounded-xl sm:rounded-2xl font-bold hover:bg-gray-600 transition-all duration-200 text-sm sm:text-base"
              >
                <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />
                Read Results
              </button>
            </div>
          </div>
        )}

        {/* Error Modal */}
        {error && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-gray-200 p-6 sm:p-8 text-center max-w-md w-full">
              <AlertTriangle className="h-12 w-12 sm:h-16 sm:w-16 text-red-600 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Analysis Failed</h3>
              <p className="text-sm sm:text-base text-red-600 mb-4 sm:mb-6">{error}</p>
              <button
                onClick={() => setError(null)}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl font-bold hover:bg-blue-700 transition-all duration-200 text-sm sm:text-base"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Analysis Modal */}
        {(showAnalysisModal || isAnalyzing) && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 max-w-4xl w-full shadow-2xl animate-in fade-in zoom-in duration-300">
              <AnalysisProgress progress={progress} onCancel={() => { setShowAnalysisModal(false); setIsAnalyzing(false); }} onComplete={handleAnalysisComplete} />
            </div>
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