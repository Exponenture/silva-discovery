import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import PasswordGate from './components/PasswordGate'
import Nav from './components/Nav'
import Methodology from './pages/Methodology'
import ROIModel from './pages/ROIModel'
import AdoptionModel from './pages/AdoptionModel'
import FeeStructure from './pages/FeeStructure'

const ACCESS_CODE = import.meta.env.VITE_ACCESS_CODE || 'silva2026'
const SESSION_KEY = 'silva_auth'

export default function App() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === 'true')

  const handleAuth = (code) => {
    if (code === ACCESS_CODE) {
      sessionStorage.setItem(SESSION_KEY, 'true')
      setAuthed(true)
      return true
    }
    return false
  }

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setAuthed(false)
  }

  if (!authed) return <PasswordGate onAuth={handleAuth} />

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav onLogout={handleLogout} />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Methodology />} />
          <Route path="/roi-model" element={<ROIModel />} />
          <Route path="/adoption-model" element={<AdoptionModel />} />
          <Route path="/fee-structure" element={<FeeStructure />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  )
}
