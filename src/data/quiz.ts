import type { Goal } from './peptides'

export interface QuizOption {
  label: string
  emoji?: string
  // pontos atribuídos a cada objetivo
  scores: Partial<Record<Goal, number>>
}

export interface QuizQuestion {
  id: string
  // micro-compromisso / pergunta de conexão antes da recomendação
  title: string
  subtitle?: string
  options: QuizOption[]
}

// Estrutura de quiz funnel (Russell Brunson): começa com a DOR principal,
// aprofunda no contexto, gera micro-comprometimentos e termina segmentando.
export const quizQuestions: QuizQuestion[] = [
  {
    id: 'dor',
    title: 'Qual dessas situações mais te incomoda HOJE?',
    subtitle: 'Seja honesto — é o primeiro passo para resolver de verdade.',
    options: [
      { label: 'Gordura teimosa e fome que não controlo', emoji: '🔥', scores: { emagrecimento: 3 } },
      { label: 'Dor, lesão ou recuperação lenta', emoji: '🦾', scores: { recuperacao: 3 } },
      { label: 'Cansaço e falta de energia o dia todo', emoji: '⚡', scores: { energia: 3 } },
      { label: 'Pele/cabelo envelhecendo mais rápido', emoji: '✨', scores: { pele: 3 } },
      { label: 'Libido baixa e perda de vitalidade', emoji: '❤️‍🔥', scores: { libido: 3 } },
      { label: 'Sono ruim e estresse acumulado', emoji: '🌙', scores: { sono: 3 } },
      { label: 'Falta de foco e névoa mental', emoji: '🧠', scores: { cognitivo: 3 } },
    ],
  },
  {
    id: 'tempo',
    title: 'Há quanto tempo você convive com isso?',
    subtitle: 'Quanto mais tempo, mais importante agir agora.',
    options: [
      { label: 'Algumas semanas', scores: {} },
      { label: 'Alguns meses', scores: {} },
      { label: 'Mais de 1 ano', scores: {} },
      { label: 'Sinceramente, já perdi a conta', scores: {} },
    ],
  },
  {
    id: 'tentou',
    title: 'O que você JÁ tentou para resolver?',
    options: [
      { label: 'Dieta e treino por conta própria', scores: {} },
      { label: 'Suplementos comuns de farmácia', scores: {} },
      { label: 'Já gastei com várias coisas que não funcionaram', scores: {} },
      { label: 'Nunca tentei nada estruturado', scores: {} },
    ],
  },
  {
    id: 'secundario',
    title: 'Além do principal, o que MAIS você gostaria de melhorar?',
    subtitle: 'Vamos montar um protocolo completo para você.',
    options: [
      { label: 'Mais energia e disposição', emoji: '⚡', scores: { energia: 1 } },
      { label: 'Recuperação e menos dores', emoji: '🦾', scores: { recuperacao: 1 } },
      { label: 'Sono mais profundo', emoji: '🌙', scores: { sono: 1 } },
      { label: 'Pele e aparência', emoji: '✨', scores: { pele: 1 } },
      { label: 'Foco e clareza mental', emoji: '🧠', scores: { cognitivo: 1 } },
    ],
  },
  {
    id: 'comprometimento',
    title: 'Se eu te entregar o protocolo certo, você se compromete a seguir?',
    subtitle: 'A ciência funciona — mas só para quem age.',
    options: [
      { label: 'Sim! Estou pronto para mudar agora', emoji: '🚀', scores: {} },
      { label: 'Sim, com o passo a passo na mão', emoji: '✅', scores: {} },
      { label: 'Quero entender melhor primeiro', emoji: '🤔', scores: {} },
    ],
  },
]

export function computeGoal(answers: Record<string, QuizOption>): Goal {
  const totals: Record<string, number> = {}
  Object.values(answers).forEach((opt) => {
    Object.entries(opt.scores).forEach(([goal, pts]) => {
      totals[goal] = (totals[goal] || 0) + (pts || 0)
    })
  })
  const best = Object.entries(totals).sort((a, b) => b[1] - a[1])[0]
  return (best?.[0] as Goal) || 'energia'
}
