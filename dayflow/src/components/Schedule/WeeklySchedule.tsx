import { useState, useRef, useId } from 'react'

type TimeSlot = {
  id: string
  day: string
  startTime: string
  endTime: string
  title: string
  type: 'obligation' | 'activity' | 'free'
  description?: string
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const HOURS = Array.from({ length: 19 }, (_, i) => i + 5) // 5:00 to 23:00

export default function WeeklySchedule() {
  const idPrefix = useId()
  let eventCounter = useRef(0)
  const [events, setEvents] = useState<TimeSlot[]>([])
  const [isAddingEvent, setIsAddingEvent] = useState(false)
  const [selectedTimeRange, setSelectedTimeRange] = useState<{
    startDay: string,
    endDay: string,
    startHour: number,
    endHour: number
  } | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState<{day: string, hour: number} | null>(null)
  const [dragEnd, setDragEnd] = useState<{day: string, hour: number} | null>(null)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    type: 'obligation',
    description: ''
  })

  const handleDragStart = (day: string, hour: number) => {
    setIsDragging(true)
    setDragStart({ day, hour })
    setDragEnd({ day, hour })
    setHasInteracted(true)
  }

  const handleDragMove = (day: string, hour: number) => {
    if (isDragging) {
      setDragEnd({ day, hour })
    }
  }

  const handleDragEnd = () => {
    if (isDragging && dragStart && dragEnd) {
      // Find the day indices
      const startDayIndex = DAYS.indexOf(dragStart.day)
      const endDayIndex = DAYS.indexOf(dragEnd.day)
      
      // Determine the actual start and end times
      const startHour = Math.min(dragStart.hour, dragEnd.hour)
      const endHour = Math.max(dragStart.hour, dragEnd.hour)
      
      setSelectedTimeRange({
        startDay: DAYS[Math.min(startDayIndex, endDayIndex)],
        endDay: DAYS[Math.max(startDayIndex, endDayIndex)],
        startHour,
        endHour
      })
      setIsAddingEvent(true)
    }
    setIsDragging(false)
    setDragStart(null)
    setDragEnd(null)
  }

  const isSlotSelected = (day: string, hour: number) => {
    if (!isDragging || !dragStart || !dragEnd) return false
    
    const startDayIndex = DAYS.indexOf(dragStart.day)
    const endDayIndex = DAYS.indexOf(dragEnd.day)
    const dayIndex = DAYS.indexOf(day)
    
    const startHour = Math.min(dragStart.hour, dragEnd.hour)
    const endHour = Math.max(dragStart.hour, dragEnd.hour)
    
    return (
      dayIndex >= Math.min(startDayIndex, endDayIndex) &&
      dayIndex <= Math.max(startDayIndex, endDayIndex) &&
      hour >= startHour &&
      hour <= endHour
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTimeRange) return

    const newEvent: TimeSlot = {
      id: `${idPrefix}-event-${eventCounter.current++}`,
      day: selectedTimeRange.startDay,
      startTime: `${selectedTimeRange.startHour.toString().padStart(2, '0')}:00`,
      endTime: `${(selectedTimeRange.endHour + 1).toString().padStart(2, '0')}:00`,
      title: formData.title,
      type: formData.type as 'obligation' | 'activity' | 'free',
      description: formData.description
    }

    setEvents(prev => [...prev, newEvent])
    setIsAddingEvent(false)
    setFormData({ title: '', type: 'obligation', description: '' })
  }

  const formatTime = (hour: number) => {
    const formattedHour = hour.toString().padStart(2, '0')
    return `${formattedHour}:00`
  }

  const getEventForSlot = (day: string, hour: number) => {
    return events.find(event => {
      const eventStartHour = parseInt(event.startTime.split(':')[0])
      const eventEndHour = parseInt(event.endTime.split(':')[0])
      return event.day === day && hour >= eventStartHour && hour < eventEndHour
    })
  }

  const getEventStyle = (type: TimeSlot['type']) => {
    switch (type) {
      case 'obligation':
        return 'bg-blue-500/20 border-blue-500 text-blue-100'
      case 'activity':
        return 'bg-green-500/20 border-green-500 text-green-100'
      case 'free':
        return 'bg-gray-500/20 border-gray-500 text-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      {!hasInteracted && (
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-medium text-white mb-2">Let's Build Your Schedule! 🗓️</h3>
          <p className="text-gray-400">
            Start by adding your current obligations and regular activities. You can:
          </p>
          <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
            <li>Click any time slot to add a single event</li>
            <li>Click and drag across multiple slots to schedule longer events</li>
            <li>Color-code your events as obligations, activities, or free time</li>
          </ul>
        </div>
      )}

      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Weekly Schedule</h2>
          <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-400">Obligations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-400">Activities</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-500"></div>
              <span className="text-sm text-gray-400">Free Time</span>
            </div>
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Time labels */}
            <div className="grid grid-cols-[100px_repeat(7,1fr)] gap-1">
              <div className="h-8"></div>
              {DAYS.map(day => (
                <div key={day} className="h-8 flex items-center justify-center font-medium text-white">
                  {day}
                </div>
              ))}
            </div>

            {/* Time slots */}
            {HOURS.map(hour => (
              <div key={hour} className="grid grid-cols-[100px_repeat(7,1fr)] gap-1">
                <div className="h-12 flex items-center justify-center text-sm text-gray-400">
                  {hour === 12 ? '12:00 PM' : 
                   hour > 12 ? `${(hour-12).toString().padStart(2, '0')}:00 PM` : 
                   `${hour.toString().padStart(2, '0')}:00 AM`}
                </div>
                {DAYS.map(day => {
                  const event = getEventForSlot(day, hour)
                  const isFirstHourOfEvent = event && parseInt(event.startTime.split(':')[0]) === hour

                  return (
                    <button
                      key={`${day}-${hour}`}
                      onMouseDown={() => handleDragStart(day, hour)}
                      onMouseEnter={() => handleDragMove(day, hour)}
                      onMouseUp={handleDragEnd}
                      className={`h-12 border border-gray-800 rounded bg-gray-800/30 hover:bg-gray-800/50 transition-colors relative
                        ${isSlotSelected(day, hour) ? 'bg-white/10 border-white/30' : ''}`}
                    >
                      {event && isFirstHourOfEvent && (
                        <div className={`absolute inset-0 p-1 flex items-center justify-center text-xs font-medium border rounded ${getEventStyle(event.type)}`}>
                          {event.title}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Add Event Modal */}
        {isAddingEvent && selectedTimeRange && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-md">
              <h3 className="text-lg font-medium text-white mb-4">Add Event</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500"
                    placeholder="Event title"
                    required
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Day(s)</label>
                    <input
                      type="text"
                      readOnly
                      value={selectedTimeRange.startDay === selectedTimeRange.endDay ? 
                        selectedTimeRange.startDay : 
                        `${selectedTimeRange.startDay} - ${selectedTimeRange.endDay}`}
                      className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Start Time</label>
                      <input
                        type="time"
                        value={formatTime(selectedTimeRange.startHour)}
                        readOnly
                        className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">End Time</label>
                      <input
                        type="time"
                        value={formatTime(selectedTimeRange.endHour + 1)}
                        readOnly
                        className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Type</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500"
                  >
                    <option value="obligation">Obligation</option>
                    <option value="activity">Activity</option>
                    <option value="free">Free Time</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Description (optional)</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500"
                    rows={3}
                    placeholder="Add any notes or details..."
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingEvent(false)
                      setFormData({ title: '', type: 'obligation', description: '' })
                    }}
                    className="px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200"
                  >
                    Add Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 