'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function TemplateUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(droppedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // This is a placeholder for actual template processing
      // We'll implement the template analysis service later
      console.log('Template file:', file);
      
      // In a real app, we would upload the file to Firebase Storage
      // and analyze it with Vision API
      
      // Navigate to the generation page
      setTimeout(() => {
        router.push('/generation');
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      console.error('Error uploading template:', err);
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    router.push('/generation');
  };

  return (
    <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div>
        <h2 className="text-2xl font-bold">Template Upload</h2>
        <p className="mt-2 text-gray-600">
          Upload a slide template to match your company's style (optional)
        </p>
      </div>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div 
          className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,.pptx"
            className="hidden"
          />
          
          {preview ? (
            <div className="relative w-full h-64">
              <Image 
                src={preview} 
                alt="Template preview" 
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          ) : (
            <div className="text-center">
              <svg 
                className="w-12 h-12 mx-auto text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-600">
                Drag and drop a template image or PowerPoint slide, or click to browse
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Supported formats: PNG, JPG, PPTX
              </p>
            </div>
          )}
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isLoading || !file}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Continue with Template'}
          </button>
          
          <button
            type="button"
            onClick={handleSkip}
            className="flex-1 px-4 py-2 text-sm font-medium text-indigo-700 bg-white border border-indigo-300 rounded-md shadow-sm hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Skip (Use Default Template)
          </button>
        </div>
      </form>
    </div>
  );
} 