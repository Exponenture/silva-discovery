import React from 'react'
import { NavLink } from 'react-router-dom'
import { useModel, defaults } from '../context/ModelContext'

const N = '#0F1D35'
const G = '#C9973A'
const G2 = '#C9B98A'

export default function Nav({ onLogout }) {
  const { values } = useModel()
  const isModified = Object.keys(defaults).some(k => values[k] !== defaults[k])

  const linkStyle = ({ isActive }) => ({
    display: 'flex', alignItems: 'center', gap: '6px',
    padding: '6px 16px',
    fontSize: '10px', fontWeight: 400,
    letterSpacing: '0.14em', textTransform: 'uppercase',
    textDecoration: 'none',
    color: isActive ? G : '#A8B4C0',
    borderBottom: isActive ? `2px solid ${G}` : '2px solid transparent',
    transition: 'color 0.2s, border-color 0.2s',
  })

  return (
    <nav style={{
      background: N,
      borderBottom: `3px solid ${G}`,
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      height: '52px',
      position: 'sticky', top: 0, zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: '18px', fontWeight: 400,
          color: '#fff', letterSpacing: '-0.01em'
        }}>
          SILVA <span style={{ color: G }}>×</span> Discovery
        </div>
        <div style={{
          marginLeft: '8px',
          fontSize: '9px', letterSpacing: '0.18em',
          textTransform: 'uppercase', color: '#4A6080',
          paddingLeft: '14px', borderLeft: '1px solid #2A3F5C'
        }}>
          Commercial Modelling
        </div>
        <div style={{
          marginLeft: '12px', display: 'flex', alignItems: 'center', gap: 5,
          fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase',
          color: isModified ? G : '#4A6080',
          transition: 'color 0.3s'
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: isModified ? G : '#2A3F5C',
            transition: 'background 0.3s'
          }} />
          {isModified ? 'Synced' : 'Defaults'}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <NavLink to="/" end style={linkStyle}>
          Overview
        </NavLink>
        <NavLink to="/fee-structure" style={linkStyle}>
          Fee Structure
        </NavLink>
        <NavLink to="/roi-model" style={linkStyle}>
          ROI Model
        </NavLink>
        <NavLink to="/adoption-model" style={linkStyle}>
          Adoption Model
        </NavLink>
        <button
          onClick={onLogout}
          style={{
            marginLeft: '16px',
            background: 'transparent',
            border: '0.5px solid #2A3F5C',
            color: '#6B7A8D',
            fontSize: '9px', letterSpacing: '0.14em',
            textTransform: 'uppercase',
            padding: '5px 12px', cursor: 'pointer',
            fontFamily: 'Poppins, sans-serif',
            transition: 'border-color 0.2s, color 0.2s'
          }}
          onMouseOver={e => { e.target.style.borderColor = G2; e.target.style.color = G2 }}
          onMouseOut={e => { e.target.style.borderColor = '#2A3F5C'; e.target.style.color = '#6B7A8D' }}
        >
          Exit
        </button>
      </div>
    </nav>
  )
}
