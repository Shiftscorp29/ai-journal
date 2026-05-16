import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import { supabase } from './supabase'

export function useAuth() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!supabase) {
          setError('Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
          setLoading(false)
          return
        }

        const { data } = await supabase.auth.getSession()
        setUser(data?.session?.user || null)

        const { data: authListener } = supabase.auth.onAuthStateChange(
          (_event, session) => {
            setUser(session?.user || null)
          }
        )

        return () => {
          authListener?.subscription.unsubscribe()
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Auth error')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const logout = async () => {
    try {
      if (!supabase) return
      await supabase.auth.signOut()
      setUser(null)
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout error')
    }
  }

  return { user, loading, error, logout }
}
