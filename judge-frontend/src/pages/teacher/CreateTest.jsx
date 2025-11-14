import React, { useState, useEffect } from 'react'

export default function CreateTest({ onClose }) {
  const [name, setName] = useState('Nueva Prueba')
  const [description, setDescription] = useState('Descripción breve de la prueba')

  const sampleChallenge = {
    title: 'Two Sum',
    difficulty: 'Easy',
    tags: ['arrays', 'hashmap'],
    timeLimit: 1500,
    memoryLimit: 256,
    description: 'Dado un arreglo de enteros y un target, encuentra dos índices cuyos valores sumen el target.'
  }

  const [challenges, setChallenges] = useState([sampleChallenge])
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => setIsDark(!!mq.matches)
    apply()
    // Listen for changes
    if (mq.addEventListener) {
      mq.addEventListener('change', apply)
      return () => mq.removeEventListener('change', apply)
    }
    // fallback for older browsers
    if (mq.addListener) {
      mq.addListener(apply)
      return () => mq.removeListener(apply)
    }
  }, [])

  function addChallenge() {
    setChallenges((c) => [...c, { ...sampleChallenge, title: `Nuevo reto ${c.length + 1}` }])
  }

  function toggleOpen(idx) {
    setChallenges((c) => c.map((ch, i) => ({ ...ch, _open: i === idx ? !ch._open : ch._open })))
  }

  function handleSave() {
    // No persistencia: sólo mostrar en consola el objeto de la prueba
    console.log('Guardar prueba:', { name, description, challenges })
    if (onClose) onClose()
  }

  const theme = {
    rootBg: isDark ? '#0f1113' : '#fff',
    panelBg: isDark ? '#0b0c0d' : '#fafafa',
    cardBorder: isDark ? '#2a2a2a' : '#eee',
    text: isDark ? '#e6e6e6' : '#111',
    muted: isDark ? '#9b9b9b' : '#666',
    inputBg: isDark ? '#2a2a2a' : '#fff',
    inputText: isDark ? '#e6e6e6' : '#111',
    buttonBg: isDark ? '#111' : '#111',
    buttonText: '#fff',
    boxShadow: isDark ? '0 6px 18px rgba(0,0,0,0.6)' : '0 6px 18px rgba(0,0,0,0.06)'
  }

  return (
    <div className="auth-container create-test-root" style={{ padding: 20, width: '1000px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ color: theme.text }}>Crear Prueba</h3>
      </header>

      <section style={{ marginTop: 12 }}>
        <label style={{ display: 'block', marginBottom: 8, color: theme.muted }}><strong style={{ color: theme.text }}>Nombre</strong></label>
        <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: 8, marginBottom: 12, background: theme.inputBg, color: theme.inputText, border: `1px solid ${theme.cardBorder}`, borderRadius: 6, boxSizing: 'border-box' }} />

        <label style={{ display: 'block', marginBottom: 8, color: theme.muted }}><strong style={{ color: theme.text }}>Descripción</strong></label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} style={{ width: '100%', padding: 8, background: theme.inputBg, color: theme.inputText, border: `1px solid ${theme.cardBorder}`, borderRadius: 6, boxSizing: 'border-box' }} />
      </section>

      <section style={{ marginTop: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ color: theme.text }}>Retos</h4>
          <button onClick={addChallenge} style={{ background: theme.buttonBg, color: theme.buttonText, border: 'none', padding: '8px 12px', borderRadius: 8 }}>Añadir reto</button>
        </div>

        <div style={{ marginTop: 10 }}>
          {challenges.map((ch, idx) => (
            <div key={idx} style={{ marginBottom: 8 }}>
              <div className="test-card" style={{ cursor: 'pointer' }} onClick={() => toggleOpen(idx)}>
                <div className="card-left">
                  <div className="prueba-name" style={{ color: theme.text }}>{ch.title}</div>
                  <div className="test-list" style={{ color: theme.muted }}>{ch.difficulty} · {ch.tags?.join(', ')}</div>
                </div>
                <div className="card-right" aria-hidden style={{ color: theme.muted }}>{ch._open ? '▾' : '▸'}</div>
              </div>

              {ch._open && (
                <div className="card-details" style={{ padding: 16, marginTop: 6, background: theme.panelBg, border: `1px solid ${theme.cardBorder}`, borderRadius: 8 }} onClick={(e) => e.stopPropagation()}>
                  <label style={{ display: 'block', marginBottom: 8, color: theme.muted }}>Título</label>
                  <input defaultValue={ch.title} style={{ width: '100%', padding: 8, marginBottom: 12, background: theme.inputBg, color: theme.inputText, border: `1px solid ${theme.cardBorder}`, borderRadius: 4, boxSizing: 'border-box' }} />

                  <label style={{ display: 'block', marginBottom: 8, color: theme.muted }}>Dificultad</label>
                  <input defaultValue={ch.difficulty} style={{ width: '100%', padding: 8, marginBottom: 12, background: theme.inputBg, color: theme.inputText, border: `1px solid ${theme.cardBorder}`, borderRadius: 4, boxSizing: 'border-box' }} />

                  <label style={{ display: 'block', marginBottom: 8, color: theme.muted }}>Tags (coma separadas)</label>
                  <input defaultValue={ch.tags?.join(', ')} style={{ width: '100%', padding: 8, marginBottom: 12, background: theme.inputBg, color: theme.inputText, border: `1px solid ${theme.cardBorder}`, borderRadius: 4, boxSizing: 'border-box' }} />

                  <label style={{ display: 'block', marginBottom: 8, color: theme.muted }}>Time Limit (ms)</label>
                  <input defaultValue={ch.timeLimit} style={{ width: '100%', padding: 8, marginBottom: 12, background: theme.inputBg, color: theme.inputText, border: `1px solid ${theme.cardBorder}`, borderRadius: 4, boxSizing: 'border-box' }} />

                  <label style={{ display: 'block', marginBottom: 8, color: theme.muted }}>Memory Limit (MB)</label>
                  <input defaultValue={ch.memoryLimit} style={{ width: '100%', padding: 8, marginBottom: 12, background: theme.inputBg, color: theme.inputText, border: `1px solid ${theme.cardBorder}`, borderRadius: 4, boxSizing: 'border-box' }} />

                  <label style={{ display: 'block', marginBottom: 8, color: theme.muted }}>Descripción</label>
                  <textarea defaultValue={ch.description} rows={3} style={{ width: '100%', padding: 8, background: theme.inputBg, color: theme.inputText, border: `1px solid ${theme.cardBorder}`, borderRadius: 4, boxSizing: 'border-box' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer style={{ marginTop: 14, display: 'flex', gap: 8 }}>
        <button onClick={handleSave} style={{ padding: '8px 14px', background: theme.buttonBg, color: theme.buttonText, border: 'none', borderRadius: 8 }}>Guardar prueba</button>
        <button onClick={onClose} style={{ padding: '8px 14px', background: 'transparent', color: theme.muted, border: `1px solid ${theme.cardBorder}`, borderRadius: 8 }}>Cancelar</button>
      </footer>
    </div>
  )
}
