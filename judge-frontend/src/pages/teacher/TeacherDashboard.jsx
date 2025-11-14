import React, { useState } from 'react'
import { useAuth } from '../../auth/AuthProvider'
import Header from '../../components/Header'
import { pruebas as pruebasData } from '../../data/pruebas'
import { useNavigate } from 'react-router-dom'

export default function TeacherDashboard() {
  const { user } = useAuth()

  // Use shared hardcoded data from src/data/pruebas.js as initial state.
  // We keep local state so UI can add new pruebas in-memory.
  const [pruebas, setPruebas] = useState(pruebasData)

  const navigate = useNavigate()

  function handleCreateTest() {
    // Navegar a la página de creación de prueba
    navigate('/teacher/create-test')
  }

  function handleOpenPrueba(prueba) {
    // Placeholder for navigation / detail view
    // For now show a simple alert
    window.alert(`Abrir prueba: ${prueba.name} (id: ${prueba.id})`)
  }

  function handleCreateCourse() {
    // Placeholder for creating a course
    window.alert('Crear curso - funcionalidad pendiente')
  }

  function handleViewSubmissions() {
    // Navegar a la página de submissions
    navigate('/teacher/submissions')
  }

  return (
    <>
      <Header />
      <div className="dashboard">
        <h2>Dashboard Profesor</h2>
        {/* CreateTest moved to its own page */}
        <p>Bienvenido, <strong>{user?.username}</strong> — rol: {user?.role}</p>

        {/* Actions Section */}
        <section className="actions-section">
          <h3>Acciones</h3>
          <div className="actions-grid">
            <div className="test-card create-card" role="button" onClick={handleCreateCourse} tabIndex={0} onKeyDown={(e)=>{ if(e.key==='Enter') handleCreateCourse() }}>
              <div className="create-content">
                <strong>Crear nuevo curso</strong>
                <p className="muted">Crea un nuevo curso para tus estudiantes</p>
                <button className="create-button" onClick={(e)=>{ e.stopPropagation(); handleCreateCourse() }}>Crear curso</button>
              </div>
            </div>

            <div className="test-card create-card" role="button" onClick={handleCreateTest} tabIndex={0} onKeyDown={(e)=>{ if(e.key==='Enter') handleCreateTest() }}>
              <div className="create-content">
                <strong>Crear nueva prueba</strong>
                <p className="muted">Añade una nueva colección de tests para tus ejercicios</p>
                <button className="create-button" onClick={(e)=>{ e.stopPropagation(); handleCreateTest() }}>Crear prueba</button>
              </div>
            </div>

            <div className="test-card create-card" role="button" onClick={handleViewSubmissions} tabIndex={0} onKeyDown={(e)=>{ if(e.key==='Enter') handleViewSubmissions() }}>
              <div className="create-content">
                <strong>Ver Logs de Submissions</strong>
                <p className="muted">Visualiza los logs estructurados de todas las ejecuciones</p>
                <button className="create-button" onClick={(e)=>{ e.stopPropagation(); handleViewSubmissions() }}>Ver Logs</button>
              </div>
            </div>
          </div>
        </section>

        {/* Active Tests Section */}
        <section className="tests-section">
          <h3>Pruebas Activas</h3>
          <div className="tests-grid">
            {pruebas.map((prueba) => {
              const items = prueba.tests ?? (prueba.challenges ? prueba.challenges.map((c) => c.title) : [])
              return (
                <div key={prueba.id} className="test-card" onClick={() => handleOpenPrueba(prueba)} role="button" tabIndex={0} onKeyDown={(e)=>{ if(e.key==='Enter') handleOpenPrueba(prueba) }}>
                  <div className="card-left">
                    <div className="prueba-name">{prueba.name}</div>
                    <div className="test-list">
                      {items && items.length > 0 ? (
                        items.join(' · ')
                      ) : (
                        <span className="muted">Sin tests definidos</span>
                      )}
                    </div>
                  </div>
                  <div className="card-right" aria-hidden>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </>
  )
}
