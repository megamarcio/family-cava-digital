import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { loadFunnel } from '../lib/store'
import { sleepPlan, dreamDisclaimers, type DreamAnalysis } from '../data/dreams'

interface Saved { text: string; analysis: DreamAnalysis }

export default function Relatorio() {
  const nav = useNavigate()
  const [state] = useState(loadFunnel())
  const [saved, setSaved] = useState<Saved | null>(null)

  useEffect(() => {
    if (!state.paidSomnia) { nav('/sonhos/analise', { replace: true }); return }
    try { setSaved(JSON.parse(localStorage.getItem('somnia_last') || 'null')) } catch { setSaved(null) }
  }, [state.paidSomnia, nav])

  if (!state.paidSomnia) return null
  const a = saved?.analysis

  return (
    <main className="somnia-bg min-h-screen px-5 py-10">
      <div className="mx-auto max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl somnia-glow glass-violet p-6 text-center md:p-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-bold text-cyan-200">✓ Relatório liberado</span>
          <h1 className="mt-4 text-3xl font-black md:text-4xl">{state.nome ? `${state.nome.split(' ')[0]}, seu ` : 'Seu '}<span className="somnia-gradient-text">relatório completo</span></h1>
          {a && <p className="mt-3 text-white/60">Intensidade emocional do sonho analisado: <strong className="text-white">{a.intensidade}/100</strong></p>}
        </motion.div>

        {/* Leitura clínica detalhada */}
        {a && (
          <section className="mt-6 rounded-3xl glass-violet p-6">
            <div className="mb-3 text-xs font-bold uppercase tracking-widest text-white/40">Leitura clínica detalhada (hipóteses)</div>
            <ul className="space-y-3">
              {a.hipoteses.map((h, i) => (
                <li key={i} className="flex gap-2 text-sm text-white/80"><span className="text-cyan-300">›</span>{h}</li>
              ))}
            </ul>
            {a.simbolos.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {a.simbolos.map((s) => <span key={s} className="rounded-full bg-violet-500/15 px-3 py-1 text-sm text-violet-200">{s}</span>)}
              </div>
            )}
          </section>
        )}

        {/* Plano de 7 dias */}
        <section className="mt-6 rounded-3xl glass-violet p-6">
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-white/40">Plano de 7 dias (não medicamentoso)</div>
          <ol className="space-y-3">
            {sleepPlan.map((p, i) => (
              <li key={i} className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 text-xs font-bold text-[#060818]">{i + 1}</span>
                <div><div className="text-sm font-semibold">{p.dia}</div><div className="text-sm text-white/70">{p.foco}</div></div>
              </li>
            ))}
          </ol>
        </section>

        {/* Ponte para peptídeos */}
        <section className="mt-6 rounded-3xl glass-violet p-6">
          <h3 className="text-lg font-bold">Abordagem fisiológica (estresse & sono)</h3>
          <p className="mt-2 text-sm text-white/70">
            Se o padrão persistir, a literatura aponta peptídeos estudados para o eixo estresse–sono: <strong className="text-white">Semax/Selank</strong> (estresse e foco) e <strong className="text-white">DSIP</strong> (sono profundo).
          </p>
          {state.paid ? (
            <Link to="/protocolo" className="btn-somnia mt-4 inline-block px-6 py-3 text-sm">Abrir meu protocolo de peptídeos →</Link>
          ) : (
            <Link to="/checkout?p=somnia" className="btn-somnia mt-4 inline-block px-6 py-3 text-sm">Desbloquear o protocolo de peptídeos →</Link>
          )}
        </section>

        <p className="mt-8 text-center text-[11px] leading-relaxed text-white/40">{dreamDisclaimers.completo}</p>
        <div className="mt-4 text-center"><Link to="/sonhos" className="text-sm text-white/50 hover:text-white">← Voltar ao SOMNIA·AIX</Link></div>
      </div>
    </main>
  )
}
