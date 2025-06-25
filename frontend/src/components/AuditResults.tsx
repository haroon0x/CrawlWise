import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Lightbulb, BarChart3 } from 'lucide-react';

interface AuditResultsProps {
  audit: {
    structure: string[];
    issues: string[];
    recommendations: string[];
  };
}

const AuditResults: React.FC<AuditResultsProps> = ({ audit }) => {
  const sections = [
    {
      title: 'Structure Analysis',
      items: audit.structure,
      icon: BarChart3,
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
    },
    {
      title: 'Issues Found',
      items: audit.issues,
      icon: AlertTriangle,
      color: 'red',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      borderColor: 'border-red-200',
    },
    {
      title: 'Recommendations',
      items: audit.recommendations,
      icon: Lightbulb,
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600',
      borderColor: 'border-yellow-200',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Audit Analysis</h3>
          <p className="text-gray-600 text-sm">Technical SEO and GEO assessment</p>
        </div>
      </div>

      <div className="space-y-6">
        {sections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            className={`${section.bgColor} ${section.borderColor} border rounded-lg p-4`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1, duration: 0.5 }}
          >
            <div className="flex items-center space-x-2 mb-3">
              <section.icon className={`w-5 h-5 ${section.iconColor}`} />
              <h4 className="font-semibold text-gray-900">{section.title}</h4>
              <span className={`px-2 py-1 text-xs font-medium rounded-full bg-white ${section.iconColor}`}>
                {section.items.length}
              </span>
            </div>
            
            {section.items.length > 0 ? (
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    className="flex items-start space-x-2 text-sm text-gray-700"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (sectionIndex * 0.1) + (itemIndex * 0.05), duration: 0.3 }}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${section.iconColor.replace('text-', 'bg-')} mt-2 flex-shrink-0`} />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No issues found in this category</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AuditResults;