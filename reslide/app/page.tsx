import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-indigo-50 to-white">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-5xl font-bold text-indigo-800">ReSlide</h1>
        <p className="mt-4 text-xl text-gray-600">
          Create research-backed presentation slides in minutes with AI
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link 
            href="/login" 
            className="px-8 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign In
          </Link>
          <Link 
            href="/signup" 
            className="px-8 py-3 text-base font-medium text-indigo-700 bg-white border border-indigo-300 rounded-md shadow-sm hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </Link>
        </div>
        
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-indigo-100 rounded-full">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="mt-4 text-lg font-medium text-gray-900">AI-Powered Research</h2>
            <p className="mt-2 text-sm text-gray-500">
              Leverage Perplexity Sonar API to gather comprehensive research on any topic
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-indigo-100 rounded-full">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="mt-4 text-lg font-medium text-gray-900">Professional Slides</h2>
            <p className="mt-2 text-sm text-gray-500">
              Generate beautifully designed slides that match your company&apos;s style
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-indigo-100 rounded-full">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="mt-4 text-lg font-medium text-gray-900">Time-Saving</h2>
            <p className="mt-2 text-sm text-gray-500">
              Create complete presentation decks in minutes instead of hours
            </p>
          </div>
        </div>
        
        <div className="mt-16 pb-8">
          <h2 className="text-2xl font-semibold text-gray-900">Ready to transform your presentations?</h2>
          <p className="mt-4 text-gray-600">
            Join thousands of professionals who save time and create better slides with ReSlide
          </p>
          <div className="mt-6">
            <Link 
              href="/signup" 
              className="px-8 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
        
        <footer className="mt-12 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} ReSlide. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}