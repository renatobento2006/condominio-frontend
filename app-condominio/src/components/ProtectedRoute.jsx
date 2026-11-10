import { Navigate } from 'react-router-dom'

// Protege páginas privadas: sem sessão, redireciona para o login.
// "replace" evita que o botão Voltar do browser regresse à página protegida.
function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default ProtectedRoute
