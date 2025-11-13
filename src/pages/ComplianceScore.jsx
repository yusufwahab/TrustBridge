import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, CheckCircle, Download, ArrowRight, RefreshCw } from 'lucide-react';

const ComplianceScore = () => {
  const navigate = useNavigate();
  const [score] = useState(62);
  const [issues] = useState([
    { id: 1, type: 'critical', title: 'Missing DPO Contact', description: 'NDPR requires you to name a Data Protection Officer', article: 'NDPR Article 2.6' },
    { id: 2, type: 'critical', title: 'Incomplete Consent Mechanism', description: 'Cookie consent banner missing explicit opt-in', article: 'NDPR Article 2.3' },
    { id: 3, type: 'critical', title: 'Data Retention Period Unclear', description: 'No clear timeline for data deletion specified', article: 'NDPR Article 2.4' },
    { id: 4, type: 'critical', title: 'Third-party Data Sharing', description: 'Insufficient disclosure of data sharing practices', article: 'NDPR Article 2.2' },
    { id: 5, type: 'critical', title: 'Data Subject Rights Missing', description: 'Access, rectification, and erasure rights not clearly stated', article: 'NDPR Article 3.1' },
    { id: 6, type: 'minor', title: 'Contact Information Incomplete', description: 'Physical address for data controller not provided', article: 'NDPR Article 2.1' },
    { id: 7, type: 'minor', title: 'Data Processing Lawful Basis', description: 'Legal basis for processing could be more explicit', article: 'NDPR Article 2.2' }
  ]);

  const criticalIssues = issues.filter(issue => issue.type === 'critical').length;
  const minorIssues = issues.filter(issue => issue.type === 'minor').length;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Compliant';
    if (score >= 60) return 'Moderate Risk';
    return 'High Risk';
  };

  return (
    <div className="min-h-screen bg-dark-bg p-4">
      <div className="max-w-4xl mx-auto pt-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-dark-text mb-4">NDPR Compliance Analysis Complete</h1>
          <p className="text-dark-text-secondary">Your privacy policy has been analyzed against NDPR requirements</p>
        </div>

        {/* Score Card */}
        <div className="glass-effect backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Score Circle */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-8 border-dark-surface flex items-center justify-center relative">
                <div className={`absolute inset-0 rounded-full border-8 ${
                  score >= 80 ? 'border-success' : score >= 60 ? 'border-warning' : 'border-error'
                }`} style={{
                  background: `conic-gradient(${score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444'} ${score * 3.6}deg, transparent 0deg)`
                }}></div>
                <div className="text-center z-10 bg-dark-bg rounded-full w-24 h-24 flex flex-col items-center justify-center">
                  <span className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}</span>
                  <span className="text-dark-text-secondary text-sm">/ 100</span>
                </div>
              </div>
            </div>

            {/* Score Details */}
            <div className="flex-1 text-center md:text-left">
              <h2 className={`text-2xl font-bold mb-2 ${getScoreColor(score)}`}>
                {getScoreLabel(score)}
              </h2>
              <p className="text-dark-text-secondary mb-4">
                {criticalIssues + minorIssues} issues detected. {criticalIssues} critical, {minorIssues} minor.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="bg-dark-surface px-4 py-2 rounded-lg">
                  <span className="text-dark-text-secondary text-sm">Industry Average</span>
                  <div className="text-dark-text font-semibold">58%</div>
                </div>
                <div className="bg-dark-surface px-4 py-2 rounded-lg">
                  <span className="text-dark-text-secondary text-sm">Fintech Average</span>
                  <div className="text-dark-text font-semibold">65%</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button className="flex items-center gap-2 px-6 py-3 bg-dark-surface border border-dark-border rounded-xl text-dark-text hover:border-brand-green transition-colors">
                <Download className="h-4 w-4" />
                Download Report
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-green to-brand-blue text-white rounded-xl hover:shadow-glow transition-all">
                <RefreshCw className="h-4 w-4" />
                Reanalyze
              </button>
            </div>
          </div>
        </div>

        {/* Issues List */}
        <div className="glass-effect backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 mb-8">
          <h3 className="text-xl font-bold text-dark-text mb-6">Compliance Issues</h3>
          <div className="space-y-4">
            {issues.map((issue) => (
              <div key={issue.id} className="bg-dark-surface rounded-xl p-6 border border-dark-border hover:border-brand-green/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${
                    issue.type === 'critical' ? 'bg-error/20 text-error' : 'bg-warning/20 text-warning'
                  }`}>
                    {issue.type === 'critical' ? 
                      <AlertTriangle className="h-5 w-5" /> : 
                      <CheckCircle className="h-5 w-5" />
                    }
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-dark-text">{issue.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        issue.type === 'critical' ? 'bg-error/20 text-error' : 'bg-warning/20 text-warning'
                      }`}>
                        {issue.type}
                      </span>
                    </div>
                    <p className="text-dark-text-secondary mb-2">{issue.description}</p>
                    <p className="text-brand-green text-sm font-medium">{issue.article}</p>
                  </div>
                  <button className="text-brand-green hover:text-white bg-brand-green/10 hover:bg-brand-green px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                    Fix Issue
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="glass-effect backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-dark-text mb-4">Next Steps</h3>
          <p className="text-dark-text-secondary mb-6">
            Ready to fix these issues and improve your compliance score? Our Remediation Assistant will guide you through each fix.
          </p>
          <button
            onClick={() => navigate('/remediation')}
            className="bg-gradient-to-r from-brand-green to-brand-blue text-white px-8 py-4 rounded-xl font-semibold hover:shadow-glow transition-all duration-300 flex items-center gap-2"
          >
            Start Fixing Issues
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplianceScore;