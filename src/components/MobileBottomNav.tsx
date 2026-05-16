'use client'

import Link from 'next/link'

import { usePathname } from 'next/navigation'

import {

  BookOpen,

  Clock3,

  BarChart3,

} from 'lucide-react'

export default function MobileBottomNav() {

  const pathname = usePathname()

  const links = [

    {
      name: 'Journal',
      href: '/journal',
      icon: BookOpen,
    },

    {
      name: 'Timeline',
      href: '/timeline',
      icon: Clock3,
    },

    {
      name: 'Analytics',
      href: '/analytics',
      icon: BarChart3,
    },
  ]

  return (

    <div

      className="

        fixed

        bottom-5 left-1/2

        -translate-x-1/2

        z-[90]

        md:hidden

        w-[92%]

        rounded-[28px]

        backdrop-blur-2xl

        border

        shadow-2xl

        px-4 py-3

        flex items-center justify-around

      "

      style={{

        background:
          'var(--card-bg)',

        borderColor:
          'var(--border-color)',
      }}
    >

      {

        links.map((link) => {

          const Icon = link.icon

          const active =
            pathname === link.href

          return (

            <Link

              key={link.name}

              href={link.href}

              className={`

                flex flex-col items-center gap-1

                px-4 py-2

                rounded-2xl

                transition-all duration-300

                ${

                  active

                    ? 'bg-black text-white dark:bg-white dark:text-black'

                    : 'text-[var(--text-secondary)]'
                }

              `}
            >

              <Icon size={18} />

              <span className="text-xs">

                {link.name}

              </span>

            </Link>
          )
        })
      }

    </div>
  )
}