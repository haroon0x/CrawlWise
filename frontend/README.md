# CrawlWise Frontend

A modern React frontend for the CrawlWise GEO Agent - an AI-powered tool for optimizing content for Generative Engine Optimization.

## Features

- 🎨 Modern, responsive UI built with React and Tailwind CSS
- ⚡ Smooth animations and micro-interactions with Framer Motion
- 🔍 Real-time website auditing interface
- 📊 Comprehensive results display with audit analysis and content improvements
- 📱 Mobile-first responsive design
- 🎯 Copy-to-clipboard functionality for generated content
- 🚀 Fast development with Vite

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library
- **Vite** - Fast build tool and dev server

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Backend Integration

The frontend expects the CrawlWise backend API to be running on `http://localhost:8000`. Make sure to start the backend server before using the frontend.

## Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx       # App header with branding
│   │   ├── AuditForm.tsx    # Main form for URL input
│   │   ├── LoadingState.tsx # Loading animation
│   │   ├── ResultsDisplay.tsx # Results container
│   │   ├── AuditResults.tsx # Audit analysis display
│   │   └── ImprovementsResults.tsx # Content improvements
│   ├── types/               # TypeScript type definitions
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # App entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
└── package.json           # Dependencies and scripts
```

## API Integration

The frontend communicates with the CrawlWise backend through a single endpoint:

- `POST /api/v1/audit` - Submit URL for GEO analysis

### Request Format
```json
{
  "agent": "seo",
  "url": "https://example.com/page",
  "keywords": ["keyword1", "keyword2"],
  "tone": "professional"
}
```

### Response Format
```json
{
  "audit": {
    "structure": ["analysis points"],
    "issues": ["identified issues"],
    "recommendations": ["improvement suggestions"]
  },
  "improvements": {
    "intro": "optimized introduction text",
    "meta": {
      "title": "SEO-optimized title",
      "description": "meta description"
    },
    "faqs": [
      {
        "question": "FAQ question",
        "answer": "FAQ answer"
      }
    ]
  }
}
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Follow the existing code style and component structure
2. Use TypeScript for all new components
3. Ensure responsive design works on all screen sizes
4. Add proper error handling for API calls
5. Include loading states for better UX

## License

This project is part of the CrawlWise GEO Agent system.