export interface AuditRequest {
  agent: string;
  url: string;
  keywords: string[];
  tone: string;
}

export interface AuditResponse {
  audit: {
    structure: string[];
    issues: string[];
    recommendations: string[];
  };
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