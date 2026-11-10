import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAssembly } from '../api'
import StatusBadge from '../components/StatusBadge'
import StatusMessage from '../components/StatusMessage'
import { formatDate } from '../utils/formatDate'

function AssemblyDetail() {
  const { id } = useParams() // o ":id" do URL /assembleias/:id
  const [assembly, setAssembly] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    getAssembly(id)
      .then((response) => {
        if (!ignore) setAssembly(response.data)
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.status === 404 ? 'Esta assembleia não existe.' : err.message)
        }
      })
      .finally(() => {
        if (!ignore) setIsLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [id]) // volta a correr se o id do URL mudar

  return (
    <section aria-labelledby="detalhe-titulo">
      <p><Link to="/assembleias">← Voltar às assembleias</Link></p>

      {isLoading && <StatusMessage type="loading" message="A carregar assembleia…" />}
      {!isLoading && error && <StatusMessage type="error" message={error} />}

      {!isLoading && assembly && (
        <article>
          <h1 id="detalhe-titulo">{assembly.title}</h1>
          <p className="card-meta">
            <time dateTime={assembly.date}>{formatDate(assembly.date)}</time>
            <StatusBadge status={assembly.status} />
          </p>

          <h2>Ordem de trabalhos</h2>
          <p>{assembly.description}</p>

          <p>Votos registados: <strong>{assembly.votes_count}</strong></p>
          {/* Próximo passo: formulário de votação (POST /assemblies/{id}/votes) */}
        </article>
      )}
    </section>
  )
}

export default AssemblyDetail
