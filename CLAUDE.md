# CONTEXT — Quiz Funnel Low Ticket | Nicho: Peptídeos (Infoproduto Educacional)
> Arquivo de contexto para o Claude Code. Cole na raiz do projeto como `CLAUDE.md` ou referencie como contexto base.
> Objetivo do projeto: construir um QUIZ FUNNEL que captura lead via Meta Ads, segmenta por "perfil/objetivo", e vende um INFOPRODUTO EDUCACIONAL sobre peptídeos (low ticket → upsell).
> NOTA DE STACK: este projeto NÃO usa n8n. Automação via Supabase Edge Functions + webhooks diretos (Stripe → Edge Function → Supabase/Resend).
---
## 0. AVISO DE COMPLIANCE (LER ANTES DE GERAR QUALQUER COPY/CRIATIVO)
Este projeto roda tráfego pago no **Meta Ads** num nicho de **saúde/suplemento (peptídeos)**. Meta trata isso como categoria sensível. Regras NÃO-NEGOCIÁVEIS que o código, copy e landing pages DEVEM respeitar:
- **PROIBIDO claim de doença**: nunca "cura", "trata", "previne", "reverte", "elimina" qualquer condição (gordura, dor, libido, fadiga, pele). Use linguagem **structure-function** ("apoia", "relacionado a", "associado ao bem-estar geral").
- **PROIBIDO atributo pessoal em 2ª pessoa**: NÃO usar "Você está acima do peso?", "Cansado?", "Sua libido caiu?". O Meta detecta isso como *personal attributes* e reprova quase automático. A própria mecânica do quiz ("descubra a raiz do SEU problema") é o maior risco — o quiz pode perguntar, mas o **ANÚNCIO** não pode implicar que o usuário tem um problema de saúde.
- O produto é **INFOPRODUTO EDUCACIONAL**, não o peptídeo. A copy vende **conhecimento/informação**, nunca o composto. Isso é o que mantém o projeto vivo. Reforçar em toda copy: "conteúdo educativo", "guia informativo".
- **Disclaimer obrigatório** no ad copy E na landing (2026): *"Este conteúdo é educativo e não substitui orientação médica. Não se destina a diagnosticar, tratar, curar ou prevenir qualquer doença."*
- Peptídeos como BPC-157/TB-500/retatrutide são **research compounds não-aprovados FDA**. O infoproduto deve se posicionar como educação sobre o que existe/como a ciência discute — NUNCA como protocolo de uso/prescrição/dosagem aplicável. Sem "protocolo exato pra resolver seu problema" no ad.
- Landing page é escaneada igual ou mais que o anúncio. Manter coerência: se o ad é educacional, a página tem que ser educacional.
- **Naming de evento/audiência**: nunca nomear custom conversions/audiences com traços sensíveis (ex: `lead_dor_cronica`). Meta desativa. Usar nomes neutros: `quiz_complete`, `lead_perfil_a`.
> Regra de ouro pro Claude Code: se uma copy só funciona implicando que a pessoa TEM um problema de saúde, ela está errada. Reescreve em torno de curiosidade + educação.
---
## 1. A CHAMADA ORIGINAL (e a versão compliant)
**Original (alto risco de ban):**
> "Descubra qual peptídeo o seu corpo está pedindo. Em 60 segundos, um quiz inteligente identifica a raiz do seu problema — gordura teimosa, cansaço, dor, libido ou pele — e te entrega o protocolo exato para resolver."
**Reescrita compliant (pro ad):**
> "Existem dezenas de peptídeos sendo estudados pra performance, recuperação e longevidade. Qual categoria mais combina com os seus objetivos? Responda 6 perguntas e receba um guia educativo personalizado."
Diferença: tira "seu corpo está pedindo" (implica deficiência/condição), tira "raiz do seu problema" (claim médico), tira "protocolo exato pra resolver" (prescrição). Mantém curiosidade + segmentação + entrega de valor.
A chamada original PODE ser usada **dentro do quiz** (depois do clique, fora do alcance do classificador de ad), com mais liberdade — mas ainda sem prometer cura.
---
## 2. ESPECIALISTAS DE REFERÊNCIA (frameworks pra estudar/imitar)
### Ryan Levesque — ASK Method / Quiz Funnel (a bíblia)
- Criador do quiz funnel moderno. Livro **"Ask"**. Software **bucket.io**. +$100M em 23 nichos.
- **Núcleo do método**: o "Micro-Commitment Bucket Survey" — quiz curto que segmenta a pessoa em "buckets" (perfis) e entrega solução customizada por bucket. É EXATAMENTE o modelo desse projeto.
- Sequência ASK: pergunta inicial de segmentação → 4-6 perguntas → captura email → resultado personalizado por bucket → oferta adequada ao bucket.
- Pra esse projeto: cada "perfil" (energia/performance/recuperação/longevidade/estética) é um bucket. Cada bucket recebe um resultado + a MESMA oferta low ticket com ângulo diferente.
### Direct-response / Quiz mechanics 2026 (Perspective-style)
- Cold traffic de Reels/TikTok espera experiência interativa, não landing estática. Quiz = continuação do feed.
- **Primeiras 3 perguntas = <10s total** (fáceis, não-ameaçadoras). Engajamento por micro-interação derruba bounce.
- Velocidade < 1s de load converte até 2.5x mais. Mobile-first obsessivo.
- Benchmark agressivo citado: ~28% conversão em cold com quiz bem feito (referência, não promessa).
### Low Ticket Funnel (tripwire) — Hello Funnels / direct response clássico
- NÃO rode ad direto pra sales page. Rode pra **lead magnet de alta conversão** (o quiz É o lead magnet) → apresenta o low ticket na thank you page (tripwire).
- Self-liquidating offer: o low ticket paga o custo do ad, a lista/upsell é o lucro.
- O modelo "ad → sales page direto" morreu quando o CPC subiu. Quiz + tripwire é a evolução.
### Alex Hormozi — Money Models / Oferta / Upsell (a parte de monetização)
- **Client-financed acquisition**: lucro bruto nos primeiros 30 dias > 2x (CAC + COGS). Um cliente paga a aquisição dos próximos dois. É isso que permite escalar sem queimar caixa.
- **Upsell logo após o sim**: ~90% aceitam upsell bem posicionado no "hyper buying cycle" (momento de excitação pós-compra).
- **"Do you want fries with that?"**: a margem tá no upsell, não no front-end de $X.
- **Magnetic middle**: 3 opções de preço, a do meio ancorada pra ser a escolhida.
- **BAMFAM**: sempre montar o próximo passo antes de encerrar o atual.
- Aplicação aqui: front-end $9–27 (guia) → upsell $47–97 (curso/aprofundamento) → downsell se recusar.
---
## 3. ARQUITETURA DO FUNIL (o que o Claude Code vai construir)
```
META AD (educacional/compliant)
   │  CTA: "Fazer o quiz"
   ▼
QUIZ (6 perguntas, mobile-first, <1s load)
   │  Q1-Q3: fáceis/rápidas (objetivo, rotina, familiaridade c/ o tema)
   │  Q4-Q6: segmentação fina (qual bucket)
   ▼
CAPTURA DE EMAIL (antes do resultado — "pra te enviar o guia")
   │
   ▼
PÁGINA DE RESULTADO (personalizada por bucket)
   │  "Seu perfil: [BUCKET]" + mini-conteúdo de valor + transição pra oferta
   ▼
TRIPWIRE / LOW TICKET ($9–27) — o guia/infoproduto educacional
   │
   ├─► UPSELL 1 ($47–97) — curso aprofundado / aulas
   │      └─► DOWNSELL se recusar ($27–37)
   │
   └─► (pós-compra) sequência de email por bucket → high ticket / comunidade
```
### Buckets sugeridos (perfis — NEUTROS, sem claim de condição)
1. **Performance & Treino** (foco em rendimento físico/recuperação muscular)
2. **Energia & Disposição** (vitalidade/rotina)
3. **Longevidade & Bem-estar** (interesse em healthspan)
4. **Estética & Pele** (cuidado/aparência)
5. **Iniciante Curioso** (quer entender o tema do zero)
Cada bucket → mesmo produto, ângulo de copy diferente. (Levesque puro.)
---
## 4. STACK TÉCNICA RECOMENDADA (proativo — escolher conforme preferência do dono)
> Dono do projeto domina: Lovable (React+Vite+Tailwind+shadcn) + Supabase + n8n + Stripe. Prioriza vibe code.
**Caminho A — Build próprio (recomendado p/ controle + custo):**
- **Frontend quiz**: Lovable / React + Vite + Tailwind + shadcn/ui. Quiz como state machine (cada resposta → score por bucket).
- **Lógica de bucket**: somar pontos por resposta, bucket vencedor = maior score. Empate → prioridade definida.
- **Backend/DB**: Supabase. Tabelas: `leads`, `quiz_responses`, `buckets`, `orders`.
- **Pagamento**: Stripe Checkout (front-end $X) + upsell via Stripe (one-click upsell ou link sequencial).
- **Automação/email**: Supabase Edge Functions. Webhook Stripe → Edge Function → grava order + dispara email por bucket (Resend) + tag no CRM. SEM n8n.
- **Pixel/tracking**: Meta Pixel + Conversions API (CAPI) via Supabase Edge Function. Eventos NEUTROS: `QuizStart`, `QuizComplete`, `Lead`, `Purchase`.
**Caminho B — No-code/rápido (validar antes de buildar):**
- **ScoreApp** ou **bucket.io** (do próprio Levesque) ou **Typeform/Perspective** pro quiz.
- Liga no Stripe + email tool. Valida oferta antes de investir em build custom.
- Trade-off: menos controle de dados/pixel, mensalidade, menos margem. Mas testa a oferta em dias, não semanas.
> Recomendação crítica: **valida a OFERTA no Caminho B antes de gastar tempo no build A.** O gargalo nunca é o quiz bonito — é se a oferta converte. Não caia na armadilha de passar 3 semanas codando um quiz lindo pra descobrir que a oferta não vende.
---
## 5. ESPECIFICAÇÃO DO QUIZ (pro Claude Code implementar)
**Requisitos não-funcionais:**
- Mobile-first, load < 1s, sem scroll nas perguntas (uma pergunta por tela).
- Barra de progresso visível. Animação leve de transição.
- Captura de email DEPOIS da última pergunta, ANTES do resultado (micro-commitment já feito → conversão de email alta).
- Sem `<form>` HTML nativo se for React artifact — usar onClick/onChange + state.
**Modelo de dados (Supabase):**
```sql
-- leads
id uuid pk default gen_random_uuid()
email text not null
bucket text            -- perfil vencedor (neutro)
created_at timestamptz default now()
utm_source text, utm_campaign text, utm_content text
-- quiz_responses
id uuid pk
lead_id uuid fk -> leads.id
question_id text
answer_id text
score_json jsonb       -- pontos atribuídos por bucket nessa resposta
created_at timestamptz default now()
-- orders
id uuid pk
lead_id uuid fk -> leads.id
stripe_session_id text
product text           -- 'frontend' | 'upsell1' | 'downsell'
amount_cents int
status text            -- 'paid' | 'refunded'
created_at timestamptz default now()
```
**Lógica de scoring (pseudocódigo):**
```js
// cada resposta carrega pesos por bucket
const SCORES = {
  q1: { a: { performance: 2 }, b: { energia: 2 }, c: { longevidade: 2 }, d: { estetica: 2 }, e: { iniciante: 2 } },
  // ... q2..q6
};
function computeBucket(answers) {
  const totals = {};
  for (const [q, a] of Object.entries(answers)) {
    const w = SCORES[q]?.[a] || {};
    for (const [bucket, pts] of Object.entries(w)) {
      totals[bucket] = (totals[bucket] || 0) + pts;
    }
  }
  // bucket vencedor; desempate por ordem de prioridade
  const priority = ['performance','energia','longevidade','estetica','iniciante'];
  return Object.entries(totals)
    .sort((x,y) => y[1]-x[1] || priority.indexOf(x[0])-priority.indexOf(y[0]))[0][0];
}
```
---
## 6. ESTRUTURA DE OFERTA (Hormozi aplicado)
| Etapa | Produto | Preço sugerido | Ângulo |
|---|---|---|---|
| Front-end (tripwire) | Guia educativo "Mapa dos Peptídeos" (PDF/mini-curso) | $9–27 | Entrega imediata, paga o ad |
| Upsell 1 | Curso aprofundado em vídeo por categoria | $47–97 | "Aprofunde no seu perfil" |
| Downsell | Versão reduzida do upsell | $27–37 | Pra quem recusou o upsell |
| Back-end | Comunidade/mentoria/atualizações | recorrência | LTV de longo prazo |
- Meta de money model: gross profit 30d > 2x CAC. COGS de infoproduto ≈ 0, então a matemática fecha fácil se o quiz converte email barato.
- Upsell aparece IMEDIATAMENTE pós-compra do front-end (hyper buying cycle).
- 3 níveis de preço com "magnetic middle" no upsell.
---
## 7. SEQUÊNCIA DE EMAIL (por bucket — Supabase Edge Function + Resend)
- **Email 0 (imediato)**: entrega do guia + reforço do perfil/bucket. Disclaimer educacional.
- **Email 1 (+1 dia)**: conteúdo de valor específico do bucket (educacional puro, sem venda).
- **Email 2 (+2 dias)**: história/caso + transição suave pra upsell.
- **Email 3 (+3 dias)**: oferta do upsell com escassez real (não falsa).
- **Email 4+**: nutrição contínua → back-end.
- Toda comunicação: educacional, structure-function, disclaimer no rodapé.
---
## 8. TRACKING & MÉTRICAS (o que medir)
- **Quiz**: start rate, completion rate (meta >60%), email opt-in rate.
- **Por pergunta**: drop-off (identifica pergunta que mata o funil).
- **Front-end**: conversão thank-you → compra.
- **Upsell**: take rate (meta Hormozi ~variável, testar).
- **Unit economics**: CAC, AOV (com upsell), gross profit 30d, ROAS.
- Eventos Meta CAPI com nomes NEUTROS. Nunca incluir traço sensível em nome de evento/audiência.
---
## 9. TAREFAS PRO CLAUDE CODE (ordem de execução sugerida)
1. Scaffold do quiz em React/Vite/Tailwind/shadcn (state machine, 6 perguntas, 1 por tela, progress bar, mobile-first).
2. Schema Supabase (`leads`, `quiz_responses`, `orders`) + RLS.
3. Lógica de scoring/bucket + tela de resultado dinâmica por bucket.
4. Captura de email pré-resultado → grava em `leads` com UTMs.
5. Integração Stripe Checkout front-end + upsell + webhook → Supabase/n8n.
6. Meta Pixel + Conversions API (eventos neutros) via Edge Function.
7. Páginas: ad-coerente (educacional) → quiz → resultado → tripwire → upsell → downsell.
8. Supabase Edge Function: webhook compra → grava order + tag CRM + dispara sequência de email por bucket (Resend). SEM n8n.
9. Dashboard simples de métricas (drop-off por pergunta, conversão, ROAS).
> Em TODA copy gerada: aplicar §0 (compliance). Se a copy implica condição de saúde do usuário em 2ª pessoa, reescrever em torno de curiosidade/objetivo/educação.
---
## 10. ARMADILHAS (pontos cegos a evitar)
- **Build antes de validar oferta**: erro mais caro. Valida no-code primeiro.
- **Copy que toma ban**: a chamada original linda = risco alto. Versão compliant no ad, liberdade (limitada) dentro do quiz.
- **Quiz longo demais**: >7 perguntas mata completion. Ficar em 6.
- **Pedir email cedo demais**: pede DEPOIS do micro-commitment (última pergunta).
- **Esquecer o upsell**: o front-end de $X não paga conta. O dinheiro está no upsell/back-end.
- **Nome de evento/audiência sensível**: desativa no Meta. Sempre neutro.
- **Landing incoerente com ad**: rejeição retroativa mesmo com ad aprovado.
---
## 11. SETUP DE CONTA META (anti-ban) — pré-requisito antes de qualquer ad
**Obrigatório vs opcional:**
- **Facebook Page**: OBRIGATÓRIA. Não existe ad no Meta sem Page por trás. Todo anúncio é veiculado em nome de uma Page.
- **Instagram**: tecnicamente opcional (sem IG conectado, o Meta renderiza o ad nos posicionamentos do IG usando a própria Page do FB). MAS em nicho de saúde/suplemento, rodar sem IG = risk score mais alto. Recomendado FB + IG juntos.
**Por que FB+IG juntos reduzem risco:** o Meta julga pelo "combined risk score", e confiança/histórico do anunciante é parte do score. Page nova + zero IG + zero seguidores + ad de peptídeo no dia 1 = perfil de risco máximo = reprovação/bloqueio imediato.
**Checklist de aquecimento (fazer ANTES do primeiro ad de conversão):**
1. Criar Page + Instagram juntos (mesmo que mínimos, com bio/foto/identidade coerente).
2. Postar 5-10 conteúdos **educacionais puros** (sem venda, sem claim) antes de anunciar.
3. Rodar 1-2 semanas de tráfego morno barato (engajamento/alcance) pra esquentar pixel + histórico do anunciante.
4. Só então ligar o ad de conversão pro quiz.
**Isolamento de risco:**
- Usar **Business Manager SEPARADO** pra esse projeto. NÃO rodar peptídeo no mesmo BM de outras operações/marcas — se tomar strike, não contamina as contas principais.
**Táticas legítimas de "dribble" do classificador (reduzir risk score, NÃO enganar):**
- **Ângulo de curiosidade, não de saúde**: vender "conhecimento sobre um tema" em vez de "solução pra um problema". Ex: "7 categorias de peptídeos estudadas em 2026 — qual te interessa?" em vez de "cansado? descubra o peptídeo certo".
- **Copy agressiva fica DENTRO do quiz** (pós-clique, menor alcance do classificador de ad). O AD em si fica genérico/educacional.
- **Coerência ad↔landing** ponta a ponta + disclaimer redundante (ad copy E página).
- **Linguagem structure-function**: nunca "clinicamente provado", "grau farmacêutico", "recomendado por médicos" (gatilhos que exigem LegitScript).
**PROIBIDO (ban permanente, perde o BM):**
- Cloaking (página diferente pro revisor) — pecado capital.
- Comprar conta/BM aquecido — morre em semanas e leva tudo junto.
- Claim disfarçado com emoji/erro proposital ("cura a d0r") — o multimodal AI de 2026 detecta.

