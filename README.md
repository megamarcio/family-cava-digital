# 🧬 Protocolo Peptídeos — Funil de Vendas Low Ticket

Funil de vendas **profissional e inovador** para um produto digital único: **protocolos personalizados de Peptídeos**. Construído com técnicas de oferta low ticket (estilo Thiago Roas) e de funil/value ladder (estilo Russell Brunson).

> ⚠️ **Aviso:** conteúdo educativo/informativo. Peptídeos são, em grande parte, comercializados para fins de pesquisa. Nada aqui é prescrição médica. O front-end exibe disclaimers em todas as páginas críticas — mantenha-os.

## 🚀 Rodar localmente

```bash
npm install
npm run dev      # ambiente de desenvolvimento
npm run build    # build de produção (dist/)
npm run preview  # pré-visualizar o build
```

Stack: **React + TypeScript + Vite + Tailwind v4 + Framer Motion**. Deploy pronto para **Vercel** (`vercel.json`) ou Netlify (`public/_redirects`).

## 🧭 O funil, ponta a ponta

| # | Rota | Papel |
|---|------|-------|
| 1 | `/` | Landing + **VSL interativa** (CTA revelado no tempo certo), descoberta da dor |
| 2 | `/quiz` | **Quiz funnel com vídeo** — 5 perguntas que identificam a raiz do problema + captura de lead |
| 3 | `/resultado` | Protocolo personalizado por dor + oferta principal com escassez |
| 4 | `/checkout` | Pagamento (Globalpay/Nox Pay) + **order bump** |
| 5 | `/upsell` | **Upsell 1-clique** + **downsell** |
| 6 | `/obrigado` | Entrega e próximos passos |
| 7 | `/admin` | **Dashboard**: checklist, pagamentos, vídeos, oferta e pesquisa |

## 🎯 Como o quiz descobre a dor

`src/data/quiz.ts` pontua 7 objetivos (emagrecimento, recuperação, energia, pele, libido, sono, cognição). A maior pontuação define o **protocolo** mapeado em `src/data/peptides.ts` (qual peptídeo, como funciona, benefícios e evidência).

## 💰 Estrutura de oferta (sugestão — editável em `src/data/offer.ts`)

| Etapa | Produto | Preço | Meta |
|-------|---------|-------|------|
| **Principal** | Protocolo personalizado | **R$ 47** (âncora R$ 197) | Decisão por impulso |
| **Order bump** | Pacote +6 protocolos | **R$ 27** | 30–45% take rate |
| **Upsell** | Acompanhamento 90 dias + VIP | **R$ 197** | 8–15% conversão |
| **Downsell** | E-book de stacks avançados | **R$ 67** | recuperar o "não" |

**Ticket médio projetado:** ~R$ 90–120 por comprador. O lucro vem do bump + upsell, não da venda principal.

## ⚙️ Admin (`/admin`)

- **Visão geral** — progresso e prontidão técnica
- **Tarefas** — checklist em 5 fases (fundação → pagamento → conteúdo → follow-up → tráfego), salvo no navegador
- **Pagamentos** — campos para chaves Globalpay e Nox Pay + guia de integração (backend + webhook)
- **Vídeos** — plugue a URL da VSL e do vídeo do quiz (YouTube/Vimeo/mp4)
- **Oferta & Preço** — value ladder e metas
- **Pesquisa** — insights de mercado e concorrentes mapeados

## 🔐 Pagamentos — importante

O checkout está em **modo demonstração**. Para produção:
1. Crie um backend (`/api/checkout`) que chama a API do gateway com a **chave secreta no servidor** (nunca no front-end).
2. Configure o **webhook** do Globalpay/Nox Pay para liberar a entrega ao confirmar o pagamento.
3. Dispare o e-mail de entrega e os eventos de conversão (Pixel/GA4) e siga para o upsell.

## 📁 Estrutura

```
src/
  data/      peptides, quiz, offer, tasks, research  ← edite o conteúdo aqui
  components/ VideoPlayer (VSL interativa)
  pages/     Landing, Quiz, Resultado, Checkout, Upsell, Obrigado, Admin
  lib/       store (localStorage: funil, tarefas, config)
```
