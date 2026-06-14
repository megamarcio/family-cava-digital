// Base de conhecimento de peptídeos e protocolos.
// IMPORTANTE: conteúdo educativo. Peptídeos são, em grande parte, vendidos para
// fins de pesquisa. Nada aqui é prescrição médica — sempre incluir disclaimer e
// orientar acompanhamento profissional.

export type Goal =
  | 'emagrecimento'
  | 'recuperacao'
  | 'energia'
  | 'pele'
  | 'libido'
  | 'sono'
  | 'cognitivo'

export interface Peptide {
  id: string
  nome: string
  tagline: string
  categoria: string
  comoFunciona: string
  beneficios: string[]
  evidencia: string
  goals: Goal[]
}

// Conteúdo PREMIUM 100% EDUCATIVO — liberado após o pagamento.
// SEM posologia e SEM instrução de aplicação. Objetivo: entender a ciência,
// o status regulatório e o que conversar com um profissional de saúde.
export interface ProtocolDetail {
  oQueCiencia: string // o que a ciência diz (mecanismo e nível de evidência)
  numeros: string // números/achados relevantes de estudos
  statusRegulatorio: string // aprovação/uso investigacional/pesquisa
  oQuePerguntar: string // o que perguntar ao seu médico/profissional
}

export const protocolDetails: Record<string, ProtocolDetail> = {
  retatrutida: {
    oQueCiencia: 'Agonista TRIPLO dos receptores de GIP, GLP-1 e glucagon. A combinação atua no apetite, no esvaziamento gástrico e também no gasto energético (via glucagon) — por isso é estudada como a próxima geração de medicamentos para obesidade.',
    numeros: 'Em ensaio de Fase 2, perda de peso média de ~24% em 48 semanas na maior dose. O programa de Fase 3 (TRIUMPH) reporta resultados na faixa de ~28%, entre os maiores já observados na classe.',
    statusRegulatorio: 'INVESTIGACIONAL — ainda NÃO aprovada por agências regulatórias. Em estudos clínicos de Fase 3; segurança e eficácia de longo prazo ainda sendo estabelecidas.',
    oQuePerguntar: 'Pergunte ao seu médico sobre o estágio dos estudos, riscos conhecidos, alternativas já aprovadas e se faz sentido aguardar a aprovação regulatória.',
  },
  'bpc-157': {
    oQueCiencia: 'Peptídeo de 15 aminoácidos derivado de proteína gástrica. Em modelos pré-clínicos, associa-se a angiogênese (novos vasos) e migração celular, com sinais de reparo de tendões, ligamentos e mucosa intestinal.',
    numeros: 'A maior parte das evidências vem de estudos em animais; ensaios clínicos robustos em humanos ainda são escassos.',
    statusRegulatorio: 'Não aprovado como medicamento; comercializado em grande parte para fins de pesquisa. Status varia por país.',
    oQuePerguntar: 'Pergunte sobre a ausência de dados humanos de longo prazo, qualidade/pureza de fontes e se há terapias aprovadas para o seu caso.',
  },
  'tb-500': {
    oQueCiencia: 'Relacionado à timosina β4; estudado por favorecer angiogênese e migração celular e por modular fibrose e inflamação, com efeito sistêmico de reparo em modelos pré-clínicos.',
    numeros: 'Evidência majoritariamente pré-clínica; faltam ensaios controlados em humanos.',
    statusRegulatorio: 'Não aprovado para uso clínico; uso de pesquisa. Proibido no esporte (lista WADA).',
    oQuePerguntar: 'Pergunte sobre riscos desconhecidos em humanos, implicações antidoping e opções com respaldo clínico.',
  },
  'ghk-cu': {
    oQueCiencia: 'Peptídeo de cobre presente naturalmente no corpo, com longo histórico de pesquisa em remodelamento da pele, sinalização de colágeno e reparo tecidual.',
    numeros: 'Um dos peptídeos com mais estudos em pele, sobretudo em formulações tópicas (cosméticas).',
    statusRegulatorio: 'Amplamente usado em cosméticos tópicos; usos injetáveis não são aprovados como medicamento.',
    oQuePerguntar: 'Pergunte ao dermatologista sobre formulações tópicas com evidência e expectativas realistas de resultado.',
  },
  'cjc-ipa': {
    oQueCiencia: 'CJC-1295 e Ipamorelina são secretagogos que estimulam a liberação pulsátil de GH e IGF-1 pela hipófise, imitando o ritmo fisiológico.',
    numeros: 'Estudos em humanos com CJC-1295 mostraram aumentos de GH de 2–10x e de IGF-1 por vários dias; dados de desfechos clínicos de longo prazo são limitados.',
    statusRegulatorio: 'Não aprovados para uso estético/performance; uso de pesquisa. Restritos no esporte.',
    oQuePerguntar: 'Pergunte sobre riscos do eixo de GH (incluindo proliferação celular), monitorização e alternativas aprovadas.',
  },
  glp1: {
    oQueCiencia: 'Agonistas de GLP-1 (e também de GIP, no caso da tirzepatida) que regulam apetite, esvaziamento gástrico e controle glicêmico — a classe mais validada para perda de peso.',
    numeros: 'Ensaios de Fase 3 mostram perdas de peso significativas (frequentemente ~15% com semaglutida e ~20% com tirzepatida, conforme estudo e dose).',
    statusRegulatorio: 'APROVADOS por agências regulatórias para diabetes e/ou obesidade. Uso exige PRESCRIÇÃO e acompanhamento médico.',
    oQuePerguntar: 'Pergunte se você é candidato, sobre efeitos gastrointestinais, contraindicações e acompanhamento adequado.',
  },
  'aod-9604': {
    oQueCiencia: 'Fragmento da molécula de GH estudado por estimular lipólise sem os efeitos sobre glicemia do GH completo.',
    numeros: 'Resultados em humanos foram mistos e, em estudos, sem superioridade consistente sobre placebo para perda de peso.',
    statusRegulatorio: 'Não aprovado como medicamento de emagrecimento; uso de pesquisa.',
    oQuePerguntar: 'Pergunte sobre a fragilidade da evidência e por que opções aprovadas costumam ser preferíveis.',
  },
  'pt-141': {
    oQueCiencia: 'Bremelanotida age no sistema nervoso central via receptores de melanocortina, atuando sobre o desejo sexual — mecanismo central, diferente de fármacos vasculares.',
    numeros: 'Ensaios clínicos embasaram aprovação para desejo sexual hipoativo feminino em alguns países.',
    statusRegulatorio: 'A bremelanotida é APROVADA em alguns países (ex.: EUA) para uma indicação específica; outros usos não são aprovados.',
    oQuePerguntar: 'Pergunte sobre indicação aprovada, efeitos colaterais (náusea, pressão) e adequação ao seu caso.',
  },
  dsip: {
    oQueCiencia: 'Peptídeo indutor de sono delta, estudado por modular o ciclo do sono e a resposta ao estresse.',
    numeros: 'Evidência inicial e heterogênea; faltam ensaios amplos e bem controlados em humanos.',
    statusRegulatorio: 'Não aprovado como medicamento; uso de pesquisa.',
    oQuePerguntar: 'Pergunte sobre causas tratáveis da insônia e abordagens com evidência (ex.: TCC-I) antes de qualquer composto.',
  },
  semax: {
    oQueCiencia: 'Semax e Selank são peptídeos nootrópicos: Semax associado a foco e neuroproteção; Selank a redução de ansiedade e estabilidade de humor.',
    numeros: 'Uso clínico documentado principalmente na Rússia; pesquisa ocidental ainda limitada.',
    statusRegulatorio: 'Aprovados em alguns países (ex.: Rússia); não aprovados na maior parte do mundo — uso de pesquisa.',
    oQuePerguntar: 'Pergunte sobre a base de evidência fora da Rússia e alternativas validadas para foco/ansiedade.',
  },
  nad: {
    oQueCiencia: 'NAD+ é coenzima central no metabolismo energético mitocondrial e em processos de reparo do DNA, que declina com a idade.',
    numeros: 'Interesse crescente em longevidade; desfechos clínicos em humanos ainda em investigação.',
    statusRegulatorio: 'Vendido como suplemento/uso de pesquisa; não é medicamento aprovado para tratar doenças.',
    oQuePerguntar: 'Pergunte sobre evidência real para o seu objetivo e expectativas realistas.',
  },
}

