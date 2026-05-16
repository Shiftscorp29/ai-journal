'use client'

import { useState } from 'react'

import { motion } from 'framer-motion'

import { useRouter } from 'next/navigation'

import { supabase } from '@/lib/supabase'

export default function AuthPage() {

  const router = useRouter()

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const [isSignup, setIsSignup] =
    useState(false)

  const handleAuth = async () => {

    try {

      setLoading(true)

      if (isSignup) {

        // SIGNUP

        const {

          data,

          error,

        } = await supabase.auth.signUp({

          email,

          password,
        })

        if (error) {

          alert(error.message)

          return
        }

        // AUTO LOGIN AFTER SIGNUP

        const {

          error: loginError,

        } = await supabase.auth.signInWithPassword({

          email,

          password,
        })

        if (loginError) {

          alert(loginError.message)

          return
        }

        router.push('/journal')

      } else {

        // LOGIN

        const {

          error,

        } = await supabase.auth.signInWithPassword({

          email,

          password,
        })

        if (error) {

          alert(error.message)

          return
        }

        router.push('/journal')
      }

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  return (

    <main

      className="

        relative

        min-h-screen

        flex items-center justify-center

        px-5

        overflow-hidden

      "
    >

      {/* Glow */}

      <div className="fixed inset-0 -z-10 overflow-hidden">

        <div

          className="

            absolute

            top-[-120px]
            left-[-120px]

            w-[350px]
            h-[350px]

            rounded-full

            bg-blue-400/20

            blur-3xl

          "
        />

        <div

          className="

            absolute

            bottom-[-120px]
            right-[-120px]

            w-[350px]
            h-[350px]

            rounded-full

            bg-purple-400/20

            blur-3xl

          "
        />

      </div>

      <motion.div

        initial={{
          opacity: 0,
          y: 20,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        className="

          w-full
          max-w-md

          rounded-[36px]

          p-6 sm:p-10

          backdrop-blur-2xl

          shadow-sm

          border

        "

        style={{

          background:
            'var(--card-bg)',

          borderColor:
            'var(--border-color)',
        }}
      >

        <h1 className="

          text-4xl sm:text-5xl

          font-semibold

          mb-4

        ">

          {

            isSignup

              ? 'Create Account'

              : 'Welcome Back'

          }

        </h1>

        <p className="

          mb-10

          text-[var(--text-secondary)]

        ">

          Your reflections,
          privately yours.

        </p>

        {/* Email */}

        <input

          type="email"

          placeholder="Email"

          value={email}

          onChange={(e) =>
            setEmail(e.target.value)
          }

          className="

            w-full

            h-14

            px-5

            rounded-2xl

            mb-5

            bg-black/[0.04]
            dark:bg-white/[0.05]

            outline-none

          "
        />

        {/* Password */}

        <input

          type="password"

          placeholder="Password"

          value={password}

          onChange={(e) =>
            setPassword(e.target.value)
          }

          className="

            w-full

            h-14

            px-5

            rounded-2xl

            mb-8

            bg-black/[0.04]
            dark:bg-white/[0.05]

            outline-none

          "
        />

        {/* Button */}

        <button

          onClick={handleAuth}

          disabled={loading}

          className="

            w-full

            h-14

            rounded-2xl

            bg-black
            text-white

            dark:bg-white
            dark:text-black

            font-medium

            hover:scale-[1.02]

            transition-all duration-300

          "
        >

          {

            loading

              ? 'Please wait...'

              : isSignup

                ? 'Create Account'

                : 'Sign In'

          }

        </button>

        {/* Toggle */}

        <button

          onClick={() =>
            setIsSignup(!isSignup)
          }

          className="

            mt-6

            text-sm

            text-[var(--text-secondary)]

            hover:underline

          "
        >

          {

            isSignup

              ? 'Already have an account? Sign In'

              : 'Create a new account'

          }

        </button>

      </motion.div>

    </main>
  )
}