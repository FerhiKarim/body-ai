import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '@/lib/supabase'

interface Session {
  user: {
    id: string
    email: string
    [key: string]: any
  } | null
}

// Create a context with default value as null
const SessionContext = createContext<{
  isAuthenticated: boolean
  session: Session | null
  setSession: React.Dispatch<React.SetStateAction<Session | null>>
}>({
  isAuthenticated: false,
  session: null,
  setSession: () => {}
})

interface SessionProviderProps {
  children: ReactNode
}

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    // Get the current session from Supabase on component mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session)
      // @ts-ignore
      setSession(session)
    })

    // Set up the listener for authentication state changes
    const { data: {subscription} } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session)
      // @ts-ignore
      setSession(session)
    })

    // Cleanup listener on component unmount
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <SessionContext.Provider value={{ isAuthenticated, session, setSession }}>
      {children}
    </SessionContext.Provider>
  )
}

export { SessionContext, SessionProvider }
