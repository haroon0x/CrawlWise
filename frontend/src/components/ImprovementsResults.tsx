import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FileText, Tag, HelpCircle, Copy, Check, Code, Eye } from 'lucide-react';

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
  const [previewMode, setPreviewMode] = useState<{ [key: string]: 'preview' | 'code' }>({});

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

  const togglePreviewMode = (itemId: string) => {
    setPreviewMode(prev => ({
      ...prev,
      [itemId]: prev[itemId] === 'code' ? 'preview' : 'code'
    }));
  };

  const CopyButton: React.FC<{ text: string; itemId: string }> = ({ text, itemId }) => (
    <motion.button
      onClick={() => copyToClipboard(text, itemId)}
      className="p-2 text-gray-400 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/10"
      title="Copy to clipboard"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {copiedItems.has(itemId) ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </motion.button>
  );

  const PreviewToggle: React.FC<{ itemId: string }> = ({ itemId }) => (
    <motion.button
      onClick={() => togglePreviewMode(itemId)}
      className="p-2 text-gray-400 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/10"
      title={previewMode[itemId] === 'code' ? 'Show preview' : 'Show code'}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {previewMode[itemId] === 'code' ? (
        <Eye className="w-4 h-4" />
      ) : (
        <Code className="w-4 h-4" />
      )}
    </motion.button>
  );

  return (
    <div className="glass-effect rounded-2xl p-8 border border-white/10">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Content Improvements</h3>
          <p className="text-gray-400">AI-generated optimizations</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Optimized Introduction */}
        <motion.div
          className="bg-green-500/10 border border-green-500/20 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-green-400" />
              </div>
              <h4 className="font-bold text-white text-lg">Optimized Introduction</h4>
            </div>
            <div className="flex items-center space-x-2">
              <CopyButton text={improvements.intro} itemId="intro" />
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <p className="text-gray-300 leading-relaxed">{improvements.intro}</p>
          </div>
        </motion.div>

        {/* Meta Tags */}
        <motion.div
          className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Tag className="w-5 h-5 text-blue-400" />
            </div>
            <h4 className="font-bold text-white text-lg">Optimized Meta Tags</h4>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-gray-300">Title Tag</label>
                <div className="flex items-center space-x-2">
                  <PreviewToggle itemId="title" />
                  <CopyButton text={improvements.meta.title} itemId="title" />
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                {previewMode.title === 'code' ? (
                  <code className="text-green-400 font-mono text-sm">
                    &lt;title&gt;{improvements.meta.title}&lt;/title&gt;
                  </code>
                ) : (
                  <div>
                    <p className="text-white font-semibold">{improvements.meta.title}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-400">
                        {improvements.meta.title.length} characters
                      </p>
                      <div className={`text-xs px-2 py-1 rounded ${
                        improvements.meta.title.length <= 60 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {improvements.meta.title.length <= 60 ? 'Optimal' : 'Too long'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-gray-300">Meta Description</label>
                <div className="flex items-center space-x-2">
                  <PreviewToggle itemId="description" />
                  <CopyButton text={improvements.meta.description} itemId="description" />
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                {previewMode.description === 'code' ? (
                  <code className="text-green-400 font-mono text-sm">
                    &lt;meta name="description" content="{improvements.meta.description}" /&gt;
                  </code>
                ) : (
                  <div>
                    <p className="text-gray-300">{improvements.meta.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-400">
                        {improvements.meta.description.length} characters
                      </p>
                      <div className={`text-xs px-2 py-1 rounded ${
                        improvements.meta.description.length <= 155 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {improvements.meta.description.length <= 155 ? 'Optimal' : 'Too long'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-purple-400" />
              </div>
              <h4 className="font-bold text-white text-lg">FAQ Section</h4>
              <div className="px-3 py-1 text-xs font-bold rounded-full bg-white/10 text-purple-400">
                {improvements.faqs.length} questions
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <PreviewToggle itemId="faqs" />
              <CopyButton 
                text={improvements.faqs.map(faq => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n\n')} 
                itemId="faqs" 
              />
            </div>
          </div>
          
          <div className="space-y-4">
            {improvements.faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white/5 border border-white/10 rounded-lg p-5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (index * 0.1), duration: 0.4 }}
              >
                {previewMode.faqs === 'code' ? (
                  <div className="font-mono text-sm">
                    <div className="text-blue-400 mb-2">
                      &lt;div className="faq-item"&gt;
                    </div>
                    <div className="text-green-400 ml-4 mb-1">
                      &lt;h3&gt;{faq.question}&lt;/h3&gt;
                    </div>
                    <div className="text-green-400 ml-4 mb-2">
                      &lt;p&gt;{faq.answer}&lt;/p&gt;
                    </div>
                    <div className="text-blue-400">
                      &lt;/div&gt;
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <h5 className="font-semibold text-white pr-4 leading-relaxed">{faq.question}</h5>
                      <CopyButton text={`Q: ${faq.question}\nA: ${faq.answer}`} itemId={`faq-${index}`} />
                    </div>
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ImprovementsResults;