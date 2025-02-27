'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ResearchFinding } from '@/types/research';
import pptxgen from 'pptxgenjs';

export default function SlidePreview() {
  const [slideTitle, setSlideTitle] = useState('');
  const [slideSubtitle, setSlideSubtitle] = useState('');
  const [bulletPoints, setBulletPoints] = useState<string[]>([]);
  const [sources, setSources] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Define executive-friendly color scheme
  const colors = {
    primary: '003366', // Deep navy blue - traditional banking color
    secondary: '0066B3', // Medium blue
    accent: 'B38600', // Gold accent - financial/premium feel
    text: '333333', // Dark gray for text
    lightBg: 'F5F7FA', // Light blue-gray background
    border: 'D0D5DD', // Light gray for borders
  };

  useEffect(() => {
    try {
      // Get research parameters and findings from localStorage
      const researchParamsStr = localStorage.getItem('researchParams');
      const findingsStr = localStorage.getItem('researchFindings');
      
      if (!researchParamsStr) {
        throw new Error('No research parameters found');
      }
      
      const researchParams = JSON.parse(researchParamsStr);
      const findings: ResearchFinding[] = findingsStr ? JSON.parse(findingsStr) : [];
      
      // Generate slide title from research topic
      setSlideTitle(formatTitle(researchParams.topic));
      
      // Generate subtitle based on purpose/audience
      const subtitle = researchParams.purpose 
        ? `Key Insights for ${researchParams.purpose}`
        : researchParams.audience
        ? `Key Insights for ${researchParams.audience}`
        : 'Key Strategic Insights';
      setSlideSubtitle(subtitle);
      
      // Extract bullet points from findings
      if (findings.length > 0) {
        // Extract the most important points from findings
        const points = findings.map(finding => {
          // Extract the first sentence or limit to 100 characters
          const text = finding.text;
          const firstSentence = text.split('.')[0] + '.';
          return firstSentence.length < 100 ? firstSentence : text.substring(0, 100) + '...';
        });
        setBulletPoints(points);
        
        // Format sources
        const uniqueSources = [...new Set(findings.map(f => f.source))];
        setSources(`Sources: ${uniqueSources.join(', ')}`);
      } else {
        // If no findings, use placeholder bullet points
        setBulletPoints([
          'No research findings available',
          'Please go back and try again with a different topic',
          'Or check your network connection'
        ]);
        setSources('');
      }
      
    } catch (err: any) {
      setError(err.message || 'An error occurred while generating the slide');
      console.error('Slide generation error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const formatTitle = (topic: string): string => {
    // Capitalize first letter of each word and limit length
    return topic
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
      .substring(0, 50) + (topic.length > 50 ? '...' : '');
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);
      
      // Create a new PowerPoint presentation
      const pptx = new pptxgen();
      
      // Set presentation properties
      pptx.layout = 'LAYOUT_16x9';
      pptx.title = slideTitle;
      
      // Add a slide with a professional design for executives
      const slide = pptx.addSlide();
      
      // Set slide background
      slide.background = { color: 'FFFFFF' };
      
      // Add top header bar
      slide.addShape(pptx.ShapeType.rect, {
        x: 0,
        y: 0,
        w: '100%',
        h: 0.8,
        fill: { color: colors.primary }
      });
      
      // Add subtle bottom footer bar
      slide.addShape(pptx.ShapeType.rect, {
        x: 0,
        y: 6.8,
        w: '100%',
        h: 0.5,
        fill: { color: colors.lightBg }
      });
      
      // Add company logo placeholder in header
      slide.addText('ReSlide', {
        x: 0.3,
        y: 0.2,
        w: 1.5,
        h: 0.4,
        color: 'FFFFFF',
        fontFace: 'Arial',
        fontSize: 14,
        bold: true
      });
      
      // Add title with professional styling
      slide.addText(slideTitle, {
        x: 0.5,
        y: 1.0,
        w: 9.0,
        h: 0.8,
        fontSize: 28,
        fontFace: 'Arial',
        bold: true,
        color: colors.primary
      });
      
      // Add subtitle
      slide.addText(slideSubtitle, {
        x: 0.5,
        y: 1.8,
        w: 9.0,
        h: 0.5,
        fontSize: 18,
        fontFace: 'Arial',
        color: colors.secondary,
        italic: false
      });
      
      // Add a subtle divider line
      slide.addShape(pptx.ShapeType.line, {
        x: 0.5,
        y: 2.4,
        w: 9.0,
        h: 0,
        line: { color: colors.border, width: 1.5, dashType: 'dash' }
      });
      
      // Add bullet points with executive-friendly formatting
      const bulletPointsText = bulletPoints.map((point, idx) => ({
        text: point,
        options: {
          bullet: { type: 'number', numberStartAt: idx + 1, color: colors.secondary }
        }
      }));
      
      slide.addText(bulletPointsText, {
        x: 0.5,
        y: 2.7,
        w: 9.0,
        h: 3.5, // Increased height to accommodate all bullet points
        fontSize: 16,
        fontFace: 'Arial',
        color: colors.text,
        lineSpacing: 28, // Increased line spacing for executive readability
        breakLine: true
      });
      
      // Add a subtle accent shape
      slide.addShape(pptx.ShapeType.rect, {
        x: 9.7,
        y: 2.7,
        w: 0.1,
        h: 3.5,
        fill: { color: colors.accent }
      });
      
      // Add sources with professional styling
      slide.addText(sources, {
        x: 0.5,
        y: 6.2,
        w: 9.0,
        h: 0.4,
        fontSize: 10,
        fontFace: 'Arial',
        color: colors.text + '99', // Adding transparency
        italic: true
      });
      
      // Add a footer with the date and branding
      const today = new Date().toLocaleDateString();
      slide.addText(`Generated with ReSlide | ${today}`, {
        x: 0.5,
        y: 6.9,
        w: 9.0,
        h: 0.3,
        fontSize: 9,
        fontFace: 'Arial',
        color: colors.text + '80', // Adding transparency
        align: 'right'
      });
      
      // Save the presentation
      const fileName = `${slideTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_slide.pptx`;
      await pptx.writeFile({ fileName });
      
    } catch (err) {
      console.error('Error exporting PowerPoint:', err);
      alert('Failed to export PowerPoint. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleRegenerate = () => {
    router.push('/generation');
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Generating your slide...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div>
        <h2 className="text-2xl font-bold">Your Generated Slide</h2>
        <p className="mt-2 text-gray-600">
          Review and export your research-backed slide
        </p>
      </div>
      
      {error && (
        <div className="p-4 text-red-700 bg-red-100 rounded-md">
          <p className="font-medium">Error: {error}</p>
          <p className="mt-1">Please try again or contact support if the issue persists.</p>
        </div>
      )}
      
      {/* PowerPoint-like slide preview with executive styling */}
      <div className="relative w-full aspect-video bg-white rounded-md shadow-lg overflow-hidden border border-gray-300">
        {/* PowerPoint-like controls */}
        <div className="h-8 bg-gray-800 flex items-center px-2 space-x-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <div className="flex-1 text-center text-white text-xs opacity-70">
            {slideTitle.toLowerCase().replace(/\s+/g, '_')}_slide.pptx
          </div>
        </div>
        
        {/* PowerPoint-like toolbar */}
        <div className="h-10 bg-gray-100 border-b border-gray-300 flex items-center px-4 space-x-4 text-xs text-gray-600">
          <span>File</span>
          <span>Home</span>
          <span>Insert</span>
          <span>Design</span>
          <span>Transitions</span>
          <span>Animations</span>
          <span>Slide Show</span>
          <span>View</span>
        </div>
        
        {/* Slide content */}
        <div className="flex h-[calc(100%-4.5rem)]">
          {/* Slide thumbnail sidebar */}
          <div className="w-16 bg-gray-100 border-r border-gray-300 flex flex-col items-center pt-2">
            <div className="w-12 h-8 bg-white border border-blue-500 shadow-sm flex items-center justify-center text-xs text-gray-500">
              1
            </div>
          </div>
          
          {/* Main slide area - Executive style */}
          <div className="flex-1 bg-gray-200 p-4 flex items-center justify-center">
            <div className="w-full h-full bg-white shadow-md flex flex-col overflow-hidden">
              {/* Top header bar */}
              <div className="h-[10%] bg-[#003366] flex items-center">
                <div className="text-white text-xs font-bold px-4">ReSlide</div>
              </div>
              
              {/* Slide content */}
              <div className="flex-1 p-6">
                <h3 className="text-xl font-bold text-[#003366]">{slideTitle}</h3>
                <p className="mt-2 text-base text-[#0066B3]">{slideSubtitle}</p>
                
                <div className="w-full h-px border-t border-dashed border-[#D0D5DD] my-4"></div>
                
                <div className="flex">
                  <ol className="flex-1 mt-4 space-y-3 list-decimal list-inside text-sm">
                    {bulletPoints.map((point, index) => (
                      <li key={index} className="text-[#333333] flex">
                        <span className="text-[#0066B3] font-medium mr-2">{index + 1}.</span>
                        <span className="flex-1">{point}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="w-1 bg-[#B38600] self-stretch ml-4"></div>
                </div>
                
                <p className="mt-6 text-xs text-[#333333] opacity-60 italic">{sources}</p>
              </div>
              
              {/* Footer */}
              <div className="h-[6%] bg-[#F5F7FA] flex items-center justify-end px-4">
                <p className="text-[0.65rem] text-[#333333] opacity-50">
                  Generated with ReSlide | {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-4">
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-[#003366] border border-transparent rounded-md shadow-sm hover:bg-[#002244] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003366] disabled:opacity-50"
        >
          {isExporting ? (
            <span className="flex items-center justify-center">
              <svg className="w-4 h-4 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Exporting...
            </span>
          ) : (
            'Export as PowerPoint'
          )}
        </button>
        
        <button
          onClick={handleRegenerate}
          className="flex-1 px-4 py-2 text-sm font-medium text-[#003366] bg-white border border-[#003366] rounded-md shadow-sm hover:bg-[#F5F7FA] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003366]"
        >
          Regenerate Slide
        </button>
      </div>
    </div>
  );
} 