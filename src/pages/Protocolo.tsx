import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import VideoPlayer from '../components/VideoPlayer'
import { loadFunnel, loadConfig } from '../lib/store'
import { goalMeta, protocolForGoals, getProtocolDetail } from '../data/peptides'

export default function Protocolo() {
  const nav = useNavigate()
  const [state] = useState(loadFunnel())
  const cfg = loadConfig()

  // Gate: conteúdo premium liberado apenas após pagamento.
  useEffect(() => {
    if (!state.paid) nav('/resultado', { replace: true })
  }, [state.paid, nav])
  if (!state.paid) return null

  const goals = state.goals?.length ? state.goals : state.goal ? [state.goal] : ['energia' as const]
  const meta = goalMeta[goals[0]]
  const protocolo = protocolForGoals(goals.slice(0, 2))
  const firstName = state.nome ? state.nome.split(' ')[0] : 'tudo certo'

  const suppliersBR = (cfg.suppliers || []).filter((s) => s.pais === 'BR')
  const suppliersUS = (cfg.suppliers || []).filter((s) => s.pais === 'US')

  return (
    <main className="mesh min-h-screen px-5 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Header personalizado */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl card-glow glass p-6 text-center md:p-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300">
            ✓ Acesso liberado
          </span>
          <h1 className="mt-4 text-3xl font-black md:text-4xl">
            {state.nome ? `${firstName}, ` : ''}este é o <span className="gradient-text">seu protocolo</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-white/60">
            Foco principal: <strong style={{ color: meta.cor }}>{meta.label}</strong> {meta.emoji}
            {goals[1] && <> · secundário: <strong style={{ color: goalMeta[goals[1]].cor }}>{goalMeta[goals[1]].label}</strong></>}
          </p>
        </motion.div>

        {/* VÍDEO de manipulação */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mt-8">
          <h2 className="mb-3 text-xl font-bold">🎬 Como manipular peptídeos com segurança</h2>
          <VideoPlayer src={cfg.manipulacaoVideoUrl} title="Aula: manipulação de peptídeos" />
          {!cfg.manipulacaoVideoUrl && (
            <p className="mt-2 text-xs text-white/40">O vídeo da aula será exibido aqui assim que configurado no Admin → Entrega.</p>
          )}
        </motion.section>

        {/* PROTOCOLO detalhado */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-10">
          <h2 className="mb-3 text-xl font-bold">🧬 Seu protocolo detalhado</h2>
          <div className="grid gap-4">
            {protocolo.map((p) => {
              const d = getProtocolDetail(p.id)
              return (
                <div key={p.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-bold">{p.nome}</h3>
                    <span className="text-[11px] text-white/40">{p.categoria}</span>
                  </div>
                  <p className="mt-1 text-xs italic text-lime-glow">{p.tagline}</p>
                  <p className="mt-3 text-sm text-white/70">{p.comoFunciona}</p>
                  {d && (
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <Detail label="Dosagem (referência)" value={d.dosagem} />
                      <Detail label="Ciclo" value={d.ciclo} />
                      <Detail label="Aplicação" value={d.aplicacao} />
                      {d.sinergia && <Detail label="Sinergia" value={d.sinergia} />}
                    </div>
                  )}
                  <p className="mt-3 text-[11px] text-white/40">Evidência: {p.evidencia}</p>
                </div>
              )
            })}
          </div>
        </motion.section>

        {/* FORNECEDORES */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-10">
          <h2 className="mb-3 text-xl font-bold">🤝 Fornecedores confiáveis</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <SupplierCol titulo="🇧🇷 Brasil" lista={suppliersBR} />
            <SupplierCol titulo="🇺🇸 Estados Unidos" lista={suppliersUS} />
          </div>
        </motion.section>

        {/* SEGURANÇA */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mt-10 rounded-2xl border border-amber-300/30 bg-amber-300/5 p-5 text-sm text-white/70">
          <div className="font-bold text-amber-200">⚠️ Checklist de segurança</div>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Confirme a pureza do produto (laudo HPLC) antes de usar.</li>
            <li>Use sempre material estéril e água bacteriostática para reconstituição.</li>
            <li>Comece pela menor dose para avaliar tolerância.</li>
            <li>Conteúdo educativo — valide o protocolo com um profissional de saúde.</li>
          </ul>
        </motion.section>

        <div className="mt-10 text-center">
          {cfg.whatsapp && (
            <a href={`https://wa.me/${cfg.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"
              className="btn-primary inline-block px-8 py-4">Falar com o suporte no WhatsApp</a>
          )}
          <div className="mt-4">
            <Link to="/" className="text-sm text-white/40 hover:text-white">← Voltar ao início</Link>
          </div>
          <p className="mt-6 text-[11px] text-white/30">
            Conteúdo educativo. Não constitui prescrição médica.
          </p>
        </div>
      </div>
    </main>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-black/20 p-3">
      <div className="text-[11px] font-bold uppercase tracking-widest text-lime-glow">{label}</div>
      <div className="mt-1 text-sm text-white/80">{value}</div>
    </div>
  )
}

function SupplierCol({ titulo, lista }: { titulo: string; lista: { nome: string; contato: string; obs?: string }[] }) {
  return (
    <div className="rounded-2xl glass p-5">
      <div className="font-bold">{titulo}</div>
      {lista.length === 0 ? (
        <p className="mt-2 text-sm text-white/40">Em breve — fornecedores sendo cadastrados.</p>
      ) : (
        <ul className="mt-3 space-y-3">
          {lista.map((s, i) => (
            <li key={i} className="rounded-xl bg-white/5 p-3">
              <div className="font-semibold">{s.nome}</div>
              <div className="text-sm text-lime-glow">{s.contato}</div>
              {s.obs && <div className="text-xs text-white/50">{s.obs}</div>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
