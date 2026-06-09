// Motor de análise de sonhos — baseado em conceitos psicológicos reais.
// Hipótese da Continuidade (sonhos refletem preocupações da vigília),
// Teoria da Simulação de Ameaça (ansiedade → mais sonhos ameaçadores) e
// processamento emocional em REM (estresse/cortisol ↑ → amígdala hiperativa).
// Linguagem CLÍNICA/analítica — sem misticismo. NÃO é diagnóstico médico.

export type Axis = 'estresse' | 'sono' | 'controle' | 'social' | 'autoimagem'

export interface LexEntry {
  // termos que disparam o símbolo (regex, sem acento sensível)
  match: RegExp
  simbolo: string
  emocoes: string[]
  tema: string
  axis: Axis
  peso: number // intensidade emocional associada (0-3)
  // hipótese clínica (enquadrada em teoria)
  hipotese: string
}

export const lexicon: LexEntry[] = [
  {
    match: /persegu|fug[ai]|corr(i|e)ndo|atras de mim|me pega|monstro|assombr/i,
    simbolo: 'Perseguição',
    emocoes: ['medo', 'ansiedade'],
    tema: 'Ameaça & Evitação',
    axis: 'estresse',
    peso: 3,
    hipotese:
      'Sonhos de perseguição são o tema recorrente mais comum e, pela Teoria da Simulação de Ameaça, costumam refletir a evitação de uma situação ou emoção na vida desperta.',
  },
  {
    match: /caind|qued[ao]|despenc|abismo|do alto|precipici/i,
    simbolo: 'Queda',
    emocoes: ['insegurança', 'perda de controle'],
    tema: 'Perda de Controle',
    axis: 'controle',
    peso: 2,
    hipotese:
      'A sensação de queda associa-se a perda de controle ou medo de falhar, surgindo com frequência em períodos de transição, sobrecarga ou instabilidade financeira.',
  },
  {
    match: /dente|dentes caind|boca/i,
    simbolo: 'Dentes caindo',
    emocoes: ['ansiedade', 'vergonha'],
    tema: 'Autoimagem & Comunicação',
    axis: 'autoimagem',
    peso: 2,
    hipotese:
      'Pesquisa em Frontiers in Psychology associa o sonho com queda de dentes a níveis mais altos de ansiedade e neuroticismo, e a preocupações com aparência e comunicação.',
  },
  {
    match: /prov[ao]|exame|test[e]|atras(ado|ei)|esqueci|nao estud|reuniao|apresenta/i,
    simbolo: 'Prova / Desempenho',
    emocoes: ['ansiedade', 'medo de falhar'],
    tema: 'Desempenho & Avaliação',
    axis: 'estresse',
    peso: 2,
    hipotese:
      'Cenários de prova ou despreparo simulam avaliação social e desempenho — típicos de estresse ocupacional ou pressão por entrega (Hipótese da Continuidade).',
  },
  {
    match: /nu[ao]?\b|pelad|sem roupa|exposto|vergonh/i,
    simbolo: 'Exposição',
    emocoes: ['vergonha', 'vulnerabilidade'],
    tema: 'Exposição & Julgamento Social',
    axis: 'social',
    peso: 2,
    hipotese:
      'Estar exposto em público remete a medo de julgamento e vulnerabilidade social, frequentemente ligado a autoestima e exposição em contextos novos.',
  },
  {
    match: /agua|afog|mar|onda|inund|enchente|tsunami/i,
    simbolo: 'Água / Afogamento',
    emocoes: ['sobrecarga', 'angústia'],
    tema: 'Emoções Avassaladoras',
    axis: 'estresse',
    peso: 2,
    hipotese:
      'Água em excesso (ondas, afogamento) costuma simbolizar emoções avassaladoras — uma metáfora de sobrecarga emocional ainda não processada.',
  },
  {
    match: /tra(i|í)(d|ç)|tra(i|í)u|ex[\s-]|namorad|cas(amento|ou)|abandon|sozinh/i,
    simbolo: 'Vínculo / Traição',
    emocoes: ['insegurança', 'tristeza'],
    tema: 'Relações & Apego',
    axis: 'social',
    peso: 2,
    hipotese:
      'Conteúdos de traição ou abandono ativam o sistema de apego (Teoria da Simulação Social), refletindo inseguranças sobre vínculos importantes.',
  },
  {
    match: /mort[ei]|morrer|funeral|caix(ao|ão)|cemiteri/i,
    simbolo: 'Morte',
    emocoes: ['medo', 'luto'],
    tema: 'Transformação & Perda',
    axis: 'estresse',
    peso: 2,
    hipotese:
      'A morte no sonho raramente é literal: costuma representar fim de ciclo e transformação — o psiquismo ensaiando uma transição difícil.',
  },
  {
    match: /pres[oa]|tranca|labirint|escur|sem saida|paralis|nao consigo me mexer/i,
    simbolo: 'Aprisionamento',
    emocoes: ['angústia', 'impotência'],
    tema: 'Aprisionamento & Impotência',
    axis: 'controle',
    peso: 3,
    hipotese:
      'Sensação de estar preso ou paralisado reflete impotência diante de uma situação percebida como sem saída — alto marcador de estresse.',
  },
  {
    match: /voa|voando|levit|liberdad/i,
    simbolo: 'Voo',
    emocoes: ['euforia', 'liberdade'],
    tema: 'Autonomia & Desejo',
    axis: 'controle',
    peso: 0,
    hipotese:
      'Voar é um dos poucos temas de valência positiva: associa-se a desejo de autonomia, alívio e sensação de controle conquistado.',
  },
  {
    match: /chefe|trabalh|emprego|demit|prazo|dinheir|conta[s]?|divid/i,
    simbolo: 'Trabalho / Finanças',
    emocoes: ['pressão', 'ansiedade'],
    tema: 'Estresse Ocupacional',
    axis: 'estresse',
    peso: 2,
    hipotese:
      'Cenários de trabalho, prazos e dinheiro são incorporação direta de preocupações da vigília (Hipótese da Continuidade) e marcadores claros de estresse.',
  },
  {
    match: /pesadelo|acord(ei|o) assustad|recorrente|repete|sempre o mesmo|nao consigo dormir|insoni|cansad|sono ruim|acordo (varias|várias|muitas)/i,
    simbolo: 'Sono fragmentado',
    emocoes: ['exaustão', 'tensão'],
    tema: 'Qualidade do Sono',
    axis: 'sono',
    peso: 3,
    hipotese:
      'Pesadelos recorrentes e despertares indicam REM desregulado: quando o cortisol permanece alto, a amígdala fica hiperativa e o sono perde a função de “detox emocional”.',
  },
]

