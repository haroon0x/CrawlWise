import React from 'react';
import { motion } from 'framer-motion';
import { AuditResponse } from '../types';
import AuditResults from './AuditResults';
import ImprovementsResults from './ImprovementsResults';
import { CheckCircle, TrendingUp, Zap } from 'lucide-react';

interface ResultsDisplayProps {
  results: AuditResponse;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  return (
    <motion.div
      className="space-y-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Results Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6"
        >
          <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-semibold">Analysis Complete</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            GEO Audit Results
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Here's your comprehensive analysis and optimization recommendations to boost your content's visibility in AI-powered search engines.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
        >
          <div className="glass-effect rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium text-gray-400">Structure Analysis</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {results.audit.structure.length} insights
            </div>
          </div>
          
          <div className="glass-effect rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium text-gray-400">Issues Found</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {results.audit.issues.length} items
            </div>
          </div>
          
          <div className="glass-effect rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium text-gray-400">Improvements</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {results.improvements.faqs.length + 2} generated
            </div>
          </div>
        </motion.div>
      </div>

      {/* Results Grid */}
      <div className="grid gap-12 xl:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <AuditResults audit={results.audit} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <ImprovementsResults improvements={results.improvements} />
        </motion.div>
      </div>

      {/* Action Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="text-center"
      >
        <div className="glass-effect rounded-2xl p-8 border border-white/10 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Implement?</h3>
          <p className="text-gray-400 mb-6">
            Use the copy buttons above to implement these optimizations on your website. 
            Each improvement is designed to enhance your content's visibility in AI search results.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <span>SEO Optimized</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span>GEO Ready</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full" />
              <span>AI-Generated</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResultsDisplay;