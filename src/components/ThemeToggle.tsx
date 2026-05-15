'use client'

import { Moon, Sun } from 'lucide-react'

import { useTheme } from 'next-themes'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {

  const { theme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {

    setMounted(true)

  }, [])

  if (!mounted) return null

  return (

    <button

      onClick={() =>
        setTheme(
          theme === 'dark'
            ? 'light'
            : 'dark'
        )
      }

      className="

        w-11 h-11

        flex items-center justify-center

        rounded-2xl

        border
        border-black/5
        dark:border-white/10

        bg-white/70
        dark:bg-white/[0.04]

        backdrop-blur-2xl

        shadow-sm
        dark:shadow-none

        hover:scale-105
        active:scale-95

        transition-all duration-300

      "
    >

      {

        theme === 'dark'

          ? (

            <Sun
              size={18}
              className="text-white"
            />
          )

          : (

            <Moon
              size={18}
              className="text-black"
            />
          )
      }

    </button>
  )
}