'use client'

import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import { Trash2 } from 'lucide-react'

import { supabase } from '@/lib/supabase'

import Navbar from '@/components/Navbar'

export default function TimelinePage() {

  const [entries, setEntries] = useState<any[]>([])

  const [deletingId, setDeletingId] =
    useState<string | null>(null)

  useEffect(() => {

    fetchEntries()

  }, [])

  const fetchEntries = async () => {

    const { data, error } = await supabase

      .from('entries')

      .select('*')

      .order('created_at', {
        ascending: false,
      })

    if (!error) {

      setEntries(data || [])
    }
  }

  const deleteEntry = async (
    id: string
  ) => {

    try {

      setDeletingId(id)

      const { error } = await supabase

        .from('entries')

        .delete()

        .eq('id', id)

      if (!error) {

        setEntries((prev) =>

          prev.filter(
            (entry) => entry.id !== id
          )
        )
      }

    } catch (error) {

      console.log(error)

    } finally {

      setDeletingId(null)
    }
  }

  return (

    <main

      className="

        relative

        min-h-screen

        px-6 py-10 md:px-20

      "
    >

      {/* Glow */}

      <div className="fixed inset-0 -z-10 overflow-hidden">

        <div

          className="

            absolute

            top-[-120px]
            left-[-120px]

            w-[400px]
            h-[400px]

            rounded-full

            bg-blue-400/20
            dark:bg-blue-500/10

            blur-3xl

          "
        />

        <div

          className="

            absolute

            bottom-[-120px]
            right-[-120px]

            w-[400px]
            h-[400px]

            rounded-full

            bg-purple-400/20
            dark:bg-purple-500/10

            blur-3xl

          "
        />

      </div>

      <Navbar />

      {/* Header */}

      <section className="mt-20 mb-16">

        <motion.h1

          initial={{
            opacity: 0,
            y: 20,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          className="

            text-6xl md:text-7xl

            font-semibold

            tracking-tight

            mb-6

          "
        >

          Your Timeline

        </motion.h1>

        <motion.p

          initial={{
            opacity: 0,
            y: 20,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            delay: 0.1,
          }}

          className="

            text-xl

            max-w-2xl

            leading-relaxed

            text-[var(--text-secondary)]

          "
        >

          Your emotional memories, reflections, and AI insights.

        </motion.p>

      </section>

      {/* Entries */}

      <div className="space-y-8">

        {entries.map((entry, index) => (

          <motion.div

            key={entry.id}

            initial={{
              opacity: 0,
              y: 30,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: index * 0.05,
            }}

            className="

              rounded-[32px]

              backdrop-blur-2xl

              shadow-sm

              p-8

            "

            style={{

              background:
                'var(--card-bg)',

              border:
                '1px solid var(--border-color)',
            }}
          >

            {/* Top */}

            <div className="

              flex items-start justify-between

              gap-4

              mb-6

            ">

              <div>

                <h2 className="

                  text-2xl

                  font-semibold

                  mb-2

                ">

                  {entry.mood}

                </h2>

                <p className="

                  text-sm

                  text-[var(--text-secondary)]

                ">

                  {

                    new Date(
                      entry.created_at
                    ).toLocaleString()

                  }

                </p>

              </div>

              {/* Delete Button */}

              <button

                onClick={() =>
                  deleteEntry(entry.id)
                }

                disabled={
                  deletingId === entry.id
                }

                className="

                  w-11 h-11

                  flex items-center justify-center

                  rounded-2xl

                  bg-red-500/10

                  hover:bg-red-500/20

                  transition-all duration-300

                  hover:scale-105

                "
              >

                <Trash2

                  size={18}

                  className="text-red-500"

                />

              </button>

            </div>

            {/* Stats */}

            <div className="

              flex flex-wrap gap-3

              mb-8

            ">

              <div className="

                px-4 py-2

                rounded-2xl

                bg-black/[0.04]
                dark:bg-white/[0.05]

                text-sm

              ">

                Stress:
                {' '}
                {entry.stress_level}

              </div>

              <div className="

                px-4 py-2

                rounded-2xl

                bg-black/[0.04]
                dark:bg-white/[0.05]

                text-sm

              ">

                Positivity:
                {' '}
                {entry.positivity_score}

              </div>

            </div>

            {/* Journal */}

            <div className="mb-8">

              <h3 className="

                text-lg

                font-medium

                mb-3

              ">

                Journal Entry

              </h3>

              <p className="

                leading-relaxed

                text-[var(--text-secondary)]

              ">

                {entry.content}

              </p>

            </div>

            {/* Reflection */}

            <div className="mb-8">

              <h3 className="

                text-lg

                font-medium

                mb-3

              ">

                AI Reflection

              </h3>

              <p className="

                whitespace-pre-wrap

                leading-relaxed

                text-[var(--text-secondary)]

              ">

                {entry.ai_response}

              </p>

            </div>

            {/* Themes */}

            <div>

              <h3 className="

                text-lg

                font-medium

                mb-3

              ">

                Emotional Themes

              </h3>

              <div className="flex flex-wrap gap-3">

                {

                  entry.themes

                    ?.split(',')

                    ?.map(

                      (
                        theme: string,
                        index: number
                      ) => (

                        <div

                          key={index}

                          className="

                            px-4 py-2

                            rounded-2xl

                            text-sm

                            bg-black/[0.04]
                            dark:bg-white/[0.05]

                          "
                        >

                          {theme.trim()}

                        </div>
                      )
                    )
                }

              </div>

            </div>

          </motion.div>
        ))}

      </div>

    </main>
  )
}