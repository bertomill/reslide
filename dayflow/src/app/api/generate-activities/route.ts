import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: Request) {
  try {
    const { interests } = await request.json()

    const prompt = `Based on these interests: ${interests.join(', ')}, suggest 6-8 brief activity ideas. Each suggestion should be 5-8 words maximum. Make them specific but concise. For example: "Build a music visualization web app" or "Create a recipe recommendation bot".`

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a creative activity suggester. Keep suggestions very brief (5-8 words) but specific and actionable."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    })

    const activitiesText = completion.choices[0].message.content || ''
    // Split the response into individual activities and clean them up
    const activities = activitiesText
      .split(/\d+\.\s+/) // Split on numbered lists
      .filter(activity => activity.trim()) // Remove empty strings
      .map(activity => activity.replace(/[\n\r]/g, '').trim()) // Clean up whitespace

    return NextResponse.json({ activities })
  } catch (error) {
    console.error('Error generating activities:', error)
    return NextResponse.json(
      { 
        error: 'Failed to generate activities',
        activities: [
          'Build a recipe sharing app',
          'Create a cooking science blog',
          'Design a meal planning tool',
          'Start a food tech newsletter',
          'Make a cooking tutorial series'
        ] 
      },
      { status: 500 }
    )
  }
} 