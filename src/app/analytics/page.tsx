'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

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

    date: new Date(entry.created_at)
      .toLocaleDateString(),

    stress: entry.stress_level,

    positivity: entry.positivity_score,
  }))

  return (

    <main className="relative overflow-hidden min-h-screen bg-gradient-to-b from-black via-zinc-950 to-zinc-900 text-white px-8 py-12 md:px-20">

      {/* Glow */}

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">

        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

      </div>

      <Navbar />

      <div className="mt-10 mb-16">

        <h1 className="text-6xl font-bold tracking-tight mb-6">

          Emotional Analytics

        </h1>

        <p className="text-zinc-400 text-lg max-w-2xl">

          Visualize your emotional growth,
          stress patterns, and positivity trends over time.

        </p>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

          <p className="text-zinc-500 mb-3">

            Total Entries

          </p>

          <h2 className="text-5xl font-bold">

            {entries.length}

          </h2>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

          <p className="text-zinc-500 mb-3">

            Average Stress

          </p>

          <h2 className="text-5xl font-bold">

            {

              entries.length > 0

                ? Math.round(

                    entries.reduce(

                      (acc, curr) =>

                        acc + (curr.stress_level || 0),

                      0
                    ) / entries.length
                  )

                : 0

            }

          </h2>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

          <p className="text-zinc-500 mb-3">

            Average Positivity

          </p>

          <h2 className="text-5xl font-bold">

            {

              entries.length > 0

                ? Math.round(

                    entries.reduce(

                      (acc, curr) =>

                        acc + (curr.positivity_score || 0),

                      0
                    ) / entries.length
                  )

                : 0

            }

          </h2>

        </div>

      </div>

      {/* Charts */}

      <div className="space-y-12">

        {/* Stress Chart */}

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

          <h2 className="text-3xl font-semibold mb-8">

            Stress Trend

          </h2>

          <div className="h-[400px]">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={chartData}>

                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />

                <XAxis dataKey="date" stroke="#71717a" />

                <YAxis stroke="#71717a" />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="stress"
                  stroke="#a855f7"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Positivity Chart */}

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

          <h2 className="text-3xl font-semibold mb-8">

            Positivity Trend

          </h2>

          <div className="h-[400px]">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={chartData}>

                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />

                <XAxis dataKey="date" stroke="#71717a" />

                <YAxis stroke="#71717a" />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="positivity"
                  stroke="#3b82f6"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </main>
  )
}