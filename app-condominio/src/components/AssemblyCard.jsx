import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge'
import { formatDate } from '../utils/formatDate'

// Componente reutilizável nº 3: cartão de uma assembleia na listagem
function AssemblyCard({ assembly }) {
  return (
    <article className="card">
      <h2 className="card-title">
        {/* O link ocupa o título: um só "Tab" por cartão, com texto descritivo */}
        <Link to={`/assembleias/${assembly.id}`}>{assembly.title}</Link>
      </h2>
      <p className="card-meta">
        <time dateTime={assembly.date}>{formatDate(assembly.date)}</time>
        <StatusBadge status={assembly.status} />
      </p>
    </article>
  )
}

export default AssemblyCard
