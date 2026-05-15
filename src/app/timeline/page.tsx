'use client'

import { useEffect, useState } from 'react'

import {

  motion,

} from 'framer-motion'

import {

  Trash2,

  Flame,

  Heart,

} from 'lucide-react'

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

          Emotional memories, reflections,
          and personal growth through time.

        </motion.p>

      </section>

      {/* Timeline */}

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

            whileHover={{
              scale: 1.01,
            }}

            transition={{
              duration: 0.3,
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

            {/* Header */}

            <div className="

              flex items-start justify-between

              mb-8

              gap-4

            ">

              <div>

                <h2 className="

                  text-3xl

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

              {/* Delete */}

              <button

                onClick={() =>
                  deleteEntry(entry.id)
                }

                disabled={
                  deletingId === entry.id
                }

                className="

                  w-11 h-11

                  rounded-2xl

                  flex items-center justify-center

                  bg-red-500/10

                  hover:bg-red-500/20

                  hover:scale-110

                  transition-all duration-300

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

              grid

              grid-cols-1 md:grid-cols-2

              gap-6

              mb-10

            ">

              {/* Stress */}

              <motion.div

                whileHover={{
                  scale: 1.03,
                }}

                className="

                  rounded-[30px]

                  p-7

                  overflow-hidden

                  relative

                  bg-gradient-to-br

                  from-red-500/10
                  to-orange-500/10

                  border border-red-500/10

                "
              >

                <div className="

                  flex items-center gap-4

                  mb-6

                ">

                  <div className="

                    w-14 h-14

                    rounded-2xl

                    flex items-center justify-center

                    bg-red-500/15

                  ">

                    <Flame

                      size={24}

                      className="text-red-500"

                    />

                  </div>

                  <div>

                    <p className="

                      text-sm

                      text-[var(--text-secondary)]

                    ">

                      Stress Level

                    </p>

                    <h3 className="

                      text-4xl

                      font-semibold

                    ">

                      {

                        entry.stress_level || 0

                      }

                    </h3>

                  </div>

                </div>

                {/* Progress */}

                <div className="

                  w-full h-3

                  rounded-full

                  overflow-hidden

                  bg-black/[0.05]
                  dark:bg-white/[0.05]

                ">

                  <motion.div

                    whileHover={{
                      filter:
                        'brightness(1.2)',
                    }}

                    initial={{
                      width: 0,
                    }}

                    animate={{
                      width:
                        `${entry.stress_level}%`,
                    }}

                    transition={{
                      duration: 1,
                    }}

                    className="

                      h-full

                      rounded-full

                      bg-gradient-to-r

                      from-red-500
                      to-orange-500

                    "
                  />

                </div>

              </motion.div>

              {/* Positivity */}

              <motion.div

                whileHover={{
                  scale: 1.03,
                }}

                className="

                  rounded-[30px]

                  p-7

                  overflow-hidden

                  relative

                  bg-gradient-to-br

                  from-blue-500/10
                  to-green-500/10

                  border border-blue-500/10

                "
              >

                <div className="

                  flex items-center gap-4

                  mb-6

                ">

                  <div className="

                    w-14 h-14

                    rounded-2xl

                    flex items-center justify-center

                    bg-blue-500/15

                  ">

                    <Heart

                      size={24}

                      className="text-blue-500"

                    />

                  </div>

                  <div>

                    <p className="

                      text-sm

                      text-[var(--text-secondary)]

                    ">

                      Positivity

                    </p>

                    <h3 className="

                      text-4xl

                      font-semibold

                    ">

                      {

                        entry.positivity_score || 0

                      }

                    </h3>

                  </div>

                </div>

                {/* Progress */}

                <div className="

                  w-full h-3

                  rounded-full

                  overflow-hidden

                  bg-black/[0.05]
                  dark:bg-white/[0.05]

                ">

                  <motion.div

                    whileHover={{
                      filter:
                        'brightness(1.2)',
                    }}

                    initial={{
                      width: 0,
                    }}

                    animate={{
                      width:
                        `${entry.positivity_score}%`,
                    }}

                    transition={{
                      duration: 1,
                    }}

                    className="

                      h-full

                      rounded-full

                      bg-gradient-to-r

                      from-blue-500
                      to-green-500

                    "
                  />

                </div>

              </motion.div>

            </div>

            {/* Journal */}

            <div className="mb-10">

              <h3 className="

                text-xl

                font-semibold

                mb-4

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

            <div className="mb-10">

              <h3 className="

                text-xl

                font-semibold

                mb-4

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

                text-xl

                font-semibold

                mb-4

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