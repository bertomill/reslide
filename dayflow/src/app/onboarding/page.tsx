'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid'

type OnboardingStep = 'interests' | 'activities' | 'goals'

const PREDEFINED_INTERESTS = [
  'Coding', 'Design', 'Writing', 'Music', 'Art',
  'Sports', 'Reading', 'Gaming', 'Cooking', 'Photography',
  'Travel', 'Fitness', 'Technology', 'Science', 'Nature'
]

export default function Onboarding() {
  const { data: session } = useSession()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('interests')
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [customInterest, setCustomInterest] = useState('')
  const [selectedActivities, setSelectedActivities] = useState<string[]>([])
  const [suggestedActivities, setSuggestedActivities] = useState<string[]>([])
  const [customActivity, setCustomActivity] = useState('')
  const [isLoadingActivities, setIsLoadingActivities] = useState(false)
  const [goals, setGoals] = useState<string[]>([])
  const [newGoal, setNewGoal] = useState('')

  const handleInterestSelect = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest))
    } else {
      setSelectedInterests([...selectedInterests, interest])
    }
  }

  const handleAddCustomInterest = () => {
    if (customInterest.trim() && !selectedInterests.includes(customInterest.trim())) {
      setSelectedInterests([...selectedInterests, customInterest.trim()])
      setCustomInterest('')
    }
  }

  const handleActivitySelect = (activity: string) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter(a => a !== activity))
    } else {
      setSelectedActivities([...selectedActivities, activity])
    }
  }

  const handleAddCustomActivity = () => {
    if (customActivity.trim() && !selectedActivities.includes(customActivity.trim())) {
      setSelectedActivities([...selectedActivities, customActivity.trim()])
      setCustomActivity('')
    }
  }

  // Function to generate activities based on interests
  const generateActivities = async () => {
    setIsLoadingActivities(true)
    try {
      const response = await fetch('/api/generate-activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interests: selectedInterests })
      })
      const data = await response.json()
      setSuggestedActivities(data.activities)
    } catch (error) {
      console.error('Failed to generate activities:', error)
      // Fallback suggestions if AI fails
      setSuggestedActivities([
        'Start a new project combining your interests',
        'Join an online community',
        'Take an online course',
        'Start a blog about your journey'
      ])
    } finally {
      setIsLoadingActivities(false)
    }
  }

  // Generate activities when moving to activities step
  const handleNextStep = () => {
    if (currentStep === 'interests') {
      setCurrentStep('activities')
      generateActivities()
    } else if (currentStep === 'activities') {
      setCurrentStep('goals')
    } else {
      router.push('/schedule')
    }
  }

  const handleAddGoal = () => {
    if (newGoal.trim() && !goals.includes(newGoal.trim())) {
      setGoals([...goals, newGoal.trim()])
      setNewGoal('')
    }
  }

  const handleRemoveGoal = (goalToRemove: string) => {
    setGoals(goals.filter(goal => goal !== goalToRemove))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto pt-20 px-4">
        <div className="space-y-6">
          {/* Progress indicator */}
          <div className="flex justify-between mb-8">
            <div className={`h-1 bg-gray-700 flex-1 rounded-full ${currentStep === 'interests' ? 'bg-white' : ''}`} />
            <div className={`h-1 bg-gray-700 flex-1 mx-2 rounded-full ${currentStep === 'activities' ? 'bg-white' : ''}`} />
            <div className={`h-1 bg-gray-700 flex-1 rounded-full ${currentStep === 'goals' ? 'bg-white' : ''}`} />
          </div>

          {/* Welcome message */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Welcome to Dayflow{session?.user?.name ? `, ${session.user.name}` : ''}</h1>
            <p className="text-gray-400">Let&apos;s personalize your experience</p>
          </div>

          {/* Step content */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
            {currentStep === 'interests' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">What interests you?</h2>
                <p className="text-gray-400">Select topics that energize you</p>
                
                {/* Pre-defined interests */}
                <div className="flex flex-wrap gap-2">
                  {PREDEFINED_INTERESTS.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => handleInterestSelect(interest)}
                      className={`px-4 py-2 rounded-full border transition-colors ${
                        selectedInterests.includes(interest)
                          ? 'bg-white text-black border-white'
                          : 'border-gray-700 hover:border-gray-500'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>

                {/* Custom interest input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customInterest}
                    onChange={(e) => setCustomInterest(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddCustomInterest()}
                    placeholder="Add your own interest..."
                    className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500"
                  />
                  <button
                    onClick={handleAddCustomInterest}
                    className="p-2 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800"
                  >
                    <PlusIcon className="w-5 h-5" />
                  </button>
                </div>

                {/* Selected interests */}
                {selectedInterests.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Selected Interests:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedInterests.map((interest) => (
                        <div
                          key={interest}
                          className="flex items-center gap-1 px-3 py-1 bg-gray-800/50 rounded-full border border-gray-700"
                        >
                          <span>{interest}</span>
                          <button
                            onClick={() => handleInterestSelect(interest)}
                            className="p-1 hover:text-gray-400"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 'activities' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">What activities energize you?</h2>
                <p className="text-gray-400">Based on your interests, here are some activities you might enjoy</p>

                {isLoadingActivities ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                ) : (
                  <>
                    {/* AI-suggested activities */}
                    <div className="flex flex-wrap gap-2">
                      {suggestedActivities.map((activity) => (
                        <button
                          key={activity}
                          onClick={() => handleActivitySelect(activity)}
                          className={`px-4 py-2 rounded-full border transition-colors ${
                            selectedActivities.includes(activity)
                              ? 'bg-white text-black border-white'
                              : 'border-gray-700 hover:border-gray-500'
                          }`}
                        >
                          {activity}
                        </button>
                      ))}
                    </div>

                    {/* Custom activity input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customActivity}
                        onChange={(e) => setCustomActivity(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddCustomActivity()}
                        placeholder="Add your own activity..."
                        className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500"
                      />
                      <button
                        onClick={handleAddCustomActivity}
                        className="p-2 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800"
                      >
                        <PlusIcon className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Selected activities */}
                    {selectedActivities.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-400 mb-2">Selected Activities:</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedActivities.map((activity) => (
                            <div
                              key={activity}
                              className="flex items-center gap-1 px-3 py-1 bg-gray-800/50 rounded-full border border-gray-700"
                            >
                              <span>{activity}</span>
                              <button
                                onClick={() => handleActivitySelect(activity)}
                                className="p-1 hover:text-gray-400"
                              >
                                <XMarkIcon className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {currentStep === 'goals' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">What are your upcoming goals?</h2>
                <p className="text-gray-400">Set some goals you&apos;d like to achieve</p>
                
                {/* Goal input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddGoal()}
                    placeholder="Add a goal..."
                    className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-gray-500"
                  />
                  <button
                    onClick={handleAddGoal}
                    className="p-2 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800"
                  >
                    <PlusIcon className="w-5 h-5" />
                  </button>
                </div>

                {/* Goals list */}
                {goals.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Your Goals:</h3>
                    <div className="space-y-2">
                      {goals.map((goal) => (
                        <div
                          key={goal}
                          className="flex items-center justify-between gap-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700"
                        >
                          <span>{goal}</span>
                          <button
                            onClick={() => handleRemoveGoal(goal)}
                            className="p-1 hover:text-gray-400"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {goals.length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    Add some goals to get started
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => {
                if (currentStep === 'activities') setCurrentStep('interests')
                if (currentStep === 'goals') setCurrentStep('activities')
              }}
              className={`px-6 py-2 rounded-full border border-gray-700 text-white hover:bg-gray-800 transition-colors
                ${currentStep === 'interests' ? 'invisible' : ''}`}
            >
              Back
            </button>
            <button
              onClick={handleNextStep}
              className="px-6 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
            >
              {currentStep === 'goals' ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 