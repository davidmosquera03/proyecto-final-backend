import React, { useState } from 'react'
import { useAuth } from '../auth/AuthProvider'
import Header from '../components/Header'
import { pruebas as pruebasData } from '../data/pruebas'

export default function TeacherDashboard() {
  const { user } = useAuth()

  // Use shared hardcoded data from src/data/pruebas.js as initial state.
  // We keep local state so UI can add new pruebas in-memory.
  const [pruebas, setPruebas] = useState(pruebasData)

  function handleCreateTest() {
    // Minimal UX for now: prompt for a name and add a new prueba to the list
    const name = window.prompt('Nombre de la nueva prueba:')
    if (!name) return
    const next = { id: Date.now(), name, tests: [] }
    setPruebas((p) => [next, ...p])
  }

  function handleOpenPrueba(prueba) {
    // Placeholder for navigation / detail view
    // For now show a simple alert
    window.alert(`Abrir prueba: ${prueba.name} (id: ${prueba.id})`)
  }

  return (
    <>
      <Header />
      <div className="dashboard">
        <h2>Dashboard Profesor</h2>
        <p>Bienvenido, <strong>{user?.username}</strong> — rol: {user?.role}</p>

        <section className="tests-section">
          <div className="tests-grid">
            <div className="test-card create-card" role="button" onClick={handleCreateTest} tabIndex={0} onKeyDown={(e)=>{ if(e.key==='Enter') handleCreateTest() }}>
              <div className="create-content">
                <strong>Crear nueva prueba</strong>
                <p className="muted">Añade una nueva colección de tests para tus ejercicios</p>
                <button className="create-button" onClick={(e)=>{ e.stopPropagation(); handleCreateTest() }}>Crear prueba</button>
              </div>
            </div>

            {pruebas.map((prueba) => (
              <div key={prueba.id} className="test-card" onClick={() => handleOpenPrueba(prueba)} role="button" tabIndex={0} onKeyDown={(e)=>{ if(e.key==='Enter') handleOpenPrueba(prueba) }}>
                <div className="card-left">
                  <div className="prueba-name">{prueba.name}</div>
                  <div className="test-list">
                    {prueba.tests.length > 0 ? (
                      prueba.tests.join(' · ')
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
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
