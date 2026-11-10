import { Link, NavLink, useNavigate } from 'react-router-dom'

// Componente reutilizável nº 1: barra de navegação
// Recebe por props se há sessão e o que fazer ao terminar sessão.
function Navbar({ isLoggedIn, onLogout }) {
  const navigate = useNavigate()

  function handleLogoutClick() {
    onLogout()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <a className="skip-link" href="#conteudo">Saltar para o conteúdo</a>

      <div className="container navbar-inner">
        <Link to="/" className="logo">CondoGest</Link>

        <nav aria-label="Navegação principal">
          <ul className="nav-list">
            {isLoggedIn ? (
              <>
                {/* NavLink acrescenta aria-current="page" ao link ativo */}
                <li><NavLink to="/assembleias">Assembleias</NavLink></li>
                <li>
                  <button type="button" className="btn btn-link" onClick={handleLogoutClick}>
                    Terminar sessão
                  </button>
                </li>
              </>
            ) : (
              <li><NavLink to="/login">Entrar</NavLink></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
