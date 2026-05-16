'use client'

import {

  useEffect,

  useState,

} from 'react'

import {

  motion,

} from 'framer-motion'

import {

  Star,

  Sparkles,

  Brain,

} from 'lucide-react'

import { supabase } from '@/lib/supabase'

import Navbar from '@/components/Navbar'
import AuthGuard from '@/components/AuthGuard'

export default function TimelinePage() {

  const [entries, setEntries] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    fetchEntries()

  }, [])

  // FETCH ENTRIES

  const fetchEntries = async () => {

    try {

      const {

        data: { user },

      } = await supabase.auth.getUser()

      if (!user) return

      const { data, error } =
        await supabase

          .from('entries')

          .select('*')

          .eq('user_id', user.id)

          .order(
            'created_at',
            {
              ascending: false,
            }
          )

      if (error) {

        console.log(error)

        return
      }

      // CLEAN BOOLEAN VALUES

      const cleanedEntries =

        data.map((entry) => ({

          ...entry,

          favorite:
            entry.favorite === true,
        }))

      setEntries(cleanedEntries)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  // FAVORITE TOGGLE

  const toggleFavorite =
    async (

      id: string,

      current: boolean
    ) => {

      try {

        const newValue = !current

        // UPDATE DATABASE

        const { error } =
          await supabase

            .from('entries')

            .update({

              favorite: newValue,
            })

            .eq('id', id)

        if (error) {

          console.log(error)

          return
        }

        // UPDATE LOCAL STATE

        setEntries((prev) =>

          prev.map((entry) =>

            entry.id === id

              ? {

                  ...entry,

                  favorite:
                    newValue,
                }

              : entry
          )
        )

      } catch (error) {

        console.log(error)
      }
    }

  // INSIGHTS

  const averageStress =

    entries.length > 0

      ? Math.round(

          entries.reduce(

            (acc, curr) =>

              acc +
              curr.stress_level,

            0
          ) / entries.length
        )

      : 0

  const averagePositivity =

    entries.length > 0

      ? Math.round(

          entries.reduce(

            (acc, curr) =>

              acc +
              curr.positivity_score,

            0
          ) / entries.length
        )

      : 0

  const insightMessages = [

    averageStress > 70

      ? 'Your recent reflections suggest elevated emotional pressure.'

      : 'Your recent emotional state appears balanced and stable.',

    averagePositivity > 70

      ? 'Your positivity has improved consistently over time.'

      : 'Your reflections reveal emotional depth and self-awareness.',

    entries.length > 5

      ? 'You are building a meaningful journaling habit.'

      : 'Consistency in reflection improves emotional clarity.',
  ]

  return (

    <AuthGuard>

      <main

        className="

          relative

          min-h-screen

          overflow-hidden

          px-6 py-10 md:px-20

        "
      >

        {/* BACKGROUND */}

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

        </div>

        <Navbar />

        {/* HERO */}

        <section className="mt-24 mb-16">

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

              text-5xl md:text-7xl

              font-semibold

              tracking-tight

              mb-6

            "
          >

            Emotional
            <br />

            Timeline.

          </motion.h1>

          <p

            className="

              text-lg

              text-[var(--text-secondary)]

              max-w-2xl

            "
          >

            Explore your emotional
            journey and AI-powered
            reflections over time.

          </p>

        </section>

        {/* EMPTY STATE */}

        {

          !loading &&

          entries.length === 0 && (

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

                rounded-[40px]

                border

                backdrop-blur-2xl

                p-12

                text-center

              "

              style={{

                background:
                  'var(--card-bg)',

                borderColor:
                  'var(--border-color)',
              }}
            >

              <div className="

                w-20 h-20

                mx-auto mb-6

                rounded-full

                bg-black/[0.04]
                dark:bg-white/[0.05]

                flex items-center justify-center

              ">

                <Sparkles size={32} />

              </div>

              <h2 className="

                text-3xl

                font-semibold

                mb-4

              ">

                Your emotional
                journey begins here.

              </h2>

              <p className="

                text-[var(--text-secondary)]

                max-w-lg

                mx-auto

              ">

                Start reflecting to
                unlock emotional
                insights and AI-powered
                analysis.

              </p>

            </motion.div>
          )
        }

        {/* CONTENT */}

        {

          entries.length > 0 && (

            <>

              {/* INSIGHTS */}

              <div className="

                grid

                grid-cols-1

                lg:grid-cols-3

                gap-6

                mb-10

              ">

                {

                  insightMessages.map(

                    (
                      insight,
                      index
                    ) => (

                      <motion.div

                        key={index}

                        whileHover={{
                          scale: 1.02,
                        }}

                        className="

                          rounded-[32px]

                          border

                          backdrop-blur-2xl

                          p-6

                        "

                        style={{

                          background:
                            'var(--card-bg)',

                          borderColor:
                            'var(--border-color)',
                        }}
                      >

                        <div className="

                          w-12 h-12

                          rounded-2xl

                          mb-5

                          bg-black/[0.04]
                          dark:bg-white/[0.05]

                          flex items-center justify-center

                        ">

                          <Brain
                            size={20}
                          />

                        </div>

                        <p className="

                          leading-relaxed

                          text-[var(--text-secondary)]

                        ">

                          {insight}

                        </p>

                      </motion.div>
                    )
                  )
                }

              </div>

              {/* ENTRIES */}

              <div className="

                flex flex-col gap-8

              ">

                {

                  entries.map(

                    (entry, index) => (

                      <motion.div

                        key={entry.id}

                        initial={{
                          opacity: 0,
                          y: 20,
                        }}

                        animate={{
                          opacity: 1,
                          y: 0,
                        }}

                        transition={{
                          delay:
                            index * 0.05,
                        }}

                        whileHover={{
                          scale: 1.01,
                        }}

                        className="

                          rounded-[32px]

                          border

                          backdrop-blur-2xl

                          p-6 sm:p-8

                        "

                        style={{

                          background:
                            'var(--card-bg)',

                          borderColor:
                            'var(--border-color)',
                        }}
                      >

                        {/* HEADER */}

                        <div className="

                          flex items-center justify-between

                          mb-6

                        ">

                          <div>

                            <h2 className="

                              text-2xl

                              font-semibold

                            ">

                              {

                                entry.mood ||

                                'Reflective'

                              }

                            </h2>

                            <p className="

                              text-sm

                              mt-1

                              text-[var(--text-secondary)]

                            ">

                              {

                                new Date(

                                  entry.created_at

                                ).toLocaleString()
                              }

                            </p>

                          </div>

                          {/* FAVORITE */}

                          <button

                            onClick={() =>

                              toggleFavorite(

                                entry.id,

                                entry.favorite
                              )
                            }

                            className={`

                              w-12 h-12

                              rounded-2xl

                              flex items-center justify-center

                              transition-all duration-300

                              hover:scale-110

                              ${

                                entry.favorite

                                  ? 'bg-yellow-500/20 text-yellow-500'

                                  : 'bg-black/[0.04] dark:bg-white/[0.05]'
                              }

                            `}
                          >

                            <Star

                              size={20}

                              fill={

                                entry.favorite

                                  ? 'currentColor'

                                  : 'none'
                              }
                            />

                          </button>

                        </div>

                        {/* USER ENTRY */}

                        <div className="mb-8">

                          <h3 className="

                            text-lg

                            font-medium

                            mb-3

                          ">

                            Your Reflection

                          </h3>

                          <p className="

                            leading-relaxed

                            whitespace-pre-wrap

                            text-[var(--text-secondary)]

                          ">

                            {entry.content}

                          </p>

                        </div>

                        {/* AI REFLECTION */}

                        {

                          entry.ai_response && (

                            <div className="

                              rounded-[28px]

                              p-6

                              bg-black/[0.03]
                              dark:bg-white/[0.04]

                              mb-6

                            ">

                              <div className="

                                flex items-center gap-3

                                mb-4

                              ">

                                <Brain size={20} />

                                <h3 className="

                                  text-lg

                                  font-medium

                                ">

                                  AI Emotional Reflection

                                </h3>

                              </div>

                              <div className="

                                whitespace-pre-wrap

                                leading-relaxed

                                text-[var(--text-secondary)]

                              ">

                                {

                                  entry.ai_response

                                }

                              </div>

                            </div>
                          )
                        }

                        {/* THEMES */}

                        {

                          entry.themes && (

                            <div className="

                              flex flex-wrap gap-3

                              mb-6

                            ">

                              {

                                entry.themes

                                  .split(',')

                                  .map(

                                    (
                                      theme: string,
                                      i: number
                                    ) => (

                                      <div

                                        key={i}

                                        className="

                                          px-4 py-2

                                          rounded-2xl

                                          bg-black/[0.04]
                                          dark:bg-white/[0.05]

                                          text-sm

                                        "
                                      >

                                        {

                                          theme.trim()

                                        }

                                      </div>
                                    )
                                  )
                              }

                            </div>
                          )
                        }

                        {/* SCORES */}

                        <div className="

                          flex flex-wrap gap-3

                        ">

                          <div className="

                            px-4 py-2

                            rounded-2xl

                            bg-red-500/10

                            text-red-500

                            text-sm

                          ">

                            Stress

                            {' '}

                            {

                              entry.stress_level

                            }%

                          </div>

                          <div className="

                            px-4 py-2

                            rounded-2xl

                            bg-green-500/10

                            text-green-500

                            text-sm

                          ">

                            Positivity

                            {' '}

                            {

                              entry.positivity_score

                            }%

                          </div>

                        </div>

                      </motion.div>
                    )
                  )
                }

              </div>

            </>
          )
        }

      </main>

    </AuthGuard>
  )
}