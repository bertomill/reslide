import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
  try {
    const { prompt, max_tokens } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are helping to continue writing journal entries. Continue the user's thoughts naturally and concisely."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: max_tokens || 150,
      temperature: 0.7,
    });

    const text = response.choices[0]?.message?.content || '';

    return NextResponse.json({ text });
  } catch (error) {
    console.error('Error in generate route:', error);
    return NextResponse.json(
      { error: 'Failed to generate text' },
      { status: 500 }
    );
  }
}
