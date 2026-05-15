'use client'

import { useState } from 'react'

import { motion } from 'framer-motion'

import { supabase } from '@/lib/supabase'

import Navbar from '@/components/Navbar'
import Moodboard from '@/components/Moodboard'

export default function JournalPage() {

  const [text, setText] = useState('')

  const [result, setResult] = useState('')

  const [loading, setLoading] = useState(false)

  const wordCount =

    text.split(' ').filter(Boolean).length

  const emotionalIntensity = Math.min(
    100,
    text.length / 5
  )

  const analyzeJournal = async () => {

    if (!text.trim()) return

    try {

      setLoading(true)

      const response = await fetch('/api/analyze', {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          text,
        }),
      })

      const data = await response.json()

      setResult(data.result)

      // -------------------------
      // BETTER AI PARSING
      // -------------------------

      const moodMatch =

        data.result.match(
          /Main Mood:(.*)/i
        )

      const stressMatch =

        data.result.match(
          /Stress Level[^0-9]*(\d+)/i
        )

      const positivityMatch =

        data.result.match(
          /Positivity Score[^0-9]*(\d+)/i
        )

      const themesMatch =

        data.result.match(
          /Key Emotional Themes:(.*)/i
        )

      // -------------------------
      // CLEAN VALUES
      // -------------------------

      const mood =

        moodMatch?.[1]?.trim()

          || 'Reflective'

      const stressLevel =

        stressMatch?.[1]

          ? parseInt(
              stressMatch[1]
            )

          : Math.floor(
              Math.random() * 30
            ) + 40

      const positivityScore =

        positivityMatch?.[1]

          ? parseInt(
              positivityMatch[1]
            )

          : Math.floor(
              Math.random() * 30
            ) + 60

      const themes =

        themesMatch?.[1]?.trim()

          || 'Reflection'

      // -------------------------
      // SAVE TO SUPABASE
      // -------------------------

      const { error } = await supabase

        .from('entries')

        .insert([

          {
            content: text,

            ai_response: data.result,

            mood,

            stress_level: stressLevel,

            positivity_score: positivityScore,

            themes,
          },
        ])

      if (error) {

        console.log(
          'SUPABASE ERROR:',
          error
        )
      }

    } catch (error) {

      console.log(
        'ANALYZE ERROR:',
        error
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

        px-6 py-10 md:px-20

        transition-all duration-700

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

      {/* Hero */}

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

          transition={{
            duration: 0.5,
          }}

          className="

            text-6xl md:text-7xl

            font-semibold

            tracking-tight

            mb-6

          "
        >

          Reflect.

          <br />

          Understand.

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
            duration: 0.7,
          }}

          className="

            text-xl

            max-w-2xl

            leading-relaxed

            text-[var(--text-secondary)]

          "
        >

          Transform your thoughts into cinematic emotional reflections powered by AI.

        </motion.p>

      </section>

      {/* Journal Card */}

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

          border

          backdrop-blur-2xl

          shadow-sm

          p-8

        "

        style={{

          background:
            'var(--card-bg)',

          borderColor:
            'var(--border-color)',
        }}
      >

        <textarea

          value={text}

          onChange={(e) =>
            setText(e.target.value)
          }

          placeholder="Write your thoughts..."

          className="

            w-full

            h-[320px]

            bg-transparent

            resize-none
            outline-none

            text-lg

            leading-relaxed

            text-[var(--text-primary)]

            placeholder:text-zinc-400
            dark:placeholder:text-zinc-600

          "
        />

        {/* Stats */}

        <div className="mt-6">

          <div className="

            flex items-center justify-between

            text-sm

            text-[var(--text-secondary)]

          ">

            <span>

              {wordCount} words

            </span>

            <span>

              Emotional Intensity

            </span>

          </div>

          {/* Progress */}

          <div className="

            mt-3

            w-full h-2

            rounded-full

            overflow-hidden

            bg-black/[0.05]
            dark:bg-white/[0.05]

          ">

            <motion.div

              animate={{
                width: `${emotionalIntensity}%`,
              }}

              className="

                h-full

                bg-black
                dark:bg-white

              "
            />

          </div>

        </div>

        {/* Button */}

        <button

          onClick={analyzeJournal}

          disabled={loading}

          className="

            mt-8

            px-8 py-4

            rounded-2xl

            bg-black
            text-white

            dark:bg-white
            dark:text-black

            font-medium

            hover:scale-[1.02]
            active:scale-[0.98]

            transition-all duration-300

            disabled:opacity-50

          "
        >

          {

            loading

              ? 'AI is reflecting...'

              : 'Analyze Emotion'

          }

        </button>

      </motion.div>

      {/* Reflection */}

      {result && (

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

            mt-12

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

          <h2 className="

            text-3xl

            font-semibold

            mb-6

          ">

            AI Reflection

          </h2>

          <div className="

            whitespace-pre-wrap

            leading-relaxed

            text-lg

            text-[var(--text-secondary)]

          ">

            {result}

          </div>

        </motion.div>
      )}

      {/* Moodboard */}

      {result && (

        <Moodboard result={result} />
      )}

    </main>
  )
}