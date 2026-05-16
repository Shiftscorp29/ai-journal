'use client'

import Link from 'next/link'

import {

  useEffect,

  useRef,

  useState,

} from 'react'

import {

  motion,

  AnimatePresence,

} from 'framer-motion'

import {

  Moon,

  Sun,

  Menu,

  X,

  User,

  LogOut,

  Settings,

  Save,

} from 'lucide-react'

import {

  useRouter,

} from 'next/navigation'

import { supabase } from '@/lib/supabase'

export default function Navbar() {

  const router = useRouter()

  const dropdownRef = useRef<any>(null)

  const mobileMenuRef = useRef<any>(null)

  const [dark, setDark] =
    useState(true)

  const [menuOpen, setMenuOpen] =
    useState(false)

  const [profileOpen, setProfileOpen] =
    useState(false)

  const [settingsOpen, setSettingsOpen] =
    useState(false)

  const [username, setUsername] =
    useState('User')

  const [newUsername, setNewUsername] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [saving, setSaving] =
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

    fetchProfile()

    const handleClickOutside = (
      event: any
    ) => {

      // PROFILE

      if (

        dropdownRef.current &&

        !dropdownRef.current.contains(
          event.target
        )

      ) {

        setProfileOpen(false)
      }

      // MOBILE MENU

      if (

        mobileMenuRef.current &&

        !mobileMenuRef.current.contains(
          event.target
        )

      ) {

        setMenuOpen(false)
      }
    }

    document.addEventListener(

      'mousedown',

      handleClickOutside
    )

    return () =>

      document.removeEventListener(

        'mousedown',

        handleClickOutside
      )

  }, [])

  // FETCH PROFILE

  const fetchProfile = async () => {

    const {

      data: { user },

    } = await supabase.auth.getUser()

    if (!user) return

    setEmail(user.email || '')

    const { data } =
      await supabase

        .from('profiles')

        .select('username')

        .eq('id', user.id)

        .single()

    if (data?.username) {

      setUsername(data.username)

      setNewUsername(
        data.username
      )
    }
  }

  // SAVE SETTINGS

  const saveSettings = async () => {

    try {

      setSaving(true)

      const {

        data: { user },

      } = await supabase.auth.getUser()

      if (!user) return

      await supabase

        .from('profiles')

        .update({

          username: newUsername,
        })

        .eq('id', user.id)

      setUsername(newUsername)

      setSettingsOpen(false)

    } catch (error) {

      console.log(error)

    } finally {

      setSaving(false)
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

        {/* LOGO */}

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

        {/* DESKTOP NAV */}

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

          flex items-center gap-2

          ml-auto

        ">

          {/* PROFILE */}

          <div

            className="relative"

            ref={dropdownRef}
          >

            <button

              onClick={() =>
                setProfileOpen(
                  !profileOpen
                )
              }

              className="

                flex items-center gap-3

                px-3 py-2

                rounded-2xl

                border

                bg-black/[0.08]
                dark:bg-white/[0.10]

                hover:bg-black/[0.10]
                dark:hover:bg-white/[0.12]

                transition-all duration-300

              "

              style={{

                borderColor:
                  'var(--border-color)',
              }}
            >

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

              <span className="

                hidden sm:block

                text-sm

                font-medium

                max-w-[100px]

                truncate

              ">

                {username}

              </span>

            </button>

            {/* PROFILE DROPDOWN */}

            <AnimatePresence>

              {

                profileOpen && (

                  <motion.div

                    initial={{
                      opacity: 0,
                      y: -10,
                    }}

                    animate={{
                      opacity: 1,
                      y: 0,
                    }}

                    exit={{
                      opacity: 0,
                      y: -10,
                    }}

                    className="

                      absolute

                      right-0

                      top-[70px]

                      w-[290px]

                      rounded-[28px]

                      p-4

                      backdrop-blur-2xl

                      border

                      shadow-2xl

                    "

                    style={{

                      background:
                        'rgba(15,15,15,0.88)',

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

                      bg-black/[0.08]
                      dark:bg-white/[0.10]

                    ">

                      <div className="

                        w-12 h-12

                        rounded-2xl

                        flex items-center justify-center

                        bg-gradient-to-br

                        from-blue-500/20
                        to-purple-500/20

                      ">

                        <User size={20} />

                      </div>

                      <div className="min-w-0">

                        <h3 className="

                          font-medium

                          truncate

                        ">

                          {username}

                        </h3>

                        <p className="

                          text-xs

                          truncate

                          text-[var(--text-secondary)]

                        ">

                          {email}

                        </p>

                      </div>

                    </div>

                    {/* THEME */}

                    <button

                      onClick={toggleTheme}

                      className="

                        w-full

                        flex items-center justify-between

                        px-4 py-3

                        rounded-2xl

                        bg-black/[0.08]
                        dark:bg-white/[0.10]

                        mb-2

                      "
                    >

                      <div className="

                        flex items-center gap-3

                      ">

                        {

                          dark

                            ? <Sun size={18} />

                            : <Moon size={18} />

                        }

                        <span>

                          Theme

                        </span>

                      </div>

                      <span className="text-sm">

                        {

                          dark

                            ? 'Dark'

                            : 'Light'

                        }

                      </span>

                    </button>

                    {/* SETTINGS */}

                    <button

                      onClick={() =>
                        setSettingsOpen(
                          !settingsOpen
                        )
                      }

                      className="

                        w-full

                        flex items-center gap-3

                        px-4 py-3

                        rounded-2xl

                        bg-black/[0.08]
                        dark:bg-white/[0.10]

                        hover:bg-black/[0.10]
                        dark:hover:bg-white/[0.12]

                        transition-all duration-300

                      "
                    >

                      <Settings size={18} />

                      <span>

                        Account Settings

                      </span>

                    </button>

                    {/* SETTINGS PANEL */}

                    <AnimatePresence>

                      {

                        settingsOpen && (

                          <motion.div

                            initial={{
                              opacity: 0,
                              height: 0,
                            }}

                            animate={{
                              opacity: 1,
                              height: 'auto',
                            }}

                            exit={{
                              opacity: 0,
                              height: 0,
                            }}

                            className="

                              overflow-hidden

                              mt-3

                            "
                          >

                            <div className="

                              p-4

                              rounded-2xl

                              bg-black/[0.08]
                              dark:bg-white/[0.08]

                            ">

                              <label className="

                                text-sm

                                text-[var(--text-secondary)]

                              ">

                                Username

                              </label>

                              <input

                                value={
                                  newUsername
                                }

                                onChange={(e) =>
                                  setNewUsername(
                                    e.target.value
                                  )
                                }

                                className="

                                  w-full

                                  h-12

                                  px-4

                                  rounded-2xl

                                  mt-2 mb-4

                                  border

                                  bg-transparent

                                  outline-none

                                "

                                style={{

                                  borderColor:
                                    'var(--border-color)',
                                }}
                              />

                              <button

                                onClick={
                                  saveSettings
                                }

                                disabled={
                                  saving
                                }

                                className="

                                  w-full

                                  h-12

                                  rounded-2xl

                                  bg-white
                                  text-black

                                  font-medium

                                  flex items-center justify-center gap-2

                                "
                              >

                                <Save size={16} />

                                {

                                  saving

                                    ? 'Saving...'

                                    : 'Save Changes'

                                }

                              </button>

                            </div>

                          </motion.div>
                        )
                      }

                    </AnimatePresence>

                    {/* LOGOUT */}

                    <button

                      onClick={logout}

                      className="

                        w-full

                        flex items-center gap-3

                        px-4 py-3

                        rounded-2xl

                        text-red-500

                        bg-red-500/10

                        mt-3

                        hover:bg-red-500/20

                        hover:scale-[1.02]

                        active:scale-[0.98]

                        transition-all duration-300

                      "
                    >

                      <LogOut size={18} />

                      <span>

                        Logout

                      </span>

                    </button>

                  </motion.div>
                )
              }

            </AnimatePresence>

          </div>

          {/* MOBILE BUTTON */}

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

              bg-black/[0.08]
              dark:bg-white/[0.10]

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

              ref={mobileMenuRef}

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

                top-[95px]
                left-1/2

                -translate-x-1/2

                z-[90]

                w-[95%]

                rounded-[30px]

                p-5

                backdrop-blur-2xl

                border

                shadow-2xl

                md:hidden

              "

              style={{

                background:
                  'rgba(15,15,15,0.92)',

                borderColor:
                  'var(--border-color)',
              }}
            >

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

                        h-14

                        rounded-2xl

                        flex items-center

                        px-5

                        bg-black/[0.08]
                        dark:bg-white/[0.08]

                        text-base

                        font-medium

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