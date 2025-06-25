import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Brain } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="relative border-b border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-2xl font-black text-white">
              CrawlWise
            </div>
            <div className="hidden sm:block w-px h-6 bg-gray-600" />
            <div className="hidden sm:block text-sm text-gray-400 font-medium">
              GEO Agent
            </div>
          </motion.div>

          <motion.div 
            className="flex items-center space-x-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Brain className="w-4 h-4 text-blue-400" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Real-time</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Target className="w-4 h-4 text-green-400" />
                <span>GEO Optimized</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-gray-300 font-medium">Online</span>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;