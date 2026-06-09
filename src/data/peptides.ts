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

// Detalhes do protocolo — conteúdo PREMIUM, liberado apenas após o pagamento.
// Valores de referência citados na literatura/comunidade; NÃO são prescrição.
export interface ProtocolDetail {
  dosagem: string
  ciclo: string
  aplicacao: string
  sinergia?: string
}

export const protocolDetails: Record<string, ProtocolDetail> = {
  'bpc-157': {
    dosagem: 'Faixa de referência: 250–500 mcg por dia (subcutâneo), próximo à região da lesão quando possível.',
    ciclo: '4 a 6 semanas de uso contínuo, seguidas de pausa. Reavaliar conforme evolução.',
    aplicacao: 'Reconstituir o liofilizado com água bacteriostática, aplicar subcutâneo com seringa de insulina. Rotacionar o local.',
    sinergia: 'Combina com TB-500 (stack "Wolverine") para recuperação acelerada.',
  },
  'tb-500': {
    dosagem: 'Fase de carga: 2–2,5 mg, 2x/semana por 4–6 semanas. Manutenção: 2–2,5 mg a cada 1–2 semanas.',
    ciclo: 'Carga de 4–6 semanas e depois manutenção. Pausar e reavaliar.',
    aplicacao: 'Subcutâneo ou intramuscular após reconstituição com água bacteriostática.',
    sinergia: 'Clássico com BPC-157 para reparo sistêmico.',
  },
  'ghk-cu': {
    dosagem: 'Tópico (séruns 1–3%) para pele; injetável 1–2 mg/dia em protocolos avançados.',
    ciclo: 'Tópico: uso contínuo. Injetável: ciclos de 4–8 semanas.',
    aplicacao: 'Tópico no rosto/couro cabeludo limpo; injetável subcutâneo após reconstituição.',
  },
  'cjc-ipa': {
    dosagem: 'CJC-1295 (no DAC) 100 mcg + Ipamorelina 100–200 mcg, 1–2x/dia.',
    ciclo: '8–12 semanas, idealmente em jejum e antes de dormir (pico noturno de GH).',
    aplicacao: 'Subcutâneo, longe das refeições (evitar carboidrato/gordura ~30 min antes/depois).',
    sinergia: 'A dupla potencializa a liberação pulsátil de GH.',
  },
  'glp1': {
    dosagem: 'Titulação gradual (ex.: semaglutida iniciando em 0,25 mg/semana e subindo conforme tolerância). USO COM PRESCRIÇÃO.',
    ciclo: 'Uso semanal contínuo com acompanhamento médico e ajuste de dose.',
    aplicacao: 'Subcutâneo, 1x por semana, no mesmo dia. Acompanhar efeitos gastrointestinais.',
    sinergia: 'Combina com reeducação alimentar e treino de força.',
  },
  'aod-9604': {
    dosagem: 'Faixa de referência: 300 mcg/dia, em jejum.',
    ciclo: '12 semanas com reavaliação.',
    aplicacao: 'Subcutâneo pela manhã, em jejum, para favorecer a lipólise.',
  },
  'pt-141': {
    dosagem: 'Faixa de referência: 0,5–2 mg, conforme resposta, antes da atividade.',
    ciclo: 'Uso pontual (sob demanda), respeitando intervalo entre doses.',
    aplicacao: 'Subcutâneo cerca de 45 min antes. Começar pela menor dose para avaliar tolerância.',
  },
  'dsip': {
    dosagem: 'Faixa de referência: 100–300 mcg antes de dormir.',
    ciclo: 'Ciclos curtos para evitar tolerância; usar conforme necessidade.',
    aplicacao: 'Subcutâneo à noite, 30–60 min antes de deitar.',
  },
  'semax': {
    dosagem: 'Intranasal: 1–2 doses ao dia (Semax) / Selank conforme produto.',
    ciclo: '2–4 semanas com pausas.',
    aplicacao: 'Spray ou gotas intranasais; aplicar em narina limpa.',
  },
  'nad': {
    dosagem: 'Subcutâneo 50–100 mg/dia ou conforme protocolo (IV exige ambiente clínico).',
    ciclo: 'Ciclos de 2–4 semanas; manutenção conforme objetivo.',
    aplicacao: 'Subcutâneo lento (pode causar desconforto se rápido). Hidratar bem.',
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
    protocolo: ['glp1', 'aod-9604'],
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