export const peptides: Peptide[] = [
  {
    id: 'bpc-157',
    nome: 'BPC-157',
    tagline: 'O reparador de tecidos',
    categoria: 'Regeneração & Recuperação',
    comoFunciona:
      'Peptídeo de 15 aminoácidos derivado de uma proteína gástrica. Em estudos pré-clínicos acelera a cicatrização de tendões, ligamentos e mucosa intestinal ao estimular angiogênese (novos vasos) e migração celular.',
    beneficios: [
      'Recuperação acelerada de lesões e tendinites',
      'Saúde intestinal e redução de inflamação',
      'Suporte à recuperação muscular pós-treino',
    ],
    evidencia:
      'Forte evidência pré-clínica (modelos animais). Ensaios em humanos ainda são limitados.',
    goals: ['recuperacao'],
  },
  {
    id: 'tb-500',
    nome: 'TB-500 (Timosina β4)',
    tagline: 'O acelerador de regeneração sistêmica',
    categoria: 'Regeneração & Recuperação',
    comoFunciona:
      'Promove angiogênese e proliferação celular enquanto reduz fibrose (cicatriz). Trabalha de forma sistêmica, favorecendo o reparo de músculo e ligamento.',
    beneficios: [
      'Reparo sistêmico de músculos e ligamentos',
      'Redução de fibrose e inflamação',
      'Sinergia clássica com BPC-157 (stack "Wolverine")',
    ],
    evidencia: 'Evidência pré-clínica robusta; popular em medicina esportiva.',
    goals: ['recuperacao'],
  },
  {
    id: 'ghk-cu',
    nome: 'GHK-Cu (peptídeo de cobre)',
    tagline: 'A juventude da pele',
    categoria: 'Pele, Cabelo & Longevidade',
    comoFunciona:
      'Peptídeo de cobre naturalmente presente no corpo, com longo histórico de pesquisa em remodelamento de pele e reparo de feridas. Estimula produção de colágeno.',
    beneficios: [
      'Estímulo de colágeno e firmeza da pele',
      'Cicatrização e remodelamento cutâneo',
      'Suporte a cabelo e couro cabeludo',
    ],
    evidencia: 'Um dos peptídeos com mais histórico de pesquisa em pele.',
    goals: ['pele'],
  },
  {
    id: 'cjc-ipa',
    nome: 'CJC-1295 + Ipamorelina',
    tagline: 'O eixo do hormônio de crescimento',
    categoria: 'Performance & Composição Corporal',
    comoFunciona:
      'Estimulam a hipófise a liberar mais GH e IGF-1 de forma pulsátil, imitando o ritmo natural do corpo. Em humanos, CJC-1295 elevou GH de 2 a 10x por mais de uma semana.',
    beneficios: [
      'Suporte à síntese proteica e ganho de massa magra',
      'Melhor recuperação e qualidade de sono',
      'Auxílio na redução de gordura corporal',
    ],
    evidencia:
      'Ensaios em humanos para CJC-1295. Peptídeos de GH exigem cautela e acompanhamento.',
    goals: ['recuperacao', 'energia', 'sono'],
  },
  {
    id: 'retatrutida',
    nome: 'Retatrutida',
    tagline: 'O agonista triplo',
    categoria: 'Emagrecimento & Metabolismo',
    comoFunciona:
      'Agonista TRIPLO dos receptores de GIP, GLP-1 e glucagon. Além de reduzir o apetite, ativa também o gasto energético via glucagon — por isso é estudada como a próxima geração para obesidade.',
    beneficios: [
      'Atua em três vias metabólicas ao mesmo tempo',
      'Maiores perdas de peso já observadas na classe (em estudos)',
      'Investigada também para esteatose hepática',
    ],
    evidencia:
      'Fase 2 com ~24% de perda de peso em 48 semanas; programa de Fase 3 (TRIUMPH) reportando ~28%. Ainda INVESTIGACIONAL e NÃO aprovada.',
    goals: ['emagrecimento'],
  },
  {
    id: 'glp1',
    nome: 'Semaglutida / Tirzepatida (GLP-1)',
    tagline: 'O regulador de apetite',
    categoria: 'Emagrecimento & Metabolismo',
    comoFunciona:
      'Agonistas de GLP-1 (e GIP, no caso da tirzepatida) que regulam o apetite, retardam a digestão e melhoram o controle glicêmico — os peptídeos mais validados para perda de peso.',
    beneficios: [
      'Redução significativa do apetite e da fome emocional',
      'Perda de peso clinicamente comprovada',
      'Melhora de marcadores metabólicos',
    ],
    evidencia:
      'Forte evidência clínica em humanos. Tirzepatida tende a maior potência; semaglutida tem perfil de segurança mais consolidado. Uso requer prescrição e acompanhamento.',
    goals: ['emagrecimento'],
  },
  {
    id: 'aod-9604',
    nome: 'AOD-9604',
    tagline: 'O mobilizador de gordura',
    categoria: 'Emagrecimento & Metabolismo',
    comoFunciona:
      'Fragmento da molécula de GH estudado por estimular a lipólise (queima de gordura) sem os efeitos sobre glicemia associados ao GH completo.',
    beneficios: [
      'Estímulo à queima de gordura localizada',
      'Não afeta significativamente a glicose',
      'Combina bem com protocolos de composição corporal',
    ],
    evidencia: 'Evidência mista; popular em protocolos estéticos.',
    goals: ['emagrecimento'],
  },
  {
    id: 'pt-141',
    nome: 'PT-141 (Bremelanotida)',
    tagline: 'O ativador da libido',
    categoria: 'Libido & Bem-estar',
    comoFunciona:
      'Age no sistema nervoso central via receptores de melanocortina, atuando sobre o desejo sexual — diferente de fármacos vasculares.',
    beneficios: [
      'Aumento do desejo e da resposta sexual',
      'Funciona para homens e mulheres',
      'Mecanismo central, não apenas vascular',
    ],
    evidencia: 'Aprovado em alguns países para desejo sexual hipoativo feminino.',
    goals: ['libido'],
  },
  {
    id: 'dsip',
    nome: 'DSIP',
    tagline: 'O indutor de sono profundo',
    categoria: 'Sono & Recuperação',
    comoFunciona:
      'Peptídeo indutor de sono delta, estudado por modular o ciclo do sono e a resposta ao estresse.',
    beneficios: [
      'Melhora da qualidade e profundidade do sono',
      'Modulação do estresse',
      'Recuperação noturna otimizada',
    ],
    evidencia: 'Evidência inicial; usado em protocolos de sono e recuperação.',
    goals: ['sono'],
  },
  {
    id: 'semax',
    nome: 'Semax / Selank',
    tagline: 'O foco e o equilíbrio',
    categoria: 'Cognição & Humor',
    comoFunciona:
      'Peptídeos nootrópicos russos: Semax associado a foco e neuroproteção; Selank a redução de ansiedade e estabilidade de humor.',
    beneficios: [
      'Mais clareza mental e foco',
      'Redução de ansiedade (Selank)',
      'Suporte cognitivo e de humor',
    ],
    evidencia: 'Uso clínico na Rússia; pesquisa ocidental crescente.',
    goals: ['cognitivo', 'energia'],
  },
  {
    id: 'nad',
    nome: 'NAD+',
    tagline: 'A bateria celular',
    categoria: 'Energia & Longevidade',
    comoFunciona:
      'Coenzima central na produção de energia mitocondrial e em processos de reparo do DNA, que declina com a idade.',
    beneficios: [
      'Mais energia e disposição ao longo do dia',
      'Suporte ao metabolismo celular',
      'Foco em longevidade e clareza',
    ],
    evidencia: 'Interesse crescente em longevidade; pesquisa em andamento.',
    goals: ['energia', 'cognitivo'],
  },
]

