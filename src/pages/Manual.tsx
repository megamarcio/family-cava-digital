import { Link } from 'react-router-dom'

const palette = [
  { nome: 'Esmeralda', hex: '#34d399', uso: 'Cor primária / gradiente' },
  { nome: 'Lima', hex: '#a3e635', uso: 'Acento / gradiente' },
  { nome: 'Ink (fundo)', hex: '#04130d', uso: 'Fundo principal' },
  { nome: 'Ink 2', hex: '#08221a', uso: 'Cartões / superfícies' },
  { nome: 'Texto', hex: '#e7f5ee', uso: 'Texto sobre escuro' },
]

const assets = [
  { src: '/brand/pp-emblem.png', label: 'Emblema (principal)', dark: true },
  { src: '/brand/pp-icon.png', label: 'Ícone / favicon', dark: true },
  { src: '/brand/pp-horizontal.png', label: 'Horizontal (cabeçalho)', dark: true },
  { src: '/brand/pp-light.png', label: 'Fundo claro', dark: false },
  { src: '/brand/pp-mono.png', label: 'Monocromático (P&B)', dark: true },
]

export default function Manual() {
  return (
    <main className="mesh min-h-screen px-5 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        {/* Cabeçalho */}
        <div className="flex items-center gap-3">
          <img src="/brand/pp-icon.png" alt="Protocolo Peptídeos" className="h-12 w-12 rounded-xl object-cover" />
          <div>
            <h1 className="text-2xl font-black md:text-3xl">Manual de Marca</h1>
            <p className="text-sm text-white/60">Protocolo<span className="gradient-text">Peptídeos</span> — identidade visual</p>
          </div>
        </div>

        {/* Logos */}
        <section className="mt-10">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-lime-glow">Versões do logo</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {assets.map((a) => (
              <div key={a.src} className="overflow-hidden rounded-2xl border border-white/10">
                <div className={`grid place-items-center p-6 ${a.dark ? 'bg-[#04130d]' : 'bg-[#f6f7f5]'}`}>
                  <img src={a.src} alt={a.label} className="max-h-40 w-auto object-contain" />
                </div>
                <div className="flex items-center justify-between bg-white/5 px-4 py-2 text-sm">
                  <span className="text-white/70">{a.label}</span>
                  <a href={a.src} download className="text-xs font-semibold text-lime-glow">baixar ↓</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Paleta */}
        <section className="mt-12">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-lime-glow">Paleta de cores</h2>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {palette.map((c) => (
              <div key={c.hex} className="overflow-hidden rounded-2xl border border-white/10">
                <div className="h-20" style={{ background: c.hex }} />
                <div className="bg-white/5 p-3">
                  <div className="text-sm font-bold">{c.nome}</div>
                  <div className="font-mono text-xs text-white/60">{c.hex}</div>
                  <div className="mt-1 text-[11px] text-white/40">{c.uso}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-white/10 p-5">
            <div className="text-xs text-white/50">Gradiente da marca</div>
            <div className="mt-2 h-10 rounded-full" style={{ background: 'linear-gradient(100deg,#34d399,#a3e635)' }} />
            <code className="mt-2 block text-xs text-white/50">linear-gradient(100deg, #34d399, #a3e635)</code>
          </div>
        </section>

        {/* Tipografia */}
        <section className="mt-12">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-lime-glow">Tipografia</h2>
          <div className="rounded-2xl border border-white/10 p-6">
            <p className="text-4xl font-black">Aa Bb Cc 0123</p>
            <p className="mt-2 text-white/70">Família: <strong>Inter</strong> (pesos 800/900 para títulos, 400/600 para texto).</p>
            <p className="text-white/60">O logotipo usa um sans-serif geométrico/quadrado; nos textos do site, Inter mantém legibilidade e ar premium.</p>
          </div>
        </section>

        {/* Usos */}
        <section className="mt-12">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-lime-glow">Boas práticas</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/5 p-5">
              <div className="font-bold text-emerald-300">✓ Faça</div>
              <ul className="mt-2 space-y-1 text-sm text-white/70">
                <li>Use o ícone PP isolado em espaços pequenos (avatar, favicon).</li>
                <li>Mantenha uma área de respiro ao redor do logo (mín. a altura do "P").</li>
                <li>Prefira o gradiente sobre fundo escuro; use a versão clara em fundos brancos.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-rose-400/30 bg-rose-400/5 p-5">
              <div className="font-bold text-rose-300">✗ Não faça</div>
              <ul className="mt-2 space-y-1 text-sm text-white/70">
                <li>Não distorça, gire ou troque as cores do gradiente.</li>
                <li>Não aplique o logo escuro sobre fundo escuro (use o monocromático).</li>
                <li>Não adicione sombras/efeitos fora dos definidos.</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="mt-12 text-center">
          <Link to="/" className="text-sm text-white/50 hover:text-white">← Voltar ao site</Link>
        </div>
      </div>
    </main>
  )
}
