import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Lightbulb, BarChart3, TrendingUp, Shield } from 'lucide-react';

interface AuditResultsProps {
  audit: {
    structure: string[];
    issues: string[];
    recommendations: string[];
  };
}

const AuditResults: React.FC<AuditResultsProps> = ({ audit }) => {
  const sections = [
    {
      title: 'Structure Analysis',
      items: audit.structure,
      icon: BarChart3,
      color: 'blue',
      bgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
      borderColor: 'border-blue-500/20',
      accentColor: 'bg-blue-400',
    },
    {
      title: 'Issues Found',
      items: audit.issues,
      icon: AlertTriangle,
      color: 'red',
      bgColor: 'bg-red-500/10',
      iconColor: 'text-red-400',
      borderColor: 'border-red-500/20',
      accentColor: 'bg-red-400',
    },
    {
      title: 'Recommendations',
      items: audit.recommendations,
      icon: Lightbulb,
      color: 'yellow',
      bgColor: 'bg-yellow-500/10',
      iconColor: 'text-yellow-400',
      borderColor: 'border-yellow-500/20',
      accentColor: 'bg-yellow-400',
    },
  ];

  return (
    <div className="glass-effect rounded-2xl p-8 border border-white/10">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Audit Analysis</h3>
          <p className="text-gray-400">Technical SEO and GEO assessment</p>
        </div>
      </div>

      <div className="space-y-6">
        {sections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            className={`${section.bgColor} ${section.borderColor} border rounded-xl p-6`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1, duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center`}>
                  <section.icon className={`w-5 h-5 ${section.iconColor}`} />
                </div>
                <h4 className="font-bold text-white text-lg">{section.title}</h4>
              </div>
              <div className={`px-3 py-1.5 text-sm font-bold rounded-full bg-white/10 ${section.iconColor}`}>
                {section.items.length}
              </div>
            </div>
            
            {section.items.length > 0 ? (
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    className="flex items-start space-x-3 text-gray-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (sectionIndex * 0.1) + (itemIndex * 0.05), duration: 0.4 }}
                  >
                    <div className={`w-2 h-2 rounded-full ${section.accentColor} mt-2 flex-shrink-0`} />
                    <span className="leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center space-x-3 text-gray-400 bg-white/5 rounded-lg p-4">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="font-medium">No issues found in this category</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <motion.div
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-gray-400">Structure Score</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {audit.structure.length > 0 ? '85%' : '95%'}
          </div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-gray-400">GEO Ready</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {audit.issues.length === 0 ? '100%' : '75%'}
          </div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="flex items-center space-x-2 mb-2">
            <Lightbulb className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-gray-400">Improvements</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {audit.recommendations.length}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuditResults;