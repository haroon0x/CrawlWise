import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import AuditForm from './components/AuditForm';
import ResultsDisplay from './components/ResultsDisplay';
import LoadingState from './components/LoadingState';
import { AuditRequest, AuditResponse } from './types';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AuditResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAudit = async (request: AuditRequest) => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('http://localhost:8000/api/v1/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: AuditResponse = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Hero Section */}
          <div className="text-center mb-12">
            <motion.h1 
              className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              CrawlWise GEO Agent
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Optimize your content for AI-powered search engines. Get detailed audits and actionable improvements for Generative Engine Optimization.
            </motion.p>
          </div>

          {/* Main Content */}
          <div className="grid gap-8">
            {/* Audit Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <AuditForm onSubmit={handleAudit} isLoading={isLoading} />
            </motion.div>

            {/* Loading State */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <LoadingState />
              </motion.div>
            )}

            {/* Error State */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-red-50 border border-red-200 rounded-lg p-6"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">!</span>
                  </div>
                  <div>
                    <h3 className="text-red-800 font-semibold">Error</h3>
                    <p className="text-red-600">{error}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Results */}
            {results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <ResultsDisplay results={results} />
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default App;