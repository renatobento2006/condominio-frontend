import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section>
      <h1>Página não encontrada</h1>
      <p><Link to="/">Voltar ao início</Link></p>
    </section>
  )
}

export default NotFound
