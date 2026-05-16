'use client'

import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import {

  ResponsiveContainer,

  AreaChart,

  Area,

  LineChart,

  Line,

  XAxis,

  YAxis,

  Tooltip,

  CartesianGrid,

} from 'recharts'

import { supabase } from '@/lib/supabase'

import Navbar from '@/components/Navbar'

import AuthGuard from '@/components/AuthGuard'

export default function AnalyticsPage() {

  const [entries, setEntries] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    fetchEntries()

  }, [])

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

          .order('created_at', {
            ascending: true,
          })

      if (!error) {

        setEntries(data || [])
      }

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  // GRAPH DATA

  const chartData = entries.map(

    (entry) => ({

      date:

        new Date(
          entry.created_at
        ).toLocaleDateString([], {

          month: 'short',

          day: 'numeric',
        }),

      fullDate:

        new Date(
          entry.created_at
        ).toLocaleString(),

      stress:
        Number(entry.stress_level) || 0,

      positivity:
        Number(entry.positivity_score) || 0,
    })
  )

  // AVERAGES

  const averageStress =

    entries.length > 0

      ? Math.round(

          entries.reduce(

            (acc, curr) =>

              acc + (
                Number(
                  curr.stress_level
                ) || 0
              ),

            0
          ) / entries.length
        )

      : 0

  const averagePositivity =

    entries.length > 0

      ? Math.round(

          entries.reduce(

            (acc, curr) =>

              acc + (
                Number(
                  curr.positivity_score
                ) || 0
              ),

            0
          ) / entries.length
        )

      : 0

  return (

    <AuthGuard>

      <main

        className="

          relative

          min-h-screen

          px-5 py-8

          sm:px-8

          md:px-20

        "
      >

        {/* Glow */}

        <div className="fixed inset-0 -z-10 overflow-hidden">

          <div

            className="

              absolute

              top-[-120px]
              left-[-120px]

              w-[320px]
              h-[320px]

              md:w-[400px]
              md:h-[400px]

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

              w-[320px]
              h-[320px]

              md:w-[400px]
              md:h-[400px]

              rounded-full

              bg-purple-400/20
              dark:bg-purple-500/10

              blur-3xl

            "
          />

        </div>

        <Navbar />

        {/* Header */}

        <section className="

          mt-20

          mb-14

        ">

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

              text-4xl
              sm:text-5xl
              md:text-7xl

              font-semibold

              tracking-tight

              mb-6

            "
          >

            Emotional Analytics

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

              text-base
              sm:text-lg
              md:text-xl

              max-w-2xl

              leading-relaxed

              text-[var(--text-secondary)]

            "
          >

            Visualize your emotional
            patterns, positivity,
            and stress trends over time.

          </motion.p>

        </section>

        {/* Loading */}

        {

          loading && (

            <div className="

              py-24

              text-center

              text-[var(--text-secondary)]

            ">

              Loading analytics...

            </div>
          )
        }

        {/* Empty */}

        {

          !loading &&

          entries.length === 0 && (

            <div className="

              py-28

              text-center

            ">

              <h2 className="

                text-3xl

                font-semibold

                mb-4

              ">

                No Analytics Yet

              </h2>

              <p className="

                text-[var(--text-secondary)]

              ">

                Start journaling to
                generate emotional insights.

              </p>

            </div>
          )
        }

        {

          entries.length > 0 && (

            <>

              {/* Stats */}

              <div className="

                grid

                grid-cols-1
                md:grid-cols-3

                gap-6

                mb-14

              ">

                {[

                  {
                    title:
                      'Total Entries',

                    value:
                      entries.length,

                    gradient:
                      'from-blue-500/20 to-purple-500/20',
                  },

                  {
                    title:
                      'Average Stress',

                    value:
                      averageStress,

                    gradient:
                      'from-red-500/20 to-orange-500/20',
                  },

                  {
                    title:
                      'Average Positivity',

                    value:
                      averagePositivity,

                    gradient:
                      'from-blue-500/20 to-green-500/20',
                  },

                ].map((card, index) => (

                  <motion.div

                    key={index}

                    whileHover={{
                      scale: 1.03,
                    }}

                    className="

                      rounded-[32px]

                      p-6 sm:p-8

                      backdrop-blur-2xl

                      shadow-sm

                      flex flex-col items-center justify-center

                    "

                    style={{

                      background:
                        'var(--card-bg)',

                      border:
                        '1px solid var(--border-color)',
                    }}
                  >

                    <div className={`

                      w-28 h-28
                      sm:w-36 sm:h-36

                      rounded-full

                      flex items-center justify-center

                      mb-5

                      bg-gradient-to-br

                      ${card.gradient}

                      border border-white/10

                    `}>

                      <h2 className="

                        text-3xl
                        sm:text-5xl

                        font-semibold

                      ">

                        {card.value}

                      </h2>

                    </div>

                    <p className="

                      text-base
                      sm:text-lg

                      text-center

                      text-[var(--text-secondary)]

                    ">

                      {card.title}

                    </p>

                  </motion.div>
                ))}

              </div>

              {/* Stress Chart */}

              <motion.div

                whileHover={{
                  scale: 1.01,
                }}

                className="

                  rounded-[32px]

                  p-5 sm:p-8

                  backdrop-blur-2xl

                  shadow-sm

                  mb-10

                "

                style={{

                  background:
                    'var(--card-bg)',

                  border:
                    '1px solid var(--border-color)',
                }}
              >

                <h2 className="

                  text-2xl
                  sm:text-3xl

                  font-semibold

                  mb-8

                ">

                  Stress Trend

                </h2>

                <div className="

                  h-[320px]
                  sm:h-[420px]

                ">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <AreaChart
                      data={chartData}
                    >

                      <defs>

                        <linearGradient

                          id="stressGradient"

                          x1="0"
                          y1="0"

                          x2="0"
                          y2="1"
                        >

                          <stop

                            offset="0%"

                            stopColor="#ef4444"

                            stopOpacity={0.5}

                          />

                          <stop

                            offset="100%"

                            stopColor="#ef4444"

                            stopOpacity={0}

                          />

                        </linearGradient>

                      </defs>

                      <CartesianGrid

                        strokeDasharray="3 3"

                        stroke="rgba(120,120,120,0.12)"

                      />

                      <XAxis

                        dataKey="date"

                        stroke="#888"

                        tick={{
                          fontSize: 12,
                        }}

                      />

                      <YAxis

                        stroke="#888"

                        tick={{
                          fontSize: 12,
                        }}

                      />

                      <Tooltip

                        formatter={(value) => [

                          `${value}`,

                          'Stress Level',
                        ]}

                        labelFormatter={(
                          label
                        ) => `Date: ${label}`}

                        contentStyle={{

                          background:
                            'rgba(15,15,15,0.92)',

                          border:
                            '1px solid rgba(255,255,255,0.08)',

                          borderRadius:
                            '20px',

                          color: 'white',

                          backdropFilter:
                            'blur(20px)',

                          boxShadow:
                            '0 10px 40px rgba(0,0,0,0.35)',
                        }}
                      />

                      <Area

                        type="monotone"

                        dataKey="stress"

                        stroke="#ef4444"

                        fill="url(#stressGradient)"

                        strokeWidth={4}

                        activeDot={{

                          r: 7,

                          fill: '#ef4444',

                          strokeWidth: 4,

                          stroke: '#fff',
                        }}

                      />

                    </AreaChart>

                  </ResponsiveContainer>

                </div>

              </motion.div>

              {/* Positivity Chart */}

              <motion.div

                whileHover={{
                  scale: 1.01,
                }}

                className="

                  rounded-[32px]

                  p-5 sm:p-8

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

                <h2 className="

                  text-2xl
                  sm:text-3xl

                  font-semibold

                  mb-8

                ">

                  Positivity Trend

                </h2>

                <div className="

                  h-[320px]
                  sm:h-[420px]

                ">

                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                  >

                    <LineChart
                      data={chartData}
                    >

                      <CartesianGrid

                        strokeDasharray="3 3"

                        stroke="rgba(120,120,120,0.12)"

                      />

                      <XAxis

                        dataKey="date"

                        stroke="#888"

                        tick={{
                          fontSize: 12,
                        }}

                      />

                      <YAxis

                        stroke="#888"

                        tick={{
                          fontSize: 12,
                        }}

                      />

                      <Tooltip

                        formatter={(value) => [

                          `${value}`,

                          'Positivity Score',
                        ]}

                        labelFormatter={(
                          label
                        ) => `Date: ${label}`}

                        contentStyle={{

                          background:
                            'rgba(15,15,15,0.92)',

                          border:
                            '1px solid rgba(255,255,255,0.08)',

                          borderRadius:
                            '20px',

                          color: 'white',

                          backdropFilter:
                            'blur(20px)',

                          boxShadow:
                            '0 10px 40px rgba(0,0,0,0.35)',
                        }}
                      />

                      <Line

                        type="monotone"

                        dataKey="positivity"

                        stroke="#3b82f6"

                        strokeWidth={4}

                        dot={false}

                        activeDot={{

                          r: 7,

                          fill: '#3b82f6',

                          strokeWidth: 4,

                          stroke: '#fff',
                        }}

                      />

                    </LineChart>

                  </ResponsiveContainer>

                </div>

              </motion.div>

            </>
          )
        }

      </main>

    </AuthGuard>
  )
}