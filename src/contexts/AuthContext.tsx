
import React, { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  userId: string | null
  email: string | null
  login: (userId: string, email: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    // Check session storage for existing auth state
    const storedUserId = sessionStorage.getItem('userId')
    const storedEmail = sessionStorage.getItem('email')
    
    if (storedUserId && storedEmail) {
      setIsAuthenticated(true)
      setUserId(storedUserId)
      setEmail(storedEmail)
    }
  }, [])

  const login = (newUserId: string, newEmail: string) => {
    setIsAuthenticated(true)
    setUserId(newUserId)
    setEmail(newEmail)
    sessionStorage.setItem('userId', newUserId)
    sessionStorage.setItem('email', newEmail)
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUserId(null)
    setEmail(null)
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('email')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
