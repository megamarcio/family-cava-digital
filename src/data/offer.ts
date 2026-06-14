// Estrutura de oferta low-ticket (Thiago Roas) + Value Ladder (Russell Brunson).
// Preços em BRL. Ajustáveis no Admin.

export interface OfferItem {
  id: string
  nome: string
  descricao: string
  preco: number
  precoDe?: number
  bullets: string[]
}

export const mainOffer: OfferItem = {
  id: 'protocolo-base',
  nome: 'Protocolo Peptídeos Personalizado',
  descricao:
    'Seu protocolo completo baseado na sua dor: qual peptídeo usar, dosagem de referência, ciclo, sinergias e passo a passo de aplicação.',
  preco: 47,
  precoDe: 197,
  bullets: [
    'Protocolo personalizado segundo o seu resultado do quiz',
    'Guia de dosagem, ciclo e sinergias (stacks)',
    'Lista de fornecedores confiáveis e como avaliar pureza (laudo HPLC)',
    'Checklist de segurança e o que NÃO fazer',
    'Acesso imediato e vitalício às atualizações',
  ],
}

// Order bump (Thiago Roas: oferta de baixa fricção no checkout)
export const orderBump: OfferItem = {
  id: 'bump-protocolos',
  nome: 'Pacote +6 Protocolos Prontos',
  descricao:
    'Adicione os 6 protocolos mais buscados (emagrecimento, recuperação, energia, pele, libido e sono) por um valor simbólico.',
  preco: 27,
  precoDe: 97,
  bullets: [
    'Os 6 protocolos completos, não só o seu',
    'Tabela de combinações seguras entre peptídeos',
    'Bônus: protocolo de "reset metabólico" de 30 dias',
  ],
}

// Upsell 1 (one-click pós-compra)
export const upsell: OfferItem = {
  id: 'upsell-mentoria',
  nome: 'Acompanhamento 90 Dias + Comunidade VIP',
  descricao:
    'Não fique sozinho na jornada. 90 dias de acompanhamento com lives semanais, ajustes de protocolo e grupo fechado de alunos.',
  preco: 197,
  precoDe: 597,
  bullets: [
    'Lives semanais de ajuste e tira-dúvidas',
    'Grupo VIP no WhatsApp/Telegram',
    'Revisão do seu protocolo a cada 30 dias',
    'Acesso a protocolos avançados (stacks combinados)',
  ],
}

// Downsell (se recusar o upsell)
export const downsell: OfferItem = {
  id: 'downsell-ebook',
  nome: 'Guia Avançado de Stacks (somente e-book)',
  descricao:
    'Sem o acompanhamento ao vivo, mas com todo o conteúdo dos stacks avançados em PDF.',
  preco: 67,
  precoDe: 197,
  bullets: ['Todos os stacks avançados em PDF', 'Atualizações por 12 meses'],
}

// ---------- Produto 2: Relatório SOMNIA (low ticket, estilo Thiago Roas) ----------
export const dreamOffer: OfferItem = {
  id: 'onira-completo',
  nome: 'Relatório ONIRA Completo',
  descricao:
    'Sua leitura clínica detalhada + Plano de 7 dias para reduzir pesadelos e recuperar o sono REM + perfil emocional contínuo.',
  preco: 19,
  precoDe: 67,
  bullets: [
    'Leitura clínica detalhada do seu sonho (hipóteses por teoria psicológica)',
    'Plano comportamental de 7 dias para dormir melhor (não medicamentoso)',
    'Técnica IRT para reescrever pesadelos recorrentes',
    'Perfil emocional contínuo e acompanhamento da intensidade',
    'Acesso imediato e vitalício',
  ],
}

// Order bump do SOMNIA = protocolo de peptídeos (venda casada estresse+sono)
export const peptideBump: OfferItem = {
  id: 'bump-protocolo-sono',
  nome: 'Protocolo de Peptídeos — Sono & Estresse',
  descricao:
    'Ataque a causa fisiológica: Semax/Selank (estresse e foco) e DSIP (sono profundo) com dosagem, ciclo e aplicação.',
  preco: 47,
  precoDe: 197,
  bullets: [
    'Peptídeos do sono e do estresse com dosagem de referência',
    'Ciclo, aplicação e sinergias passo a passo',
    'Fornecedores confiáveis no Brasil e nos EUA',
  ],
}