export interface DreamAnalysis {
  intensidade: number // 0-100
  emocoes: { nome: string; peso: number }[]
  simbolos: string[]
  temas: string[]
  axes: Record<Axis, number>
  hipoteses: string[]
  resumo: string
  recomenda: { estresse: boolean; sono: boolean }
}

const axisInit = (): Record<Axis, number> => ({
  estresse: 0, sono: 0, controle: 0, social: 0, autoimagem: 0,
})

export function analyzeDream(text: string): DreamAnalysis {
  const t = ` ${text.toLowerCase()} `
  const emo: Record<string, number> = {}
  const simbolos: string[] = []
  const temas: string[] = []
  const hipoteses: string[] = []
  const axes = axisInit()
  let pesoTotal = 0
  let hits = 0

  lexicon.forEach((e) => {
    if (e.match.test(t)) {
      hits++
      if (!simbolos.includes(e.simbolo)) simbolos.push(e.simbolo)
      if (!temas.includes(e.tema)) temas.push(e.tema)
      hipoteses.push(e.hipotese)
      e.emocoes.forEach((n) => (emo[n] = (emo[n] || 0) + e.peso || 1))
      axes[e.axis] += e.peso
      pesoTotal += e.peso
    }
  })

  // marcadores linguísticos de afeto negativo aumentam a intensidade
  const negMarkers = (t.match(/medo|panico|pânico|aflit|angust|chor|gritar|sangue|escuro|perigo|terror|desesper/gi) || []).length
  pesoTotal += Math.min(negMarkers, 4)

  // comprimento do relato dá leve robustez (mais detalhe emocional)
  const wordBoost = Math.min(Math.floor(text.trim().split(/\s+/).length / 40), 2)

  let intensidade = Math.round(Math.min(100, (pesoTotal + wordBoost) * 11))
  if (hits === 0) intensidade = Math.max(18, Math.min(45, text.length))

  const emocoes = Object.entries(emo)
    .map(([nome, peso]) => ({ nome, peso }))
    .sort((a, b) => b.peso - a.peso)
    .slice(0, 5)

  // eixo dominante
  const domAxis = (Object.entries(axes).sort((a, b) => b[1] - a[1])[0]?.[0] as Axis) || 'estresse'

  const recomenda = {
    estresse: axes.estresse + axes.controle + axes.social + axes.autoimagem > 0 || intensidade >= 55,
    sono: axes.sono > 0 || intensidade >= 70,
  }
  if (!recomenda.estresse && !recomenda.sono) recomenda.estresse = true

  const resumo =
    hits === 0
      ? 'Não identifiquei símbolos clássicos no relato, mas, pela Hipótese da Continuidade, o conteúdo tende a espelhar preocupações recentes da sua vigília. Descreva o sonho com mais detalhe emocional para uma leitura mais precisa.'
      : `O eixo predominante do seu relato é “${axisLabel(domAxis)}”. ${
          intensidade >= 70
            ? 'A carga emocional é alta, o que sugere material ainda não processado pelo seu sono REM.'
            : intensidade >= 45
            ? 'A carga emocional é moderada.'
            : 'A carga emocional é relativamente baixa.'
        }`

  return { intensidade, emocoes, simbolos, temas, axes, hipoteses: hipoteses.slice(0, 4), resumo, recomenda }
}

