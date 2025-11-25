import React, { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const storedUser = authService.getStoredUser()
      if (storedUser) {
        setUser(storedUser)
      }
    } catch (err) {
      console.error('Error restoring session:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  async function login(email, password) {
    try {
      const data = await authService.login(email, password)
      const userData = {
        id: data.id,
        email: data.email,
        role: data.role,
      }
      setUser(userData)
      return { ok: true, user: userData }
    } catch (error) {
      console.error('Login error:', error)
      return { ok: false, message: error.message || 'Invalid credentials' }
    }
  }

  async function register(email, password, role) {
    try {
      const data = await authService.register(email, password, role)
      const userData = {
        id: data.id,
        email: data.email,
        role: data.role,
      }
      setUser(userData)
      return { ok: true, user: userData }
    } catch (error) {
      console.error('Register error:', error)
      return { ok: false, message: error.message || 'Registration failed' }
    }
  }

  function logout() {
    authService.logout()
    setUser(null)
  }

  const value = { user, login, register, logout, isLoading }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

export default AuthProvider
