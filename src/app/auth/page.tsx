'use client'

import { useState } from 'react'

import {

  motion,

  AnimatePresence,

} from 'framer-motion'

import { useRouter } from 'next/navigation'

import {

  CheckCircle2,

  AlertCircle,

  Sparkles,

} from 'lucide-react'

import { supabase } from '@/lib/supabase'

export default function AuthPage() {

  const router = useRouter()

  const [username, setUsername] =
    useState('')

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
  // NOTIFICATION
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

      if (
        isSignup &&
        !username
      ) {

        showNotification(

          'error',

          'Enter a username.'
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

          data,

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

        // PROFILE

        if (data.user) {

          await supabase

            .from('profiles')

            .insert([

              {
                id: data.user.id,

                username,

                email,
              },
            ])
        }

        // AUTO LOGIN

        await supabase.auth.signInWithPassword({

          email,

          password,
        })

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

        overflow-hidden

        px-5 py-10

        flex items-center justify-center

      "
    >

      {/* Ambient Background */}

      <div className="fixed inset-0 -z-10 overflow-hidden">

        {/* Top Glow */}

        <div

          className="

            absolute

            top-[-150px]
            left-[-120px]

            w-[420px]
            h-[420px]

            rounded-full

            bg-blue-400/20
            dark:bg-blue-500/10

            blur-3xl

          "
        />

        {/* Bottom Glow */}

        <div

          className="

            absolute

            bottom-[-150px]
            right-[-120px]

            w-[420px]
            h-[420px]

            rounded-full

            bg-purple-400/20
            dark:bg-purple-500/10

            blur-3xl

          "
        />

        {/* Center Glow */}

        <div

          className="

            absolute

            top-[35%]
            left-[40%]

            w-[300px]
            h-[300px]

            rounded-full

            bg-pink-400/10
            dark:bg-pink-500/10

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

      {/* Main Layout */}

      <div className="

        w-full
        max-w-6xl

        grid

        lg:grid-cols-2

        gap-10

        items-center

      ">

        {/* LEFT SIDE */}

        <motion.div

          initial={{
            opacity: 0,
            x: -30,
          }}

          animate={{
            opacity: 1,
            x: 0,
          }}

          className="

            hidden lg:block

          "
        >

          <div className="

            inline-flex

            items-center gap-3

            px-5 py-3

            rounded-2xl

            border

            backdrop-blur-xl

            mb-8

          "

          style={{

            borderColor:
              'var(--border-color)',
          }}
          >

            <Sparkles

              size={18}

              className="text-blue-500"

            />

            <span className="

              text-sm

              text-[var(--text-secondary)]

            ">

              AI-Powered Emotional Intelligence

            </span>

          </div>

          <h1 className="

            text-6xl

            leading-tight

            font-semibold

            tracking-tight

            mb-8

          ">

            Reflect.

            <br />

            Understand.

            <br />

            Grow.

          </h1>

          <p className="

            text-xl

            leading-relaxed

            max-w-xl

            text-[var(--text-secondary)]

          ">

            Transform your thoughts into
            cinematic emotional reflections
            powered by AI-driven insights,
            analytics, and mindful journaling.

          </p>

        </motion.div>

        {/* RIGHT SIDE */}

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

            rounded-[36px]

            p-6 sm:p-10

            backdrop-blur-2xl

            shadow-2xl

            border

          "

          style={{

            background:
              'var(--card-bg)',

            borderColor:
              'var(--border-color)',
          }}
        >

          <h2 className="

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

          </h2>

          <p className="

            mb-10

            text-[var(--text-secondary)]

          ">

            Your emotional space,
            privately yours.

          </p>

          {/* Username */}

          {

            isSignup && (

              <input

                type="text"

                placeholder="Username"

                value={username}

                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }

                className="

                  w-full

                  h-14

                  px-5

                  rounded-2xl

                  mb-5

                  border

                  bg-black/[0.03]
                  dark:bg-white/[0.04]

                  outline-none

                "

                style={{

                  borderColor:
                    'var(--border-color)',
                }}
              />
            )
          }

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

              border

              bg-black/[0.03]
              dark:bg-white/[0.04]

              outline-none

            "

            style={{

              borderColor:
                'var(--border-color)',
            }}
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

              border

              bg-black/[0.03]
              dark:bg-white/[0.04]

              outline-none

            "

            style={{

              borderColor:
                'var(--border-color)',
            }}
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

      </div>

    </main>
  )
}