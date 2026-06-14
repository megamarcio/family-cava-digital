import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import EcosystemStrip from '../components/EcosystemStrip'
import { loadFunnel } from '../lib/store'
import { products, type ProductId } from '../data/catalog'

export default function Entrega() {
  const nav = useNavigate()
  const [state] = useState(loadFunnel())
  const pid = (state.product as ProductId) || 'nidra'
  const p = products[pid]
  const unlocked = state.unlocked?.[pid]

  useEffect(() => {
    if (!unlocked) nav(p?.rota || '/', { replace: true })
  }, [unlocked, p, nav])
  if (!unlocked || !p) return null

  const style = { ['--from' as string]: p.from, ['--to' as string]: p.to } as CSSProperties
  const bg = { background: `radial-gradient(70% 55% at 50% -5%, ${p.from}33, transparent 60%), ${p.bg}` }

  return (
    <main className="min-h-screen px-5 py-10 text-white" style={{ ...style, ...bg }}>
      <div className="mx-auto max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl grad-glow glass-soft p-6 text-center md:p-8">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full text-3xl text-[#06080f]" style={{ background: `linear-gradient(135deg, ${p.from}, ${p.to})` }}>✓</div>
          <h1 className="mt-5 text-3xl font-black">{state.nome ? `${state.nome.split(' ')[0]}, ` : ''}acesso liberado!</h1>
          <p className="mt-2 text-white/60">{p.marca} — {p.nome}</p>
        </motion.div>

        <section className="mt-6 rounded-3xl glass-soft p-6">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-white/40">O que você recebeu</div>
          <ul className="grid gap-2">
            {p.entrega.map((b, i) => <li key={i} className="flex gap-2 text-sm text-white/80"><span style={{ color: p.to }}>✓</span>{b}</li>)}
          </ul>
          <div className="mt-5 grid place-items-center rounded-2xl border border-white/10 bg-black/20 p-10 text-center text-sm text-white/40">
            ▶ Seus áudios/guias aparecem aqui.<br />Configure os arquivos de entrega no Admin.
          </div>
        </section>

        <EcosystemStrip current={pid} titulo="Continue sua jornada" />
        <p className="mt-2 text-center text-[11px] text-white/40">Conteúdo educativo de bem-estar. Não substitui acompanhamento profissional.</p>
      </div>
    </main>
  )
}
