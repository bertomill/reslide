import { NextRequest, NextResponse } from 'next/server';
import { researchTopic } from '../../../lib/perplexity';
import { ResearchParams } from '../../../types/research';

export async function POST(request: NextRequest) {
  try {
    const body: ResearchParams = await request.json();
    
    if (!body.topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    const keyPoints = body.keyPoints && body.keyPoints.length > 0 
      ? body.keyPoints 
      : ['current trends', 'key statistics', 'future outlook'];

    const findings = await researchTopic(body.topic, keyPoints);
    
    return NextResponse.json({ findings });
  } catch (error: any) {
    console.error('Research API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to research topic' },
      { status: 500 }
    );
  }
} 