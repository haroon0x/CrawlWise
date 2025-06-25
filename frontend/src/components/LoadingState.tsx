import React from 'react';
import { motion } from 'framer-motion';
import { Search, Brain, FileText, Sparkles, Zap, Target } from 'lucide-react';

const LoadingState: React.FC = () => {
  const steps = [
    { 
      icon: Search, 
      label: 'Crawling webpage', 
      description: 'Extracting content and metadata',
      color: 'text-blue-400'
    },
    { 
      icon: Brain, 
      label: 'Analyzing structure', 
      description: 'Auditing SEO and GEO readiness',
      color: 'text-purple-400'
    },
    { 
      icon: FileText, 
      label: 'Generating improvements', 
      description: 'Creating optimized content',
      color: 'text-green-400'
    },
    { 
      icon: Sparkles, 
      label: 'Finalizing results', 
      description: 'Preparing recommendations',
      color: 'text-yellow-400'
    },
  ];

  return (
    <motion.div
      className="glass-effect rounded-2xl p-8 border border-white/10"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center mb-10">
        <motion.div
          className="relative w-20 h-20 mx-auto mb-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-20" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center">
            <Search className="w-8 h-8 text-white" />
          </div>
        </motion.div>
        
        <h3 className="text-2xl font-bold text-white mb-3">Analyzing Your Website</h3>
        <p className="text-gray-400 text-lg">Our AI agent is performing a comprehensive GEO audit</p>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex items-center space-x-4 p-5 rounded-xl bg-white/5 border border-white/10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <motion.div
              className="relative w-12 h-12 rounded-full bg-white/10 flex items-center justify-center"
              animate={{ 
                scale: [1, 1.1, 1],
                boxShadow: [
                  '0 0 0 0 rgba(99, 102, 241, 0)',
                  '0 0 0 10px rgba(99, 102, 241, 0.1)',
                  '0 0 0 0 rgba(99, 102, 241, 0)'
                ]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: index * 0.4,
                ease: "easeInOut"
              }}
            >
              <step.icon className={`w-6 h-6 ${step.color}`} />
            </motion.div>
            
            <div className="flex-1">
              <h4 className="font-semibold text-white text-lg">{step.label}</h4>
              <p className="text-gray-400">{step.description}</p>
            </div>
            
            <motion.div
              className="flex space-x-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.3 }}
            >
              {[0, 1, 2].map((dot) => (
                <motion.div
                  key={dot}
                  className={`w-2 h-2 rounded-full ${step.color.replace('text-', 'bg-')}`}
                  animate={{ 
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    delay: (index * 0.2) + (dot * 0.2),
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="flex items-center justify-center space-x-3 text-blue-300">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Zap className="w-5 h-5" />
          </motion.div>
          <span className="font-medium">This usually takes 30-60 seconds</span>
        </div>
        
        <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-green-400" />
            <span>GEO Analysis</span>
          </div>
          <div className="flex items-center space-x-2">
            <Brain className="w-4 h-4 text-purple-400" />
            <span>AI Processing</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingState;