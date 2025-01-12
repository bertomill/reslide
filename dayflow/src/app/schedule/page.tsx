'use client'

import dynamic from 'next/dynamic'

const WeeklySchedule = dynamic(
  () => import('@/components/Schedule/WeeklySchedule'),
  { ssr: false }
)

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Schedule</h1>
          <p className="text-gray-400">
            Add your weekly commitments and find time for activities that energize you
          </p>
        </div>
        
        <WeeklySchedule />
      </div>
    </div>
  )
} 