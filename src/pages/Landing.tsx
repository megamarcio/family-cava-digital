import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import VideoPlayer from '../components/VideoPlayer'
import { loadConfig } from '../lib/store'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

// ENTRADA DO FUNIL — bridge curta (padrão) ou redireciona direto pro quiz.
// Controlado pelo Admin (cfg.funnelEntry: 'bridge' | 'quiz') para teste A/B.
export default function Landing() {
  const nav = useNavigate()
  const cfg = loadConfig()
  const goQuiz = () => nav('/quiz')
  const directToQuiz = cfg.funnelEntry === 'quiz'

  useEffect(() => {
    if (directToQuiz) nav('/quiz', { replace: true })
  }, [directToQuiz, nav])
  if (directToQuiz) return null

  return (
    <main className="mesh min-h-screen">
      {/* NAV */}
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2 font-extrabold tracking-tight">
          <img src="/brand/pp-icon.png" alt="Protocolo Peptídeos" className="h-9 w-9 rounded-lg object-cover" />
          <span>Protocolo<span className="gradient-text">Peptídeos</span></span>
        </div>
        <Link to="/saber-mais" className="rounded-full glass px-4 py-2 text-xs font-semibold text-white/70 hover:text-white">Saber mais</Link>
      </header>

      {/* BRIDGE — gancho curto + CTA pro quiz */}
      <section className="mx-auto grid max-w-5xl items-center gap-10 px-5 pb-10 pt-6 md:grid-cols-2 md:pt-12">
        <motion.div {...fadeUp}>
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-lime-glow">
            🧬 Conteúdo educativo • Baseado em ciência
          </span>
          <h1 className="mt-5 text-4xl font-black leading-[1.05] md:text-6xl">
            Qual categoria de <span className="gradient-text">peptídeos</span> combina com você?
          </h1>
          <p className="mt-5 max-w-md text-lg text-white/70">
            Responda 6 perguntas rápidas e receba um <strong className="text-white">guia educativo personalizado</strong> sobre o tema.
          </p>

          <ul className="mt-5 grid max-w-md gap-2">
            {bullets.map((b, i) => (
              <li key={i} className="flex gap-2 text-sm text-white/75"><span className="text-lime-glow">✓</span>{b}</li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button onClick={goQuiz} className="btn-primary px-8 py-4 text-base">Fazer o quiz grátis →</button>
            <Link to="/saber-mais" className="rounded-full glass px-7 py-4 text-center text-sm font-semibold text-white/80 hover:text-white">
              Como funciona
            </Link>
          </div>

          <div className="mt-6 flex items-center gap-3 text-xs text-white/50">
            <div className="flex -space-x-2">
              {['🧑🏽','👩🏼','🧔🏻','👩🏾'].map((e, i) => (
                <span key={i} className="grid h-7 w-7 place-items-center rounded-full bg-white/10 ring-2 ring-ink">{e}</span>
              ))}
            </div>
            +12.480 pessoas já fizeram o quiz educativo
          </div>
        </motion.div>

        <motion.div {...fadeUp} className="animate-float">
          <VideoPlayer src={cfg.vslUrl} revealAt={6} onCta={goQuiz} ctaLabel="FAZER O QUIZ AGORA" />
        </motion.div>
      </section>

      {/* DISCLAIMER curto (compliance) */}
      <footer className="px-5 pb-10 pt-4">
        <p className="mx-auto max-w-2xl text-center text-[11px] leading-relaxed text-white/40">
          Conteúdo educativo e informativo. Não se destina a diagnosticar, tratar, curar ou prevenir qualquer doença
          e não substitui orientação médica. <Link to="/saber-mais" className="underline hover:text-white/70">Saiba mais</Link>.
        </p>
      </footer>
    </main>
  )
}

const bullets = [
  'Panorama por objetivo: performance, recuperação, longevidade, estética',
  'Baseado em ciência, sem achismo e sem promessas',
  'Leva menos de 1 minuto • 100% gratuito',
]
