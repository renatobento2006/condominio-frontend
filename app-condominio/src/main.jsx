import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter liga o React ao URL do browser (necessário para as rotas) */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
