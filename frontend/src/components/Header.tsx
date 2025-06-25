import React from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, Target } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">CrawlWise</h1>
              <p className="text-sm text-gray-500">GEO Agent</p>
            </div>
          </motion.div>

          <motion.div 
            className="hidden md:flex items-center space-x-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Target className="w-4 h-4 text-green-500" />
              <span>GEO Optimized</span>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;