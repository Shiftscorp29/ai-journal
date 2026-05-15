'use client'

import Link from 'next/link'

import { usePathname } from 'next/navigation'

import { motion } from 'framer-motion'

import ThemeToggle from './ThemeToggle'

export default function Navbar() {

  const pathname = usePathname()

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

      transition={{
        duration: 0.5,
      }}

      className="

        sticky top-6 z-50

        flex items-center justify-between

        px-6 py-4

        rounded-[28px]

        border border-[var(--border)]

        bg-[var(--card)]

        backdrop-blur-2xl

        shadow-sm

      "
    >

      {/* Logo */}

      <Link

        href="/journal"

        className="

          text-2xl md:text-3xl
          font-semibold
          tracking-tight

        "
      >

        AI Journal

      </Link>

      {/* Navigation */}

      <div className="flex items-center gap-3">

        <div className="

          flex items-center gap-2

          p-1.5

          rounded-2xl

          bg-black/[0.03]
          dark:bg-white/[0.03]

        ">

          {navLinks.map((link) => {

            const isActive =
              pathname === link.href

            return (

              <Link

                key={link.href}

                href={link.href}

                className={`

                  px-4 py-2.5

                  rounded-xl

                  text-sm
                  font-medium

                  transition-all duration-300

                  ${

                    isActive

                      ? `

                        bg-black
                        text-white

                        dark:bg-white
                        dark:text-black

                      `

                      : `

                        text-zinc-500
                        dark:text-zinc-400

                        hover:text-black
                        dark:hover:text-white

                      `
                  }

                `}
              >

                {link.name}

              </Link>
            )
          })}

        </div>

        {/* Theme Toggle */}

        <ThemeToggle />

      </div>

    </motion.nav>
  )
}