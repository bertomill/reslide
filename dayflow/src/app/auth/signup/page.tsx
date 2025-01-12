'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import * as Separator from '@radix-ui/react-separator'

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
        <div className="space-y-1 text-center mb-8">
          <h1 className="text-2xl font-bold text-white/90">
            Create an account
          </h1>
          <p className="text-gray-400">
            Choose your preferred sign up method
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => signIn('google', { callbackUrl: '/onboarding' })}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg border border-gray-700 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
            </svg>
            Sign up with Google
          </button>

          <button
            onClick={() => signIn('github', { callbackUrl: '/onboarding' })}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-800/50 hover:bg-gray-800 rounded-lg border border-gray-700 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Sign up with GitHub
          </button>

          <div className="relative py-4">
            <Separator.Root className="absolute inset-0 flex items-center" decorative>
              <div className="w-full border-t border-gray-700" />
            </Separator.Root>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black px-2 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Sign up with Email
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link 
            href="/auth/signin" 
            className="text-white hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
} 