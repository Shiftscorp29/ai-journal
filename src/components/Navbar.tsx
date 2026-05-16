'use client'

import Link from 'next/link'

import {

  useEffect,

  useState,

} from 'react'

import {

  motion,

  AnimatePresence,

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

  // FETCH USER

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

    <>

      {/* NAVBAR */}

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

          z-[100]

          w-[95%]
          max-w-7xl

          h-[74px]

          px-4 sm:px-6 lg:px-8

          rounded-[30px]

          backdrop-blur-2xl

          border

          shadow-xl

          flex items-center

        "

        style={{

          background:
            'var(--card-bg)',

          borderColor:
            'var(--border-color)',
        }}
      >

        {/* LEFT */}

        <div className="

          flex items-center

          min-w-[140px]

        ">

          <Link href="/journal">

            <h1 className="

              text-lg sm:text-xl

              font-semibold

              tracking-tight

            ">

              AI Journal

            </h1>

          </Link>

        </div>

        {/* CENTER */}

        <div className="

          hidden md:flex

          flex-1

          items-center justify-center

          gap-3

        ">

          {

            navLinks.map((link) => (

              <Link

                key={link.name}

                href={link.href}

                className="

                  px-5 py-2.5

                  rounded-2xl

                  text-sm

                  font-medium

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

        {/* RIGHT */}

        <div className="

          flex items-center justify-end

          gap-2

          min-w-[140px]

          ml-auto

        ">

          {/* USER */}

          <div className="

            hidden lg:flex

            items-center gap-3

            px-3 py-2

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

              max-w-[90px]

              truncate

            ">

              {username}

            </span>

          </div>

          {/* THEME */}

          <button

            onClick={toggleTheme}

            className="

              w-11 h-11

              rounded-2xl

              flex items-center justify-center

              border

              transition-all duration-300

              hover:scale-105

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

          {/* LOGOUT */}

          <button

            onClick={logout}

            className="

              w-11 h-11

              rounded-2xl

              flex items-center justify-center

              border

              transition-all duration-300

              hover:scale-105

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

          {/* MOBILE MENU */}

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

      </motion.nav>

      {/* MOBILE MENU */}

      <AnimatePresence>

        {

          menuOpen && (

            <motion.div

              initial={{
                opacity: 0,
                y: -20,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              exit={{
                opacity: 0,
                y: -20,
              }}

              className="

                fixed

                top-24

                left-1/2

                -translate-x-1/2

                z-[99]

                w-[92%]

                rounded-[32px]

                p-5

                backdrop-blur-2xl

                border

                shadow-2xl

                md:hidden

              "

              style={{

                background:
                  'var(--card-bg)',

                borderColor:
                  'var(--border-color)',
              }}
            >

              {/* USER */}

              <div className="

                flex items-center gap-3

                mb-5

                p-3

                rounded-2xl

                bg-black/[0.03]
                dark:bg-white/[0.04]

              ">

                <div className="

                  w-10 h-10

                  rounded-xl

                  flex items-center justify-center

                  bg-gradient-to-br

                  from-blue-500/20
                  to-purple-500/20

                ">

                  <User size={18} />

                </div>

                <div>

                  <p className="

                    text-sm

                    text-[var(--text-secondary)]

                  ">

                    Logged in as

                  </p>

                  <h3 className="font-medium">

                    {username}

                  </h3>

                </div>

              </div>

              {/* LINKS */}

              <div className="

                flex flex-col gap-3

              ">

                {

                  navLinks.map((link) => (

                    <Link

                      key={link.name}

                      href={link.href}

                      onClick={() =>
                        setMenuOpen(false)
                      }

                      className="

                        px-4 py-4

                        rounded-2xl

                        text-sm

                        bg-black/[0.03]
                        dark:bg-white/[0.04]

                        hover:bg-black/[0.05]
                        dark:hover:bg-white/[0.07]

                        transition-all duration-300

                      "
                    >

                      {link.name}

                    </Link>
                  ))
                }

              </div>

            </motion.div>
          )
        }

      </AnimatePresence>

    </>
  )
}