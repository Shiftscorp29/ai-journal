'use client'

import Link from 'next/link'

import {

  useEffect,

  useState,

} from 'react'

import {

  motion,

} from 'framer-motion'

import {

  Moon,

  Sun,

  LogOut,

} from 'lucide-react'

import {

  useRouter,

} from 'next/navigation'

import { supabase } from '@/lib/supabase'

export default function Navbar() {

  const router = useRouter()

  const [dark, setDark] =
    useState(true)

  useEffect(() => {

    const savedTheme =
      localStorage.getItem('theme')

    if (savedTheme === 'light') {

      document.documentElement
        .classList.remove('dark')

      setDark(false)

    } else {

      document.documentElement
        .classList.add('dark')

      setDark(true)
    }

  }, [])

  const toggleTheme = () => {

    if (dark) {

      document.documentElement
        .classList.remove('dark')

      localStorage.setItem(
        'theme',
        'light'
      )

    } else {

      document.documentElement
        .classList.add('dark')

      localStorage.setItem(
        'theme',
        'dark'
      )
    }

    setDark(!dark)
  }

  const logout = async () => {

    await supabase.auth.signOut()

    router.push('/auth')
  }

  return (

    <motion.nav

      initial={{
        opacity: 0,
        y: -20,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      className="

        fixed

        top-5 left-1/2

        -translate-x-1/2

        z-50

        w-[95%]
        max-w-6xl

        px-5 py-4

        rounded-[28px]

        backdrop-blur-2xl

        border

        flex items-center justify-between

      "

      style={{

        background:
          'var(--card-bg)',

        borderColor:
          'var(--border-color)',
      }}
    >

      {/* Logo */}

      <Link href="/journal">

        <h1 className="

          text-lg sm:text-xl

          font-semibold

        ">

          MindFrame

        </h1>

      </Link>

      {/* Links */}

      <div className="

        flex items-center gap-5

        text-sm sm:text-base

      ">

        <Link href="/journal">
          Journal
        </Link>

        <Link href="/timeline">
          Timeline
        </Link>

        <Link href="/analytics">
          Analytics
        </Link>

      </div>

      {/* Right */}

      <div className="

        flex items-center gap-2

      ">

        {/* Theme */}

        <button

          onClick={toggleTheme}

          className="

            w-11 h-11

            rounded-2xl

            flex items-center justify-center

          "
        >

          {

            dark

              ? <Sun size={18} />

              : <Moon size={18} />

          }

        </button>

        {/* Logout */}

        <button

          onClick={logout}

          className="

            w-11 h-11

            rounded-2xl

            flex items-center justify-center

            text-red-500

          "
        >

          <LogOut size={18} />

        </button>

      </div>

    </motion.nav>
  )
}