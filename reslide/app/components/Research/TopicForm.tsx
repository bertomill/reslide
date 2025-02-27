'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TopicForm() {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [purpose, setPurpose] = useState('');
  const [keyPoints, setKeyPoints] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // This is a placeholder for actual API call
      // We'll implement the research service later
      console.log('Research topic:', {
        topic,
        audience,
        purpose,
        keyPoints: keyPoints.split('\n')
      });
      
      // Store the research parameters in localStorage for now
      // In a real app, we would store this in a database
      localStorage.setItem('researchParams', JSON.stringify({
        topic,
        audience,
        purpose,
        keyPoints: keyPoints.split('\n')
      }));
      
      // Navigate to the template upload page
      setTimeout(() => {
        router.push('/template-upload');
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      console.error('Error submitting research topic:', err);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div>
        <h2 className="text-2xl font-bold">Research Setup</h2>
        <p className="mt-2 text-gray-600">Define your research topic and context</p>
      </div>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
            Research Topic *
          </label>
          <input
            id="topic"
            name="topic"
            type="text"
            required
            placeholder="e.g., Digital Banking Trends 2023"
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="audience" className="block text-sm font-medium text-gray-700">
            Target Audience
          </label>
          <input
            id="audience"
            name="audience"
            type="text"
            placeholder="e.g., Bank executives, Innovation team"
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
            Presentation Purpose
          </label>
          <input
            id="purpose"
            name="purpose"
            type="text"
            placeholder="e.g., Strategy planning, Client presentation"
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="keyPoints" className="block text-sm font-medium text-gray-700">
            Key Points to Include (one per line)
          </label>
          <textarea
            id="keyPoints"
            name="keyPoints"
            rows={4}
            placeholder="e.g., Current market trends&#10;Competitor analysis&#10;Future predictions"
            className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={keyPoints}
            onChange={(e) => setKeyPoints(e.target.value)}
          />
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isLoading || !topic}
            className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Continue to Template Upload'}
          </button>
        </div>
      </form>
    </div>
  );
} 