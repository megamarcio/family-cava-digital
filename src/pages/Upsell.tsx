import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { upsell, downsell, brl } from '../data/offer'
import { saveFunnel } from '../lib/store'
import { useState } from 'react'

export default function Upsell() {
  const nav = useNavigate()
  const [declined, setDeclined] = useState(false)
  const offer = declined ? downsell : upsell

  function accept() {
    saveFunnel({ upsell: true })
    nav('/protocolo')
  }
  function decline() {
    if (!declined) setDeclined(true) // mostra downsell
    else nav('/protocolo')
  }

  return (
    <main className="mesh min-h-screen px-5 py-10">
      <div className="mx-auto max-w-2xl text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300">
            ✓ Pagamento aprovado! Mas espere…
          </span>
          <h1 className="mt-5 text-3xl font-black md:text-4xl">
            {declined ? 'Que tal uma última opção?' : 'Adicione resultado garantido em 1 clique'}
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-white/60">
            {declined
              ? 'Sem acompanhamento ao vivo, mas com todo o conteúdo avançado em mãos.'
              : 'Você acabou de garantir seu protocolo. Quem combina com acompanhamento tem 3x mais chance de seguir até o fim.'}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="mt-8 rounded-3xl card-glow glass p-6 text-left md:p-8">
          <h2 className="text-2xl font-black">{offer.nome}</h2>
          <p className="mt-2 text-white/60">{offer.descricao}</p>
          <ul className="mt-5 grid gap-2">
            {offer.bullets.map((b, i) => (
              <li key={i} className="flex gap-2 text-sm text-white/80"><span className="text-lime-glow">✓</span>{b}</li>
            ))}
          </ul>
          <div className="mt-6 flex items-end gap-3">
            <span className="text-white/40 line-through">{brl(offer.precoDe!)}</span>
            <span className="text-4xl font-black gradient-text">{brl(offer.preco)}</span>
          </div>
          <button onClick={accept} className="btn-primary mt-6 w-full px-6 py-5 text-lg">
            SIM, ADICIONAR AO MEU PEDIDO →
          </button>
          <button onClick={decline} className="mt-3 w-full text-center text-sm text-white/40 hover:text-white/70">
            {declined ? 'Não, obrigado. Continuar para a entrega' : 'Não quero o acompanhamento, ver outra opção'}
          </button>
        </motion.div>
      </div>
    </main>
  )
}
