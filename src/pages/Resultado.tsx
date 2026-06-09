import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { loadFunnel } from '../lib/store'
import { goalMeta, getPeptide } from '../data/peptides'
import { mainOffer, brl, moneyBackDays } from '../data/offer'

export default function Resultado() {
  const nav = useNavigate()
  const [state] = useState(loadFunnel())
  const goal = state.goal || 'energia'
  const meta = goalMeta[goal]
  const protocolo = meta.protocolo.map(getPeptide).filter(Boolean)

  // Escassez: contador regressivo
  const [secs, setSecs] = useState(15 * 60)
  useEffect(() => {
    const i = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(i)
  }, [])
  const mm = String(Math.floor(secs / 60)).padStart(2, '0')
  const ss = String(secs % 60).padStart(2, '0')

  return (
    <main className="mesh min-h-screen px-5 py-10">
      <div className="mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-lime-glow">
            ✓ Diagnóstico concluído{state.nome ? `, ${state.nome.split(' ')[0]}` : ''}
          </span>
          <h1 className="mt-4 text-3xl font-black md:text-4xl">
            Seu foco é <span style={{ color: meta.cor }}>{meta.label}</span> {meta.emoji}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-white/60">{meta.dor}</p>
        </motion.div>

        {/* Protocolo recomendado */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="mt-8 rounded-3xl glass p-6 md:p-8">
          <div className="text-xs font-bold uppercase tracking-widest text-lime-glow">Protocolo recomendado para você</div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {protocolo.map((p) => (
              <div key={p!.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-bold">{p!.nome}</h3>
                  <span className="text-xs text-white/40">{p!.categoria}</span>
                </div>
                <p className="mt-1 text-xs italic text-lime-glow">{p!.tagline}</p>
                <p className="mt-3 text-sm text-white/70">{p!.comoFunciona}</p>
                <ul className="mt-3 space-y-1">
                  {p!.beneficios.map((b, i) => (
                    <li key={i} className="flex gap-2 text-sm text-white/80"><span className="text-lime-glow">✓</span>{b}</li>
                  ))}
                </ul>
                <p className="mt-3 text-[11px] text-white/40">Evidência: {p!.evidencia}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl border border-lime-glow/30 bg-lime-glow/5 p-4 text-sm text-white/70">
            🔒 Para sua segurança, a <strong>dosagem exata, o ciclo, as sinergias e o passo a passo de aplicação</strong> estão no protocolo completo abaixo.
          </div>
        </motion.div>

        {/* OFERTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mt-8 rounded-3xl card-glow glass p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-black">{mainOffer.nome}</h2>
            <div className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold text-red-300">
              Oferta expira em {mm}:{ss}
            </div>
          </div>
          <p className="mt-2 text-white/60">{mainOffer.descricao}</p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {mainOffer.bullets.map((b, i) => (
              <li key={i} className="flex gap-2 text-sm text-white/80"><span className="text-lime-glow">✓</span>{b}</li>
            ))}
          </ul>
          <div className="mt-6 flex items-end gap-3">
            <span className="text-white/40 line-through">{brl(mainOffer.precoDe!)}</span>
            <span className="text-4xl font-black gradient-text">{brl(mainOffer.preco)}</span>
            <span className="text-sm text-white/50">à vista ou no cartão</span>
          </div>
          <button onClick={() => nav('/checkout')} className="btn-primary mt-6 w-full px-6 py-5 text-lg">
            QUERO MEU PROTOCOLO AGORA →
          </button>
          <p className="mt-3 text-center text-xs text-white/50">
            🛡️ Garantia incondicional de {moneyBackDays} dias. Não gostou? Devolvemos 100%.
          </p>
        </motion.div>

        <p className="mt-8 text-center text-[11px] leading-relaxed text-white/30">
          Conteúdo educativo. Não constitui prescrição médica. Consulte um profissional de saúde antes de iniciar qualquer protocolo.
        </p>
      </div>
    </main>
  )
}
