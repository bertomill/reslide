// This file will not be exposed to the client
import { ResearchFinding } from '@/types/research';

interface PerplexityMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface PerplexityResponse {
  id: string;
  choices: {
    message: {
      content: string;
    };
    finish_reason: string;
  }[];
}

export async function researchTopic(topic: string, keyPoints: string[]): Promise<ResearchFinding[]> {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  
  if (!apiKey) {
    throw new Error('Perplexity API key is not configured');
  }

  const messages: PerplexityMessage[] = [
    {
      role: 'system',
      content: `You are a research assistant that provides well-researched, factual information. 
      For each response, include at least one credible source. 
      Your response MUST be a valid JSON array of objects with the following structure:
      [
        {
          "id": 1,
          "text": "Finding text here",
          "source": "Source citation here"
        },
        ...
      ]
      Do not include any text outside of this JSON structure.`
    },
    {
      role: 'user',
      content: `Research the topic: "${topic}". 
      Focus on these key points: ${keyPoints.join(', ')}. 
      Provide 5-7 well-researched findings with sources.
      Remember to format your response ONLY as a valid JSON array.`
    }
  ];

  try {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'sonar-pro',
        messages,
        temperature: 0.1, // Lower temperature for more deterministic output
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`API error: ${response.status} ${response.statusText} - ${text}`);
    }

    const data: PerplexityResponse = await response.json();
    const content = data.choices[0].message.content;
    
    // Try to extract JSON from the response if it's not pure JSON
    try {
      return JSON.parse(content) as ResearchFinding[];
    } catch (parseError) {
      // If direct parsing fails, try to extract JSON from the text
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]) as ResearchFinding[];
      }
      
      // If we still can't parse JSON, create a structured response from the text
      console.log("Failed to parse JSON, creating structured response from text");
      
      // Split the content by numbered points and create findings
      const lines = content.split('\n').filter(line => line.trim());
      const findings: ResearchFinding[] = [];
      
      let currentFinding: Partial<ResearchFinding> = {};
      let id = 1;
      
      for (const line of lines) {
        // Check if line starts with a number (like "1." or "1:")
        if (/^\d+[\.\):]\s/.test(line)) {
          // If we have a previous finding, add it to the array
          if (currentFinding.text) {
            findings.push({
              id: id++,
              text: currentFinding.text,
              source: currentFinding.source || "Not specified"
            });
          }
          
          // Start a new finding
          currentFinding = {
            text: line.replace(/^\d+[\.\):]\s/, '')
          };
        } 
        // Check if line contains source information
        else if (/source|reference|citation/i.test(line)) {
          currentFinding.source = line;
        }
        // Otherwise, append to the current finding text
        else if (currentFinding.text) {
          currentFinding.text += " " + line;
        }
      }
      
      // Add the last finding if it exists
      if (currentFinding.text) {
        findings.push({
          id: id,
          text: currentFinding.text,
          source: currentFinding.source || "Not specified"
        });
      }
      
      return findings.length > 0 ? findings : [
        {
          id: 1,
          text: "Could not parse research findings properly. Here's the raw response.",
          source: "API Response"
        },
        {
          id: 2,
          text: content,
          source: "API Response"
        }
      ];
    }
  } catch (error) {
    console.error('Error researching topic:', error);
    throw error;
  }
} 