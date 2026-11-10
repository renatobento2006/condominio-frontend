import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { getToken, removeToken } from './api'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import AssembliesList from './pages/AssembliesList'
import AssemblyDetail from './pages/AssemblyDetail'
import NotFound from './pages/NotFound'

function App() {
  // Estado global simples: há ou não sessão iniciada?
  // Começa com o que está no localStorage (para sobreviver a um refresh).
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(getToken()))

  function handleLogout() {
    removeToken()
    setIsLoggedIn(false)
  }

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <main id="conteudo" className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/assembleias" replace />} />

          {/* Formulário */}
          <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />

          {/* Listagem (protegida: só com token) */}
          <Route
            path="/assembleias"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <AssembliesList />
              </ProtectedRoute>
            }
          />

          {/* Detalhe: :id é um parâmetro dinâmico, lido com useParams() */}
          <Route
            path="/assembleias/:id"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <AssemblyDetail />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  )
}

export default App
