import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FileText, Tag, HelpCircle, Copy, Check } from 'lucide-react';

interface ImprovementsResultsProps {
  improvements: {
    intro: string;
    meta: {
      title: string;
      description: string;
    };
    faqs: Array<{
      question: string;
      answer: string;
    }>;
  };
}

const ImprovementsResults: React.FC<ImprovementsResultsProps> = ({ improvements }) => {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems(prev => new Set(prev).add(itemId));
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(itemId);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const CopyButton: React.FC<{ text: string; itemId: string }> = ({ text, itemId }) => (
    <button
      onClick={() => copyToClipboard(text, itemId)}
      className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
      title="Copy to clipboard"
    >
      {copiedItems.has(itemId) ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Content Improvements</h3>
          <p className="text-gray-600 text-sm">AI-generated optimizations</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Optimized Introduction */}
        <motion.div
          className="bg-green-50 border border-green-200 rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-gray-900">Optimized Introduction</h4>
            </div>
            <CopyButton text={improvements.intro} itemId="intro" />
          </div>
          <p className="text-gray-700 leading-relaxed">{improvements.intro}</p>
        </motion.div>

        {/* Meta Tags */}
        <motion.div
          className="bg-blue-50 border border-blue-200 rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <Tag className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-gray-900">Optimized Meta Tags</h4>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Title Tag</label>
                <CopyButton text={improvements.meta.title} itemId="title" />
              </div>
              <div className="bg-white border rounded p-3">
                <p className="text-gray-900 font-medium">{improvements.meta.title}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {improvements.meta.title.length} characters
                </p>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Meta Description</label>
                <CopyButton text={improvements.meta.description} itemId="description" />
              </div>
              <div className="bg-white border rounded p-3">
                <p className="text-gray-700">{improvements.meta.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {improvements.meta.description.length} characters
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="bg-purple-50 border border-purple-200 rounded-lg p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-purple-600" />
              <h4 className="font-semibold text-gray-900">FAQ Section</h4>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-white text-purple-600">
                {improvements.faqs.length} questions
              </span>
            </div>
            <CopyButton 
              text={improvements.faqs.map(faq => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n\n')} 
              itemId="faqs" 
            />
          </div>
          
          <div className="space-y-4">
            {improvements.faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white border rounded-lg p-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (index * 0.1), duration: 0.3 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-medium text-gray-900 pr-4">{faq.question}</h5>
                  <CopyButton text={`Q: ${faq.question}\nA: ${faq.answer}`} itemId={`faq-${index}`} />
                </div>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ImprovementsResults;