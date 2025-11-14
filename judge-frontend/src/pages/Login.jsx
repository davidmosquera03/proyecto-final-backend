import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const auth = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    const res = auth.login(username, password)
    if (res.ok) {
      // redirect according to role
      if (auth.user.role === 'student') navigate('/student')
      else if (auth.user.role === 'teacher') navigate('/teacher')
      else navigate('/')
    } else {
      setError(res.message || 'Error en login')
    }
  }

  return (
    <div className="auth-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Usuario
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario"
            required
          />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="contraseña"
            required
          />
        </label>
        <button type="submit">Entrar</button>
        {error && <p className="auth-error">{error}</p>}
      </form>
    </div>
  )
}
