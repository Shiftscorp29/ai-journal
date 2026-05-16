'use client'

import {

  useEffect,

  useState,

} from 'react'

import {

  useRouter,

} from 'next/navigation'

import { supabase } from '@/lib/supabase'

export default function AuthGuard({

  children,

}: any) {

  const router = useRouter()

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    checkUser()

  }, [])

  const checkUser = async () => {

    const {

      data: { user },

    } = await supabase.auth.getUser()

    if (!user) {

      router.push('/auth')

    } else {

      setLoading(false)
    }
  }

  if (loading) {

    return (

      <div className="

        min-h-screen

        flex items-center justify-center

      ">

        Loading...

      </div>
    )
  }

  return children
}