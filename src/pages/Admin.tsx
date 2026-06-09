import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { taskGroups } from '../data/tasks'
import { competitors, insights, priceSuggestion } from '../data/research'
import { mainOffer, orderBump, upsell, downsell, brl } from '../data/offer'
import {
  loadDoneTasks, toggleTask, loadConfig, saveConfig, type AdminConfig, type Supplier,
} from '../lib/store'

type Tab = 'overview' | 'tasks' | 'pay' | 'video' | 'delivery' | 'offer' | 'research'

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'overview', label: 'Visão geral', icon: '📊' },
  { id: 'tasks', label: 'Tarefas', icon: '✅' },
  { id: 'pay', label: 'Pagamentos', icon: '💳' },
  { id: 'video', label: 'Vídeos', icon: '🎬' },
  { id: 'delivery', label: 'Entrega', icon: '📦' },
  { id: 'offer', label: 'Oferta & Preço', icon: '🏷️' },
  { id: 'research', label: 'Pesquisa', icon: '🔬' },
]

export default function Admin() {
  const [tab, setTab] = useState<Tab>('overview')
  const [done, setDone] = useState(loadDoneTasks())
  const [cfg, setCfg] = useState<AdminConfig>(loadConfig())

  const allTasks = useMemo(() => taskGroups.flatMap((g) => g.tarefas), [])
  const completed = allTasks.filter((t) => done[t.id]).length
  const pct = Math.round((completed / allTasks.length) * 100)

  function flip(id: string) { setDone({ ...toggleTask(id) }) }
  function setField(patch: Partial<AdminConfig>) { setCfg(saveConfig(patch)) }

  const suppliers = cfg.suppliers || []
  function addSupplier(pais: 'BR' | 'US') {
    setField({ suppliers: [...suppliers, { nome: '', pais, contato: '', obs: '' }] })
  }
  function updateSupplier(index: number, patch: Partial<Supplier>) {
    const next = suppliers.map((s, i) => (i === index ? { ...s, ...patch } : s))
    setField({ suppliers: next })
  }
  function removeSupplier(index: number) {
    setField({ suppliers: suppliers.filter((_, i) => i !== index) })
  }

  return (
    <div className="min-h-screen md:flex">
      {/* Sidebar */}
      <aside className="border-b border-white/10 md:w-60 md:border-b-0 md:border-r">
        <div className="flex items-center gap-2 px-5 py-5 font-extrabold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-emerald-glow to-lime-glow text-ink">P</span>
          Admin
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 no-scrollbar md:flex-col md:px-3">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold transition ${
                tab === t.id ? 'bg-lime-glow/15 text-lime-glow' : 'text-white/60 hover:bg-white/5'
              }`}>
              <span>{t.icon}</span>{t.label}
            </button>
          ))}
        </nav>
        <div className="hidden px-5 py-4 md:block">
          <Link to="/" className="text-xs text-white/40 hover:text-white">← Ver o funil</Link>
        </div>
      </aside>

      {/* Content */}
      <main className="mesh flex-1 px-5 py-6 md:px-10">
        {tab === 'overview' && (
          <Overview pct={pct} completed={completed} total={allTasks.length} cfg={cfg} setTab={setTab} />
        )}

        {tab === 'tasks' && (
          <div>
            <H title="Passo a passo para o funil vender" sub="Marque conforme avança. Salvo automaticamente no seu navegador." />
            <div className="mb-6 flex items-center gap-3">
              <div className="h-2 w-full max-w-md overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-glow to-lime-glow" style={{ width: `${pct}%` }} />
              </div>
              <span className="text-sm font-bold">{pct}%</span>
            </div>
            <div className="grid gap-5">
              {taskGroups.map((g) => (
                <div key={g.id} className="rounded-2xl glass p-5">
                  <div className="font-bold text-lime-glow">{g.fase}</div>
                  <p className="mb-3 text-sm text-white/50">{g.descricao}</p>
                  <div className="grid gap-2">
                    {g.tarefas.map((t) => (
                      <label key={t.id} className="flex cursor-pointer gap-3 rounded-xl border border-white/10 bg-white/5 p-3 hover:border-white/20">
                        <input type="checkbox" checked={!!done[t.id]} onChange={() => flip(t.id)} className="mt-1 h-5 w-5 accent-lime-glow" />
                        <div>
                          <div className={`font-semibold ${done[t.id] ? 'text-white/40 line-through' : ''}`}>{t.titulo}</div>
                          <div className="text-xs text-white/50">{t.detalhe}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'pay' && (
          <div>
            <H title="Configurar pagamentos" sub="Globalpay e Nox Pay. As chaves ficam salvas no seu navegador (demo). Em produção, use um backend / variáveis de ambiente — nunca exponha a chave secreta no front-end." />
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Globalpay — Chave de API" value={cfg.globalpayKey} onChange={(v) => setField({ globalpayKey: v })} placeholder="gp_live_xxx" />
              <Field label="Nox Pay — Chave de API" value={cfg.noxpayKey} onChange={(v) => setField({ noxpayKey: v })} placeholder="nox_live_xxx" />
              <Field label="Chave PIX (recebimento)" value={cfg.pixKey} onChange={(v) => setField({ pixKey: v })} placeholder="email/cnpj/aleatória" />
              <Field label="WhatsApp de suporte" value={cfg.whatsapp} onChange={(v) => setField({ whatsapp: v })} placeholder="+55 11 9...." />
            </div>
            <div className="mt-6 rounded-2xl border border-amber-300/30 bg-amber-300/5 p-5 text-sm text-white/70">
              <div className="mb-2 font-bold text-amber-200">Como integrar (resumo técnico)</div>
              <ol className="list-decimal space-y-1 pl-5">
                <li>Crie uma rota de backend (ex.: <code>/api/checkout</code>) que recebe o pedido e chama a API do gateway escolhido.</li>
                <li>Gere a cobrança (PIX/cartão) com a <strong>chave secreta no servidor</strong>.</li>
                <li>Configure o <strong>webhook</strong> do Globalpay/Nox Pay para <code>/api/webhook</code>.</li>
                <li>Ao receber "pago", libere o entregável e redirecione para o upsell.</li>
                <li>Dispare e-mail de entrega + evento de conversão (Pixel/GA4).</li>
              </ol>
            </div>
          </div>
        )}

        {tab === 'video' && (
          <div>
            <H title="Vídeos do funil" sub="Cole a URL do embed (YouTube/Vimeo) ou um .mp4. Sem URL, roda a simulação de demonstração." />
            <div className="grid gap-5">
              <Field label="VSL da Landing Page" value={cfg.vslUrl} onChange={(v) => setField({ vslUrl: v })} placeholder="https://www.youtube.com/embed/..." />
              <Field label="Vídeo de abertura do Quiz (peptídeos)" value={cfg.quizVideoUrl} onChange={(v) => setField({ quizVideoUrl: v })} placeholder="https://player.vimeo.com/video/..." />
              <Field label="Vídeo de abertura do Quiz (ONIRA / sonhos)" value={cfg.oniraVideoUrl} onChange={(v) => setField({ oniraVideoUrl: v })} placeholder="https://www.youtube.com/embed/..." />
              <Field label="Vídeo de manipulação (página pós-compra)" value={cfg.manipulacaoVideoUrl} onChange={(v) => setField({ manipulacaoVideoUrl: v })} placeholder="https://www.youtube.com/embed/..." />
            </div>
            <p className="mt-4 text-xs text-white/40">Dica: para VSL, hospede em plataforma que mostre retenção (ex.: VTurb, Vimeo). O CTA aparece sozinho no tempo certo no player de demonstração.</p>
          </div>
        )}

        {tab === 'delivery' && (
          <div>
            <H title="Entrega (página pós-compra)" sub="Tudo isto aparece SOMENTE para quem pagou, na página personalizada /protocolo: vídeo de manipulação + fornecedores." />

            <div className="mb-6">
              <Field label="Vídeo: como manipular peptídeos" value={cfg.manipulacaoVideoUrl} onChange={(v) => setField({ manipulacaoVideoUrl: v })} placeholder="https://www.youtube.com/embed/..." />
            </div>

            {(['BR', 'US'] as const).map((pais) => (
              <div key={pais} className="mb-6">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-bold">{pais === 'BR' ? '🇧🇷 Fornecedores — Brasil' : '🇺🇸 Fornecedores — EUA'}</h3>
                  <button onClick={() => addSupplier(pais)} className="rounded-full bg-lime-glow/15 px-4 py-2 text-sm font-semibold text-lime-glow hover:bg-lime-glow/25">
                    + Adicionar
                  </button>
                </div>
                <div className="grid gap-3">
                  {suppliers.map((s, i) => s.pais === pais ? (
                    <div key={i} className="rounded-2xl glass p-4">
                      <div className="grid gap-3 md:grid-cols-2">
                        <input value={s.nome} onChange={(e) => updateSupplier(i, { nome: e.target.value })} placeholder="Nome do fornecedor"
                          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-lime-glow" />
                        <input value={s.contato} onChange={(e) => updateSupplier(i, { contato: e.target.value })} placeholder="Contato (site, WhatsApp, e-mail)"
                          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-lime-glow" />
                      </div>
                      <div className="mt-3 flex gap-3">
                        <input value={s.obs || ''} onChange={(e) => updateSupplier(i, { obs: e.target.value })} placeholder="Observação (ex.: laudo HPLC, prazo, frete)"
                          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-lime-glow" />
                        <button onClick={() => removeSupplier(i)} className="rounded-xl border border-red-400/30 px-4 text-sm text-red-300 hover:bg-red-400/10">
                          Remover
                        </button>
                      </div>
                    </div>
                  ) : null)}
                  {!suppliers.some((s) => s.pais === pais) && (
                    <p className="rounded-xl glass p-4 text-sm text-white/40">Nenhum fornecedor cadastrado ainda. Clique em “+ Adicionar”.</p>
                  )}
                </div>
              </div>
            ))}
            <p className="text-xs text-white/40">Salvo automaticamente no navegador. Em produção, mova para o backend para controlar o acesso de quem pagou.</p>
          </div>
        )}

        {tab === 'offer' && (
          <div>
            <H title="Estrutura da oferta (Value Ladder)" sub="Preços sugeridos com base na pesquisa. Edite em src/data/offer.ts." />
            <div className="grid gap-4 md:grid-cols-2">
              <OfferCard tag="Principal (low ticket)" item={mainOffer} />
              <OfferCard tag="Order bump (no checkout)" item={orderBump} />
              <OfferCard tag="Upsell (1-clique)" item={upsell} />
              <OfferCard tag="Downsell (recusa do upsell)" item={downsell} />
            </div>
            <div className="mt-6 rounded-2xl glass p-5 text-sm text-white/70">
              <div className="mb-2 font-bold text-lime-glow">Sugestões de preço & metas</div>
              <ul className="space-y-1">
                {Object.values(priceSuggestion).map((s, i) => <li key={i}>• {s}</li>)}
              </ul>
            </div>
          </div>
        )}

        {tab === 'research' && (
          <div>
            <H title="Pesquisa de mercado & concorrentes" sub="Resumo do que embasou este funil." />
            <div className="grid gap-4 md:grid-cols-2">
              {insights.map((ins, i) => (
                <div key={i} className="rounded-2xl glass p-5">
                  <div className="font-bold text-lime-glow">{ins.titulo}</div>
                  <p className="mt-1 text-sm text-white/70">{ins.texto}</p>
                </div>
              ))}
            </div>
            <h3 className="mt-8 mb-3 text-lg font-bold">Concorrentes mapeados</h3>
            <div className="grid gap-3">
              {competitors.map((c, i) => (
                <a key={i} href={c.url} target="_blank" rel="noreferrer"
                  className="block rounded-xl glass p-4 transition hover:border-white/30">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{c.nome}</span>
                    <span className="text-xs text-lime-glow">{c.url} ↗</span>
                  </div>
                  <p className="mt-1 text-sm text-white/60">{c.observacao}</p>
                </a>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function Overview({ pct, completed, total, cfg, setTab }: {
  pct: number; completed: number; total: number; cfg: AdminConfig; setTab: (t: Tab) => void
}) {
  const checks = [
    { ok: !!cfg.globalpayKey || !!cfg.noxpayKey, label: 'Gateway de pagamento configurado' },
    { ok: !!cfg.vslUrl, label: 'VSL da landing configurada' },
    { ok: !!cfg.quizVideoUrl, label: 'Vídeo do quiz configurado' },
    { ok: !!cfg.manipulacaoVideoUrl, label: 'Vídeo de manipulação configurado' },
    { ok: (cfg.suppliers || []).length > 0, label: 'Fornecedores cadastrados' },
    { ok: !!cfg.pixKey, label: 'Chave PIX cadastrada' },
  ]
  return (
    <div>
      <H title="Visão geral do funil" sub="O painel de comando do seu lançamento de Peptídeos." />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl card-glow glass p-6">
          <div className="text-sm text-white/50">Progresso das tarefas</div>
          <div className="mt-1 text-4xl font-black gradient-text">{pct}%</div>
          <div className="mt-1 text-xs text-white/40">{completed} de {total} concluídas</div>
          <button onClick={() => setTab('tasks')} className="mt-4 text-sm font-semibold text-lime-glow">Ver tarefas →</button>
        </div>
        <div className="rounded-2xl glass p-6 md:col-span-2">
          <div className="text-sm text-white/50">Prontidão técnica</div>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {checks.map((c, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <span className={c.ok ? 'text-lime-glow' : 'text-white/30'}>{c.ok ? '●' : '○'}</span>
                <span className={c.ok ? '' : 'text-white/50'}>{c.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h3 className="mt-8 mb-3 text-lg font-bold">O funil, ponta a ponta</h3>
      <div className="grid gap-3 md:grid-cols-5">
        {[
          { n: '1. Landing/VSL', d: 'Atrai e qualifica', to: '/' },
          { n: '2. Quiz', d: 'Descobre a dor', to: '/quiz' },
          { n: '3. Resultado', d: 'Protocolo + oferta', to: '/resultado' },
          { n: '4. Checkout', d: 'Pgto + order bump', to: '/checkout' },
          { n: '5. Upsell', d: 'Maximiza o ticket', to: '/upsell' },
        ].map((s, i) => (
          <Link key={i} to={s.to} className="rounded-xl glass p-4 transition hover:-translate-y-1 hover:card-glow">
            <div className="font-bold text-lime-glow">{s.n}</div>
            <div className="text-xs text-white/60">{s.d}</div>
            <div className="mt-2 text-xs text-white/40">Abrir ↗</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function H({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-black md:text-3xl">{title}</h1>
      {sub && <p className="mt-1 max-w-2xl text-sm text-white/50">{sub}</p>}
    </div>
  )
}

function Field({ label, value, onChange, placeholder }: {
  label: string; value?: string; onChange: (v: string) => void; placeholder?: string
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-widest text-white/40">{label}</span>
      <input value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-lime-glow" />
    </label>
  )
}

function OfferCard({ tag, item }: { tag: string; item: typeof mainOffer }) {
  return (
    <div className="rounded-2xl glass p-5">
      <div className="text-xs font-bold uppercase tracking-widest text-lime-glow">{tag}</div>
      <div className="mt-1 font-bold">{item.nome}</div>
      <div className="mt-1 flex items-end gap-2">
        {item.precoDe && <span className="text-sm text-white/40 line-through">{brl(item.precoDe)}</span>}
        <span className="text-2xl font-black gradient-text">{brl(item.preco)}</span>
      </div>
      <p className="mt-2 text-xs text-white/50">{item.descricao}</p>
    </div>
  )
}
