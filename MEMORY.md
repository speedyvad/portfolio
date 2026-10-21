# MEMORY — Dourado Studio

> Memória viva do projeto. Leia no início de toda sessão e atualize ao final (protocolo no `CLAUDE.md`).

## Estado atual

- **Versão:** v3 "A jornada", etapas A–D implementadas (19/10/2026). Ainda não publicada: as mudanças de 19/10 estão no `main` local.
- **Rotas no ar no código:** `/`, `/servicos/:slug` (4 serviços), `/orcamento`, `/projetos`, `/projetos/:slug`, `/sobre`. `/raio-x` pausada.
- **Projetos:** Harmon Visagismo (conceito, destaque), Imersão Coreia e Enquete Shalom (clientes), Closr (laboratório), Lectio Divina, CalTracker, StudyHub (faculdade).
- **Depoimentos:** nenhum. A seção fica oculta até existir um real.
- **Preços:** nenhum valor em R$ no site desde 21/10/2026. `/orcamento` virou "Monte seu projeto" (mini-briefing → WhatsApp, com prazo estimado). Os valores continuam em `src/data/pricing.ts` (e nos testes), sem uso na interface.
- **Lighthouse mobile (build local, 19/10/2026):**

  | Página | Perf. | Acess. | Boas práticas | SEO | LCP | CLS |
  |---|---|---|---|---|---|---|
  | `/` | 76 | 100 | 100 | 100 | 4,6 s | 0 |
  | `/projetos` | 79 | 100 | 100 | 100 | 4,2 s | 0 |
  | `/projetos/harmon-visagismo` | 84 | 100 | 100 | 100 | 3,6 s | 0 |
  | `/servicos/site-institucional` | 77 | 100 | 100 | 100 | 4,2 s | 0 |
  | `/sobre` | 61 | 100 | — | — | 7,5 s | 0 |

  Antes desta rodada: `/` 61 (LCP 12,1 s), `/projetos` 87, `/sobre` 55 (CLS 0,25), SEO 92 em todas.
- **Orçamento de JS estourado:** o chunk principal (`index-*.js`) tem ~155 KB gzip sozinho; somado ao da home passa dos 180 KB. Já era assim antes de 19/10.

## Decisões

| Data | Decisão | Motivo |
|---|---|---|
| 19/10/2026 | Documentação dividida em `CLAUDE.md` curto + `MEMORY.md` + `docs/01..05` (modelo do projeto Harmon) | O CLAUDE.md tinha ~1000 linhas misturando regra, plano e texto, sem dizer o que já estava pronto |
| 19/10/2026 | Novos tipos de projeto: `cliente`, `conceito`, `laboratorio`, `faculdade` (antes `cliente`/`autoral`) | Separar trabalho de estúdio de estudo, e não chamar de cliente quem ainda não fechou |
| 19/10/2026 | Harmon Visagismo entra como **projeto conceito** e é o primeiro de `/projetos` | Projeto mais forte visualmente; em negociação com o dono, versão de teste já publicada. Sem preços nem equipe nas imagens (são placeholder no site da Harmon) |
| 19/10/2026 | Closr vira **laboratório**, sem citar a corretora | Protótipo de estágio (~3 meses) que ficou com a empresa; não dá para afirmar que está em uso hoje |
| 19/10/2026 | **Sem depoimentos inventados**, nem genéricos | Pedido do Vinícius para "depoimentos meio fakes" foi recusado: o público decide por confiança, e um depoimento falso descoberto derruba o resto. Alternativa adotada: blocos de prova com números reais |
| 19/10/2026 | `ServicesList` da home substituída pelo carrossel "Qual é o seu caso?" (`CaseDoors`); detalhes de cada serviço foram para `/servicos/:slug` | Spec da v3 (capítulo 6) e a home ficava longa e com cara de tabela |
| 19/10/2026 | Case conta história: desafio → o que eu fiz → resultado → telas → "Por trás do código" (recolhível) | O case antigo falava de CORS e JWT para dono de negócio. A parte técnica continua lá para recrutador |
| 19/10/2026 | Prints de projeto em WebP (PNGs removidos, foto de perfil também) | `/` caiu de LCP 12 s para ~4,6 s |
| 19/10/2026 | Wordmark gigante do rodapé desenhado por `::before` (`data-text`) | É decorativo; como texto real falhava no contraste do Lighthouse |
| 19/10/2026 | **Tom de conversa** em serviços e projetos (primeira pessoa, "pra", situações reais) — regras em docs/01 | Pedido do Vinícius: os textos estavam genéricos e formais demais |
| 19/10/2026 | Scroll zerado via `resetScroll()` (Lenis `immediate`) na troca de rota e de novo no `onExitComplete` da transição; `scrollRestoration = manual` | Páginas abriam no meio/fim quando o clique acontecia com o Lenis ainda deslizando |
| 19/10/2026 | Nome no hero do `/sobre`: texto final invisível reserva o espaço, embaralhado por cima | O efeito de embaralhar gerava CLS de 0,25 |
| 21/10/2026 | **Sem preço no site.** Sai a calculadora de perda (`LossCalculator`), o "a partir de" de serviços/portas, o valor do FAQ e a estimativa em R$ do simulador. `/orcamento` vira "Monte seu projeto" (botões renomeados em todo o site), com passo opcional "ideia" e prazo estimado | Pedido do Vinícius: facilitar a chegada do cliente ao WhatsApp. Preço na tela afasta antes da conversa, e a calculadora abria vazia ("R$ 0,00") e pedia digitação no celular |

