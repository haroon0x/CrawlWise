import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Tag, Palette, Play } from 'lucide-react';
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

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Website Audit</h2>
        <p className="text-gray-600">Enter your website URL to get a comprehensive GEO analysis</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* URL Input */}
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
            <Globe className="w-4 h-4 inline mr-2" />
            Website URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/your-blog-post"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          />
          {url && !isValidUrl(url) && (
            <p className="text-red-500 text-sm mt-1">Please enter a valid URL</p>
          )}
        </div>

        {/* Keywords Input */}
        <div>
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-2">
            <Tag className="w-4 h-4 inline mr-2" />
            Target Keywords (optional)
          </label>
          <input
            type="text"
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="LLM SEO, AI search, generative optimization"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          <p className="text-gray-500 text-sm mt-1">Separate multiple keywords with commas</p>
        </div>

        {/* Tone Selection */}
        <div>
          <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-2">
            <Palette className="w-4 h-4 inline mr-2" />
            Content Tone
          </label>
          <select
            id="tone"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="friendly">Friendly</option>
            <option value="authoritative">Authoritative</option>
            <option value="conversational">Conversational</option>
          </select>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={!canSubmit}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
            canSubmit
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
          whileHover={canSubmit ? { scale: 1.02 } : {}}
          whileTap={canSubmit ? { scale: 0.98 } : {}}
        >
          <Play className="w-5 h-5" />
          <span>{isLoading ? 'Analyzing...' : 'Start GEO Audit'}</span>
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AuditForm;