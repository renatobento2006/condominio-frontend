# Registo de Uso de Inteligência Artificial

**Projeto:** CondoGest — Front-end para a API de Gestão de Condomínios
**Unidade curricular:** Programação Web (Front-End) · 2026/2027
**Aluno:** Renato Bento (A049088)
**Nível de IA do projeto:** 3 (é permitido usar IA para gerar ou corrigir código, que deve ser revisto, testado e compreendido)

## Ferramentas utilizadas

| Ferramenta | Modelo | Para quê |
|---|---|---|
| Claude Code (app Claude para desktop) | Claude Opus 5.5 | Gerar código, rever a API, testar no browser, fazer commits |

---

## Registo de interações

### 1 · Estrutura da landing page — 10/11/2026

**Pedido:** Pedi à IA que atuasse como tutor e gerasse a estrutura base em HTML5 semântico do `landing-page/index.html` (Hero, secção de vídeo com `<track>` e rodapé com formulário de contacto), mais instruções iniciais para um CSS mobile-first com Flexbox e Grid, sem frameworks.

**O que a IA gerou:**
- `landing-page/index.html`: `header`/`nav`/`main`/`section`/`article`/`figure`/`footer`, skip link, `aria-labelledby` nas secções e campos do formulário com `aria-describedby` e `aria-live` para os erros.
- `landing-page/css/style.css`: variáveis CSS, reset, layout mobile e um breakpoint a 48em (cabeçalho em Flexbox, cartões em Grid).
- `landing-page/assets/media/promo.pt.vtt`: legendas de exemplo.
- `landing-page/js/main.js`: vazio, reservado para a validação (R3).

**Aceite:** A estrutura toda.
**Alterado / por fazer por mim:** Ainda falta o vídeo real (`promo.mp4`) e o `poster.jpg`, ajustar os tempos do `.vtt` e acabar o CSS da Hero, dos botões e do formulário.
**Como verifiquei:** _[preencher: ex. abri a página no browser e testei no modo telemóvel do DevTools]_

---

### 2 · Plano para o checkpoint P2 — 10/11/2026

**Pedido:** Perguntei à IA o que faltava para entregar o protótipo do P2 (React ligado à API com uma listagem).

**Resposta da IA:** Analisou o projeto React e a API e criou uma lista de tarefas com um calendário. **Descobriu que a minha API não tinha as rotas `GET /api/assemblies` nem `GET /api/assemblies/{id}`**, embora a proposta (P1) as referisse.

**Aceite:** O plano e o calendário.
**Como verifiquei:** Confirmei no `routes/api.php` que as rotas não existiam.

---

### 3 · Rotas de listagem e detalhe na API Laravel — 10/11/2026

**Pedido:** Pedi à IA que criasse as rotas GET em falta.

**O que a IA gerou (no projeto `condominio-api`):**
- Métodos `index()` e `show()` no `AssemblyController`, com `withCount('votes')`.
- Campo `votes_count` no `AssemblyResource`.
- Rotas `GET /assemblies` e `GET /assemblies/{assembly}` dentro do grupo `auth:sanctum`.
- Teste automático `tests/Feature/AssemblyListTest.php` com 5 casos (sem token → 401, lista com dados, lista vazia, detalhe, id inexistente → 404).

**Erro da IA, corrigido:** Na primeira versão, o teste criava assembleias com `status = 'scheduled'`, mas a migration só aceita `open` ou `closed`. O teste falhou e a IA corrigiu-o.

**Como verifiquei:** `php artisan route:list` e `php artisan test`: os 5 testes passam.

---

### 4 · Correção do erro 500 no voto duplicado — 10/11/2026

**Pedido:** Ao correr os testes da API, a IA reparou que o teste "não pode votar duas vezes" falhava (devolvia 500 em vez de 400). Pedi-lhe que investigasse.

**Causa encontrada:** O `AssemblyService` usava `abort(400)`, que lança uma `HttpException`. O controller só apanhava `\LogicException`, por isso a exceção caía no `catch (\Exception)` genérico, que devolve 500. A IA encontrou também uma falha de segurança: a `AssemblyPolicy::vote()` existia mas nunca era chamada, e qualquer utilizador podia votar com o apartamento de outro.

**O que a IA alterou:**
- O `AssemblyService` passou a lançar `\LogicException` e passou a apanhar `UniqueConstraintViolationException` (dois votos ao mesmo tempo).
- O `AssemblyController::vote()` passou a chamar `$this->authorize('vote', ...)` fora do `try`, para o 403 não virar 500.

**Como verifiquei:** `php artisan test`: os testes de voto passam (201, 403, 400). Ficam a falhar 2 testes antigos sem relação com isto (quórum e permissões de apartamentos).

---

### 5 · Protótipo React (P2) — 10/11/2026

**Pedido:** Pedi à IA que criasse a base da SPA: rotas, login e listagem ligada à API.

**O que a IA gerou (em `app-condominio/src/`):**
- Instalação do `react-router-dom` e remoção do template do Vite.
- `api.js`: função `apiFetch` que junta o `Authorization: Bearer`, guarda o token no `localStorage` e transforma os erros HTTP em exceções com mensagem.
- Componentes reutilizáveis: `Navbar`, `StatusMessage`, `AssemblyCard`, `StatusBadge`, `ProtectedRoute`.
- Páginas: `Login` (formulário), `AssembliesList` (listagem), `AssemblyDetail` (detalhe), `NotFound`.
- Estados de loading, vazio e erro com `role="status"` / `role="alert"`.
- `index.css` próprio, mobile-first.

**Alterado:** O lint (oxlint) avisou que havia `setState` síncrono dentro de um `useEffect` no `AssemblyDetail`. A IA removeu essas chamadas.
**Diferença em relação à proposta:** Na proposta o componente de mensagens chamava-se `AlertMessage`; no código chama-se `StatusMessage`.

**Como verifiquei (teste no browser feito pela IA):**
- Sem sessão → redireciona para `/login`.
- Palavra-passe errada → "Credenciais incorretas".
- Login com o admin do seeder → listagem com as 7 assembleias da base de dados.
- Tab + Enter → abre o detalhe (navegação por teclado).
- `/assembleias/999` → "Esta assembleia não existe."
- `npm run lint` e `npm run build` sem erros.

_[preencher: o que testei eu próprio]_

---

### 6 · Git — 10/11/2026

**Pedido:** Pedi à IA que fizesse os commits, os pushes e que juntasse os ramos ao `main`.

**O que a IA fez:** Criou os ramos `feat/landing-page` e `feat/react-base`, fez um commit em cada e juntou os dois ao `main` com `--no-ff` (commit `c851028`). Os commits incluem a linha `Co-Authored-By: Claude`.

---

## Reflexão

_[Esta parte deve ser escrita por mim, com as minhas palavras. Perguntas para orientar:]_

- O que aprendi com o código gerado? (ex.: porque é que o `useEffect` precisa da variável `ignore`; a diferença entre `abort()` e lançar uma exceção em Laravel)
- O que consigo explicar sozinho na defesa, e o que ainda tenho de estudar?
- Em que é que a IA errou ou teve de ser corrigida?
- O que faria diferente na próxima vez?
