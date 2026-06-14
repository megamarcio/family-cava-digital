import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { loadFunnel } from '../lib/store'
import { goalMeta, protocolForGoals } from '../data/peptides'
import { mainOffer, brl, moneyBackDays } from '../data/offer'

export default function Resultado() {
  const nav = useNavigate()
  const [state] = useState(loadFunnel())
  const goals = state.goals?.length ? state.goals : state.goal ? [state.goal] : ['energia' as const]
  const primary = goals[0]
  const meta = goalMeta[primary]
  const protocolo = protocolForGoals(goals.slice(0, 2))

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
          {goals[1] && (
            <p className="mt-2 text-sm text-white/50">
              + foco secundário: <span style={{ color: goalMeta[goals[1]].cor }}>{goalMeta[goals[1]].label}</span>
            </p>
          )}
          <p className="mx-auto mt-3 max-w-xl text-white/60">{meta.dor}</p>
        </motion.div>

        {/* PRÉVIA — só o "cheiro" do protocolo */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="mt-8 rounded-3xl glass p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold uppercase tracking-widest text-lime-glow">Prévia do seu protocolo</div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/60">{protocolo.length} peptídeo(s) indicado(s)</span>
          </div>

          <p className="mt-3 text-sm text-white/60">
            Com base nas suas respostas, identificamos os peptídeos abaixo. Veja a prévia —
            os <strong className="text-white">detalhes completos são liberados após a compra</strong>.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {protocolo.map((p) => (
              <div key={p.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-2">
                    {/* Nome OCULTO — revela "clique para desbloquear" no hover */}
                    <button
                      onClick={() => nav('/checkout')}
                      title="Clique aqui pra desbloquear"
                      className="group relative inline-flex items-center text-left"
                    >
                      <span aria-hidden className="select-none text-lg font-bold blur-[7px]">{p.nome}</span>
                      <span className="absolute inset-0 z-10 hidden items-center justify-center gap-1 whitespace-nowrap rounded-lg bg-ink/85 px-3 text-xs font-bold text-lime-glow backdrop-blur transition group-hover:flex">
                        🔒 Clique aqui pra desbloquear
                      </span>
                    </button>
                    <span className="shrink-0 text-[11px] text-white/40">{p.categoria}</span>
                  </div>
                  <p className="mt-1 text-xs italic text-lime-glow">{p.tagline}</p>
                  {/* Primeiro benefício visível como "isca" */}
                  <p className="mt-3 flex gap-2 text-sm text-white/70"><span className="text-lime-glow">✓</span>{p.beneficios[0]}</p>
                </div>
                {/* Bloco bloqueado (blur) */}
                <div className="relative border-t border-white/10 p-5">
                  <div className="select-none blur-[5px]" aria-hidden>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/40">Dosagem & ciclo</p>
                    <p className="mt-1 text-sm text-white/70">250–500 mcg/dia · ciclo de 4–6 semanas · aplicação subcutânea passo a passo…</p>
                  </div>
                  <button onClick={() => nav('/checkout')} className="group absolute inset-0 grid place-items-center">
                    <span className="flex items-center gap-2 rounded-full bg-ink/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur transition group-hover:bg-lime-glow group-hover:text-ink">
                      🔒 <span className="group-hover:hidden">Liberado após a compra</span><span className="hidden group-hover:inline">Clique aqui pra desbloquear</span>
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* O que está bloqueado */}
          <div className="mt-6 rounded-2xl border border-lime-glow/30 bg-lime-glow/5 p-5">
            <div className="text-sm font-bold text-white">🔓 Ao desbloquear, você recebe uma página personalizada com:</div>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {[
                'Dosagem exata e ciclo de cada peptídeo',
                'Passo a passo de aplicação e sinergias (stacks)',
                'Vídeo ensinando a manipular peptídeos com segurança',
                'Contatos de fornecedores confiáveis no Brasil e nos EUA',
                'Checklist de segurança e o que NÃO fazer',
                'Seu protocolo com o seu nome, acesso vitalício',
              ].map((b, i) => (
                <li key={i} className="flex gap-2 text-sm text-white/80"><span className="text-lime-glow">✓</span>{b}</li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* OFERTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mt-8 rounded-3xl card-glow glass p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-black">Desbloquear meu protocolo completo</h2>
            <div className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold text-red-300">
              Oferta expira em {mm}:{ss}
            </div>
          </div>
          <p className="mt-2 text-white/60">{mainOffer.descricao}</p>
          <div className="mt-6 flex items-end gap-3">
            <span className="text-white/40 line-through">{brl(mainOffer.precoDe!)}</span>
            <span className="text-4xl font-black gradient-text">{brl(mainOffer.preco)}</span>
            <span className="text-sm text-white/50">acesso imediato</span>
          </div>
          <button onClick={() => nav('/checkout')} className="btn-primary mt-6 w-full px-6 py-5 text-lg">
            DESBLOQUEAR AGORA →
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
