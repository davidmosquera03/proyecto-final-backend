/**
 * Página de Submissions para profesor
 * Muestra un dashboard con los logs estructurados de todas las submissions
 */

import React from 'react'
import { useAuth } from '../../auth/AuthProvider'
import Header from '../../components/Header'
import SubmissionLogs from '../../components/SubmissionLogs'
import { getSubmissionStatistics } from '../../data/submissionLogs'
import './SubmissionsPage.css'

export default function SubmissionsPage() {
  const { user } = useAuth()
  const stats = getSubmissionStatistics()

  return (
    <>
      <Header />
      <div className="submissions-page">
        <div className="page-header">
          <h2>Seguimiento de Submissions</h2>
          <p>Bienvenido, <strong>{user?.username}</strong> — Visualiza todos los logs estructurados</p>
        </div>

        {/* Tarjetas de estadísticas */}
        <div className="stats-grid">
          <div className="stat-card stat-total">
            <div className="stat-value">{stats.totalSubmissions}</div>
            <div className="stat-label">Total de Submissions</div>
          </div>
          <div className="stat-card stat-accepted">
            <div className="stat-value">{stats.accepted}</div>
            <div className="stat-label">Aceptadas</div>
          </div>
          <div className="stat-card stat-wrong">
            <div className="stat-value">{stats.wrongAnswer}</div>
            <div className="stat-label">Respuesta Incorrecta</div>
          </div>
          <div className="stat-card stat-timeout">
            <div className="stat-value">{stats.timeLimitExceeded}</div>
            <div className="stat-label">Límite de Tiempo Excedido</div>
          </div>
          <div className="stat-card stat-error">
            <div className="stat-value">{stats.runtimeError}</div>
            <div className="stat-label">Error en Ejecución</div>
          </div>
          <div className="stat-card stat-avg-time">
            <div className="stat-value">{stats.averageExecutionTime}ms</div>
            <div className="stat-label">Tiempo Promedio</div>
          </div>
        </div>

        {/* Componente principal de logs */}
        <SubmissionLogs />
      </div>
    </>
  )
}
