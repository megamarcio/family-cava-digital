import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import VideoPlayer from '../components/VideoPlayer'
import EcosystemStrip from '../components/EcosystemStrip'
import { loadConfig } from '../lib/store'
import { goalMeta } from '../data/peptides'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 },
}

export default function Landing() {
  const nav = useNavigate()
  const cfg = loadConfig()
  const goQuiz = () => nav('/quiz')

  const categorias = Object.entries(goalMeta)

  return (
    <main className="mesh">
      {/* NAV */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2 font-extrabold tracking-tight">
          <img src="/brand/pp-icon.png" alt="Protocolo Peptídeos" className="h-9 w-9 rounded-lg object-cover" />
          <span>Protocolo<span className="gradient-text">Peptídeos</span></span>
        </div>
        <button onClick={goQuiz} className="btn-primary px-5 py-2 text-sm">Fazer o quiz grátis</button>
      </header>

      {/* HERO — enquadramento educativo/curiosidade (compliant Meta) */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-8 md:grid-cols-2 md:pt-12">
        <motion.div {...fadeUp}>
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-lime-glow">
            🧬 Conteúdo educativo • Baseado em ciência
          </span>
          <h1 className="mt-5 text-4xl font-black leading-[1.05] md:text-6xl">
            Qual categoria de <span className="gradient-text">peptídeos</span> combina com os seus objetivos?
          </h1>
          <p className="mt-5 max-w-md text-lg text-white/70">
            Existem dezenas de peptídeos sendo estudados para performance, recuperação,
            longevidade e estética. Responda 6 perguntas e receba um
            <strong className="text-white"> guia educativo personalizado</strong> sobre o tema.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button onClick={goQuiz} className="btn-primary px-7 py-4 text-base">
              Fazer o quiz grátis →
            </button>
            <a href="#como" className="rounded-full glass px-7 py-4 text-center text-sm font-semibold text-white/80 hover:text-white">
              Como funciona
            </a>
          </div>
          <div className="mt-6 flex items-center gap-4 text-xs text-white/50">
            <div className="flex -space-x-2">
              {['🧑🏽','👩🏼','🧔🏻','👩🏾'].map((e, i) => (
                <span key={i} className="grid h-7 w-7 place-items-center rounded-full bg-white/10 ring-2 ring-ink">{e}</span>
              ))}
            </div>
            +12.480 pessoas já fizeram o quiz educativo
          </div>
        </motion.div>

        <motion.div {...fadeUp} className="animate-float">
          <VideoPlayer src={cfg.vslUrl} revealAt={6} onCta={goQuiz} ctaLabel="FAZER O QUIZ AGORA" />
        </motion.div>
      </section>

      {/* MARQUEE — categorias (educacional) */}
      <div className="overflow-hidden border-y border-white/10 py-4">
        <div className="flex w-max animate-marquee gap-10 px-5 text-sm font-semibold text-white/40">
          {[...marqueeItems, ...marqueeItems].map((m, i) => (
            <span key={i} className="flex items-center gap-2 whitespace-nowrap">✦ {m}</span>
          ))}
        </div>
      </div>

      {/* PONTE — ONIRA (venda casada, sem atributo pessoal) */}
      <section className="mx-auto max-w-6xl px-5 pt-12">
        <motion.a href="/sonhos" {...fadeUp}
          className="flex flex-col items-center justify-between gap-4 rounded-3xl border border-violet-400/20 bg-gradient-to-r from-violet-500/10 to-cyan-400/10 p-6 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-4">
            <span className="text-3xl">🌙</span>
            <div>
              <h3 className="font-bold">Curioso sobre o que a ciência diz dos sonhos?</h3>
              <p className="text-sm text-white/60">Conheça o ONIRA — análise de sonhos baseada em psicologia, sem misticismo. Um quiz educativo sobre a sua mente.</p>
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-5 py-2 text-sm font-bold text-[#060818]">Conhecer o ONIRA →</span>
        </motion.a>
      </section>

      {/* CATEGORIAS / OBJETIVOS (neutro, sem claim de condição) */}
      <section id="como" className="mx-auto max-w-6xl px-5 py-20">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-black md:text-4xl">Explore por <span className="gradient-text">objetivo</span></h2>
          <p className="mt-3 text-white/60">Cada categoria reúne peptídeos estudados para um foco específico. Escolha por onde começar a aprender:</p>
        </motion.div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categorias.map(([key, meta], i) => (
            <motion.button
              key={key}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onClick={goQuiz}
              className="group overflow-hidden rounded-2xl glass text-left transition hover:-translate-y-1 hover:card-glow"
            >
              <div className="relative h-28 w-full overflow-hidden">
                <img src={meta.img} alt={meta.objetivo} loading="lazy" decoding="async"
                  className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, #04130d)' }} />
                <span className="absolute left-3 top-3 text-2xl drop-shadow">{meta.emoji}</span>
              </div>
              <div className="p-6 pt-4">
                <h3 className="font-bold" style={{ color: meta.cor }}>{meta.objetivo}</h3>
                <p className="mt-2 text-sm text-white/60">{meta.publicDesc}</p>
                <span className="mt-4 inline-block text-xs font-semibold text-lime-glow opacity-0 transition group-hover:opacity-100">
                  Explorar categoria →
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA 3 passos */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }} className="rounded-2xl glass p-6">
              <div className="text-sm font-bold text-lime-glow">PASSO {i + 1}</div>
              <h3 className="mt-2 text-xl font-bold">{s.t}</h3>
              <p className="mt-2 text-sm text-white/60">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROVA / AUTORIDADE */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <motion.div {...fadeUp} className="rounded-3xl glass p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-3">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-black gradient-text">{s.n}</div>
                <div className="mt-1 text-sm text-white/60">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* DEPOIMENTOS — sobre o conteúdo/clareza, não resultados de saúde */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <motion.h2 {...fadeUp} className="text-center text-3xl font-black md:text-4xl">O que dizem sobre o material</motion.h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.06 }} className="rounded-2xl glass p-6">
              <div className="text-lime-glow">★★★★★</div>
              <p className="mt-3 text-sm text-white/80">"{t.q}"</p>
              <div className="mt-4 text-xs text-white/50">— {t.n}, {t.r}</div>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 text-center text-[11px] text-white/30">Depoimentos referem-se à qualidade do conteúdo educativo, não a resultados de saúde.</p>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-4xl px-5 py-20 text-center">
        <motion.div {...fadeUp}>
          <h2 className="text-3xl font-black md:text-5xl">Seu guia educativo está a <span className="gradient-text">6 perguntas</span> de distância</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">É gratuito, leva menos de 1 minuto e você sai com um panorama claro do tema.</p>
          <button onClick={goQuiz} className="btn-primary mt-8 px-10 py-5 text-lg">Começar o quiz grátis →</button>
        </motion.div>
      </section>

      <EcosystemStrip current="peptides" titulo="Faz parte do ecossistema Mente–Sono–Corpo" />

      {/* FOOTER + DISCLAIMER (padrão compliance §0.1) */}
      <footer className="border-t border-white/10 px-5 py-10">
        <div className="mx-auto max-w-4xl text-center text-xs leading-relaxed text-white/40">
          <p className="mb-3 font-semibold text-white/60">Aviso importante</p>
          <p>
            Conteúdo de caráter educativo e informativo. <strong className="text-white/60">Não se destina a
            diagnosticar, tratar, curar ou prevenir qualquer doença</strong> e não substitui orientação médica.
            Peptídeos são, em grande parte, comercializados para fins de pesquisa; muitos são investigacionais e
            não aprovados por agências regulatórias. Sempre consulte um profissional de saúde qualificado.
          </p>
          <p className="mt-4">© {new Date().getFullYear()} Protocolo Peptídeos. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  )
}

const marqueeItems = [
  'Metabolismo (GLP-1)', 'Recuperação (BPC-157)', 'Energia (NAD+)', 'Pele (GHK-Cu)',
  'Vitalidade (PT-141)', 'Sono (DSIP)', 'Foco (Semax)', 'Performance (CJC+Ipa)',
]

const steps = [
  { t: 'Responda 6 perguntas', d: 'Perguntas rápidas sobre os seus objetivos e a sua familiaridade com o tema.' },
  { t: 'Receba seu guia', d: 'Um panorama educativo da categoria de peptídeos que mais combina com o seu objetivo.' },
  { t: 'Aprofunde com segurança', d: 'O que a ciência diz, o status regulatório e o que levar para conversar com o seu médico.' },
]

const stats = [
  { n: '12.480+', l: 'quizzes educativos respondidos' },
  { n: '10 peptídeos', l: 'explicados de forma didática' },
  { n: '7 dias', l: 'de garantia incondicional' },
]

const testimonials = [
  { q: 'Finalmente entendi as diferenças entre as categorias sem achismo. Material muito didático.', n: 'Rafael', r: 'leitor' },
  { q: 'O guia me deu clareza para chegar no consultório com as perguntas certas.', n: 'Camila', r: 'leitora' },
  { q: 'Conteúdo sério e direto ao ponto. Aprendi bastante sobre o tema em poucos minutos.', n: 'Diego', r: 'leitor' },
]
