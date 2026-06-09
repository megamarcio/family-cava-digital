// Resumo da pesquisa de mercado para embasar o funil.

export interface Competitor {
  nome: string
  url: string
  observacao: string
}

export const competitors: Competitor[] = [
  {
    nome: 'Mundo dos Peptídeos',
    url: 'http://mundodospeptideo.com/',
    observacao: 'E-commerce BR de peptídeos (BPC-157, Tirzepatida, Semaglutida, GHK-Cu) com laudos HPLC. Vende produto físico — oportunidade: nós vendemos o PROTOCOLO/conhecimento.',
  },
  {
    nome: 'Gen Pharma Peptides',
    url: 'https://www.genpharmapeptides.com/',
    observacao: 'Distribuidor oficial no Brasil há 5 anos. Forte em produto, fraco em educação/funil — brecha clara para um funil de quiz.',
  },
  {
    nome: 'Peptídeos do Brasil',
    url: 'https://peptideosdobrasil.com.br/',
    observacao: 'Foco em pureza 99,9% e desconto via PIX. Modelo transacional, sem jornada de descoberta da dor.',
  },
  {
    nome: 'PeptideDeck (EUA)',
    url: 'https://www.peptidedeck.com/peptides/peptides-for-weight-loss',
    observacao: 'Conteúdo educativo/ranking baseado em evidência. Referência de autoridade e SEO.',
  },
  {
    nome: 'Innerbody (EUA)',
    url: 'https://www.innerbody.com/best-peptides-for-weight-loss',
    observacao: 'Reviews "best peptides" — modelo de autoridade + afiliação. Inspiração de credibilidade.',
  },
]

export interface Insight {
  titulo: string
  texto: string
}

export const insights: Insight[] = [
  {
    titulo: 'A brecha do mercado',
    texto: 'Quase todos os concorrentes vendem o FRASCO. Ninguém vende a clareza de "qual peptídeo é pra MIM e como usar". O quiz que descobre a dor e entrega um protocolo é o nosso oceano azul.',
  },
  {
    titulo: 'Quiz funnel converte muito',
    texto: 'Funis de quiz reportam aumentos de conversão de centenas de % vs. formulário simples; 79% dos marketers dizem gerar leads de maior qualidade com quizzes — porque cada resposta revela dor e intenção.',
  },
  {
    titulo: 'Low ticket = decisão por impulso',
    texto: 'Ticket de R$47 com âncora de R$197 remove a fricção da decisão. O lucro vem do order bump + upsell (value ladder), não da venda principal.',
  },
  {
    titulo: 'Dores que mais vendem',
    texto: 'Emagrecimento (GLP-1) é o maior volume de busca; recuperação/lesão (BPC-157/TB-500), energia (NAD+), libido (PT-141) e pele (GHK-Cu) são ângulos quentes e segmentáveis.',
  },
  {
    titulo: 'Confiança é a moeda',
    texto: 'O nicho sofre com desconfiança (pureza, segurança). Prova social, laudos (HPLC), disclaimer honesto e passo a passo claro são diferenciais de conversão.',
  },
]

export const priceSuggestion = {
  principal: 'R$ 47 (âncora R$ 197) — sweet spot de impulso para low ticket.',
  bump: 'R$ 27 — pacote dos 6 protocolos. Meta: 30-45% de take rate.',
  upsell: 'R$ 197 — acompanhamento 90 dias. Meta: 8-15% de conversão.',
  downsell: 'R$ 67 — e-book de stacks para quem recusa o upsell.',
  ticketMedio: 'Ticket médio projetado com bump+upsell: ~R$ 90-120 por comprador.',
}
