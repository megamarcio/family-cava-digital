import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import VideoPlayer from '../components/VideoPlayer'
import { quizQuestions, computeGoal, type QuizOption } from '../data/quiz'
import { saveFunnel, loadConfig } from '../lib/store'

type Phase = 'intro' | number | 'capture'

export default function Quiz() {
  const nav = useNavigate()
  const cfg = loadConfig()
  const [phase, setPhase] = useState<Phase>('intro')
  const [answers, setAnswers] = useState<Record<string, QuizOption>>({})
  const [form, setForm] = useState({ nome: '', email: '', whatsapp: '' })

  const total = quizQuestions.length
  const idx = typeof phase === 'number' ? phase : 0
  const progress =
    phase === 'intro' ? 0 : phase === 'capture' ? 100 : ((idx + 1) / (total + 1)) * 100

  function answer(q: string, opt: QuizOption) {
    const next = { ...answers, [q]: opt }
    setAnswers(next)
    setTimeout(() => {
      if (idx + 1 < total) setPhase(idx + 1)
      else setPhase('capture')
    }, 220)
  }

  function finish() {
    const goal = computeGoal(answers)
    saveFunnel({ goal, ...form })
    nav('/resultado')
  }

  return (
    <main className="mesh min-h-screen px-5 py-6">
      <div className="mx-auto max-w-2xl">
        {/* Top bar */}
        <div className="mb-6 flex items-center gap-3">
          <button onClick={() => nav('/')} className="text-sm text-white/50 hover:text-white">←</button>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-emerald-glow to-lime-glow" animate={{ width: `${progress}%` }} />
          </div>
          <span className="text-xs tabular-nums text-white/50">{Math.round(progress)}%</span>
        </div>

        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div key="intro" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <h1 className="text-center text-2xl font-black md:text-3xl">Antes de começar, assista 30 segundos</h1>
              <p className="mt-2 text-center text-sm text-white/60">Vou te explicar como o quiz descobre exatamente o que seu corpo precisa.</p>
              <div className="mt-6">
                <VideoPlayer compact src={cfg.quizVideoUrl} revealAt={4} onCta={() => setPhase(0)} ctaLabel="COMEÇAR O QUIZ" />
              </div>
              <button onClick={() => setPhase(0)} className="mt-4 w-full text-center text-sm text-white/50 hover:text-white">
                Pular vídeo e começar →
              </button>
            </motion.div>
          )}

          {typeof phase === 'number' && (
            <motion.div key={phase} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
              <div className="text-xs font-bold uppercase tracking-widest text-lime-glow">Pergunta {idx + 1} de {total}</div>
              <h2 className="mt-2 text-2xl font-black md:text-3xl">{quizQuestions[idx].title}</h2>
              {quizQuestions[idx].subtitle && (
                <p className="mt-2 text-sm text-white/60">{quizQuestions[idx].subtitle}</p>
              )}
              <div className="mt-6 grid gap-3">
                {quizQuestions[idx].options.map((opt, i) => {
                  const selected = answers[quizQuestions[idx].id]?.label === opt.label
                  return (
                    <button
                      key={i}
                      onClick={() => answer(quizQuestions[idx].id, opt)}
                      className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${
                        selected ? 'border-lime-glow bg-lime-glow/10' : 'border-white/10 glass hover:border-white/30'
                      }`}
                    >
                      {opt.emoji && <span className="text-2xl">{opt.emoji}</span>}
                      <span className="font-semibold">{opt.label}</span>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {phase === 'capture' && (
            <motion.div key="capture" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="text-center">
                <div className="text-4xl">🎯</div>
                <h2 className="mt-3 text-2xl font-black md:text-3xl">Seu protocolo está pronto!</h2>
                <p className="mt-2 text-sm text-white/60">Diga para onde enviar e veja seu resultado agora.</p>
              </div>
              <form
                onSubmit={(e) => { e.preventDefault(); finish() }}
                className="mt-6 grid gap-3 rounded-2xl glass p-5"
              >
                <input required placeholder="Seu nome" value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-lime-glow" />
                <input required type="email" placeholder="Seu melhor e-mail" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-lime-glow" />
                <input placeholder="WhatsApp (opcional)" value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-lime-glow" />
                <button type="submit" className="btn-primary mt-2 px-6 py-4 text-base">VER MEU PROTOCOLO →</button>
                <p className="text-center text-[11px] text-white/40">Seus dados estão seguros. Sem spam.</p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
