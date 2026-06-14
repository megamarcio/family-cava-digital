// Catálogo central do ecossistema Mente–Sono–Corpo.
// Cada produto é uma marca/página distinta, conectada por venda casada.

export type ProductId = 'peptides' | 'onira' | 'nidra' | 'lumen' | 'bundle' | 'club'

export interface Product {
  id: ProductId
  marca: string
  nome: string
  tagline: string
  rota: string
  preco: number
  precoDe?: number
  recorrente?: boolean
  from: string // cor gradiente inicial
  to: string // cor gradiente final
  bg: string // fundo radial da página
  emoji: string
  eixo: string // sono / estresse / humor / foco
  entrega: string[] // o que o comprador recebe
}

export const products: Record<ProductId, Product> = {
  peptides: {
    id: 'peptides', marca: 'PROTOCOLO PEPTÍDEOS', nome: 'Protocolo de Peptídeos',
    tagline: 'O peptídeo certo para a sua dor.', rota: '/', preco: 47, precoDe: 197,
    from: '#34d399', to: '#a3e635', bg: '#04130d', emoji: '🧬', eixo: 'corpo',
    entrega: ['Protocolo personalizado por dor', 'Dosagem, ciclo e aplicação', 'Fornecedores BR/EUA'],
  },
  onira: {
    id: 'onira', marca: 'ONIRA', nome: 'Decodificador de Sonhos',
    tagline: 'Seus sonhos viram um mapa da sua mente.', rota: '/sonhos', preco: 19, precoDe: 67,
    from: '#8b5cf6', to: '#22d3ee', bg: '#070a1f', emoji: '🌙', eixo: 'mente',
    entrega: ['Leitura clínica do seu sonho', 'Plano de 7 dias para dormir melhor', 'Perfil emocional contínuo'],
  },
  nidra: {
    id: 'nidra', marca: 'NIDRA', nome: 'Yoga Nidra & Sonho Lúcido',
    tagline: 'Dormir profundo. Sonhar com consciência.', rota: '/nidra', preco: 27, precoDe: 97,
    from: '#6366f1', to: '#2dd4bf', bg: '#060d18', emoji: '🧘', eixo: 'sono',
    entrega: ['8 áudios guiados de Yoga Nidra (10–40 min)', 'Método de sonho lúcido (MILD + reality testing)', 'Trilha de relaxamento para insônia'],
  },
  lumen: {
    id: 'lumen', marca: 'LUMEN', nome: 'Luz & Cor para Sono e Humor',
    tagline: 'Regule seu relógio interno pela luz.', rota: '/lumen', preco: 19, precoDe: 67,
    from: '#f59e0b', to: '#fb7185', bg: '#160a12', emoji: '🌅', eixo: 'humor',
    entrega: ['Protocolo de luz circadiana (manhã/noite)', 'Mapa de cores e ambiente para relaxar', 'Rotina anti-luz-azul para dormir'],
  },
  bundle: {
    id: 'bundle', marca: 'NOITE PLENA', nome: 'Kit Sono Profundo',
    tagline: 'Tudo para a sua melhor noite — num só lugar.', rota: '/noite-plena', preco: 67, precoDe: 133,
    from: '#818cf8', to: '#22d3ee', bg: '#080b1c', emoji: '🌌', eixo: 'sono',
    entrega: ['Decodificador de Sonhos (ONIRA)', 'Yoga Nidra & Sonho Lúcido (NIDRA)', 'Luz & Cor (LUMEN)', 'Protocolo de Peptídeos do Sono'],
  },
  club: {
    id: 'club', marca: 'CÍRCULO', nome: 'Clube Mente-Sono',
    tagline: 'Sua evolução, toda semana.', rota: '/circulo', preco: 29, recorrente: true,
    from: '#fbbf24', to: '#f472b6', bg: '#140d05', emoji: '◐', eixo: 'continuidade',
    entrega: ['Relatórios ONIRA ilimitados', 'Áudios novos toda semana', 'Perfil contínuo + comunidade', 'Lives e descontos nos protocolos'],
  },
}

export const ecosystem: ProductId[] = ['onira', 'nidra', 'lumen', 'peptides', 'bundle', 'club']

// Sugere os "vizinhos" para venda casada, evitando o próprio produto.
export function crossSell(id: ProductId, n = 3): Product[] {
  return ecosystem.filter((p) => p !== id).map((p) => products[p]).slice(0, n)
}

export const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
