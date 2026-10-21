# 01 — Posicionamento, público e voz

## O que o site precisa fazer

| Público | Quer saber | Onde encontra | Ação esperada |
|---|---|---|---|
| Dono de pequeno/médio negócio, organizador de curso/evento, comunidade | "Isso resolve o meu problema? Quanto custa? Dá pra confiar?" | Home, `/servicos/:slug`, cases | WhatsApp ou `/orcamento` |
| Recrutador de empresa | "Ele sabe construir? Com o quê? Já trabalhou em equipe?" | `/sobre`, bloco "Por trás do código" dos cases, laboratório | LinkedIn, GitHub, e-mail, CV |

**Diferencial a comunicar sempre:** "você fala direto com quem desenha e programa o seu site".

## Princípios

1. **Natural, não genérico.** Fotos reais convivendo com elementos do trabalho (cartões de interface, mockups, notificações).
   Nada de efeitos que viraram assinatura de site de IA (feixes de luz, holofote, meteoros, gradientes neon, Aceternity UI, Magic UI).
2. **Poucos momentos de impacto, o resto calmo.** Movimento fora deles só em resposta a uma ação ou para ajudar a leitura.
3. **O site vende velocidade, então precisa ser rápido.**
4. **Bater na dor com honestidade.** Só dados com fonte, e contas feitas com os números do próprio visitante.
   Sem urgência falsa, sem escassez inventada, sem estatística exagerada.

## Regras de honestidade (inegociáveis)

- **Depoimentos:** só reais, com autorização. `src/data/testimonials.ts` fica vazio até existir um; a seção some sozinha.
  Não criar depoimentos genéricos ou "ilustrativos" — o público-alvo decide por confiança, e um depoimento falso descoberto derruba todo o resto.
- **Números de prova:** só os medidos (inscritos, respostas, idiomas, Lighthouse). Nada de "+50 clientes satisfeitos".
- **Clientes:** só aparece como "cliente" quem contratou e tem o projeto no ar. Uso da marca Shalom autorizado pelo cliente.
- **Cartões fictícios da home** (Barbearia do Bairro etc.) usam nomes genéricos, nunca marcas reais.

## Tipos de projeto (`kind` em `src/data/projects.ts`)

| kind | O que é | Onde aparece | Rótulo na tela |
|---|---|---|---|
| `cliente` | Contratado e no ar | Destaque na home e em `/projetos` | "Projeto para cliente" |
| `conceito` | Projeto real de estúdio para um negócio real, ainda em apresentação/negociação | Destaque em `/projetos` (pode ser o primeiro) | "Projeto conceito" |
| `laboratorio` | Protótipo profissional ou produto autoral relevante (ex.: Closr) | Faixa "Laboratório" em `/projetos` | "Laboratório" |
| `faculdade` | Projetos de estudo | Lista compacta no fim de `/projetos` | "Estudo" |

Situação de cada projeto:
- **Imersão Coreia**, **Enquete Shalom** — `cliente`.
- **Harmon Visagismo** — `conceito`. Site de barbearia de visagismo na Aldeota, em negociação com o dono (out/2026). Não chamar de cliente até fechar. Preços e equipe do site da Harmon ainda são placeholder: não citar.
- **Closr** — `laboratorio`. Protótipo criado durante ~3 meses de estágio numa corretora de seguros, usado internamente pela equipe; ficou com a empresa. Não nomear a corretora, não dizer que é um SaaS em operação.
- **StudyHub, Lectio Divina, CalTracker** — `faculdade`.

## Voz

- **Tom de conversa.** Como o Vinícius explicaria pessoalmente para um cliente: primeira pessoa ("eu faço", "eu cuido"), "você", "pra" no lugar de "para" quando soa natural, frases curtas.
- Começar pela situação real do cliente ("você manda áudio, print, link... e a pessoa some"), não por um conceito ("presença digital", "experiência premium", "sem fricção").
- Evitar jargão de agência e frases que serviriam para qualquer empresa. Se a frase cabe no site de outro estúdio, reescreva.
- Sinceridade vale mais que promessa ("vou ser sincero: subir no Google leva tempo").
- Títulos em sentence case, sem caixa alta, sem destacar palavra isolada com outra cor.
- Botão diz o que acontece ("Monte seu projeto", "Ver o case"), sem "→" automático.
- Na home e nas páginas de serviço: zero jargão técnico. Termos técnicos ficam em `/sobre` e no bloco "Por trás do código" dos cases.
