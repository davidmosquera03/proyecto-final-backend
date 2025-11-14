/**
 * Componente para visualizar logs estructurados de submissions
 * Muestra eventos en JSON con seguimiento por submissionId
 */

import React, { useState } from 'react'
import { submissionLogs, getSubmissionEventLog } from '../data/submissionLogs'
import './SubmissionLogs.css'

export default function SubmissionLogs() {
  const [selectedSubmissionId, setSelectedSubmissionId] = useState(null)
  const [expandedEventId, setExpandedEventId] = useState(null)

  const selectedSubmission = submissionLogs.find(s => s.submissionId === selectedSubmissionId)

  // Obtener el ícono y color del estado
  function getStatusStyles(status) {
    const styles = {
      ACCEPTED: { icon: '✓', color: '#22c55e', bg: '#dcfce7' },
      WRONG_ANSWER: { icon: '✗', color: '#ef4444', bg: '#fee2e2' },
      TIME_LIMIT_EXCEEDED: { icon: '⏱', color: '#f97316', bg: '#ffedd5' },
      RUNTIME_ERROR: { icon: '⚠', color: '#dc2626', bg: '#fecaca' }
    };
    return styles[status] || styles.WRONG_ANSWER;
  }

  // Obtener nivel de log con color
  function getLogLevelStyles(level) {
    const styles = {
      info: { color: '#3b82f6', bg: '#eff6ff' },
      warning: { color: '#f59e0b', bg: '#fffbeb' },
      error: { color: '#ef4444', bg: '#fee2e2' }
    };
    return styles[level] || styles.info;
  }

  function toggleEventExpansion(index) {
    setExpandedEventId(expandedEventId === index ? null : index)
  }

  return (
    <div className="submission-logs-container">
      <div className="logs-header">
        <h3>Logs de Submissions</h3>
        <p className="subtitle">Rastreo completo de ejecuciones con IDs únicos</p>
      </div>

      <div className="logs-content">
        {/* Lista de submissions */}
        <div className="submissions-list">
          <h4>Submissions ({submissionLogs.length})</h4>
          <div className="submissions-grid">
            {submissionLogs.map((submission) => {
              const statusStyles = getStatusStyles(submission.status);
              const isSelected = selectedSubmissionId === submission.submissionId;
              return (
                <div
                  key={submission.submissionId}
                  className={`submission-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedSubmissionId(submission.submissionId)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') setSelectedSubmissionId(submission.submissionId)
                  }}
                >
                  <div className="card-status" style={{ backgroundColor: statusStyles.bg }}>
                    <span className="status-icon" style={{ color: statusStyles.color }}>
                      {statusStyles.icon}
                    </span>
                    <span className="status-text">{submission.status}</span>
                  </div>
                  <div className="card-info">
                    <div className="submission-id">{submission.submissionId}</div>
                    <div className="challenge-name">{submission.challengeName}</div>
                    <div className="submission-meta">
                      Usuario: {submission.userId}
                    </div>
                    <div className="submission-time">
                      {new Date(submission.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detalles de eventos */}
        {selectedSubmission && (
          <div className="submission-details">
            <h4>Eventos de {selectedSubmission.submissionId}</h4>
            <div className="submission-summary">
              <div className="summary-item">
                <span className="label">Challenge:</span>
                <span className="value">{selectedSubmission.challengeName}</span>
              </div>
              <div className="summary-item">
                <span className="label">Usuario:</span>
                <span className="value">{selectedSubmission.userId}</span>
              </div>
              <div className="summary-item">
                <span className="label">Estado:</span>
                <span
                  className="value status-badge"
                  style={{
                    backgroundColor: getStatusStyles(selectedSubmission.status).bg,
                    color: getStatusStyles(selectedSubmission.status).color
                  }}
                >
                  {selectedSubmission.status}
                </span>
              </div>
              <div className="summary-item">
                <span className="label">Creado:</span>
                <span className="value">
                  {new Date(selectedSubmission.createdAt).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="events-log">
              <h5>Timeline de Eventos</h5>
              <div className="events-timeline">
                {selectedSubmission.events.map((event, index) => {
                  const logStyles = getLogLevelStyles(event.level);
                  const isExpanded = expandedEventId === index;
                  return (
                    <div key={index} className="event-item">
                      <div
                        className="event-header"
                        onClick={() => toggleEventExpansion(index)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') toggleEventExpansion(index)
                        }}
                      >
                        <div className="event-level" style={{ backgroundColor: logStyles.bg }}>
                          <span style={{ color: logStyles.color }}>
                            {event.level.toUpperCase()}
                          </span>
                        </div>
                        <div className="event-message">
                          <strong>{event.msg}</strong>
                        </div>
                        <div className="event-time">{event.timestamp}</div>
                        <div className="expand-icon">
                          {isExpanded ? '▼' : '▶'}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="event-details">
                          <pre className="json-display">
                            {JSON.stringify(
                              {
                                level: event.level,
                                msg: event.msg,
                                ...Object.fromEntries(
                                  Object.entries(event).filter(
                                    ([key]) => key !== 'level' && key !== 'msg' && key !== 'timestamp'
                                  )
                                )
                              },
                              null,
                              2
                            )}
                          </pre>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {!selectedSubmission && (
          <div className="submission-placeholder">
            <p>Selecciona una submission para ver sus eventos en detalle</p>
          </div>
        )}
      </div>
    </div>
  );
}
