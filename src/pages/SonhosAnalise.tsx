import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import VideoPlayer from '../components/VideoPlayer'
import { dreamQuiz, analyzeProfile, dreamDisclaimers, type DreamAnalysis, type DreamQuizOption } from '../data/dreams'
import { dreamOffer, brl } from '../data/offer'
import { loadConfig } from '../lib/store'

type Phase = 'intro' | number | 'texto' | 'loading' | 'result'

const HIST_KEY = 'onira_hist_v1'
function pushHistory(v: number) {
  try {
    const arr: number[] = JSON.parse(localStorage.getItem(HIST_KEY) || '[]')
    arr.push(v); localStorage.setItem(HIST_KEY, JSON.stringify(arr.slice(-30))); return arr
  } catch { return [v] }
}
function loadHistory(): number[] {
  try { return JSON.parse(localStorage.getItem(HIST_KEY) || '[]') } catch { return [] }
}

export default function SonhosAnalise() {
  const nav = useNavigate()
  const cfg = loadConfig()
  const [phase, setPhase] = useState<Phase>('intro')
  const [answers, setAnswers] = useState<Record<string, DreamQuizOption[]>>({})
  const [text, setText] = useState('')
  const [result, setResult] = useState<DreamAnalysis | null>(null)
  const hist = useMemo(() => loadHistory(), [phase])

  const total = dreamQuiz.length
  const idx = typeof phase === 'number' ? phase : 0
  const current = dreamQuiz[idx]
  const maxSelect = current?.maxSelect ?? 1
  const selected = answers[current?.id] ?? []

  const progress =
    phase === 'intro' ? 0
    : phase === 'texto' ? 85
    : phase === 'loading' || phase === 'result' ? 100
    : ((idx + 1) / (total + 2)) * 100

  function advance() {
    if (idx + 1 < total) setPhase(idx + 1)
    else setPhase('texto')
  }
  function pick(opt: DreamQuizOption) {
    if (maxSelect === 1) { setAnswers({ ...answers, [current.id]: [opt] }); setTimeout(advance, 220); return }
    const exists = selected.find((o) => o.label === opt.label)
    let next: DreamQuizOption[]
    if (exists) next = selected.filter((o) => o.label !== opt.label)
    else if (selected.length >= maxSelect) next = [...selected.slice(1), opt]
    else next = [...selected, opt]
    setAnswers({ ...answers, [current.id]: next })
  }
  function finish() {
    setPhase('loading')
    setTimeout(() => {
      const r = analyzeProfile(answers, text)
      setResult(r); pushHistory(r.intensidade)
      try { localStorage.setItem('onira_last', JSON.stringify({ text, analysis: r })) } catch { /* ignore */ }
      setPhase('result')
    }, 1600)
  }

  const media = hist.length ? Math.round(hist.reduce((a, b) => a + b, 0) / hist.length) : 0

  return (
    <main className="somnia-bg min-h-screen px-5 py-6">
      <div className="mx-auto max-w-2xl">
        {/* topo */}
        <div className="mb-6 flex items-center gap-3">
          <Link to="/sonhos" className="text-sm text-white/50 hover:text-white">←</Link>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" animate={{ width: `${progress}%` }} />
          </div>
          <span className="text-xs tabular-nums text-white/50">{Math.round(progress)}%</span>
        </div>

        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div key="intro" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <h1 className="text-center text-2xl font-black md:text-3xl">Vamos <span className="somnia-gradient-text">decodificar</span> seus sonhos</h1>
              <p className="mt-2 text-center text-sm text-white/60">Assista 30s e responda 5 perguntas rápidas. Sem cadastro.</p>
              <div className="mt-6"><VideoPlayer compact src={cfg.oniraVideoUrl} revealAt={4} onCta={() => setPhase(0)} ctaLabel="COMEÇAR O QUIZ" /></div>
              <button onClick={() => setPhase(0)} className="mt-4 w-full text-center text-sm text-white/50 hover:text-white">Pular vídeo e começar →</button>
            </motion.div>
          )}

          {typeof phase === 'number' && (
            <motion.div key={phase} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-widest text-cyan-300">Pergunta {idx + 1} de {total}</div>
                {maxSelect > 1 && <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">{selected.length}/{maxSelect}</div>}
              </div>
              <h2 className="mt-2 text-2xl font-black md:text-3xl">{current.title}</h2>
              {current.subtitle && <p className="mt-2 text-sm text-white/60">{current.subtitle}</p>}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {current.options.map((opt, i) => {
                  const isSel = !!selected.find((o) => o.label === opt.label)
                  return (
                    <motion.button key={i} whileTap={{ scale: 0.98 }} onClick={() => pick(opt)}
                      className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${isSel ? 'border-cyan-300 bg-cyan-400/10' : 'border-white/10 glass-violet hover:border-white/30'}`}>
                      {opt.emoji && <span className="text-2xl">{opt.emoji}</span>}
                      <span className="flex-1 font-semibold">{opt.label}</span>
                      {maxSelect > 1 && <span className={`grid h-6 w-6 place-items-center rounded-md border ${isSel ? 'border-cyan-300 bg-cyan-300 text-[#060818]' : 'border-white/20'}`}>{isSel && '✓'}</span>}
                    </motion.button>
                  )
                })}
              </div>
              {maxSelect > 1 && (
                <button onClick={advance} disabled={selected.length === 0} className="btn-somnia mt-6 w-full px-6 py-4 text-base disabled:cursor-not-allowed disabled:opacity-40">Continuar →</button>
              )}
            </motion.div>
          )}

          {phase === 'texto' && (
            <motion.div key="texto" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              <div className="text-xs font-bold uppercase tracking-widest text-cyan-300">Último passo (opcional)</div>
              <h2 className="mt-2 text-2xl font-black md:text-3xl">Descreva seu último sonho marcante</h2>
              <p className="mt-2 text-sm text-white/60">Quanto mais detalhe emocional, mais precisa a leitura. Pode pular se preferir.</p>
              <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6}
                placeholder="Ex.: eu estava num corredor escuro e algo me perseguia…"
                className="mt-5 w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-4 outline-none focus:border-cyan-300" />
              <button onClick={finish} className="btn-somnia mt-5 w-full px-6 py-4 text-base">Gerar minha análise →</button>
              <button onClick={finish} className="mt-3 w-full text-center text-sm text-white/50 hover:text-white">Pular e gerar →</button>
              <p className="mt-3 text-center text-[11px] text-white/40">{dreamDisclaimers.curto}</p>
            </motion.div>
          )}

          {phase === 'loading' && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid place-items-center py-24 text-center">
              <div className="h-16 w-16 animate-spin rounded-full border-2 border-white/10 border-t-cyan-300" />
              <p className="mt-6 text-sm text-white/60">Cruzando emoções, símbolos e padrões de sono…</p>
            </motion.div>
          )}

          {phase === 'result' && result && (
            <motion.div key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-black md:text-3xl">Sua análise ONIRA</h1>
                {hist.length > 0 && <span className="rounded-full glass-violet px-3 py-1 text-xs text-white/70">perfil: {hist.length} · média {media}/100</span>}
              </div>

              <div className="rounded-3xl glass-violet p-6">
                <div className="flex items-center justify-between text-sm text-white/60"><span>Intensidade emocional</span><span className="font-bold text-white">{result.intensidade}/100</span></div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${result.intensidade}%` }} transition={{ duration: 1 }} className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
                </div>
                <p className="mt-4 text-sm text-white/70">{result.resumo}</p>
              </div>

              {result.emocoes.length > 0 && (
                <Section titulo="Emoções detectadas">
                  <div className="space-y-3">
                    {result.emocoes.map((e) => {
                      const max = result.emocoes[0].peso || 1
                      return (
                        <div key={e.nome}>
                          <div className="text-sm capitalize">{e.nome}</div>
                          <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-300" style={{ width: `${(e.peso / max) * 100}%` }} /></div>
                        </div>
                      )
                    })}
                  </div>
                </Section>
              )}

              {result.simbolos.length > 0 && (
                <Section titulo="Símbolos & temas">
                  <div className="flex flex-wrap gap-2">
                    {result.simbolos.map((s) => <span key={s} className="rounded-full bg-violet-500/15 px-3 py-1 text-sm text-violet-200">{s}</span>)}
                    {result.temas.map((s) => <span key={s} className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">{s}</span>)}
                  </div>
                </Section>
              )}

              <Section titulo="Leitura clínica (hipotética)">
                <ul className="space-y-3">
                  {(result.hipoteses[0] ? [result.hipoteses[0]] : []).map((h, i) => (
                    <li key={i} className="flex gap-2 text-sm text-white/75"><span className="text-cyan-300">›</span>{h}</li>
                  ))}
                  {result.hipoteses.length === 0 && <li className="text-sm text-white/60">{result.resumo}</li>}
                </ul>
                {result.hipoteses.length > 1 && (
                  <div className="relative mt-3">
                    <div className="select-none space-y-2 blur-[5px]" aria-hidden>
                      {result.hipoteses.slice(1).map((h, i) => <p key={i} className="text-sm text-white/60">› {h}</p>)}
                      <p className="text-sm text-white/60">› Plano de 7 dias para reduzir pesadelos e recuperar o sono REM…</p>
                    </div>
                    <div className="absolute inset-0 grid place-items-center"><span className="rounded-full bg-[#070a1f]/70 px-3 py-1 text-xs font-semibold text-cyan-200 backdrop-blur">🔒 No relatório completo</span></div>
                  </div>
                )}
              </Section>

              {/* LOW TICKET */}
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 rounded-3xl somnia-glow glass-violet p-6">
                <div className="text-xs font-bold uppercase tracking-widest text-cyan-300">Desbloqueie tudo</div>
                <h3 className="mt-2 text-xl font-bold">{dreamOffer.nome}</h3>
                <p className="mt-1 text-sm text-white/70">{dreamOffer.descricao}</p>
                <ul className="mt-4 grid gap-2">
                  {dreamOffer.bullets.map((b, i) => <li key={i} className="flex gap-2 text-sm text-white/80"><span className="text-cyan-300">✓</span>{b}</li>)}
                </ul>
                <div className="mt-4 flex items-end gap-2"><span className="text-white/40 line-through">{brl(dreamOffer.precoDe!)}</span><span className="text-3xl font-black somnia-gradient-text">{brl(dreamOffer.preco)}</span></div>
                <button onClick={() => nav('/checkout?p=somnia')} className="btn-somnia mt-4 w-full px-6 py-4 text-base">Desbloquear relatório completo →</button>
                <p className="mt-2 text-center text-[11px] text-white/40">No checkout você pode adicionar o protocolo de peptídeos (estresse & sono).</p>
              </motion.div>

              <button onClick={() => { setAnswers({}); setText(''); setResult(null); setPhase('intro') }} className="mt-6 w-full rounded-full glass-violet px-6 py-3 text-sm font-semibold text-white/80 hover:text-white">Refazer o quiz</button>
              <p className="mt-6 text-center text-[11px] leading-relaxed text-white/40">{dreamDisclaimers.completo}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

function Section({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="mt-5 rounded-3xl glass-violet p-6">
      <div className="mb-3 text-xs font-bold uppercase tracking-widest text-white/40">{titulo}</div>
      {children}
    </div>
  )
}
