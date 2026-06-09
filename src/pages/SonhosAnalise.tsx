import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { analyzeDream, dreamDisclaimers, type DreamAnalysis } from '../data/dreams'
import { dreamOffer, brl } from '../data/offer'

const HIST_KEY = 'somnia_hist_v1'
function pushHistory(intensidade: number) {
  try {
    const arr: number[] = JSON.parse(localStorage.getItem(HIST_KEY) || '[]')
    arr.push(intensidade)
    localStorage.setItem(HIST_KEY, JSON.stringify(arr.slice(-30)))
    return arr
  } catch {
    return [intensidade]
  }
}
function loadHistory(): number[] {
  try { return JSON.parse(localStorage.getItem(HIST_KEY) || '[]') } catch { return [] }
}

const examples = [
  'Eu estava sendo perseguido por algo que eu não conseguia ver e por mais que eu corresse não saía do lugar.',
  'Sonhei que meus dentes começaram a cair na frente de todo mundo numa reunião de trabalho.',
  'Acordei várias vezes assustado, é sempre o mesmo pesadelo se repetindo a semana toda.',
]

export default function SonhosAnalise() {
  const nav = useNavigate()
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<'input' | 'loading' | 'result'>('input')
  const [result, setResult] = useState<DreamAnalysis | null>(null)
  const hist = useMemo(() => loadHistory(), [phase])

  function run() {
    if (text.trim().length < 8) return
    setPhase('loading')
    setTimeout(() => {
      const r = analyzeDream(text)
      setResult(r)
      pushHistory(r.intensidade)
      // persiste para a entrega pós-compra (/relatorio)
      try { localStorage.setItem('somnia_last', JSON.stringify({ text, analysis: r })) } catch { /* ignore */ }
      setPhase('result')
    }, 1500)
  }

  const media = hist.length ? Math.round(hist.reduce((a, b) => a + b, 0) / hist.length) : 0

  return (
    <main className="somnia-bg min-h-screen px-5 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/sonhos" className="text-sm text-white/50 hover:text-white">← SOMNIA·AIX</Link>
          {hist.length > 0 && (
            <span className="rounded-full glass-violet px-3 py-1 text-xs text-white/70">
              Perfil contínuo: {hist.length} sonho(s) · média {media}/100
            </span>
          )}
        </div>

        <AnimatePresence mode="wait">
          {phase === 'input' && (
            <motion.div key="input" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <h1 className="text-3xl font-black md:text-4xl">Descreva seu <span className="somnia-gradient-text">sonho</span></h1>
              <p className="mt-2 text-white/60">Escreva com o máximo de detalhe emocional. Quanto mais rico o relato, mais precisa a análise.</p>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={7}
                placeholder="Ex.: eu estava num corredor escuro e alguém me perseguia…"
                className="mt-5 w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-4 outline-none focus:border-cyan-300"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {examples.map((ex, i) => (
                  <button key={i} onClick={() => setText(ex)}
                    className="rounded-full glass-violet px-3 py-1 text-xs text-white/60 hover:text-white">
                    exemplo {i + 1}
                  </button>
                ))}
              </div>
              <button onClick={run} disabled={text.trim().length < 8}
                className="btn-somnia mt-5 w-full px-6 py-4 text-base disabled:cursor-not-allowed disabled:opacity-40">
                Decodificar meu sonho →
              </button>
              <p className="mt-3 text-center text-[11px] text-white/40">{dreamDisclaimers.curto}</p>
            </motion.div>
          )}

          {phase === 'loading' && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid place-items-center py-24 text-center">
              <div className="h-16 w-16 animate-spin rounded-full border-2 border-white/10 border-t-cyan-300" />
              <p className="mt-6 text-sm text-white/60">Extraindo emoções, símbolos e padrões…</p>
            </motion.div>
          )}

          {phase === 'result' && result && (
            <motion.div key="result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-2xl font-black md:text-3xl">Análise do seu sonho</h1>

              {/* Intensidade */}
              <div className="mt-5 rounded-3xl glass-violet p-6">
                <div className="flex items-center justify-between text-sm text-white/60">
                  <span>Intensidade emocional</span><span className="font-bold text-white">{result.intensidade}/100</span>
                </div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${result.intensidade}%` }} transition={{ duration: 1 }}
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
                </div>
                <p className="mt-4 text-sm text-white/70">{result.resumo}</p>
              </div>

              {/* Emoções */}
              {result.emocoes.length > 0 && (
                <Section titulo="Emoções detectadas">
                  <div className="space-y-3">
                    {result.emocoes.map((e) => {
                      const max = result.emocoes[0].peso || 1
                      return (
                        <div key={e.nome}>
                          <div className="flex justify-between text-sm"><span className="capitalize">{e.nome}</span></div>
                          <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/10">
                            <div className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-300" style={{ width: `${(e.peso / max) * 100}%` }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </Section>
              )}

              {/* Símbolos & Temas */}
              {result.simbolos.length > 0 && (
                <Section titulo="Símbolos & temas">
                  <div className="flex flex-wrap gap-2">
                    {result.simbolos.map((s) => (
                      <span key={s} className="rounded-full bg-violet-500/15 px-3 py-1 text-sm text-violet-200">{s}</span>
                    ))}
                    {result.temas.map((s) => (
                      <span key={s} className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">{s}</span>
                    ))}
                  </div>
                </Section>
              )}

              {/* Hipóteses clínicas — 1ª grátis, resto bloqueado (low ticket) */}
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
                      {result.hipoteses.slice(1).map((h, i) => (
                        <p key={i} className="text-sm text-white/60">› {h}</p>
                      ))}
                      <p className="text-sm text-white/60">› Plano de 7 dias para reduzir pesadelos e recuperar o sono REM…</p>
                    </div>
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="rounded-full bg-[#070a1f]/70 px-3 py-1 text-xs font-semibold text-cyan-200 backdrop-blur">🔒 No relatório completo</span>
                    </div>
                  </div>
                )}
              </Section>

              {/* LOW TICKET — Relatório SOMNIA completo (Thiago Roas) */}
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="mt-6 rounded-3xl somnia-glow glass-violet p-6">
                <div className="text-xs font-bold uppercase tracking-widest text-cyan-300">Desbloqueie tudo</div>
                <h3 className="mt-2 text-xl font-bold">{dreamOffer.nome}</h3>
                <p className="mt-1 text-sm text-white/70">{dreamOffer.descricao}</p>
                <ul className="mt-4 grid gap-2">
                  {dreamOffer.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2 text-sm text-white/80"><span className="text-cyan-300">✓</span>{b}</li>
                  ))}
                </ul>
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-white/40 line-through">{brl(dreamOffer.precoDe!)}</span>
                  <span className="text-3xl font-black somnia-gradient-text">{brl(dreamOffer.preco)}</span>
                </div>
                <button onClick={() => nav('/checkout?p=somnia')} className="btn-somnia mt-4 w-full px-6 py-4 text-base">
                  Desbloquear relatório completo →
                </button>
                <p className="mt-2 text-center text-[11px] text-white/40">No checkout você pode adicionar o protocolo de peptídeos (estresse & sono).</p>
              </motion.div>

              <div className="mt-6 flex gap-3">
                <button onClick={() => { setText(''); setResult(null); setPhase('input') }}
                  className="flex-1 rounded-full glass-violet px-6 py-3 text-sm font-semibold text-white/80 hover:text-white">
                  Analisar outro sonho
                </button>
              </div>
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
