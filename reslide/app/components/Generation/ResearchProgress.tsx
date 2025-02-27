'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ResearchFinding } from '@/types/research';

export default function ResearchProgress() {
  const [findings, setFindings] = useState<ResearchFinding[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        // Get research parameters from localStorage
        const researchParamsStr = localStorage.getItem('researchParams');
        if (!researchParamsStr) {
          throw new Error('No research parameters found');
        }

        const researchParams = JSON.parse(researchParamsStr);
        
        // Start progress animation
        const progressInterval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + 10;
          });
        }, 1000);

        // Call our research API
        const response = await fetch('/api/research', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(researchParams),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to research topic');
        }

        const data = await response.json();
        
        // Clear the interval and set progress to 100%
        clearInterval(progressInterval);
        setProgress(100);
        
        // Set the findings
        setFindings(data.findings);
        localStorage.setItem('researchFindings', JSON.stringify(data.findings));
        setIsComplete(true);
      } catch (err: any) {
        setError(err.message || 'An error occurred during research');
        console.error('Research error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResearch();
  }, [router]);

  const handleContinue = () => {
    router.push('/preview');
  };

  return (
    <div className="w-full max-w-4xl p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 flex items-center justify-center bg-indigo-100 rounded-full">
            {isComplete ? (
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-indigo-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Researching Your Topic</h2>
          <p className="mt-2 text-gray-600">
            We&apos;re using AI to gather and analyze information on your topic
          </p>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {error && (
        <div className="p-4 text-red-700 bg-red-100 rounded-md">
          <p className="font-medium">Error: {error}</p>
          <p className="mt-1">Please try again or contact support if the issue persists.</p>
        </div>
      )}
      
      <div className="space-y-4 mt-6">
        <h3 className="text-lg font-medium">Research Findings</h3>
        
        {findings.length > 0 ? (
          <div className="space-y-4">
            {findings.map((finding) => (
              <div key={finding.id} className="p-4 bg-gray-50 rounded-md">
                <p className="text-gray-800">{finding.text}</p>
                <p className="mt-2 text-sm text-gray-500">Source: {finding.source}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-gray-50 rounded-md">
            {isLoading ? (
              <p className="text-gray-600">Gathering research findings...</p>
            ) : (
              <p className="text-gray-600">No research findings available.</p>
            )}
          </div>
        )}
      </div>
      
      <div>
        <button
          onClick={handleContinue}
          disabled={!isComplete}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isComplete ? 'Continue to Preview' : 'Researching...'}
        </button>
      </div>
    </div>
  );
} 