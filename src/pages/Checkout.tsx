import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { checkoutProduct, brl, moneyBackDays } from '../data/offer'
import { loadFunnel, saveFunnel, loadConfig } from '../lib/store'

export default function Checkout() {
  const nav = useNavigate()
  const loc = useLocation()
  const state = loadFunnel()
  const cfg = loadConfig()
  const { main: mainOffer, bump: orderBump, kind, deliver, upsell } = checkoutProduct(
    new URLSearchParams(loc.search).get('p'),
  )
  const [bump, setBump] = useState(false)
  const [method, setMethod] = useState<'pix' | 'card'>('pix')
  const [gateway, setGateway] = useState<'globalpay' | 'noxpay'>('globalpay')
  const [processing, setProcessing] = useState(false)

  const total = mainOffer.preco + (bump && orderBump ? orderBump.preco : 0)

  function pay(e: React.FormEvent) {
    e.preventDefault()
    setProcessing(true)
    // Em produção, o "paid" deve ser definido pelo WEBHOOK do gateway, não aqui.
    const unlocked = { ...(state.unlocked || {}), [kind]: true }
    // bundle libera todos os produtos do kit
    if (kind === 'bundle') { unlocked.onira = true; unlocked.nidra = true; unlocked.lumen = true; unlocked.peptides = true }
    const patch: Record<string, unknown> = { bump, product: kind, unlocked }
    if (kind === 'peptides' || (kind === 'somnia' && bump) || kind === 'bundle') patch.paid = true
    if (kind === 'somnia') patch.paidSomnia = true
    // bump cruzado também desbloqueia o produto vizinho
    if (bump && orderBump) unlocked[orderBump.id.replace('bump-', '')] = true
    saveFunnel(patch)
    // Em produção: chamar API do gateway (Globalpay/Nox Pay) -> retorno -> webhook libera entrega.
    setTimeout(() => nav(upsell ? '/upsell' : deliver), 1400)
  }

  const gatewayReady =
    (gateway === 'globalpay' && cfg.globalpayKey) || (gateway === 'noxpay' && cfg.noxpayKey)

  return (
    <main className="mesh min-h-screen px-5 py-8">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Formulário */}
        <form onSubmit={pay} className="rounded-3xl glass p-6 md:p-8">
          <button type="button" onClick={() => nav(-1)} className="text-sm text-white/50 hover:text-white">← Voltar</button>
          <h1 className="mt-3 text-2xl font-black">Finalizar compra</h1>

          {/* Gateway */}
          <div className="mt-6 text-xs font-bold uppercase tracking-widest text-white/40">Processador de pagamento</div>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {(['globalpay', 'noxpay'] as const).map((g) => (
              <button key={g} type="button" onClick={() => setGateway(g)}
                className={`rounded-xl border p-3 text-sm font-semibold capitalize transition ${
                  gateway === g ? 'border-lime-glow bg-lime-glow/10' : 'border-white/10 glass'
                }`}>
                {g === 'globalpay' ? 'Globalpay' : 'Nox Pay'}
              </button>
            ))}
          </div>
          {!gatewayReady && (
            <p className="mt-2 text-[11px] text-amber-300/80">
              ⚠️ Credenciais do {gateway === 'globalpay' ? 'Globalpay' : 'Nox Pay'} não configuradas — modo demonstração. Configure no Admin → Pagamentos.
            </p>
          )}

          {/* Método */}
          <div className="mt-5 text-xs font-bold uppercase tracking-widest text-white/40">Forma de pagamento</div>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <button type="button" onClick={() => setMethod('pix')}
              className={`rounded-xl border p-3 text-sm font-semibold transition ${method === 'pix' ? 'border-lime-glow bg-lime-glow/10' : 'border-white/10 glass'}`}>
              PIX (aprovação na hora)
            </button>
            <button type="button" onClick={() => setMethod('card')}
              className={`rounded-xl border p-3 text-sm font-semibold transition ${method === 'card' ? 'border-lime-glow bg-lime-glow/10' : 'border-white/10 glass'}`}>
              Cartão de crédito
            </button>
          </div>

          {/* Dados */}
          <div className="mt-5 grid gap-3">
            <input required defaultValue={state.nome} placeholder="Nome completo"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-lime-glow" />
            <input required type="email" defaultValue={state.email} placeholder="E-mail"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-lime-glow" />
            {method === 'card' && (
              <>
                <input required placeholder="Número do cartão" inputMode="numeric"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-lime-glow" />
                <div className="grid grid-cols-2 gap-3">
                  <input required placeholder="Validade (MM/AA)"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-lime-glow" />
                  <input required placeholder="CVV" inputMode="numeric"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-lime-glow" />
                </div>
              </>
            )}
          </div>

          {/* ORDER BUMP (opcional) */}
          {orderBump && (
            <motion.label
              whileHover={{ scale: 1.01 }}
              className={`mt-5 flex cursor-pointer gap-3 rounded-2xl border-2 border-dashed p-4 transition ${
                bump ? 'border-lime-glow bg-lime-glow/10' : 'border-amber-300/40 bg-amber-300/5'
              }`}>
              <input type="checkbox" checked={bump} onChange={(e) => setBump(e.target.checked)} className="mt-1 h-5 w-5 accent-lime-glow" />
              <div>
                <div className="font-bold text-amber-200">⭐ SIM! Adicionar: {orderBump.nome}</div>
                <p className="mt-1 text-sm text-white/70">{orderBump.descricao}</p>
                <div className="mt-1 text-sm">
                  <span className="text-white/40 line-through">{brl(orderBump.precoDe!)}</span>{' '}
                  <strong className="text-lime-glow">+ {brl(orderBump.preco)}</strong>
                </div>
              </div>
            </motion.label>
          )}

          <button type="submit" disabled={processing} className="btn-primary mt-6 w-full px-6 py-5 text-lg disabled:opacity-60">
            {processing ? 'Processando pagamento…' : `PAGAR ${brl(total)} →`}
          </button>
          <p className="mt-3 text-center text-xs text-white/50">🔒 Pagamento criptografado • Garantia de {moneyBackDays} dias</p>
        </form>

        {/* Resumo */}
        <aside className="h-fit rounded-3xl glass p-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-white/40">Resumo do pedido</h2>
          <div className="mt-4 flex justify-between text-sm">
            <span>{mainOffer.nome}</span><span>{brl(mainOffer.preco)}</span>
          </div>
          {bump && orderBump && (
            <div className="mt-2 flex justify-between text-sm text-lime-glow">
              <span>{orderBump.nome}</span><span>{brl(orderBump.preco)}</span>
            </div>
          )}
          <div className="my-4 h-px bg-white/10" />
          <div className="flex justify-between text-lg font-black">
            <span>Total</span><span className="gradient-text">{brl(total)}</span>
          </div>
          <div className="mt-6 space-y-2 text-xs text-white/50">
            <p>✓ Acesso imediato após a confirmação</p>
            <p>✓ Garantia incondicional de {moneyBackDays} dias</p>
            <p>✓ Suporte por e-mail{cfg.whatsapp ? ' e WhatsApp' : ''}</p>
          </div>
        </aside>
      </div>
    </main>
  )
}
