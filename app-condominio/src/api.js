// =========================================================
// Ligação à API Laravel
// Todas as chamadas passam por apiFetch(), que:
//  1. junta o URL base da API
//  2. envia o token (Bearer) guardado no localStorage
//  3. transforma respostas de erro (4xx/5xx) em exceções com mensagem
// =========================================================

// Pode ser mudado num ficheiro .env com VITE_API_URL=... (útil no deploy)
const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api'

const TOKEN_KEY = 'token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export async function apiFetch(path, options = {}) {
  const token = getToken()

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      // Accept: application/json faz o Laravel responder sempre em JSON (até nos erros)
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  })

  // Algumas respostas podem vir sem corpo; nesse caso data fica null
  const data = await response.json().catch(() => null)

  if (!response.ok) {
    // Token inválido ou expirado: apagamos para o utilizador voltar ao login
    if (response.status === 401 && token) {
      removeToken()
    }

    const error = new Error(data?.message ?? `Erro ${response.status}`)
    error.status = response.status // ex.: 400 = voto duplicado, 404 = não existe
    throw error
  }

  return data
}

// Funções específicas de cada endpoint (as páginas só usam estas)
export const login = (email, password) =>
  apiFetch('/login', { method: 'POST', body: JSON.stringify({ email, password }) })

export const getAssemblies = () => apiFetch('/assemblies')

export const getAssembly = (id) => apiFetch(`/assemblies/${id}`)
