# MEMORY — Dourado Studio

> Memória viva do projeto. Leia no início de toda sessão e atualize ao final (protocolo no `CLAUDE.md`).

## Estado atual

- **Versão:** v3 "A jornada", etapas A–D implementadas (19/10/2026) + site sem preço (21/10/2026). Publicada: push do `main` para o `origin` em 21/10/2026 (commit `abadfb9`), deploy pela Vercel. Ainda não conferido no celular de verdade.
- **Rotas no código:** `/`, `/servicos`, `/servicos/:slug` (9 serviços), `/projetos`, `/projetos/:slug`, `/sobre`. `/orcamento` redireciona para `/servicos`. `/raio-x` pausada. Serviços e remoção do orçamento publicados em 03/11/2026.
- **Hero:** cilindro 3D em CSS (`HeroCylinder`) no lugar da galeria OGL, só no computador (celular e tablet ficam só com o texto). Publicado com o `sitemap.xml` em 04/11/2026.
- **Domínio:** `https://www.douradostudio.dev.br` é o endereço oficial no código (`SITE_URL`, `index.html`, `robots.txt`, `sitemap.xml`), com redirecionamento 301/308 de `vinidourado.vercel.app` e de `douradostudio.dev.br` em `vercel.json`. Publicado em 04/11/2026.
- **Projetos:** Harmon Visagismo (conceito, destaque), Imersão Coreia e Enquete Shalom (clientes), Closr (laboratório), Lectio Divina, CalTracker, StudyHub (faculdade).
- **Depoimentos:** nenhum. A seção fica oculta até existir um real.
- **Preços e orçamento:** nada no site. `/orcamento`, "Monte seu projeto" e `pricing.ts` foram removidos em 03/11/2026; todo contato vai pelo WhatsApp.
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
| 04/11/2026 | **Hero com cilindro 3D em CSS + requestAnimationFrame**, sem OGL (`ogl` e `embla-carousel-auto-scroll` desinstalados), só no computador, sem botão de pausa (para com o mouse em cima ou foco do teclado), com 8 prints inteiros novos em vez de recortes | Pedido do Vinícius: maior e mais fluido; no celular e tablet achou feio e pesado, e os recortes estavam ruins. Sem biblioteca nova, e um único anel girando dispensa WebGL |
| 04/11/2026 | **404 de verdade:** sai o rewrite geral do `vercel.json`, o build grava `404.html` (noindex, sem canonical) e endereços antigos redirecionam no servidor | Endereço inexistente respondia 200 e ia para a home, o que o Google trata como soft 404. Se faltar uma rota, ela ainda abre pelo `404.html`, só com o status errado |
| 04/11/2026 | **Build grava um HTML por página pública só com o `<head>` próprio** (`src/data/seo.ts`, `src/lib/routeHtml.ts`, plugin em `vite.config.ts`), sem renderizar o corpo | Resolve canonical e prévias de link sem biblioteca nova. Renderizar o corpo exigiria tratar GSAP, Framer e o estado inicial invisível das animações, com risco de piscar a tela; fica para a etapa de performance |
| 04/11/2026 | **Endereço oficial: `www.douradostudio.dev.br`**; `vinidourado.vercel.app` e o domínio sem www redirecionam para ele | Os três endereços serviam o mesmo site, e o HTML ainda apontava o vercel.app como oficial. Para o Google, tem que existir um só |
| 04/11/2026 | CV em PDF continua com o número pessoal (98211-6585) | Decisão do Vinícius |
| 03/11/2026 | **Catálogo de 9 serviços em `/servicos`**, cada um com página própria (lista da Keyla; nomes mantidos, textos no tom do site). Curso/evento entra em Landing page de campanha; Sistema sob medida vira Automação. Sem case, a seção de prova some: a página mostra o que será feito e leva ao WhatsApp. Escopos: Marketing = páginas e medição (sem gerir anúncios); Presença = perfil no Google e visual das redes; Design = revisão do que já existe; Diagnóstico = pago, com plano escrito; Manutenção = verificação, até 1 h/mês, hospedagem e suporte, só para sites feitos por mim | Pedido do Vinícius em 03/11/2026 |
| 03/11/2026 | **Sai toda a parte de orçamento:** `/orcamento` e "Monte seu projeto", botões, `pricing.ts`, valores em R$. Todo contato vai pelo WhatsApp | Vinícius não quer mais orçamento no site; a decisão de 21/10 só tinha tirado os valores |
| 30/10/2026 | **Google Analytics 4 com aviso de cookies**, sem pacote npm, carregado só depois do "Aceitar"; page view manual pelo `useSEO`; eventos-chave por clique | Medir visitas e conversões (WhatsApp, "Monte seu projeto", CV). GA4 grátis cobre eventos próprios (Vercel Analytics só no Pro). Carregar só com consentimento atende a LGPD e não pesa para quem recusa |
| 21/10/2026 | **Sem preço no site.** Sai a calculadora de perda (`LossCalculator`), o "a partir de" de serviços/portas, o valor do FAQ e a estimativa em R$ do simulador. `/orcamento` vira "Monte seu projeto" (botões renomeados em todo o site), com passo opcional "ideia" e prazo estimado | Pedido do Vinícius: facilitar a chegada do cliente ao WhatsApp. Preço na tela afasta antes da conversa, e a calculadora abria vazia ("R$ 0,00") e pedia digitação no celular |

