import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, saveToken } from '../api'

function Login({ onLogin }) {
  // "Componentes controlados": o valor dos inputs vive no estado do React
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault() // impede o browser de recarregar a página
    setError(null)
    setIsSubmitting(true)

    try {
      const data = await login(email, password)
      saveToken(data.token) // guarda o Bearer token no localStorage
      onLogin()
      navigate('/assembleias')
    } catch (err) {
      // 401 -> "Credenciais incorretas" (mensagem vem da API)
      // TypeError -> a API está desligada ou bloqueada (CORS)
      setError(err instanceof TypeError ? 'Não foi possível contactar o servidor.' : err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="login" aria-labelledby="login-titulo">
      <h1 id="login-titulo">Entrar</h1>

      <form className="form" onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="password">Palavra-passe</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="status status-error" role="alert">{error}</p>}

        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'A entrar…' : 'Entrar'}
        </button>
      </form>
    </section>
  )
}

export default Login
