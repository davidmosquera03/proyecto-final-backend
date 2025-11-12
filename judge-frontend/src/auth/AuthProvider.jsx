import React, { createContext, useContext, useState } from 'react'

// Hardcoded test users
const USERS = [
  { username: 'student', password: 'student123', role: 'student' },
  { username: 'teacher', password: 'teacher123', role: 'teacher' },
]

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  function login(username, password) {
    const found = USERS.find(
      (u) => u.username === username && u.password === password,
    )
    if (found) {
      setUser({ username: found.username, role: found.role })
      return { ok: true }
    }
    return { ok: false, message: 'Credenciales inválidas' }
  }

  function logout() {
    setUser(null)
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
