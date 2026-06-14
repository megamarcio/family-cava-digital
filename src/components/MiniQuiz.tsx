import { useState } from 'react'
import type { CSSProperties } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import VideoPlayer from './VideoPlayer'

export interface MiniOption { label: string; emoji?: string; score?: number }
export interface MiniQuestion { id: string; title: string; subtitle?: string; options: MiniOption[] }

interface Props {
  questions: MiniQuestion[]
  accent: { from: string; to: string }
  videoSrc?: string
  introTitle: string
  introSub: string
  onFinish: (score: number, answers: Record<string, MiniOption>) => void
}

// Quiz curto e interativo, reutilizável e tematizável (intro com vídeo + perguntas).
export default function MiniQuiz({ questions, accent, videoSrc, introTitle, introSub, onFinish }: Props) {
  const [phase, setPhase] = useState<'intro' | number>('intro')
  const [answers, setAnswers] = useState<Record<string, MiniOption>>({})
  const idx = typeof phase === 'number' ? phase : 0
  const total = questions.length
  const progress = phase === 'intro' ? 0 : ((idx + 1) / total) * 100
  const style = { ['--from' as string]: accent.from, ['--to' as string]: accent.to } as CSSProperties

  function pick(opt: MiniOption) {
    const next = { ...answers, [questions[idx].id]: opt }
    setAnswers(next)
    setTimeout(() => {
      if (idx + 1 < total) setPhase(idx + 1)
      else {
        const score = Object.values(next).reduce((a, o) => a + (o.score || 0), 0)
        onFinish(score, next)
      }
    }, 220)
  }

  return (
    <div className="mx-auto max-w-2xl" style={style}>
      <div className="mb-6 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
          <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${accent.from}, ${accent.to})` }} animate={{ width: `${progress}%` }} />
        </div>
        <span className="text-xs tabular-nums text-white/50">{Math.round(progress)}%</span>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div key="intro" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
            <h2 className="text-center text-2xl font-black md:text-3xl">{introTitle}</h2>
            <p className="mt-2 text-center text-sm text-white/60">{introSub}</p>
            <div className="mt-6"><VideoPlayer compact src={videoSrc} revealAt={4} onCta={() => setPhase(0)} ctaLabel="COMEÇAR" /></div>
            <button onClick={() => setPhase(0)} className="mt-4 w-full text-center text-sm text-white/50 hover:text-white">Pular vídeo e começar →</button>
          </motion.div>
        )}

        {typeof phase === 'number' && (
          <motion.div key={phase} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
            <div className="text-xs font-bold uppercase tracking-widest" style={{ color: accent.to }}>Pergunta {idx + 1} de {total}</div>
            <h2 className="mt-2 text-2xl font-black md:text-3xl">{questions[idx].title}</h2>
            {questions[idx].subtitle && <p className="mt-2 text-sm text-white/60">{questions[idx].subtitle}</p>}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {questions[idx].options.map((opt, i) => (
                <motion.button key={i} whileTap={{ scale: 0.98 }} onClick={() => pick(opt)}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 glass-soft p-4 text-left transition hover:-translate-y-0.5 hover:border-white/30">
                  {opt.emoji && <span className="text-2xl">{opt.emoji}</span>}
                  <span className="font-semibold">{opt.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
