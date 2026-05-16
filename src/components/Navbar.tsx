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

  // THEME

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

  // LOGOUT

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

        <motion.h1

          whileHover={{
            scale: 1.03,
          }}

          className="

            text-lg sm:text-xl

            font-semibold

            tracking-tight

          "
        >

          MindFrame

        </motion.h1>

      </Link>

      {/* Desktop Links */}

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

                transition-all duration-300

              "
            >

              {link.name}

            </Link>
          ))
        }

      </div>

      {/* Right */}

      <div className="

        flex items-center gap-2

      ">

        {/* Theme Toggle */}

        <motion.button

          whileHover={{
            scale: 1.08,
          }}

          whileTap={{
            scale: 0.95,
          }}

          onClick={toggleTheme}

          className="

            relative

            w-11 h-11

            rounded-2xl

            flex items-center justify-center

            overflow-hidden

            border

            shadow-lg

            transition-all duration-300

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

          <div className="

            absolute inset-0

            bg-white/10

            dark:bg-black/10

            backdrop-blur-xl

          " />

          <div className="relative z-10">

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

          </div>

        </motion.button>

        {/* Logout */}

        <motion.button

          whileHover={{
            scale: 1.08,
          }}

          whileTap={{
            scale: 0.95,
          }}

          onClick={logout}

          className="

            relative

            w-11 h-11

            rounded-2xl

            flex items-center justify-center

            overflow-hidden

            border

            shadow-lg

            transition-all duration-300

            bg-gradient-to-br

            from-red-500/20
            to-orange-500/20

          "

          style={{

            borderColor:
              'var(--border-color)',
          }}
        >

          <div className="

            absolute inset-0

            bg-white/10

            dark:bg-black/10

            backdrop-blur-xl

          " />

          <LogOut

            size={18}

            className="

              relative z-10

              text-red-500

            "
          />

        </motion.button>

        {/* Mobile Menu */}

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

            bg-black/[0.04]
            dark:bg-white/[0.05]

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

      {/* Mobile Dropdown */}

      {

        menuOpen && (

          <motion.div

            initial={{
              opacity: 0,
              y: -10,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            className="

              absolute

              top-[88px]
              left-0

              w-full

              rounded-[28px]

              p-4

              backdrop-blur-2xl

              border

              shadow-xl

              flex flex-col gap-3

              md:hidden

            "

            style={{

              background:
                'var(--card-bg)',

              borderColor:
                'var(--border-color)',
            }}
          >

            {

              navLinks.map((link) => (

                <Link

                  key={link.name}

                  href={link.href}

                  onClick={() =>
                    setMenuOpen(false)
                  }

                  className="

                    px-4 py-3

                    rounded-2xl

                    hover:bg-black/[0.05]
                    dark:hover:bg-white/[0.05]

                    transition-all

                  "
                >

                  {link.name}

                </Link>
              ))
            }

          </motion.div>
        )
      }

    </motion.nav>
  )
}