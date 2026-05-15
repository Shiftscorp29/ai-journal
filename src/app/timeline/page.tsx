'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'

export default function TimelinePage() {

  const [entries, setEntries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    fetchEntries()

  }, [])

  const fetchEntries = async () => {

    try {

      const { data, error } = await supabase

        .from('entries')

        .select('*')

        .order('created_at', {
          ascending: false,
        })

      if (error) {

        console.log(error)

      } else {

        setEntries(data || [])
      }

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  return (

    <main className="relative overflow-hidden min-h-screen bg-gradient-to-b from-black via-zinc-950 to-zinc-900 text-white px-8 py-12 md:px-20">

      {/* Background Glow Effects */}

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">

        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

      </div>

      {/* Navbar */}

      <Navbar />

      {/* Page Heading */}

      <div className="mb-16 mt-10">

        <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6">

          Timeline

        </h1>

        <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">

          Explore your emotional memories, reflections,
          and cinematic AI insights over time.

        </p>

      </div>

      {/* Loading State */}

      {loading && (

        <div className="text-zinc-500 text-lg">

          Loading memories...

        </div>
      )}

      {/* Empty State */}

      {!loading && entries.length === 0 && (

        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl">

          <h2 className="text-2xl font-semibold mb-4">

            No Journal Entries Yet

          </h2>

          <p className="text-zinc-400">

            Start writing in your journal to build your emotional timeline.

          </p>

        </div>
      )}

      {/* Timeline Entries */}

      <div className="space-y-10">

        {entries.map((entry, index) => (

          <motion.div

            key={entry.id}

            initial={{ opacity: 0, y: 30 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}

            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl"

          >

            {/* Date */}

            <p className="text-zinc-500 text-sm mb-6">

              {new Date(entry.created_at).toLocaleString()}

            </p>

            {/* Mood Badge */}

            <div className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm mb-6">

              {entry.mood}

            </div>

            {/* Journal Content */}

            <div className="mb-8">

              <h2 className="text-2xl font-semibold mb-4">

                Journal Entry

              </h2>

              <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">

                {entry.content}

              </p>

            </div>

            {/* AI Reflection */}

            <div className="border-t border-white/10 pt-8">

              <h3 className="text-xl font-medium mb-4">

                AI Reflection

              </h3>

              <p className="text-zinc-400 leading-relaxed whitespace-pre-wrap">

                {entry.ai_response}

              </p>

            </div>

            {/* Analytics Row */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

              {/* Stress */}

              <div className="bg-white/5 rounded-2xl p-5 border border-white/10">

                <p className="text-zinc-500 text-sm mb-2">

                  Stress Level

                </p>

                <h4 className="text-3xl font-bold">

                  {entry.stress_level || '--'}

                </h4>

              </div>

              {/* Positivity */}

              <div className="bg-white/5 rounded-2xl p-5 border border-white/10">

                <p className="text-zinc-500 text-sm mb-2">

                  Positivity

                </p>

                <h4 className="text-3xl font-bold">

                  {entry.positivity_score || '--'}

                </h4>

              </div>

              {/* Themes */}

              <div className="bg-white/5 rounded-2xl p-5 border border-white/10">

                <p className="text-zinc-500 text-sm mb-2">

                  Themes

                </p>

                <h4 className="text-lg font-medium text-zinc-300">

                  {entry.themes || 'Reflection'}

                </h4>

              </div>

            </div>

          </motion.div>
        ))}
      </div>

    </main>
  )
}