---
## 12. ESTADO ATUAL DO PROJETO (reconciliação — atualizar conforme evolui)
> Esta seção descreve o que JÁ existe no repositório hoje, para evitar confusão com a stack "recomendada" acima.

**Stack atual (implementada):** React + TypeScript + Vite + Tailwind v4 + Framer Motion (SPA, react-router). Estado em `localStorage` (`src/lib/store.ts`). Deploy na **Vercel** (produção: https://family-cava-digital.vercel.app). Sem Supabase/Stripe/Resend ainda.

**Pagamento atual:** checkout em modo demo com seleção **Globalpay / Nox Pay** (não Stripe). Em produção, o "pago" deve vir do **webhook** do gateway liberando a entrega — ainda pendente de backend real.

**Ecossistema já construído (marcas/páginas distintas):**
- PROTOCOLO PEPTÍDEOS (low ticket) — funil de quiz + prévia bloqueada + página `/protocolo` (pós-compra) já **100% educativa** (campos: o que a ciência diz / números / status regulatório / o que perguntar ao médico; SEM posologia/aplicação). Retatrutida incluída como investigacional.
- ONIRA (sonhos), NIDRA (yoga nidra), LUMEN (luz & cor), NOITE PLENA (bundle), CÍRCULO (assinatura) — com cross-sell (`EcosystemStrip`) e checkout generalizado por `?p=<produto>`.
- Admin em `/admin` (checklist, pagamentos, vídeos, oferta, pesquisa, entrega). Manual de marca em `/marca`.

**Divergências a decidir (doc vs. realidade):**
- **Gateway:** doc sugere Stripe; projeto usa Globalpay/Nox. Manter Globalpay/Nox (preferência do dono) salvo decisão contrária.
- **Backend:** doc sugere Supabase + Edge Functions + Resend; hoje é front-only/localStorage. Migrar quando for ativar pagamento real, captura de lead persistente e e-mails por bucket.
- **Buckets:** doc propõe perfis neutros (performance/energia/longevidade/estética/iniciante). O funil atual usa dores (emagrecimento/recuperação/energia/pele/libido/sono/cognição) — para o ANÚNCIO, migrar a comunicação para os perfis neutros do doc; dentro do quiz pode manter mais liberdade (ver §1).

**Pendências prioritárias para escalar (alinhadas ao doc):**
1. Pixel + Conversions API com eventos NEUTROS (`QuizStart`, `QuizComplete`, `Lead`, `Purchase`).
2. Webhook de pagamento real → liberar entrega + e-mail.
3. Revisar toda a copy de ANÚNCIO para o enquadramento compliant da §0/§1 (curiosidade + educação, structure-function, disclaimer).
