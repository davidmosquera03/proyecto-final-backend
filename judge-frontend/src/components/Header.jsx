import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { useTheme } from './ThemeProvider'
import { Button } from './ui/button'
import { LogOut, Code2, Moon, Sun } from 'lucide-react'

export default function Header() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  const getHomeLink = () => {
    if (!user) return '/'
    return user.role?.toLowerCase() === 'admin' ? '/teacher' : '/student'
  }

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Code2 className="h-6 w-6 text-primary" />
          <Link to={getHomeLink()} className="text-xl font-bold text-primary hover:text-primary/80 transition-colors">
            Judge Platform
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {user && (
            <span className="text-sm text-muted-foreground">
              {user.email} <span className="font-semibold">({user.role})</span>
            </span>
          )}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
