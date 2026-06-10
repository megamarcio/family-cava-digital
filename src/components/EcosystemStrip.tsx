import { crossSell, brl, type ProductId } from '../data/catalog'

// Faixa de venda casada: mostra os outros produtos do ecossistema.
export default function EcosystemStrip({ current, titulo = 'Complete sua jornada' }: { current: ProductId; titulo?: string }) {
  const itens = crossSell(current, 3)
  return (
    <section className="mx-auto max-w-5xl px-5 py-12">
      <h2 className="mb-5 text-center text-sm font-bold uppercase tracking-widest text-white/50">{titulo}</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {itens.map((p) => (
          <a key={p.id} href={p.rota}
            className="group rounded-2xl glass-soft p-5 transition hover:-translate-y-1"
            style={{ boxShadow: '0 0 0 1px rgba(255,255,255,.06)' }}>
            <div className="text-2xl">{p.emoji}</div>
            <div className="mt-2 text-[11px] font-bold uppercase tracking-widest" style={{ color: p.to }}>{p.marca}</div>
            <div className="font-bold">{p.nome}</div>
            <p className="mt-1 text-xs text-white/55">{p.tagline}</p>
            <div className="mt-3 text-sm font-semibold" style={{ color: p.to }}>
              {p.recorrente ? `${brl(p.preco)}/mês` : `a partir de ${brl(p.preco)}`} →
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
