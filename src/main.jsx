import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ModelProvider } from './context/ModelContext'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ModelProvider>
        <App />
      </ModelProvider>
    </BrowserRouter>
  </React.StrictMode>
)