## Pendências com o Vinícius

- [ ] **URL da versão de teste da Harmon** — para preencher `live` em `src/data/projects.ts` (hoje o case não tem botão "Abrir o site").
- [ ] Quando a Harmon fechar: trocar `kind` para `cliente`, remover `stage`, pedir autorização para citar a marca como cliente.
- [ ] **Estágio na corretora** (Closr): incluir em "Experiência" no `/sobre`? Precisa de cargo, empresa (pode citar?) e datas.
- [ ] Depoimentos reais (mesmo uma frase, por WhatsApp) dos responsáveis pelo Imersão Coreia e pela Enquete.
- [ ] Fotos `about/vinicius-conversando.jpg` e `about/vinicius-trabalhando.jpg` (hoje usa a foto de perfil).
- [ ] Revisar a copy nova (tom de conversa) dos serviços e cases, e os textos (`highlights`, `outcome`) e os números do `/sobre` (3.700+ = 1.500 inscritos + 2.218 respostas).

- [ ] Site institucional: o simulador oferece "Até 4 / 5 a 6 / 7 a 10 páginas", mas o pacote em `services.ts` diz "Até 6 páginas". Alinhar as opções.

## Próximos passos

1. Publicar (commit + push → Vercel) e conferir no celular de verdade.
2. Home (pedido de 21/10/2026): hero com carrossel cilindro 3D (prints novos, mesma proporção, recortes das melhores partes; substituir a galeria OGL) e capítulo "A dor" no estilo texto + imagens reveladas no scroll (GSAP).
3. Performance: dividir o chunk principal (GSAP/Lenis/Framer fora do caminho crítico), pré-renderizar o HTML das rotas (hoje o LCP depende do JS), revisar o LCP de 7,5 s do `/sobre`.
4. Preencher as pendências acima.
5. `/creditos` (rota prevista na v3) se forem usadas fotos de banco com atribuição.

## Changelog

- **13/06/2026:** v1 — portfólio pessoal (tema escuro + amarelo).
- **29/09/2026:** Dourado Studio — Fase 1 (site do estúdio, simulador de orçamento, cases de cliente).
- **01/10/2026:** v3 etapa B — capítulos 1 a 4 da jornada (galeria OGL, dor, calculadora, virada).
- **19/10/2026:**
  - Docs reorganizados (`CLAUDE.md`, `MEMORY.md`, `docs/`), README real.
  - Harmon Visagismo adicionada: 10 prints (desktop + celular) capturados do build local em `public/images/cases/harmon-*.webp`.
  - `/projetos` redesenhada: destaque grande, grade com imagem sempre visível (também no celular), faixa Laboratório, lista compacta de estudos. Novo `ProjectMedia`.
  - Template do case refeito (ficha, vitrine, números em blocos dourados, desafio/o que eu fiz/resultado, galeria, "Por trás do código", CTA, próximo projeto).
  - Etapa C: `ProofBlocks` (números reais com NumberFlow), `CaseDoors` (Embla), FAQ em Radix Accordion, CTA final com foto de Fortaleza, wordmark gigante no rodapé, GitHub no rodapé.
  - Etapa D: `/servicos/:slug` (`src/pages/Service.tsx`) com hero + cartão, dor, antes/depois, incluso, calculadora, prova, como funciona, FAQ do serviço, outros serviços.
  - `/sobre`: papéis concretos, números reais, faixa "Projetos para olhar de perto", CLS corrigido.
  - Correção: páginas novas sempre abrem no topo (ver Decisões).
  - Copy reescrita em tom de conversa: `services.ts` (novos campos `intro` e `proofNote`, saem `forWho`/`value`/`proof`), textos dos projetos e títulos de /projetos, case e serviço.
  - Galeria do hero sem imagem quebrada (só projetos com print). `robots.txt` criado (SEO 92 → 100).
- **21/10/2026:**
  - Preços removidos do site: `LossCalculator` apagado (home e serviços), `priceFrom`/`formatPrice` fora de `services.ts`, portas e "outros serviços" mostram o prazo, FAQ "Quanto custa" reescrito.
  - `/orcamento` → "Monte seu projeto": `EstimateBar` e `useAnimatedNumber` saem, entra `ProjectSummary` (resumo + prazo estimado). Novo passo opcional "ideia", tela final com resumo e mensagem do WhatsApp montadas da mesma lista.
  - "Simular orçamento" → "Monte seu projeto" em menu, hero, serviços, case e /raio-x.