export const goalMeta: Record<
  Goal,
  { label: string; dor: string; protocolo: string[]; cor: string; emoji: string }
> = {
  emagrecimento: {
    label: 'Emagrecimento & Metabolismo',
    dor: 'A balança não se mexe, a fome aperta à noite e a gordura teimosa não vai embora — mesmo com dieta.',
    protocolo: ['retatrutida', 'glp1', 'aod-9604'],
    cor: '#34d399',
    emoji: '🔥',
  },
  recuperacao: {
    label: 'Recuperação & Lesões',
    dor: 'Aquela dor crônica, tendinite ou lesão que não cicatriza e te tira do jogo.',
    protocolo: ['bpc-157', 'tb-500'],
    cor: '#22d3ee',
    emoji: '🦾',
  },
  energia: {
    label: 'Energia & Disposição',
    dor: 'Cansaço o dia todo, névoa mental e a sensação de que sua bateria nunca carrega 100%.',
    protocolo: ['nad', 'cjc-ipa'],
    cor: '#a3e635',
    emoji: '⚡',
  },
  pele: {
    label: 'Pele, Cabelo & Estética',
    dor: 'A pele perdeu firmeza, surgiram linhas e o espelho não reflete como você se sente.',
    protocolo: ['ghk-cu'],
    cor: '#f472b6',
    emoji: '✨',
  },
  libido: {
    label: 'Libido & Vitalidade',
    dor: 'O desejo sumiu e isso já afeta sua confiança e seus relacionamentos.',
    protocolo: ['pt-141'],
    cor: '#fb7185',
    emoji: '❤️‍🔥',
  },
  sono: {
    label: 'Sono & Estresse',
    dor: 'Você dorme mas acorda quebrado — o sono não restaura e o estresse acumula.',
    protocolo: ['dsip', 'cjc-ipa'],
    cor: '#818cf8',
    emoji: '🌙',
  },
  cognitivo: {
    label: 'Foco & Cognição',
    dor: 'Falta foco, a memória falha e manter a concentração virou uma luta diária.',
    protocolo: ['semax', 'nad'],
    cor: '#60a5fa',
    emoji: '🧠',
  },
}

export function getPeptide(id: string): Peptide | undefined {
  return peptides.find((p) => p.id === id)
}

export function getProtocolDetail(id: string): ProtocolDetail | undefined {
  return protocolDetails[id]
}

// Une os peptídeos das dores selecionadas (primária + secundária), sem repetir.
export function protocolForGoals(goals: Goal[]): Peptide[] {
  const ids = new Set<string>()
  goals.forEach((g) => goalMeta[g]?.protocolo.forEach((id) => ids.add(id)))
  return [...ids].map(getPeptide).filter(Boolean) as Peptide[]
}
