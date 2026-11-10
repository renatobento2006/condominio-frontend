// Componente reutilizável nº 4: etiqueta do estado da assembleia
// A API devolve 'open' ou 'closed'; aqui traduzimos para o utilizador.
const LABELS = {
  open: 'Aberta',
  closed: 'Encerrada',
}

function StatusBadge({ status }) {
  return <span className={`badge badge-${status}`}>{LABELS[status] ?? status}</span>
}

export default StatusBadge
