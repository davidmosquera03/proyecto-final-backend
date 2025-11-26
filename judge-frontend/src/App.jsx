import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { AuthProvider, useAuth } from './auth/AuthProvider'
import { ThemeProvider } from './components/ThemeProvider'
import Header from './components/Header'
import Login from './pages/Login'
import StudentDashboard from './pages/student/StudentDashboard'
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import CreateTestPage from './pages/teacher/CreateTestPage'
import SubmissionsPage from './pages/teacher/SubmissionsPage'

function RequireAuth({ children, role }) {
  const { user, isLoading } = useAuth()
  
  if (isLoading) {
    return <div>Loading...</div>
  }
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  if (role && user.role.toLowerCase() !== role.toLowerCase()) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

function HomeRedirect() {
  const { user, isLoading } = useAuth()
  
  if (isLoading) {
    return <div>Loading...</div>
  }
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  if (user.role?.toLowerCase() === 'admin') {
    return <Navigate to="/teacher" replace />
  }
  
  return <Navigate to="/student" replace />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/student"
        element={
          <RequireAuth role="student">
            <StudentDashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/teacher"
        element={
          <RequireAuth role="admin">
            <TeacherDashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/teacher/create-test"
        element={
          <RequireAuth role="admin">
            <CreateTestPage />
          </RequireAuth>
        }
      />
      <Route
        path="/teacher/submissions"
        element={
          <RequireAuth role="admin">
            <SubmissionsPage />
          </RequireAuth>
        }
      />
      <Route path="/" element={<HomeRedirect />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
