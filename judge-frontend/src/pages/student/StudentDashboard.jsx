import React from 'react'
import { useAuth } from '../../auth/AuthProvider'
import Header from '../../components/Header'
import { pruebas } from '../../data/pruebas'

export default function StudentDashboard() {
  const { user } = useAuth()

  function openPrueba(prueba) {
    // Placeholder: navegar a la vista de la prueba o abrir runner
    window.alert(`Abrir prueba: ${prueba.name} (id: ${prueba.id})`)
  }

  return (
    <>
      <Header />
      <div className="dashboard">
        <h2>Dashboard Estudiante</h2>
        <p>Bienvenido, <strong>{user?.username}</strong> — rol: {user?.role}</p>
        {/* Action card: Ver calificaciones (sin funcionalidad) */}
        <div className="action-card" role="region" aria-label="Ver calificaciones">
          <div className="action-content">
            <strong>Ver calificaciones</strong>
            <p className="muted">Consulta las calificaciones de tus pruebas</p>
          </div>
          <div>
            <button type="button" className="create-button">Ver calificaciones</button>
          </div>
        </div>

        <section className="tests-section">
          <h3>Pruebas activas</h3>
          <div className="tests-grid">
            {pruebas.length === 0 && <div className="muted">No hay pruebas activas</div>}

            {pruebas.map((prueba) => (
              <div key={prueba.id} className="test-card" onClick={() => openPrueba(prueba)} role="button" tabIndex={0} onKeyDown={(e)=>{ if(e.key==='Enter') openPrueba(prueba) }}>
                <div className="card-left">
                  <div className="prueba-name">{prueba.name}</div>
                  <div className="test-list">
                    {prueba.challenges.length > 0 ? prueba.challenges.map(c => c.title).join(' · ') : <span className="muted">Sin tests definidos</span>}
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
