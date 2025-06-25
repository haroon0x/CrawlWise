import React from 'react';
import { motion } from 'framer-motion';
import { Search, Brain, FileText, Sparkles } from 'lucide-react';

const LoadingState: React.FC = () => {
  const steps = [
    { icon: Search, label: 'Crawling webpage', description: 'Extracting content and metadata' },
    { icon: Brain, label: 'Analyzing structure', description: 'Auditing SEO and GEO readiness' },
    { icon: FileText, label: 'Generating improvements', description: 'Creating optimized content' },
    { icon: Sparkles, label: 'Finalizing results', description: 'Preparing recommendations' },
  ];

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-8">
        <motion.div
          className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Search className="w-8 h-8 text-white" />
        </motion.div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Your Website</h3>
        <p className="text-gray-600">Our AI agent is performing a comprehensive GEO audit</p>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <motion.div
              className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.3 }}
            >
              <step.icon className="w-5 h-5 text-blue-600" />
            </motion.div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{step.label}</h4>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
            <motion.div
              className="w-3 h-3 bg-blue-500 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: index * 0.2 }}
            />
          </motion.div>
        ))}
      </div>

      <div className="mt-6 bg-blue-50 rounded-lg p-4">
        <div className="flex items-center space-x-2 text-blue-700">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
          <span className="text-sm font-medium">This usually takes 30-60 seconds</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingState;