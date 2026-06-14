import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import EcosystemStrip from './EcosystemStrip'
import { products, brl, type ProductId } from '../data/catalog'

// Página de venda direta (sem quiz) — usada por bundle e assinatura.
export default function SalesPage({ id, checkoutParam, badge, headline, sub, disclaimer }: {
  id: ProductId; checkoutParam: string; badge: string; headline: string; sub: string; disclaimer: string
}) {
  const p = products[id]
  const style = { ['--from' as string]: p.from, ['--to' as string]: p.to } as CSSProperties
  const bg = { background: `radial-gradient(70% 55% at 50% -5%, ${p.from}33, transparent 60%), radial-gradient(60% 50% at 90% 15%, ${p.to}22, transparent 55%), ${p.bg}` }

  return (
    <main className="min-h-screen text-white" style={{ ...style, ...bg }}>
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2 font-extrabold">
          <span className="grid h-8 w-8 place-items-center rounded-lg text-[#06080f]" style={{ background: `linear-gradient(135deg, ${p.from}, ${p.to})` }}>{p.emoji}</span>
          {p.marca}
        </div>
        <a href={`/checkout?p=${checkoutParam}`} className="btn-grad px-5 py-2 text-sm">Quero agora</a>
      </header>

      <section className="mx-auto max-w-3xl px-5 pb-8 pt-8 text-center md:pt-14">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-flex items-center rounded-full glass-soft px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">{badge}</span>
          <h1 className="mt-6 text-4xl font-black leading-[1] md:text-6xl">{headline}</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/65">{sub}</p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-2xl px-5 py-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="rounded-3xl grad-glow glass-soft p-6 md:p-8">
          <h2 className="text-2xl font-black">{p.nome}</h2>
          <p className="mt-1 text-white/60">{p.tagline}</p>
          <ul className="mt-5 grid gap-2">
            {p.entrega.map((b, i) => <li key={i} className="flex gap-2 text-sm text-white/80"><span style={{ color: p.to }}>✓</span>{b}</li>)}
          </ul>
          <div className="mt-6 flex items-end gap-2">
            {p.precoDe && <span className="text-white/40 line-through">{brl(p.precoDe)}</span>}
            <span className="text-4xl font-black grad-text">{brl(p.preco)}</span>
            {p.recorrente && <span className="text-sm text-white/50">/mês</span>}
          </div>
          <a href={`/checkout?p=${checkoutParam}`} className="btn-grad mt-6 block px-6 py-5 text-center text-lg">
            {p.recorrente ? 'ASSINAR AGORA →' : 'GARANTIR MEU ACESSO →'}
          </a>
          <p className="mt-3 text-center text-xs text-white/50">{p.recorrente ? 'Cancele quando quiser.' : '🛡️ Garantia incondicional de 7 dias.'}</p>
        </motion.div>
      </section>

      <EcosystemStrip current={id} titulo="Faz parte do ecossistema" />
      <p className="px-5 pb-10 text-center text-[11px] leading-relaxed text-white/40">{disclaimer}</p>
    </main>
  )
}
