// A API envia datas como "2026-11-17 16:58:20".
// Trocamos o espaço por "T" para o JavaScript as ler de forma fiável.
export function formatDate(value) {
  if (!value) return ''
  const date = new Date(value.replace(' ', 'T'))
  return date.toLocaleString('pt-PT', { dateStyle: 'long', timeStyle: 'short' })
}
