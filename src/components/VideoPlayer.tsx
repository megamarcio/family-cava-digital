import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  // Se houver uma URL (mp4/youtube/vimeo embed), pode ser plugada depois.
  src?: string
  // Tempo (s) até revelar o CTA — técnica clássica de VSL.
  revealAt?: number
  ctaLabel?: string
  onCta?: () => void
  poster?: string
  title?: string
  compact?: boolean
}

// Player de VSL "interativo": barra de progresso, capítulos e CTA que aparece
// no momento certo. Quando não há vídeo real, roda uma simulação visual para
// demonstração (substituível no Admin).
export default function VideoPlayer({
  src,
  revealAt = 8,
  ctaLabel = 'QUERO MEU PROTOCOLO AGORA',
  onCta,
  poster,
  title = 'Assista antes de continuar',
  compact,
}: Props) {
  const [playing, setPlaying] = useState(false)
  const [t, setT] = useState(0)
  const [duration] = useState(compact ? 35 : 420) // simulação
  const [revealed, setRevealed] = useState(false)
  const raf = useRef<number>()

  useEffect(() => {
    if (!playing) return
    let last = performance.now()
    const tick = (now: number) => {
      const dt = (now - last) / 1000
      last = now
      setT((prev) => {
        const next = Math.min(prev + dt, duration)
        if (next >= revealAt) setRevealed(true)
        return next
      })
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [playing, duration, revealAt])

  const pct = Math.min((t / duration) * 100, 100)
  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

  const isEmbed = src && /youtube|vimeo/.test(src)

  return (
    <div className="relative w-full overflow-hidden rounded-3xl card-glow glass">
      <div className="relative aspect-video w-full bg-black">
        {/* Vídeo real, se configurado */}
        {src && isEmbed && (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={src}
            title={title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        )}
        {src && !isEmbed && (
          <video className="absolute inset-0 h-full w-full object-cover" src={src} controls poster={poster} />
        )}

        {/* Simulação visual quando não há vídeo configurado */}
        {!src && (
          <div
            className="absolute inset-0 mesh"
            style={{
              background:
                'radial-gradient(80% 80% at 30% 20%, rgba(52,211,153,.25), transparent), radial-gradient(70% 70% at 80% 90%, rgba(163,230,53,.18), transparent), #05140e',
            }}
          >
            <AnimatePresence>
              {!playing && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setPlaying(true)}
                  className="group absolute inset-0 flex flex-col items-center justify-center"
                >
                  <span className="pulse-ring grid h-20 w-20 place-items-center rounded-full bg-white/90 text-ink shadow-2xl transition group-hover:scale-105">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                  <span className="mt-4 text-sm font-semibold text-white/90">{title}</span>
                  <span className="text-xs text-white/50">Clique para reproduzir</span>
                </motion.button>
              )}
            </AnimatePresence>

            {playing && (
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                <motion.div
                  key={Math.floor(t / 6)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-md"
                >
                  <p className="text-xs uppercase tracking-widest text-lime-glow">Vídeo de Vendas</p>
                  <p className="mt-3 text-xl font-bold text-white md:text-2xl">
                    {scriptLine(t, compact)}
                  </p>
                </motion.div>
              </div>
            )}
          </div>
        )}

        {/* LIVE / atenção */}
        {!compact && (
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" /> Apresentação ao vivo
          </div>
        )}
      </div>

      {/* Barra de progresso + tempo (apenas na simulação) */}
      {!src && (
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => setPlaying((p) => !p)}
            className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label={playing ? 'Pausar' : 'Reproduzir'}
          >
            {playing ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            )}
          </button>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-emerald-glow to-lime-glow transition-all" style={{ width: `${pct}%` }} />
          </div>
          <span className="w-20 text-right text-xs tabular-nums text-white/60">
            {fmt(t)} / {fmt(duration)}
          </span>
        </div>
      )}

      {/* CTA revelado */}
      <AnimatePresence>
        {revealed && onCta && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="border-t border-white/10 p-4"
          >
            <button onClick={onCta} className="btn-primary w-full px-6 py-4 text-base md:text-lg">
              {ctaLabel} →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function scriptLine(t: number, compact?: boolean): string {
  if (compact) {
    if (t < 12) return 'Responda 6 perguntas rápidas…'
    if (t < 24) return '…sobre os seus objetivos e familiaridade com o tema.'
    return 'No fim, você recebe um guia educativo personalizado.'
  }
  if (t < 12) return 'Existem dezenas de peptídeos sendo estudados pela ciência.'
  if (t < 24) return 'Cada categoria tem um foco: performance, recuperação, longevidade, estética…'
  if (t < 40) return 'O difícil é entender, sem achismo, o que cada uma significa.'
  if (t < 60) return 'Por isso montamos um guia educativo, baseado em ciência.'
  if (t < 90) return 'Responda 6 perguntas e descubra qual categoria combina com os seus objetivos.'
  return 'Conteúdo educativo. Não diagnostica, trata ou cura doenças.'
}
