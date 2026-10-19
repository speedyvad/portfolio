# 05 — Como adicionar um projeto

Checklist para incluir um case novo sem quebrar o padrão.

## 1. Decida o tipo
Veja a tabela de `kind` em `docs/01-posicionamento.md`. Na dúvida entre `cliente` e `conceito`: só é cliente se contratou e o site está no ar.

## 2. Imagens (`public/images/cases/`)
- `<slug>-desktop.webp` — tela principal, 1440×900, topo da página (é o que aparece no notebook).
- `<slug>-mobile.webp` — tela do celular, 390×844.
- `<slug>-1.webp`, `<slug>-2.webp`... — telas extras para a galeria do case (seções marcantes, desktop ou celular).
- Capture em alta densidade (deviceScaleFactor 2) e converta para WebP (qualidade ~80). Sem dados pessoais visíveis.

## 3. Dados (`src/data/projects.ts`)
Adicione um objeto ao array `projects`, na posição em que deve aparecer. Campos:

| Campo | Obrigatório | Dica |
|---|---|---|
| `slug`, `title`, `kind`, `year` | sim | slug em kebab-case, igual ao nome das imagens |
| `shortDesc` | sim | uma linha, para cartões |
| `problem` | recomendado | a dor do cliente em UMA frase, linguagem de negócio |
| `fullDesc` | sim | "O desafio": contexto em um parágrafo |
| `highlights` | recomendado | 3–4 itens `{ title, text }`: o que foi feito, em linguagem de negócio |
| `outcome` | opcional | uma frase de resultado. Só fatos |
| `metrics` | opcional | até 3 `{ value, label }`, só números reais |
| `client`, `segment`, `role`, `duration` | opcional | aparecem na ficha do case |
| `stack`, `challenges` | sim | vão para "Por trás do código" (pode ser técnico) |
| `images.desktop`, `images.mobile` | recomendado | caminhos das imagens acima |
| `gallery` | opcional | `{ src, alt, caption?, device: 'desktop' \| 'mobile' }[]` |
| `live`, `github` | opcional | links |
| `color` | sim | cor da marca do projeto (brilho sutil atrás da vitrine) |
| `stage` | opcional | situação quando não é projeto entregue (ex.: "em apresentação") |

## 4. Confira
- `/projetos` (desktop e 375px), `/projetos/<slug>`, a home se for `cliente` ou `conceito`.
- Projetos com imagem (exceto `faculdade`) entram sozinhos na galeria do hero (`src/data/galleryImages.ts`).
- `npm run build` sem erros.
- Se o projeto mudar um número de prova (ex.: "3 projetos no ar"), atualize `src/data/trust.ts`.
- Registre no `MEMORY.md` (changelog).
