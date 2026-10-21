# Dourado Studio — site do estúdio + portfólio do Vinícius

Site da **Dourado Studio**, o estúdio de Vinícius Dourado (desenvolvedor front-end, Fortaleza, CE).
Dois públicos, nesta ordem:
1. **Donos de negócio** (não técnicos, quase sempre no celular) → a home conduz até o WhatsApp ou o "Monte seu projeto" (`/orcamento`, sem preço).
2. **Recrutadores** → `/sobre` (trajetória, stack, experiência) e o bloco "Por trás do código" de cada case.

## Ordem de leitura (obrigatória antes de qualquer código)

1. `MEMORY.md` — estado atual, decisões, pendências e changelog. **Leia primeiro, sempre.**
2. `docs/01-posicionamento.md` — público, voz, regras de honestidade, tipos de projeto.
3. `docs/02-design-system.md` — paleta, tipografia, layout, componentes, papel de cada biblioteca de animação.
4. `docs/03-paginas-e-conteudo.md` — rotas, capítulos da home, template de serviço e de case.
5. `docs/04-tecnico.md` — stack, estrutura de pastas, performance, SEO, acessibilidade, imagens.
6. `docs/05-como-adicionar-um-projeto.md` — checklist para incluir um case novo.

Leia só o doc relevante para a tarefa quando ela for pequena, mas `MEMORY.md` sempre.

## Regras de ouro (nunca quebre)

1. **Honestidade acima de efeito.** Nada de depoimento, número, cliente ou resultado inventado. Dado de mercado só com fonte visível. Se um dado não existe, a seção não aparece.
2. **Mobile first.** Projete em 375px e expanda. Nada importante pode depender de hover.
3. **Português do Brasil** em todo o conteúdo, "você", frases curtas, sem jargão técnico fora de `/sobre` e do bloco técnico dos cases.
4. **Dados vivem em `src/data/`** (e contato em `src/config/contact.ts`). Componentes não têm texto de conteúdo solto que deveria ser dado.
5. **Uma biblioteca por papel** (tabela em `docs/02`). Um elemento nunca é animado por GSAP e Framer Motion ao mesmo tempo. Sempre respeitar `prefers-reduced-motion`.
6. **Performance é requisito.** Orçamento em `docs/04`. Medir ao fim de cada etapa.
7. **Não instalar bibliotecas novas** sem perguntar ao Vinícius.
8. **TypeScript strict, sem `any`.**

## Protocolo de memória

Ao final de cada sessão de trabalho (ou depois de uma decisão relevante), atualize `MEMORY.md`:
- "Estado atual" e "Próximos passos" refletem o código de agora;
- decisões novas entram em "Decisões" com data e motivo;
- trabalho concluído entra no "Changelog" com data (nunca apagar histórico);
- se uma decisão deixar um doc desatualizado, atualize o doc também.

## Comandos

```
npm run dev       # http://localhost:5173
npm run build     # tsc -b + vite build
npm run preview   # serve o build
npm test          # testes unitários (Playwright como runner, sem browser)
npm run lint
```
No PowerShell não existe `&&`: rode um comando por vez (ou use o Git Bash).

Deploy: Vercel, a partir do `main` do repositório `speedyvad/portfolio`. URL atual em `src/config/contact.ts` (`SITE_URL`).
