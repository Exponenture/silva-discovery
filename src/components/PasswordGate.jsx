import React, { useState, useRef, useEffect } from 'react'

const N = '#0F1D35'
const G = '#C9973A'
const G2 = '#C9B98A'

export default function PasswordGate({ onAuth }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  const attempt = () => {
    const ok = onAuth(code.trim())
    if (!ok) {
      setError(true)
      setShake(true)
      setCode('')
      setTimeout(() => setShake(false), 500)
    }
  }

  const onKey = (e) => {
    if (e.key === 'Enter') attempt()
    if (error) setError(false)
  }

  return (
    <div style={{
      minHeight: '100vh', background: N,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        borderTop: `3px solid ${G}`,
        background: '#162440',
        padding: '48px 52px',
        width: '100%', maxWidth: '420px',
        animation: shake ? 'shake 0.4s ease' : 'none'
      }}>
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <div style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: '28px', fontWeight: 400,
            color: '#fff', lineHeight: 1.1, marginBottom: '6px'
          }}>
            SILVA <span style={{ color: G }}>×</span> Discovery
          </div>
          <div style={{ fontSize: '11px', color: G2, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            Confidential · March 2026
          </div>
        </div>

        <div style={{ marginBottom: '8px', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#A8B4C0' }}>
          Access code
        </div>
        <input
          ref={inputRef}
          type="password"
          value={code}
          onChange={e => { setCode(e.target.value); setError(false) }}
          onKeyDown={onKey}
          placeholder="Enter access code"
          style={{
            width: '100%', padding: '12px 14px',
            background: '#0F1D35',
            border: `1px solid ${error ? '#E24B4A' : '#2A3F5C'}`,
            color: '#fff', fontSize: '14px',
            fontFamily: 'Poppins, sans-serif',
            outline: 'none', marginBottom: '12px',
            transition: 'border-color 0.2s'
          }}
        />
        {error && (
          <div style={{ fontSize: '11px', color: '#E24B4A', marginBottom: '12px' }}>
            Incorrect access code. Please try again.
          </div>
        )}
        <button
          onClick={attempt}
          style={{
            width: '100%', padding: '12px',
            background: G, border: 'none',
            color: '#0F1D35', fontSize: '11px',
            fontWeight: 500, letterSpacing: '0.14em',
            textTransform: 'uppercase', cursor: 'pointer',
            fontFamily: 'Poppins, sans-serif',
            transition: 'opacity 0.2s'
          }}
          onMouseOver={e => e.target.style.opacity = '0.85'}
          onMouseOut={e => e.target.style.opacity = '1'}
        >
          Enter
        </button>

        <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '0.5px solid #2A3F5C', fontSize: '10px', color: '#6B7A8D', textAlign: 'center', lineHeight: 1.6 }}>
          This tool contains confidential commercial modelling<br />prepared by Exponenture (Pty) Ltd for Discovery Insurance.
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          20%{transform:translateX(-8px)}
          40%{transform:translateX(8px)}
          60%{transform:translateX(-6px)}
          80%{transform:translateX(6px)}
        }
      `}</style>
    </div>
  )
}
