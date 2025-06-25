import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Tag, Palette, Play, Sparkles } from 'lucide-react';
import { AuditRequest } from '../types';

interface AuditFormProps {
  onSubmit: (request: AuditRequest) => void;
  isLoading: boolean;
}

const AuditForm: React.FC<AuditFormProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');
  const [keywords, setKeywords] = useState('');
  const [tone, setTone] = useState('professional');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const keywordArray = keywords
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0);

    onSubmit({
      agent: 'seo',
      url,
      keywords: keywordArray,
      tone,
    });
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const canSubmit = url.trim() && isValidUrl(url) && !isLoading;

  const toneOptions = [
    { value: 'professional', label: 'Professional', description: 'Formal and authoritative' },
    { value: 'casual', label: 'Casual', description: 'Relaxed and approachable' },
    { value: 'friendly', label: 'Friendly', description: 'Warm and welcoming' },
    { value: 'authoritative', label: 'Authoritative', description: 'Expert and commanding' },
    { value: 'conversational', label: 'Conversational', description: 'Natural and engaging' },
  ];

  return (
    <motion.div
      className="glass-effect rounded-2xl p-8 border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-3">Website Analysis</h2>
        <p className="text-gray-400 text-lg">Enter your website URL to get a comprehensive GEO analysis and optimization recommendations</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* URL Input */}
        <div className="space-y-3">
          <label htmlFor="url" className="block text-sm font-semibold text-gray-300 mb-3">
            <Globe className="w-5 h-5 inline mr-2 text-blue-400" />
            Website URL
          </label>
          <div className="relative">
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/your-blog-post"
              className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-lg"
              required
            />
            {url && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                {isValidUrl(url) ? (
                  <div className="w-3 h-3 bg-green-400 rounded-full" />
                ) : (
                  <div className="w-3 h-3 bg-red-400 rounded-full" />
                )}
              </div>
            )}
          </div>
          {url && !isValidUrl(url) && (
            <p className="text-red-400 text-sm mt-2 flex items-center">
              <span className="w-1 h-1 bg-red-400 rounded-full mr-2" />
              Please enter a valid URL
            </p>
          )}
        </div>

        {/* Keywords Input */}
        <div className="space-y-3">
          <label htmlFor="keywords" className="block text-sm font-semibold text-gray-300 mb-3">
            <Tag className="w-5 h-5 inline mr-2 text-purple-400" />
            Target Keywords <span className="text-gray-500 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="LLM SEO, AI search, generative optimization"
            className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 text-lg"
          />
          <p className="text-gray-500 text-sm flex items-center">
            <span className="w-1 h-1 bg-gray-500 rounded-full mr-2" />
            Separate multiple keywords with commas
          </p>
        </div>

        {/* Tone Selection */}
        <div className="space-y-3">
          <label htmlFor="tone" className="block text-sm font-semibold text-gray-300 mb-3">
            <Palette className="w-5 h-5 inline mr-2 text-green-400" />
            Content Tone
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {toneOptions.map((option) => (
              <motion.label
                key={option.value}
                className={`relative cursor-pointer p-4 rounded-xl border transition-all duration-300 ${
                  tone === option.value
                    ? 'border-blue-500/50 bg-blue-500/10'
                    : 'border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  type="radio"
                  name="tone"
                  value={option.value}
                  checked={tone === option.value}
                  onChange={(e) => setTone(e.target.value)}
                  className="sr-only"
                />
                <div className="text-white font-medium">{option.label}</div>
                <div className="text-gray-400 text-sm mt-1">{option.description}</div>
                {tone === option.value && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full" />
                )}
              </motion.label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={!canSubmit}
          className={`w-full py-5 px-8 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 ${
            canSubmit
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 glow-effect'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
          whileHover={canSubmit ? { scale: 1.02 } : {}}
          whileTap={canSubmit ? { scale: 0.98 } : {}}
        >
          {isLoading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
              <span>Analyzing Website...</span>
            </>
          ) : (
            <>
              <Play className="w-6 h-6" />
              <span>Start GEO Analysis</span>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AuditForm;