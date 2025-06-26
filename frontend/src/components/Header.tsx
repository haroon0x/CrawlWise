import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Brain } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_HEALTH_URL || 'https://crawlwise.onrender.com/health';

const Header: React.FC = () => {
  const [online, setOnline] = useState<boolean | null>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const ping = async () => {
      try {
        // Use a GET request for health check
        const res = await fetch(BACKEND_URL, { method: 'GET' });
        setOnline(res.ok);
      } catch {
        setOnline(false);
      }
      timeout = setTimeout(ping, 10000); // ping every 10s
    };
    ping();
    return () => clearTimeout(timeout);
  }, []);

  let indicatorColor = 'bg-gray-400';
  let indicatorText = 'Checking...';
  if (online === true) {
    indicatorColor = 'bg-green-400';
    indicatorText = 'Online';
  } else if (online === false) {
    indicatorColor = 'bg-red-400';
    indicatorText = 'Offline';
  }

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
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <div className={`w-2 h-2 rounded-full ${indicatorColor} ${online === true ? 'animate-pulse' : ''}`} />
              <span className="text-xs text-gray-300 font-medium">{indicatorText}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;