// src/components/AuthGuard.tsx
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

type Props = {
  children: React.ReactNode
}

export default function AuthGuard({ children }: Props) {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        setAuthenticated(true)
      } else {
        navigate('/auth')
      }
      setLoading(false)
    }

    checkSession()
  }, [navigate])

  if (loading) return <p className="p-4">Checking authentication...</p>
  if (!authenticated) return null
  return <>{children}</>
}
