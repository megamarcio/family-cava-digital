import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import VideoPlayer from '../components/VideoPlayer'
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

  const dores = Object.entries(goalMeta)

  return (
    <main className="mesh">
      {/* NAV */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2 font-extrabold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-emerald-glow to-lime-glow text-ink">P</span>
          <span>Protocolo<span className="gradient-text">Peptídeos</span></span>
        </div>
        <button onClick={goQuiz} className="btn-primary px-5 py-2 text-sm">Fazer o quiz grátis</button>
      </header>

      {/* HERO */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-8 md:grid-cols-2 md:pt-12">
        <motion.div {...fadeUp}>
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-lime-glow">
            🧬 Baseado em ciência • Protocolo personalizado
          </span>
          <h1 className="mt-5 text-4xl font-black leading-[1.05] md:text-6xl">
            Descubra qual <span className="gradient-text">peptídeo</span> o seu corpo está pedindo
          </h1>
          <p className="mt-5 max-w-md text-lg text-white/70">
            Em 60 segundos, um quiz inteligente identifica a raiz do seu problema —
            gordura teimosa, cansaço, dor, libido ou pele — e te entrega o
            <strong className="text-white"> protocolo exato</strong> para resolver.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button onClick={goQuiz} className="btn-primary px-7 py-4 text-base">
              Quero descobrir meu protocolo →
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
            +12.480 pessoas já descobriram o protocolo delas
          </div>
        </motion.div>

        <motion.div {...fadeUp} className="animate-float">
          <VideoPlayer src={cfg.vslUrl} revealAt={6} onCta={goQuiz} ctaLabel="FAZER O QUIZ AGORA" />
        </motion.div>
      </section>

      {/* MARQUEE benefícios */}
      <div className="overflow-hidden border-y border-white/10 py-4">
        <div className="flex w-max animate-marquee gap-10 px-5 text-sm font-semibold text-white/40">
          {[...marqueeItems, ...marqueeItems].map((m, i) => (
            <span key={i} className="flex items-center gap-2 whitespace-nowrap">✦ {m}</span>
          ))}
        </div>
      </div>

      {/* DORES — descubra a sua */}
      <section id="como" className="mx-auto max-w-6xl px-5 py-20">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-black md:text-4xl">Qual dessas dores é a <span className="gradient-text">sua</span>?</h2>
          <p className="mt-3 text-white/60">Cada problema tem um peptídeo (ou stack) com mecanismo específico. Identifique-se:</p>
        </motion.div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dores.map(([key, meta], i) => (
            <motion.button
              key={key}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              onClick={goQuiz}
              className="group rounded-2xl glass p-6 text-left transition hover:-translate-y-1 hover:card-glow"
            >
              <div className="text-3xl">{meta.emoji}</div>
              <h3 className="mt-3 font-bold" style={{ color: meta.cor }}>{meta.label}</h3>
              <p className="mt-2 text-sm text-white/60">{meta.dor}</p>
              <span className="mt-4 inline-block text-xs font-semibold text-lime-glow opacity-0 transition group-hover:opacity-100">
                Ver meu protocolo →
              </span>
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

      {/* DEPOIMENTOS */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <motion.h2 {...fadeUp} className="text-center text-3xl font-black md:text-4xl">Quem descobriu, mudou</motion.h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.06 }} className="rounded-2xl glass p-6">
              <div className="text-lime-glow">★★★★★</div>
              <p className="mt-3 text-sm text-white/80">"{t.q}"</p>
              <div className="mt-4 text-xs text-white/50">— {t.n}, {t.r}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-4xl px-5 py-20 text-center">
        <motion.div {...fadeUp}>
          <h2 className="text-3xl font-black md:text-5xl">Seu protocolo está a <span className="gradient-text">5 perguntas</span> de distância</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">É gratuito, leva menos de 1 minuto e você sai sabendo exatamente o que fazer.</p>
          <button onClick={goQuiz} className="btn-primary mt-8 px-10 py-5 text-lg">Começar o quiz grátis →</button>
        </motion.div>
      </section>

      {/* FOOTER + DISCLAIMER */}
      <footer className="border-t border-white/10 px-5 py-10">
        <div className="mx-auto max-w-4xl text-center text-xs leading-relaxed text-white/40">
          <p className="mb-3 font-semibold text-white/60">Aviso importante</p>
          <p>
            Conteúdo de caráter educativo e informativo. Peptídeos são, em grande
            parte, comercializados para fins de pesquisa. Nada aqui constitui
            prescrição, diagnóstico ou recomendação médica. Sempre consulte um
            profissional de saúde qualificado antes de iniciar qualquer protocolo.
          </p>
          <p className="mt-4">© {new Date().getFullYear()} Protocolo Peptídeos. Todos os direitos reservados.</p>
        </div>
      </footer>
    </main>
  )
}

const marqueeItems = [
  'Emagrecimento (GLP-1)', 'Recuperação (BPC-157)', 'Energia (NAD+)', 'Pele (GHK-Cu)',
  'Libido (PT-141)', 'Sono profundo (DSIP)', 'Foco (Semax)', 'Massa magra (CJC+Ipa)',
]

const steps = [
  { t: 'Responda 5 perguntas', d: 'Conte o que mais te incomoda. O quiz identifica a raiz — não só o sintoma.' },
  { t: 'Receba seu protocolo', d: 'Qual peptídeo, dosagem de referência, ciclo e sinergias — tudo personalizado.' },
  { t: 'Aplique com segurança', d: 'Passo a passo, fornecedores confiáveis e checklist do que NÃO fazer.' },
]

const stats = [
  { n: '12.480+', l: 'protocolos personalizados gerados' },
  { n: '9 peptídeos', l: 'mapeados por dor e objetivo' },
  { n: '7 dias', l: 'de garantia incondicional' },
]

const testimonials = [
  { q: 'Eu não sabia por onde começar. O protocolo me deu clareza total — em 3 semanas minha disposição mudou.', n: 'Rafael', r: 'energia' },
  { q: 'Finalmente entendi qual peptídeo usar pra minha lesão no ombro. Recuperei o treino.', n: 'Camila', r: 'recuperação' },
  { q: 'O quiz acertou minha dor na mosca. Vale cada centavo pela economia de tempo e dinheiro.', n: 'Diego', r: 'emagrecimento' },
]
