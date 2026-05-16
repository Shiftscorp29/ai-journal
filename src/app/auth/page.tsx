'use client'

import { useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import { useRouter } from 'next/navigation'

import {

  CheckCircle2,

  AlertCircle,

} from 'lucide-react'

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

  const [notification, setNotification] =
    useState({

      show: false,

      type: 'success',

      message: '',
    })

  // -------------------------
  // SHOW NOTIFICATION
  // -------------------------

  const showNotification = (

    type: any,

    message: string
  ) => {

    setNotification({

      show: true,

      type,

      message,
    })

    setTimeout(() => {

      setNotification({

        show: false,

        type: 'success',

        message: '',
      })

    }, 3500)
  }

  // -------------------------
  // AUTH
  // -------------------------

  const handleAuth = async () => {

    try {

      setLoading(true)

      if (!email || !password) {

        showNotification(

          'error',

          'Please fill all fields.'
        )

        return
      }

      if (password.length < 6) {

        showNotification(

          'error',

          'Password must be at least 6 characters.'
        )

        return
      }

      // SIGNUP

      if (isSignup) {

        const {

          error,

        } = await supabase.auth.signUp({

          email,

          password,
        })

        if (error) {

          showNotification(

            'error',

            error.message
          )

          return
        }

        // AUTO LOGIN

        const {

          error: loginError,

        } = await supabase.auth.signInWithPassword({

          email,

          password,
        })

        if (loginError) {

          showNotification(

            'error',

            loginError.message
          )

          return
        }

        showNotification(

          'success',

          'Account created successfully.'
        )

        setTimeout(() => {

          router.push('/journal')

        }, 1200)

      } else {

        // LOGIN

        const {

          error,

        } = await supabase.auth.signInWithPassword({

          email,

          password,
        })

        if (error) {

          showNotification(

            'error',

            error.message
          )

          return
        }

        showNotification(

          'success',

          'Successfully signed in.'
        )

        setTimeout(() => {

          router.push('/journal')

        }, 1200)
      }

    } catch (error) {

      console.log(error)

      showNotification(

        'error',

        'Something went wrong.'
      )

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

      {/* Background Glow */}

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

      {/* Notification */}

      <AnimatePresence>

        {

          notification.show && (

            <motion.div

              initial={{
                opacity: 0,
                y: -20,
                scale: 0.95,
              }}

              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}

              exit={{
                opacity: 0,
                y: -20,
                scale: 0.95,
              }}

              className={`

                fixed

                top-6

                left-1/2

                -translate-x-1/2

                z-50

                flex items-center gap-3

                px-5 py-4

                rounded-2xl

                backdrop-blur-2xl

                border

                shadow-2xl

                text-sm sm:text-base

                ${

                  notification.type ===
                  'success'

                    ? 'bg-green-500/10 border-green-500/20'

                    : 'bg-red-500/10 border-red-500/20'

                }

              `}
            >

              {

                notification.type ===
                'success'

                  ? (

                    <CheckCircle2

                      size={20}

                      className="text-green-500"

                    />

                  )

                  : (

                    <AlertCircle

                      size={20}

                      className="text-red-500"

                    />

                  )
              }

              <span>

                {

                  notification.message

                }

              </span>

            </motion.div>
          )
        }

      </AnimatePresence>

      {/* Card */}

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

          tracking-tight

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

            active:scale-[0.98]

            transition-all duration-300

            disabled:opacity-50

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