export function axisLabel(a: Axis): string {
  return {
    estresse: 'Estresse & Ansiedade',
    sono: 'Qualidade do Sono',
    controle: 'Controle & Segurança',
    social: 'Relações & Julgamento',
    autoimagem: 'Autoimagem',
  }[a]
}

export const dreamFeatures = [
  { titulo: 'Análise estruturada', desc: 'Emoções, símbolos e temas extraídos do seu relato.' },
  { titulo: 'Intensidade emocional', desc: 'Cada sonho recebe uma pontuação de 0 a 100.' },
  { titulo: 'Padrões contínuos', desc: 'O sistema acumula um perfil emocional ao longo do tempo.' },
  { titulo: 'Sem misticismo', desc: 'Linguagem clínica, analítica e hipotética — baseada em ciência.' },
]

// Seção educativa: déjà vu explicado pela ciência (sem nada esotérico).
export const dejaVu = {
  titulo: 'E o déjà vu? A ciência por trás daquele “já vivi isso”',
  intro:
    'Déjà vu (“já visto”, em francês) é uma falsa sensação de familiaridade — a impressão de que um momento novo já aconteceu. Não é premonição nem vida passada: é memória. A neurociência tem explicações concretas.',
  pontos: [
    {
      titulo: 'Descompasso familiaridade × recordação',
      texto:
        'Temos dois processos: a familiaridade (“isto me é conhecido”) e a recordação consciente (lembrar o contexto exato). No déjà vu, o sistema de familiaridade — ligado ao hipocampo e ao lobo temporal — dispara por engano, sem que o cérebro consiga recuperar a memória específica. Resultado: tudo parece familiar, mas você não sabe por quê.',
    },
    {
      titulo: 'Teoria do processamento duplo',
      texto:
        'O cérebro processa o que você vê por vias paralelas. Se uma via chega milissegundos antes da outra, a segunda leitura é interpretada como “repetição” — e o presente é rotulado, equivocadamente, como passado.',
    },
    {
      titulo: 'Por que é mais comum sob estresse e cansaço',
      texto:
        'Episódios aumentam com fadiga, estresse e privação de sono — justamente quando os sistemas de memória do lobo temporal ficam mais instáveis. É o mesmo eixo (estresse + sono) que afeta a intensidade dos seus sonhos.',
    },
  ],
}

// Plano comportamental de 7 dias (NÃO medicamentoso) — entregue no relatório pago.
export const sleepPlan: { dia: string; foco: string }[] = [
  { dia: 'Dia 1', foco: 'Higiene do sono: horário fixo para deitar/levantar e tela fora 60 min antes.' },
  { dia: 'Dia 2', foco: 'Descarga cognitiva: 10 min escrevendo as preocupações antes de dormir (reduz ruminação pré-sono).' },
  { dia: 'Dia 3', foco: 'Respiração 4-7-8 ou relaxamento muscular progressivo para baixar o cortisol noturno.' },
  { dia: 'Dia 4', foco: 'IRT (Imagery Rehearsal Therapy): reescreva o final do pesadelo recorrente e ensaie a nova versão acordado.' },
  { dia: 'Dia 5', foco: 'Exposição à luz natural pela manhã + cafeína só até o início da tarde (ritmo circadiano).' },
  { dia: 'Dia 6', foco: 'Movimento: 20–30 min de atividade física, evitando exercício intenso perto da hora de dormir.' },
  { dia: 'Dia 7', foco: 'Revisão do perfil contínuo e, se o padrão persistir, avaliar a abordagem fisiológica (sono/estresse) com um profissional.' },
]

// Disclaimers específicos — psicologia com dados, sem promessas terapêuticas.
export const dreamDisclaimers = {
  curto:
    'Ferramenta educativa de autoconhecimento baseada em psicologia. Não é diagnóstico, terapia nem prescrição.',
  completo:
    'O SOMNIA·AIX aplica teorias psicológicas validadas (Hipótese da Continuidade, Teoria da Simulação de Ameaça e processamento emocional em sono REM) para gerar HIPÓTESES sobre o conteúdo emocional dos seus sonhos. As leituras são probabilísticas e educativas — não constituem diagnóstico psicológico ou médico, não substituem acompanhamento profissional e não tratam transtornos do sono. Se você tem pesadelos frequentes, insônia persistente ou sofrimento significativo, procure um psicólogo ou médico. As indicações de peptídeos têm caráter informativo e exigem avaliação profissional.',
}