// ---------- Demais produtos do ecossistema ----------
export const nidraOffer: OfferItem = {
  id: 'nidra', nome: 'NIDRA — Yoga Nidra & Sonho Lúcido', preco: 27, precoDe: 97,
  descricao: '8 áudios guiados de Yoga Nidra + método de sonho lúcido para dormir profundo e acordar descansado.',
  bullets: ['8 áudios de Yoga Nidra (10–40 min)', 'Método MILD de sonho lúcido', 'Trilha para insônia e descarga mental', 'Acesso vitalício'],
}
export const lumenOffer: OfferItem = {
  id: 'lumen', nome: 'LUMEN — Luz & Cor para Sono e Humor', preco: 19, precoDe: 67,
  descricao: 'Protocolo de luz circadiana e cor para regular seu relógio interno, melhorar o humor e dormir melhor.',
  bullets: ['Protocolo de luz manhã/noite (circadiano)', 'Mapa de cores e ambiente para relaxar', 'Rotina anti-luz-azul', 'Acesso vitalício'],
}
export const bundleOffer: OfferItem = {
  id: 'bundle', nome: 'NOITE PLENA — Kit Sono Profundo', preco: 67, precoDe: 133,
  descricao: 'O ecossistema completo do sono num só lugar, com desconto: ONIRA + NIDRA + LUMEN + Peptídeos do Sono.',
  bullets: ['Decodificador de Sonhos (ONIRA)', 'Yoga Nidra & Sonho Lúcido (NIDRA)', 'Luz & Cor (LUMEN)', 'Protocolo de Peptídeos do Sono', 'Economia de mais de R$60'],
}
export const clubOffer: OfferItem = {
  id: 'club', nome: 'CÍRCULO — Clube Mente-Sono', preco: 29, precoDe: 79,
  descricao: 'Assinatura mensal: relatórios ilimitados, áudios novos toda semana, perfil contínuo, comunidade e descontos.',
  bullets: ['Relatórios ONIRA ilimitados', 'Áudios novos toda semana', 'Comunidade + lives', 'Descontos nos protocolos', 'Cancele quando quiser'],
}

// bumps cruzados (venda casada)
export const nidraBump: OfferItem = {
  id: 'bump-nidra', nome: 'Áudio extra: Yoga Nidra para Insônia (NIDRA)', preco: 17, precoDe: 47,
  descricao: 'Sessão guiada de 30 min para desligar a mente e adormecer rápido.',
  bullets: ['Áudio de 30 min', 'Técnica de respiração 4-7-8 guiada'],
}
export const lumenBump: OfferItem = {
  id: 'bump-lumen', nome: 'Trilha de Luz & Cor para dormir (LUMEN)', preco: 17, precoDe: 47,
  descricao: 'Mini-protocolo de luz e cor para preparar o quarto e o cérebro para o sono.',
  bullets: ['Rotina de 7 minutos antes de dormir', 'Guia de cores e temperatura de luz'],
}

export type CheckoutKind = 'peptides' | 'somnia' | 'nidra' | 'lumen' | 'bundle' | 'club'

interface CheckoutCfg { main: OfferItem; bump?: OfferItem; kind: CheckoutKind; deliver: string; upsell: boolean }

export function checkoutProduct(p?: string | null): CheckoutCfg {
  switch (p) {
    case 'somnia': return { main: dreamOffer, bump: peptideBump, kind: 'somnia', deliver: '/relatorio', upsell: true }
    case 'nidra': return { main: nidraOffer, bump: lumenBump, kind: 'nidra', deliver: '/entrega', upsell: false }
    case 'lumen': return { main: lumenOffer, bump: nidraBump, kind: 'lumen', deliver: '/entrega', upsell: false }
    case 'bundle': return { main: bundleOffer, bump: undefined, kind: 'bundle', deliver: '/entrega', upsell: false }
    case 'club': return { main: clubOffer, bump: undefined, kind: 'club', deliver: '/entrega', upsell: false }
    default: return { main: mainOffer, bump: orderBump, kind: 'peptides', deliver: '/protocolo', upsell: true }
  }
}

export const moneyBackDays = 7

export function brl(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
