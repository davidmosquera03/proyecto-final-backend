import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'

export default function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="app-header">
      <div className="app-header-inner">
        <div className="site-title">
          <Link to="/" className="site-link">Judge</Link>
        </div>

        <div className="header-actions">
          {user && <span className="header-user">{user.username}</span>}
          <button className="logout-button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  )
}
