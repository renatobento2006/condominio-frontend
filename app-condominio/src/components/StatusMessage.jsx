// Componente reutilizável nº 2: mensagens de estado (R5)
// Usado em todas as páginas que vão buscar dados: loading, empty e error.
//
// role="status" -> o leitor de ecrã anuncia sem interromper (loading/empty)
// role="alert"  -> o leitor de ecrã anuncia logo (erros)
const TEXTOS = {
  loading: 'A carregar…',
  empty: 'Não há dados para mostrar.',
  error: 'Ocorreu um erro.',
}

function StatusMessage({ type, message }) {
  return (
    <p className={`status status-${type}`} role={type === 'error' ? 'alert' : 'status'}>
      {message ?? TEXTOS[type]}
    </p>
  )
}

export default StatusMessage
