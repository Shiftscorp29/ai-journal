'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      if (!supabase) {
        setLoading(false)
        return
      }
      const { data } = await supabase.auth.getSession()
      setUser(data?.session?.user || null)
      setLoading(false)
    }
    checkAuth()
  }, [])

  return (

    <main

      className="

        relative

        min-h-screen

        overflow-hidden

        px-6 py-10 md:px-20

        flex flex-col justify-between

      "
    >

      {/* Ambient Glow */}

      <div className="fixed inset-0 -z-10 overflow-hidden">

        {/* Blue Glow */}

        <div

          className="

            absolute

            top-[-120px]
            left-[-120px]

            w-[420px]
            h-[420px]

            rounded-full

            bg-blue-400/20
            dark:bg-blue-500/10

            blur-3xl

            transition-all duration-700

          "
        />

        {/* Purple Glow */}

        <div

          className="

            absolute

            bottom-[-120px]
            right-[-120px]

            w-[420px]
            h-[420px]

            rounded-full

            bg-purple-400/20
            dark:bg-purple-500/10

            blur-3xl

            transition-all duration-700

          "
        />

      </div>

      {/* Top Bar */}

      <motion.div

        initial={{
          opacity: 0,
          y: -20,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.5,
        }}

        className="

          flex items-center justify-between

          rounded-[28px]

          border

          backdrop-blur-2xl

          px-6 py-4

          shadow-sm

        "

        style={{

          background:
            'var(--card-bg)',

          borderColor:
            'var(--border-color)',
        }}
      >

        <h1 className="

          text-2xl md:text-3xl

          font-semibold

          tracking-tight

        ">

          AI Journal

        </h1>

        <Link

          href={user ? "/journal" : "/auth"}

          className="

            px-5 py-2.5

            rounded-2xl

            bg-black
            text-white

            dark:bg-white
            dark:text-black

            text-sm
            font-medium

            hover:scale-105
            active:scale-95

            transition-all duration-300

          "
        >

          {loading ? 'Loading...' : user ? 'Open App' : 'Get Started'}

        </Link>

      </motion.div>

      {/* Hero Section */}

      <section className="

        flex-1

        flex flex-col justify-center

        py-20

      ">

        <motion.h1

          initial={{
            opacity: 0,
            y: 30,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.7,
          }}

          className="

            text-7xl md:text-[120px]

            font-semibold

            tracking-[-0.06em]

            leading-[0.9]

            mb-10

          "
        >

          Your Mind.

          <br />

          Understood.

        </motion.h1>

        <motion.p

          initial={{
            opacity: 0,
            y: 30,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.9,
          }}

          className="

            max-w-2xl

            text-xl md:text-2xl

            leading-relaxed

            text-[var(--text-secondary)]

          "
        >

          A cinematic AI-powered emotional journaling experience
          that transforms thoughts into reflections, moodboards,
          emotional analytics, and visual storytelling.

        </motion.p>

        {/* CTA Buttons */}

        {!loading && (
          <motion.div

            initial={{
              opacity: 0,
              y: 30,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 1,
            }}

            className="

              flex items-center gap-4

              mt-12 flex-wrap

            "
          >

            <Link

              href={user ? "/journal" : "/auth"}

              className="

                px-8 py-4

                rounded-2xl

                bg-black
                text-white

                dark:bg-white
                dark:text-black

                text-lg
                font-medium

                hover:scale-[1.03]
                active:scale-[0.98]

                transition-all duration-300

              "
            >

              {user ? 'Start Writing' : 'Sign Up'}

            </Link>

            {user && (
              <Link

                href="/analytics"

                className="

                  px-8 py-4

                  rounded-2xl

                  border

                  text-lg
                  font-medium

                  backdrop-blur-2xl

                  hover:scale-[1.03]
                  active:scale-[0.98]

                  transition-all duration-300

                "

                style={{

                  background:
                    'var(--card-bg)',

                  borderColor:
                    'var(--border-color)',
                }}
              >

                View Analytics

              </Link>
            )}

          </motion.div>
        )}

      </section>

      {/* Bottom Glass Cards */}

      <motion.section

        initial={{
          opacity: 0,
          y: 40,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 1.1,
        }}

        className="

          grid

          grid-cols-1 md:grid-cols-3

          gap-6

          pb-10

        "
      >

        {/* Card 1 */}

        <div

          className="

            rounded-[32px]

            p-8

            backdrop-blur-2xl

            shadow-sm

          "

          style={{

            background:
              'var(--card-bg)',

            border:
              '1px solid var(--border-color)',
          }}
        >

          <h3 className="

            text-2xl

            font-semibold

            mb-4

          ">

            Emotional AI

          </h3>

          <p className="

            leading-relaxed

            text-[var(--text-secondary)]

          ">

            Understand your thoughts with intelligent emotional analysis and cinematic reflections.

          </p>

        </div>

        {/* Card 2 */}

        <div

          className="

            rounded-[32px]

            p-8

            backdrop-blur-2xl

            shadow-sm

          "

          style={{

            background:
              'var(--card-bg)',

            border:
              '1px solid var(--border-color)',
          }}
        >

          <h3 className="

            text-2xl

            font-semibold

            mb-4

          ">

            Moodboards

          </h3>

          <p className="

            leading-relaxed

            text-[var(--text-secondary)]

          ">

            Generate aesthetic emotional visuals, ambient scenes, soundtrack vibes, and cinematic atmospheres.

          </p>

        </div>

        {/* Card 3 */}

        <div

          className="

            rounded-[32px]

            p-8

            backdrop-blur-2xl

            shadow-sm

          "

          style={{

            background:
              'var(--card-bg)',

            border:
              '1px solid var(--border-color)',
          }}
        >

          <h3 className="

            text-2xl

            font-semibold

            mb-4

          ">

            Emotional Analytics

          </h3>

          <p className="

            leading-relaxed

            text-[var(--text-secondary)]

          ">

            Visualize emotional growth, positivity trends, stress patterns, and reflective insights over time.

          </p>

        </div>

      </motion.section>

    </main>
  )
}
