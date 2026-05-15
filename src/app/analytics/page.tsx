'use client'

import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import {

  ResponsiveContainer,

  LineChart,

  Line,

  XAxis,

  YAxis,

  Tooltip,

  CartesianGrid,

  AreaChart,

  Area,

} from 'recharts'

import { supabase } from '@/lib/supabase'

import Navbar from '@/components/Navbar'

export default function AnalyticsPage() {

  const [entries, setEntries] = useState<any[]>([])

  useEffect(() => {

    fetchEntries()

  }, [])

  const fetchEntries = async () => {

    const { data, error } = await supabase

      .from('entries')

      .select('*')

      .order('created_at', {
        ascending: true,
      })

    if (!error) {

      setEntries(data || [])
    }
  }

  const chartData = entries.map((entry) => ({

    date:

      new Date(
        entry.created_at
      ).toLocaleDateString(),

    stress:
      entry.stress_level,

    positivity:
      entry.positivity_score,
  }))

  const averageStress =

    entries.length > 0

      ? Math.round(

          entries.reduce(

            (acc, curr) =>

              acc + (
                curr.stress_level || 0
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
                curr.positivity_score || 0
              ),

            0
          ) / entries.length
        )

      : 0

  return (

    <main

      className="

        relative

        min-h-screen

        px-6 py-10 md:px-20

      "
    >

      {/* Ambient Glow */}

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

            text-xl

            max-w-2xl

            leading-relaxed

            text-[var(--text-secondary)]

          "
        >

          Visualize emotional patterns, stress trends,
          positivity growth, and reflective progress over time.

        </motion.p>

      </section>

      {/* Premium Circular Stats */}

      <div className="

        grid

        grid-cols-1 md:grid-cols-3

        gap-8

        mb-14

      ">

        {/* Total Entries */}

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

            rounded-[32px]

            p-10

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

          <div className="

            w-40 h-40

            rounded-full

            flex items-center justify-center

            mb-6

            bg-gradient-to-br

            from-blue-500/20
            to-purple-500/20

            border border-white/10

          ">

            <h2 className="

              text-5xl

              font-semibold

            ">

              {entries.length}

            </h2>

          </div>

          <p className="

            text-lg

            text-[var(--text-secondary)]

          ">

            Total Entries

          </p>

        </motion.div>

        {/* Stress */}

        <motion.div

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

            rounded-[32px]

            p-10

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

          <div className="

            w-40 h-40

            rounded-full

            flex items-center justify-center

            mb-6

            bg-gradient-to-br

            from-red-500/20
            to-orange-500/20

            border border-white/10

          ">

            <h2 className="

              text-5xl

              font-semibold

            ">

              {averageStress}

            </h2>

          </div>

          <p className="

            text-lg

            text-[var(--text-secondary)]

          ">

            Average Stress

          </p>

        </motion.div>

        {/* Positivity */}

        <motion.div

          initial={{
            opacity: 0,
            y: 20,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            delay: 0.2,
          }}

          className="

            rounded-[32px]

            p-10

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

          <div className="

            w-40 h-40

            rounded-full

            flex items-center justify-center

            mb-6

            bg-gradient-to-br

            from-green-500/20
            to-blue-500/20

            border border-white/10

          ">

            <h2 className="

              text-5xl

              font-semibold

            ">

              {averagePositivity}

            </h2>

          </div>

          <p className="

            text-lg

            text-[var(--text-secondary)]

          ">

            Average Positivity

          </p>

        </motion.div>

      </div>

      {/* Charts */}

      <div className="space-y-10">

        {/* Stress Chart */}

        <motion.div

          initial={{
            opacity: 0,
            y: 30,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

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

          <h2 className="

            text-3xl

            font-semibold

            mb-8

          ">

            Stress Trend

          </h2>

          <div className="h-[400px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <AreaChart data={chartData}>

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

                      stopOpacity={0.4}

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

                />

                <YAxis stroke="#888" />

                <Tooltip />

                <Area

                  type="monotone"

                  dataKey="stress"

                  stroke="#ef4444"

                  fill="url(#stressGradient)"

                  strokeWidth={3}

                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </motion.div>

        {/* Positivity Chart */}

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
            delay: 0.1,
          }}

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

          <h2 className="

            text-3xl

            font-semibold

            mb-8

          ">

            Positivity Trend

          </h2>

          <div className="h-[400px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart data={chartData}>

                <CartesianGrid

                  strokeDasharray="3 3"

                  stroke="rgba(120,120,120,0.12)"

                />

                <XAxis

                  dataKey="date"

                  stroke="#888"

                />

                <YAxis stroke="#888" />

                <Tooltip />

                <Line

                  type="monotone"

                  dataKey="positivity"

                  stroke="#3b82f6"

                  strokeWidth={4}

                  dot={false}

                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </motion.div>

      </div>

    </main>
  )
}