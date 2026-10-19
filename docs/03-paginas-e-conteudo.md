# 03 — Páginas e conteúdo

Textos e números ficam em `src/data/*` — este doc descreve estrutura e intenção, não duplica o conteúdo.

## Rotas

```
/                     Home — a jornada                         src/pages/Home.tsx
/servicos/:slug       Página de cada serviço                   src/pages/Service.tsx      (dados: services.ts)
/orcamento            Simulador de orçamento                   src/pages/Orcamento.tsx    (dados: pricing.ts)
/projetos             Lista de projetos                        src/pages/Projects.tsx     (dados: projects.ts)
/projetos/:slug       Case                                     src/pages/ProjectDetail.tsx
/sobre                Trajetória do Vinícius (recrutadores)    src/pages/About.tsx
/raio-x               PAUSADO — fora da navegação
/projects, /projects/:slug  → redirecionam para /projetos
```
Navegação: Serviços, Projetos, Sobre + botão "Simular orçamento". Menu mobile em gaveta.

## Home — a jornada

| # | Capítulo | Fundo | Componente | Observações |
|---|---|---|---|---|
| 1 | Convite (hero) ★ | branco | `journey/JourneyInvite` + `gallery/*` | Galeria curva OGL no desktop; faixa Embla no mobile/reduced-motion |
| — | Faixa de confiança | branco | `TrustBar` | dados em `trust.ts` |
| 2 | A dor ★ | --sea | `journey/JourneyPain` | 3 frases com pin no desktop; dados de `stats.ts` com fonte |
| 3 | Calculadora de perda ★ | --sea | `journey/LossCalculator` | só números do visitante; aviso "não é promessa" obrigatório |
| — | A tela clareia | sea → sand | dentro de `JourneyTurn` | scrub de cor |
| 4 | A virada | --sand | `journey/JourneyTurn` | 3 cenas foto + cartões de interface fictícios |
| 5 | A prova | branco/sand | `ProofBlocks` + `CaseShowcase` + `Testimonials` | blocos ouro com números reais; vitrines dos cases; depoimentos só se existirem |
| 6 | Qual é o seu caso? ★ | --sea | `CaseDoors` | carrossel Embla com as 4 portas → `/servicos/:slug` |
| 7 | Como funciona | branco | `ProcessSteps` | |
| — | Fortaleza | foto | `journey/FortalezaBand` | |
| 8 | Quem faz | branco | `WhoSection` | link para `/sobre` |
| 9 | Perguntas | branco | `FaqAccordion` (Radix) | dados em `faq.ts` |
| 10 | Fechamento | foto + --sea | `FinalCta` + `Footer` | rodapé com wordmark gigante |

★ = momento de impacto. Fora deles, a página é calma.

## Página de serviço — `/servicos/:slug`

Template único (`src/pages/Service.tsx`) alimentado por `src/data/services.ts`
(`title`, `heroImage`, `painLines[3]`, `beforeAfter[3]`, `faq[]`, `caseSlug`).

1. Hero (branco): título display + foto com cartão de interface por cima, "a partir de", prazo, botões
   "Simular orçamento" (`/orcamento?tipo={slug}`) e WhatsApp (mensagem do serviço).
2. A dor (--sea): as três `painLines`.
3. O que muda (--sand): três pares antes/depois, o "depois" em destaque.
4. O que vem incluso (branco): `deliverables` + prazo + nota de manutenção.
5. Prova: case de `caseSlug` com DeviceMockup; se `null`, os cases de cliente.
6. Como funciona (componente compartilhado).
7. Perguntas do serviço (Radix Accordion).
8. CTA final (compartilhado).
SEO: "{nome do serviço} em Fortaleza — Dourado Studio".

## Projetos — `/projetos`

1. Título + frase curta.
2. **Destaques** (`cliente` e `conceito`): cartões grandes com imagem SEMPRE visível (também no celular),
   rótulo do tipo, segmento, problema em uma frase e até 3 números. Ordem = ordem do array em `projects.ts`.
3. **Laboratório** (`laboratorio`): cartões médios com imagem.
4. **Estudos** (`faculdade`): lista compacta com miniatura, sem destaque.

## Case — `/projetos/:slug`

Conta uma história, nesta ordem:
1. **Abertura:** rótulo (tipo · segmento · ano), título grande, `problem` em uma frase, botões (abrir site / GitHub).
   Ficha ao lado: cliente, papel, prazo, entregas.
2. **Vitrine:** DeviceMockup grande sobre faixa areia (cor do projeto como brilho sutil).
3. **Números:** blocos com `metrics`.
4. **O desafio** (`fullDesc`) → **O que eu fiz** (`highlights`: título + texto, linguagem de negócio) → **Resultado** (`outcome`).
5. **Galeria** (`gallery`): telas extras com legenda, desktop e celular.
6. **Por trás do código** (recolhível): stack com Devicon + `challenges` (aqui pode ser técnico — é para recrutador).
7. CTA "Quero algo parecido" (WhatsApp com o nome do case).
8. Próximo projeto: cartão grande com imagem.

Campos que faltarem simplesmente não renderizam a seção correspondente.
