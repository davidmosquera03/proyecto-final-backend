import React, { createContext, useContext, useState, useEffect } from 'react'

// Hardcoded test users
const USERS = [
  { username: 'student', password: 'student123', role: 'student' },
  { username: 'teacher', password: 'teacher123', role: 'teacher' },
]

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Restaurar sesión desde localStorage al montar
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('authUser')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (err) {
      console.error('Error restaurando sesión:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  function login(username, password) {
    const found = USERS.find(
      (u) => u.username === username && u.password === password,
    )
    if (found) {
      const userData = { username: found.username, role: found.role }
      setUser(userData)
      localStorage.setItem('authUser', JSON.stringify(userData))
      return { ok: true }
    }
    return { ok: false, message: 'Credenciales inválidas' }
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('authUser')
  }

  const value = { user, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

export default AuthProvider
