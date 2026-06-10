import { useState } from 'react'
import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import MiniQuiz, { type MiniQuestion } from './MiniQuiz'
import EcosystemStrip from './EcosystemStrip'
import { products, brl, type ProductId } from '../data/catalog'
import { loadConfig } from '../lib/store'

interface Props {
  id: Exclude<ProductId, 'bundle' | 'club'>
  checkoutParam: string
  intro: { title: string; sub: string }
  comoFunciona: { t: string; d: string }[]
  quiz: MiniQuestion[]
  resultado: (score: number) => { titulo: string; texto: string }
  disclaimer: string
}

// Funil completo de um produto: hero → quiz com vídeo → resultado + low ticket.
export default function ProductFunnel({ id, checkoutParam, intro, comoFunciona, quiz, resultado, disclaimer }: Props) {
  const p = products[id]
  const cfg = loadConfig()
  const [phase, setPhase] = useState<'landing' | 'quiz' | 'result'>('landing')
  const [score, setScore] = useState(0)
  const style = { ['--from' as string]: p.from, ['--to' as string]: p.to } as CSSProperties
  const bg = {
    background: `radial-gradient(70% 55% at 50% -5%, ${p.from}33, transparent 60%), radial-gradient(60% 50% at 90% 15%, ${p.to}22, transparent 55%), ${p.bg}`,
  }
  const res = resultado(score)

  return (
    <main className="min-h-screen text-white" style={{ ...style, ...bg }}>
      {/* NAV */}
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <a href={p.rota} className="flex items-center gap-2 font-extrabold">
          <span className="grid h-8 w-8 place-items-center rounded-lg text-[#06080f]" style={{ background: `linear-gradient(135deg, ${p.from}, ${p.to})` }}>{p.emoji}</span>
          {p.marca}
        </a>
        {phase === 'landing' && <button onClick={() => setPhase('quiz')} className="btn-grad px-5 py-2 text-sm">Fazer o quiz</button>}
      </header>

      {phase === 'landing' && (
        <>
          <section className="mx-auto max-w-3xl px-5 pb-10 pt-8 text-center md:pt-14">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-flex items-center rounded-full glass-soft px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                {p.eixo === 'sono' ? 'Sono & recuperação' : p.eixo === 'humor' ? 'Humor & ritmo circadiano' : p.eixo} · baseado em ciência
              </span>
              <h1 className="mt-6 text-4xl font-black leading-[1] md:text-6xl">{p.nome}</h1>
              <p className="mx-auto mt-4 max-w-xl text-lg text-white/65">{p.tagline}</p>
              <button onClick={() => setPhase('quiz')} className="btn-grad mt-7 px-8 py-4 text-base">Descobrir meu protocolo →</button>
            </motion.div>
          </section>

          <section className="mx-auto max-w-4xl px-5 py-8">
            <div className="grid gap-4 md:grid-cols-3">
              {comoFunciona.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }} className="rounded-2xl glass-soft p-6">
                  <div className="text-sm font-bold" style={{ color: p.to }}>PASSO {i + 1}</div>
                  <h3 className="mt-2 text-lg font-bold">{s.t}</h3>
                  <p className="mt-1 text-sm text-white/60">{s.d}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <EcosystemStrip current={id} />

          <footer className="px-5 py-10">
            <p className="mx-auto max-w-2xl text-center text-[11px] leading-relaxed text-white/40">{disclaimer}</p>
          </footer>
        </>
      )}

      {phase === 'quiz' && (
        <section className="px-5 py-6">
          <MiniQuiz
            questions={quiz}
            accent={{ from: p.from, to: p.to }}
            videoSrc={cfg.oniraVideoUrl}
            introTitle={intro.title}
            introSub={intro.sub}
            onFinish={(s) => { setScore(s); setPhase('result') }}
          />
        </section>
      )}

      {phase === 'result' && (
        <section className="mx-auto max-w-2xl px-5 py-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl glass-soft p-6 md:p-8">
            <div className="text-xs font-bold uppercase tracking-widest" style={{ color: p.to }}>Seu diagnóstico</div>
            <h1 className="mt-2 text-2xl font-black md:text-3xl">{res.titulo}</h1>
            <p className="mt-2 text-white/70">{res.texto}</p>
          </motion.div>

          {/* LOW TICKET */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mt-6 rounded-3xl grad-glow glass-soft p-6 md:p-8">
            <h2 className="text-2xl font-black">{p.nome}</h2>
            <ul className="mt-4 grid gap-2">
              {p.entrega.map((b, i) => <li key={i} className="flex gap-2 text-sm text-white/80"><span style={{ color: p.to }}>✓</span>{b}</li>)}
            </ul>
            <div className="mt-5 flex items-end gap-2">
              {p.precoDe && <span className="text-white/40 line-through">{brl(p.precoDe)}</span>}
              <span className="text-4xl font-black grad-text">{brl(p.preco)}</span>
            </div>
            <a href={`/checkout?p=${checkoutParam}`} className="btn-grad mt-5 block px-6 py-5 text-center text-lg">DESBLOQUEAR AGORA →</a>
            <p className="mt-3 text-center text-xs text-white/50">🛡️ Garantia de 7 dias. No checkout há um complemento opcional do ecossistema.</p>
          </motion.div>

          <EcosystemStrip current={id} titulo="Quem leva isto, também leva" />
          <p className="mt-2 text-center text-[11px] leading-relaxed text-white/40">{disclaimer}</p>
        </section>
      )}
    </main>
  )
}