## Pendências com o Vinícius

- [x] Verificar `douradostudio.dev.br` no **Google Search Console** (propriedade de domínio, registro TXT no DNS da Vercel; feito em 04/11/2026). Não apagar esse TXT.
- [ ] No Search Console: enviar o `sitemap.xml` e solicitar a indexação da home, `/servicos` e `/sobre`.
- [ ] Criar o **Perfil da Empresa no Google** e trocar o link do site no Instagram, LinkedIn e GitHub pelo domínio novo.
- [ ] **URL da versão de teste da Harmon** — para preencher `live` em `src/data/projects.ts` (hoje o case não tem botão "Abrir o site").
- [ ] Quando a Harmon fechar: trocar `kind` para `cliente`, remover `stage`, pedir autorização para citar a marca como cliente.
- [ ] **Estágio na corretora** (Closr): incluir em "Experiência" no `/sobre`? Precisa de cargo, empresa (pode citar?) e datas.
- [ ] Depoimentos reais (mesmo uma frase, por WhatsApp) dos responsáveis pelo Imersão Coreia e pela Enquete.
- [ ] Fotos `about/vinicius-conversando.jpg` e `about/vinicius-trabalhando.jpg` (hoje usa a foto de perfil).
- [ ] Revisar a copy nova (tom de conversa) dos serviços e cases, e os textos (`highlights`, `outcome`) e os números do `/sobre` (3.700+ = 1.500 inscritos + 2.218 respostas).

- [ ] Confirmar textos publicados sem certeza nas páginas novas de serviço, principalmente: "Você mesmo programa as mudanças?" (Design), "acessos no seu nome" (Presença) e o que entra no plano do Diagnóstico.

## Próximos passos

0. SEO técnico: o corpo das páginas ainda depende de JavaScript (ver item 3). `<head>` por rota, imagem de prévia e 404 já foram feitos.
1. Medir o Lighthouse da home depois de publicar o cilindro.
2. Home (pedido de 21/10/2026): capítulo "A dor" no estilo texto + imagens reveladas no scroll (GSAP). O cilindro do hero já foi feito.
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
- **30/10/2026:** Google Analytics 4 + aviso de cookies: `src/config/analytics.ts`, `src/lib/analytics.ts`, `src/lib/consent.ts`, `src/data/consent.ts`, `ConsentBanner`, botão "Cookies" no rodapé, `trackPageView` no `useSEO`, teste `tests/analytics.spec.ts`. ID `G-YMKF1H51QQ` preenchido no mesmo dia.
  - WhatsApp trocado para +55 85 98107-7888 (`src/config/contact.ts`, JSON-LD do `index.html`, teste).
- **03/11/2026:**
  - Nova página `/servicos` e 9 páginas de serviço, com a lista da Keyla. Novas: Manutenção mensal, Presença digital, Design de interfaces, Marketing digital, Diagnóstico e Landing page de campanha (absorve Curso ou evento). Sistema sob medida vira Automação e integração; os endereços antigos redirecionam.
  - Template de serviço: `heroPanel` no lugar da foto, `steps` e `includedNote` por serviço, seção de prova só com case, CTA final com a mensagem do serviço.
  - Orçamento removido: `Orcamento.tsx`, `components/orcamento/`, `pricing.ts` e teste, CSS do simulador, evento `orcamento_enviado`, `priceRange` do JSON-LD, valores de domínio em R$. Botões viram WhatsApp e "Ver os serviços".
- **04/11/2026:**
  - Hero: `HeroCylinder` só em ≥ 1024px, com 8 prints novos (`heroCards.ts`, `scripts/build-hero-cards.mjs` captura os sites em 3:4). Saem `gallery/*`, `galleryImages.ts` e as dependências `ogl` e `embla-carousel-auto-scroll`.
  - `public/sitemap.xml`, linha `Sitemap` no `robots.txt` e teste `tests/sitemap.spec.ts`.
  - Domínio `www.douradostudio.dev.br` no código, com redirecionamentos em `vercel.json`. Publicado no mesmo dia.
  - HTML por rota: `src/data/seo.ts` vira a fonte única de título e descrição (páginas e build), `renderRouteHtml` e plugin `route-html`, teste `tests/route-html.spec.ts`. O `vite preview` só entrega esses arquivos com barra no fim (`/sobre/`); sem barra ele cai no `index.html`.
  - `public/og-image.png` nova (`scripts/og-image.html` + `scripts/build-og-image.mjs`), no lugar da arte antiga "VD." que estava publicada em `/og-image.html`.
  - Página `NotFound`, `404.html`, redirecionamentos de `/orcamento`, `/projects` e serviços antigos em `vercel.json`, HTML próprio para `/raio-x`.
  - Frase sobre Fortaleza nas introduções de 4 serviços (landing page, site institucional, campanha, presença digital).
