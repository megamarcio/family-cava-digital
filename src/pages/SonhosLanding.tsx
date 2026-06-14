import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { dreamFeatures, dejaVu, dreamDisclaimers } from '../data/dreams'
import EcosystemStrip from '../components/EcosystemStrip'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 },
}

export default function SonhosLanding() {
  const nav = useNavigate()
  const start = () => nav('/sonhos/analise')

  return (
    <main className="somnia-bg min-h-screen">
      {/* estrelas decorativas */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {Array.from({ length: 26 }).map((_, i) => (
          <span key={i} className="twinkle absolute h-1 w-1 rounded-full bg-white/70"
            style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`, animationDelay: `${(i % 5) * 0.6}s` }} />
        ))}
      </div>

      {/* NAV */}
      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2 font-extrabold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 text-[#060818]">◓</span>
          <span>ONIRA</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={start} className="btn-somnia px-5 py-2 text-sm">Fazer o quiz grátis</button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative mx-auto max-w-3xl px-5 pb-10 pt-10 text-center md:pt-16">
        <motion.div {...fadeUp}>
          <span className="inline-flex items-center rounded-full glass-violet px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">
            Psicologia do sono · baseado em ciência
          </span>
          <h1 className="mt-6 text-5xl font-black leading-[0.98] md:text-7xl">
            Seus sonhos viram um <span className="somnia-gradient-text">mapa</span> da sua mente.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/65">
            O ONIRA usa um <strong className="text-white">quiz guiado, com vídeo</strong>, e psicologia baseada em evidência para revelar as <strong className="text-white">emoções, símbolos e padrões</strong> por trás do que você sonha — e a relação com o seu estresse e o seu sono. Comece grátis, sem cadastro.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button onClick={start} className="btn-somnia px-8 py-4 text-base">Fazer o quiz grátis →</button>
            <a href="#recursos" className="rounded-full glass-violet px-8 py-4 text-sm font-semibold text-white/80 hover:text-white">Como funciona</a>
          </div>
        </motion.div>
      </section>

      {/* FEATURES (cards como na referência) */}
      <section id="recursos" className="relative mx-auto max-w-2xl space-y-4 px-5 py-10">
        {dreamFeatures.map((f, i) => (
          <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.06 }}
            className="rounded-3xl glass-violet p-7">
            <h3 className="text-2xl font-bold">{f.titulo}</h3>
            <p className="mt-2 text-white/60">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* DÉJÀ VU — explicação científica */}
      <section className="relative mx-auto max-w-2xl px-5 py-10">
        <motion.div {...fadeUp}>
          <h2 className="text-2xl font-black md:text-3xl">{dejaVu.titulo}</h2>
          <p className="mt-3 text-white/65">{dejaVu.intro}</p>
          <div className="mt-5 space-y-3">
            {dejaVu.pontos.map((p, i) => (
              <div key={i} className="rounded-2xl glass-violet p-5">
                <h3 className="font-bold text-cyan-200">{p.titulo}</h3>
                <p className="mt-1 text-sm text-white/65">{p.texto}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* PONTE PARA OS PEPTÍDEOS (venda casada) */}
      <section className="relative mx-auto max-w-2xl px-5 py-10">
        <motion.div {...fadeUp} className="rounded-3xl somnia-glow glass-violet p-7 text-center">
          <div className="text-3xl">🌙</div>
          <h3 className="mt-3 text-xl font-bold">Sonhos intensos costumam ter uma causa fisiológica</h3>
          <p className="mt-2 text-sm text-white/65">
            Estresse e cortisol elevados deixam a amígdala hiperativa e fragmentam o sono REM. Depois da sua análise, mostramos uma abordagem complementar — incluindo os peptídeos ligados ao <strong className="text-white">estresse</strong> e ao <strong className="text-white">sono</strong>.
          </p>
          <button onClick={start} className="btn-somnia mt-5 px-7 py-3 text-sm">Analisar meu sonho agora →</button>
        </motion.div>
      </section>

      <div className="relative"><EcosystemStrip current="onira" /></div>

      <footer className="relative border-t border-white/10 px-5 py-10">
        <div className="mx-auto max-w-2xl text-center text-xs leading-relaxed text-white/40">
          <p>{dreamDisclaimers.completo}</p>
          <p className="mt-3"><Link to="/" className="hover:text-white">Conheça também os Protocolos de Peptídeos →</Link></p>
        </div>
      </footer>
    </main>
  )
}
