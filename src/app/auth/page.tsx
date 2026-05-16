'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'

export default function AuthPage() {
  const router = useRouter()
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    const checkAuth = async () => {
      if (!supabase) return
      const { data } = await supabase.auth.getSession()
      if (data?.session) {
        router.push('/journal')
      }
    }
    checkAuth()
  }, [router])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!supabase) {
        setError('Supabase not configured. Please set environment variables.')
        setLoading(false)
        return
      }

      if (isSignUp) {
        if (password !== confirmPassword) {
          setError('Passwords do not match')
          setLoading(false)
          return
        }

        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/journal`,
          },
        })

        if (signUpError) {
          setError(signUpError.message)
        } else {
          setError('Check your email to confirm your account')
          setTimeout(() => router.push('/journal'), 2000)
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (signInError) {
          setError(signInError.message)
        } else {
          router.push('/journal')
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-10 md:px-20 flex flex-col items-center justify-center">
      {/* Ambient Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-120px] left-[-120px] w-[420px] h-[420px] rounded-full bg-blue-400/20 dark:bg-blue-500/10 blur-3xl transition-all duration-700" />
        <div className="absolute bottom-[-120px] right-[-120px] w-[420px] h-[420px] rounded-full bg-purple-400/20 dark:bg-purple-500/10 blur-3xl transition-all duration-700" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-3">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">
            {isSignUp ? 'Start your emotional journey' : 'Continue your reflection'}
          </p>
        </div>

        {/* Auth Card */}
        <motion.form
          onSubmit={handleAuth}
          className="rounded-[32px] backdrop-blur-2xl shadow-sm p-8 md:p-10 space-y-6"
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
          }}
        >
          {/* Email */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-[var(--text-primary)]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
            />
          </div>

          {/* Password */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-[var(--text-primary)]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
            />
          </div>

          {/* Confirm Password */}
          {isSignUp && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-[var(--text-primary)]">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
              />
            </div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-medium hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50"
          >
            {loading ? (isSignUp ? 'Creating Account...' : 'Signing In...') : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>

          {/* Toggle */}
          <div className="text-center text-sm text-[var(--text-secondary)]">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError('')
              }}
              className="font-medium text-black dark:text-white hover:underline"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </motion.form>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </main>
  )
}
