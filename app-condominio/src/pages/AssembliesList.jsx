import { useEffect, useState } from 'react'
import { getAssemblies } from '../api'
import AssemblyCard from '../components/AssemblyCard'
import StatusMessage from '../components/StatusMessage'

function AssembliesList() {
  const [assemblies, setAssemblies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // useEffect com [] corre uma vez, quando a página aparece
  useEffect(() => {
    // Se o utilizador sair da página antes da resposta chegar, ignoramos a resposta
    // (e no modo StrictMode o React corre o efeito duas vezes em desenvolvimento).
    let ignore = false

    getAssemblies()
      .then((response) => {
        if (!ignore) setAssemblies(response.data)
      })
      .catch((err) => {
        if (!ignore) setError(err.message)
      })
      .finally(() => {
        if (!ignore) setIsLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [])

  return (
    <section aria-labelledby="lista-titulo">
      <h1 id="lista-titulo">Assembleias</h1>

      {/* Os 3 estados pedidos no R5 + o caso normal */}
      {isLoading && <StatusMessage type="loading" message="A carregar assembleias…" />}

      {!isLoading && error && <StatusMessage type="error" message={error} />}

      {!isLoading && !error && assemblies.length === 0 && (
        <StatusMessage type="empty" message="Ainda não existem assembleias marcadas." />
      )}

      {!isLoading && !error && assemblies.length > 0 && (
        <ul className="card-list">
          {assemblies.map((assembly) => (
            // key ajuda o React a saber que item mudou entre renders
            <li key={assembly.id}>
              <AssemblyCard assembly={assembly} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default AssembliesList
