export interface Task {
  id: string
  titulo: string
  detalhe: string
}
export interface TaskGroup {
  id: string
  fase: string
  descricao: string
  tarefas: Task[]
}

// Checklist operacional para o funil ir ao ar e VENDER.
export const taskGroups: TaskGroup[] = [
  {
    id: 'fase-1',
    fase: '1. Fundação & Oferta',
    descricao: 'Antes de rodar tráfego, a oferta precisa estar redonda.',
    tarefas: [
      { id: 't1', titulo: 'Validar preço da oferta principal (R$47)', detalhe: 'Teste âncora R$197 → R$47. Low ticket precisa de decisão por impulso.' },
      { id: 't2', titulo: 'Definir order bump e upsell', detalhe: 'Bump R$27 (pacote 6 protocolos), Upsell R$197 (acompanhamento 90 dias).' },
      { id: 't3', titulo: 'Escrever disclaimer legal', detalhe: 'Conteúdo educativo; peptídeos p/ pesquisa; orientar acompanhamento profissional.' },
      { id: 't4', titulo: 'Definir entregável real', detalhe: 'PDFs dos protocolos, área de membros ou e-mail de entrega automática.' },
    ],
  },
  {
    id: 'fase-2',
    fase: '2. Pagamento (Globalpay & Nox Pay)',
    descricao: 'Receber é o que transforma o funil em negócio.',
    tarefas: [
      { id: 'p1', titulo: 'Criar conta e ativar Globalpay', detalhe: 'Cadastro, KYC, dados bancários e geração das credenciais de API (chave pública/privada).' },
      { id: 'p2', titulo: 'Criar conta e ativar Nox Pay', detalhe: 'Mesma lógica: KYC + credenciais. Usar como gateway alternativo/PIX.' },
      { id: 'p3', titulo: 'Configurar credenciais no Admin', detalhe: 'Inserir chaves na aba Pagamentos (guardadas localmente; em produção use backend/variáveis de ambiente).' },
      { id: 'p4', titulo: 'Configurar webhook de confirmação', detalhe: 'Apontar webhook do gateway para sua API → libera entrega + dispara upsell.' },
      { id: 'p5', titulo: 'Testar 1 pagamento real (PIX + cartão)', detalhe: 'Compra de ponta a ponta: checkout → bump → upsell → entrega.' },
    ],
  },
  {
    id: 'fase-3',
    fase: '3. Conteúdo & Vídeos',
    descricao: 'A VSL e o vídeo do quiz são os maiores alavancadores de conversão.',
    tarefas: [
      { id: 'c1', titulo: 'Gravar/gerar a VSL (vídeo de vendas)', detalhe: 'Roteiro: Gancho → Dor → História → Mecanismo (peptídeos) → Oferta → Prova → CTA. ~6-9 min.' },
      { id: 'c2', titulo: 'Gravar vídeo de abertura do quiz', detalhe: '30-45s: "Responda 5 perguntas e eu te digo qual protocolo seu corpo está pedindo".' },
      { id: 'c3', titulo: 'Substituir vídeos placeholder', detalhe: 'Trocar o ID/URL dos players no Admin → aba Vídeos.' },
      { id: 'c4', titulo: 'Coletar 3-5 provas/depoimentos', detalhe: 'Prints, áudios ou vídeos. Prova social é o que derruba a objeção final.' },
    ],
  },
  {
    id: 'fase-4',
    fase: '4. Captura & Follow-up',
    descricao: 'Quem não compra na hora compra no e-mail/whats.',
    tarefas: [
      { id: 'f1', titulo: 'Conectar captura de e-mail/WhatsApp no quiz', detalhe: 'Salvar lead antes do resultado (integração com sua ferramenta de e-mail).' },
      { id: 'f2', titulo: 'Criar sequência de 5 e-mails', detalhe: 'Dia 0 entrega, D1 dor, D2 prova, D3 objeção, D4 escassez/última chamada.' },
      { id: 'f3', titulo: 'Mensagem de carrinho abandonado', detalhe: 'WhatsApp/e-mail para quem chegou no checkout e não pagou.' },
    ],
  },
  {
    id: 'fase-5',
    fase: '5. Tráfego & Escala',
    descricao: 'Com o funil convertendo, é hora de colocar gente dentro.',
    tarefas: [
      { id: 'e1', titulo: 'Instalar Pixel/Meta + GA4', detalhe: 'Eventos: PageView, QuizStart, Lead, InitiateCheckout, Purchase.' },
      { id: 'e2', titulo: 'Criar criativos focados na dor', detalhe: '3-5 ângulos: emagrecimento, recuperação, energia, libido, pele.' },
      { id: 'e3', titulo: 'Subir campanha de tráfego frio', detalhe: 'Objetivo conversão para o quiz. Começar com orçamento de teste.' },
      { id: 'e4', titulo: 'Acompanhar CPA x Ticket médio', detalhe: 'Meta: ticket médio (com bump+upsell) > CPA. Otimizar criativos vencedores.' },
    ],
  },
]
