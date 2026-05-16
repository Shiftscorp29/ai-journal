import './globals.css'

import type { Metadata } from 'next'

import {

  Inter,

} from 'next/font/google'

const inter = Inter({

  subsets: ['latin'],
})

export const metadata: Metadata = {

  title: 'AI Journal',

  description:
    'AI powered emotional journaling platform',
}

export default function RootLayout({

  children,

}: {

  children: React.ReactNode

}) {

  return (

    <html

      lang="en"

      className="dark"

      data-scroll-behavior="smooth"

      suppressHydrationWarning
    >

      <body

        className={inter.className}
      >

        {children}

      </body>

    </html>
  )
}