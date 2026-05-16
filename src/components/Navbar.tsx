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

  Menu,

  X,

  User,

} from 'lucide-react'

import {

  useRouter,

} from 'next/navigation'

import { supabase } from '@/lib/supabase'

export default function Navbar() {

  const router = useRouter()

  const [dark, setDark] =
    useState(true)

  const [menuOpen, setMenuOpen] =
    useState(false)

  const [username, setUsername] =
    useState('User')

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

    fetchProfile()

  }, [])

  const fetchProfile = async () => {

    const {

      data: { user },

    } = await supabase.auth.getUser()

    if (!user) return

    const { data } =
      await supabase

        .from('profiles')

        .select('username')

        .eq('id', user.id)

        .single()

    if (data?.username) {

      setUsername(data.username)
    }
  }

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

  const navLinks = [

    {
      name: 'Journal',
      href: '/journal',
    },

    {
      name: 'Timeline',
      href: '/timeline',
    },

    {
      name: 'Analytics',
      href: '/analytics',
    },
  ]

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

        px-4 sm:px-6

        py-4

        rounded-[30px]

        backdrop-blur-2xl

        border

        flex items-center justify-between

        shadow-xl

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

      {/* Desktop Nav */}

      <div className="

        hidden md:flex

        items-center gap-3

      ">

        {

          navLinks.map((link) => (

            <Link

              key={link.name}

              href={link.href}

              className="

                px-4 py-2

                rounded-2xl

                text-sm

                hover:bg-black/[0.05]
                dark:hover:bg-white/[0.05]

              "
            >

              {link.name}

            </Link>
          ))
        }

      </div>

      {/* Right */}

      <div className="

        flex items-center gap-3

      ">

        {/* User */}

        <div className="

          hidden sm:flex

          items-center gap-3

          px-4 py-2

          rounded-2xl

          border

          bg-black/[0.03]
          dark:bg-white/[0.04]

        "

        style={{

          borderColor:
            'var(--border-color)',
        }}
        >

          <div className="

            w-9 h-9

            rounded-xl

            flex items-center justify-center

            bg-gradient-to-br

            from-blue-500/20
            to-purple-500/20

          ">

            <User size={16} />

          </div>

          <span className="

            text-sm

            font-medium

          ">

            {username}

          </span>

        </div>

        {/* Theme */}

        <button

          onClick={toggleTheme}

          className="

            w-11 h-11

            rounded-2xl

            flex items-center justify-center

            border

            bg-gradient-to-br

            from-yellow-400/20
            to-orange-400/20

            dark:from-blue-500/20
            dark:to-purple-500/20

          "

          style={{

            borderColor:
              'var(--border-color)',
          }}
        >

          {

            dark

              ? (

                <Sun

                  size={18}

                  className="text-yellow-500"

                />

              )

              : (

                <Moon

                  size={18}

                  className="text-blue-500"

                />

              )
          }

        </button>

        {/* Logout */}

        <button

          onClick={logout}

          className="

            w-11 h-11

            rounded-2xl

            flex items-center justify-center

            border

            bg-gradient-to-br

            from-red-500/20
            to-orange-500/20

          "

          style={{

            borderColor:
              'var(--border-color)',
          }}
        >

          <LogOut

            size={18}

            className="text-red-500"

          />

        </button>

        {/* Mobile */}

        <button

          onClick={() =>
            setMenuOpen(!menuOpen)
          }

          className="

            md:hidden

            w-11 h-11

            rounded-2xl

            flex items-center justify-center

            border

          "

          style={{

            borderColor:
              'var(--border-color)',
          }}
        >

          {

            menuOpen

              ? <X size={20} />

              : <Menu size={20} />

          }

        </button>

      </div>

    </motion.nav>
  )
}