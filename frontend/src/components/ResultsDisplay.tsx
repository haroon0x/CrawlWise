import React from 'react';
import { motion } from 'framer-motion';
import { AuditResponse } from '../types';
import AuditResults from './AuditResults';
import ImprovementsResults from './ImprovementsResults';

interface ResultsDisplayProps {
  results: AuditResponse;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center">
        <motion.h2 
          className="text-3xl font-bold text-gray-900 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          GEO Audit Results
        </motion.h2>
        <motion.p 
          className="text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Here's your comprehensive analysis and optimization recommendations
        </motion.p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <AuditResults audit={results.audit} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <ImprovementsResults improvements={results.improvements} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResultsDisplay;