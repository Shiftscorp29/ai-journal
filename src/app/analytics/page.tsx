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

          Visualize emotional patterns, positivity trends,
          stress levels, and reflective growth over time.

        </motion.p>

      </section>

      {/* Stats */}

      <div className="

        grid

        grid-cols-1 md:grid-cols-3

        gap-6

        mb-12

      ">

        {/* Total Entries */}

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

          <p className="

            text-sm

            mb-4

            text-[var(--text-secondary)]

          ">

            Total Entries

          </p>

          <h2 className="

            text-5xl

            font-semibold

          ">

            {entries.length}

          </h2>

        </div>

        {/* Stress */}

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

          <p className="

            text-sm

            mb-4

            text-[var(--text-secondary)]

          ">

            Average Stress

          </p>

          <h2 className="

            text-5xl

            font-semibold

          ">

            {averageStress}

          </h2>

        </div>

        {/* Positivity */}

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

          <p className="

            text-sm

            mb-4

            text-[var(--text-secondary)]

          ">

            Average Positivity

          </p>

          <h2 className="

            text-5xl

            font-semibold

          ">

            {averagePositivity}

          </h2>

        </div>

      </div>

      {/* Charts */}

      <div className="space-y-10">

        {/* Stress Chart */}

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

              <LineChart data={chartData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(120,120,120,0.15)"
                />

                <XAxis
                  dataKey="date"
                  stroke="#888"
                />

                <YAxis stroke="#888" />

                <Tooltip />

                <Line

                  type="monotone"

                  dataKey="stress"

                  stroke="#8b5cf6"

                  strokeWidth={3}

                  dot={false}

                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Positivity Chart */}

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
                  stroke="rgba(120,120,120,0.15)"
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

                  strokeWidth={3}

                  dot={false}

                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </main>
  )
}