'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Home() {
  const { data: session, status } = useSession()

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="absolute top-4 right-4 space-x-4">
        {session ? (
          <div className="flex items-center gap-4">
            <span className="text-gray-400">
              Welcome, {session.user?.name}
            </span>
            <Link 
              href="/api/auth/signout"
              className="text-sm px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
            >
              Sign Out
            </Link>
          </div>
        ) : (
          <>
            <Link 
              href="/auth/signin" 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/auth/signup" 
              className="text-sm px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto pt-32 px-4">
        <h1 className="text-5xl font-bold mb-12 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
          Welcome to Dayflow
        </h1>

        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800">
            <h2 className="text-xl font-semibold text-white/90 mb-2">Our Mission!</h2>
            <p className="text-gray-400">
              Help people fill their day with activities that energize them
            </p>
          </div>

          <div className="p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800">
            <h2 className="text-xl font-semibold text-white/90 mb-2">A place for tinkerers and builders</h2>
            <p className="text-gray-400">
              to support each other
            </p>
          </div>

          <div className="p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800">
            <h2 className="text-xl font-semibold text-white/90 mb-2">Our Vision</h2>
            <p className="text-gray-400">
              A world where everyone is doing the things that energize them
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 flex justify-center space-x-4">
          <Link 
            href={session ? '/onboarding' : '/auth/signup'}
            className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-medium"
          >
            Get Started
          </Link>
          <Link 
            href="/about" 
            className="px-8 py-3 border border-gray-700 text-white rounded-full hover:bg-gray-900 transition-colors font-medium"
          >
            Learn More
          </Link>
        </div>
      </div>
    </main>
  )
}
