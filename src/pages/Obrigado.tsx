import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { loadFunnel } from '../lib/store'
import { goalMeta } from '../data/peptides'

export default function Obrigado() {
  const state = loadFunnel()
  const meta = state.goal ? goalMeta[state.goal] : undefined

  return (
    <main className="mesh grid min-h-screen place-items-center px-5 py-10">
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl rounded-3xl card-glow glass p-8 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-emerald-glow to-lime-glow text-3xl text-ink">✓</div>
        <h1 className="mt-5 text-3xl font-black">Tudo certo{state.nome ? `, ${state.nome.split(' ')[0]}` : ''}! 🎉</h1>
        <p className="mt-3 text-white/60">
          Seu protocolo {meta ? <strong style={{ color: meta.cor }}>{meta.label}</strong> : ''} foi liberado.
          Enviamos o acesso para <strong className="text-white">{state.email || 'seu e-mail'}</strong>.
        </p>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-left text-sm text-white/70">
          <div className="font-bold text-white">Próximos passos:</div>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>Confira sua caixa de entrada (e o spam).</li>
            <li>Leia o protocolo completo antes de iniciar.</li>
            <li>Consulte um profissional de saúde para validar.</li>
          </ol>
        </div>

        <Link to="/" className="btn-primary mt-7 inline-block px-8 py-4">Voltar ao início</Link>
        <p className="mt-4 text-[11px] text-white/30">
          Conteúdo educativo. Não constitui prescrição médica.
        </p>
      </motion.div>
    </main>
  )
}
