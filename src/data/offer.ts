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

export const moneyBackDays = 7

export function brl(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
