import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import ParticlesBackground from '../components/ParticlesBackground'
import ScrollReveal from '../components/ScrollReveal'
import MagneticButton from '../components/MagneticButton'
import TiltCard from '../components/TiltCard'
import Footer from '../components/Footer'
import { useTextScramble } from '../hooks/useTextScramble'
import { useTypewriter } from '../hooks/useTypewriter'
import { useCountUp } from '../hooks/useCountUp'
import { useSEO } from '../hooks/useSEO'
import { EMAIL, GITHUB, INSTAGRAM, LINKEDIN, WHATSAPP_DISPLAY, whatsappLink } from '../config/contact'

const ROLES = [
  'Front-End Developer',
  'React Specialist',
  'UI/UX Enthusiast',
  'Computer Science Student',
]

const SKILLS = {
  Frontend: [
    { name: 'React', icon: 'devicon-react-original' },
    { name: 'TypeScript', icon: 'devicon-typescript-plain' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain' },
    { name: 'HTML5', icon: 'devicon-html5-plain' },
    { name: 'CSS3', icon: 'devicon-css3-plain' },
    { name: 'Tailwind', icon: 'devicon-tailwindcss-plain' },
    { name: 'Sass', icon: 'devicon-sass-original' },
    { name: 'Vite', icon: 'devicon-vitejs-plain' },
    { name: 'Next.js', icon: 'devicon-nextjs-plain' },
    { name: 'Framer Motion', icon: 'devicon-framer-plain' },
  ],
  'Backend e mobile': [
    { name: 'Node.js', icon: 'devicon-nodejs-plain' },
    { name: 'PostgreSQL', icon: 'devicon-postgresql-plain' },
    { name: 'Python', icon: 'devicon-python-plain' },
    { name: 'Java', icon: 'devicon-java-plain' },
    { name: 'Clojure', icon: 'devicon-clojure-plain' },
    { name: 'React Native', icon: 'devicon-react-original' },
  ],
  Ferramentas: [
    { name: 'Git', icon: 'devicon-git-plain' },
    { name: 'GitHub', icon: 'devicon-github-original' },
    { name: 'VS Code', icon: 'devicon-vscode-plain' },
    { name: 'Figma', icon: 'devicon-figma-plain' },
    { name: 'Android Studio', icon: 'devicon-androidstudio-plain' },
  ],
}

const EXPERIENCE = [
  {
    role: 'Desenvolvedor Front-End',
    company: 'Sistema Verdes Mares',
    period: 'Mar 2025 — Dez 2025',
    desc: 'Manutenção e evolução de interfaces do maior portal de notícias do Ceará, com React e TypeScript. Foco em performance, acessibilidade e consistência visual em produtos de alto tráfego.',
    tags: ['React', 'TypeScript', 'Next.js', 'Performance'],
  },
  {
    role: 'Bolsista de Iniciação Científica',
    company: 'Unifor',
    period: 'Ago 2024 — Fev 2025',
    desc: 'Pesquisa aplicada com desenvolvimento de protótipos web e análise de dados, unindo teoria acadêmica e prática de engenharia de software.',
    tags: ['Pesquisa', 'Python', 'Prototipagem'],
  },
  {
    role: 'Bacharelado em Ciências da Computação — 5º semestre',
    company: 'Unifor',
    period: 'Jan 2024 — Dez 2027 · Cursando',
    desc: 'Formação sólida em estruturas de dados, algoritmos, POO com Java, desenvolvimento web full stack e paradigma funcional com Clojure. Participação ativa em projetos acadêmicos com foco em sistemas reais e aplicáveis ao mercado.',
    tags: ['Java', 'Python', 'Clojure', 'Algoritmos', 'Estruturas de Dados'],
  },
]

const LEARNING = [
  {
    title: 'React Native',
    desc: 'Desenvolvimento mobile cross-platform com a mesma base React',
    icon: 'devicon-react-original',
  },
  {
    title: 'Estruturas de dados',
    desc: 'Grafos, árvores, algoritmos de busca e ordenação',
    icon: 'devicon-python-plain',
  },
  {
    title: 'Clojure',
    desc: 'Programação funcional com Lisp moderno na JVM',
    icon: 'devicon-clojure-plain',
  },
  {
    title: 'Node e PostgreSQL',
    desc: 'APIs REST robustas com banco relacional em produção',
    icon: 'devicon-postgresql-plain',
  },
]

function ProfilePhoto() {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div
        style={{
          width: '100%',
          aspectRatio: '3/4',
          background: 'var(--sand)',
          borderRadius: 'var(--r-media)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span className="display" style={{ fontSize: '4rem', color: 'var(--sea)' }}>
          VD
        </span>
      </div>
    )
  }

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      style={{ position: 'relative', borderRadius: 'var(--r-media)', overflow: 'hidden', aspectRatio: '3/4' }}
    >
      <motion.img
        src="/images/profile.png"
        alt="Vinícius Dourado"
        loading="lazy"
        onError={() => setError(true)}
        variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <motion.div
        variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute',
          inset: 0,
          border: '2px solid var(--gold)',
          borderRadius: 'var(--r-media)',
          pointerEvents: 'none',
        }}
      />
    </motion.div>
  )
}

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: count } = useCountUp(value)

  return (
    <TiltCard
      style={{
        background: 'var(--sand)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--r-input)',
        padding: '1.5rem',
        flex: 1,
        minWidth: 150,
      }}
    >
      <p
        ref={ref as React.RefObject<HTMLParagraphElement>}
        className="display"
        style={{ fontSize: '2.5rem', color: 'var(--gold-deep)' }}
      >
        {count}
        {suffix}
      </p>
      <p className="fs-small" style={{ color: 'var(--sea-soft)', marginTop: '0.35rem' }}>
        {label}
      </p>
    </TiltCard>
  )
}

function SkillIcon({ name, icon }: { name: string; icon: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ scale: 1.15 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      data-cursor-hover
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        width: 84,
      }}
    >
      <i className={`${icon} colored`} style={{ fontSize: '2.5rem' }} />
      <span className="fs-small" style={{ color: 'var(--sea-soft)', fontSize: '0.8rem' }}>
        {name}
      </span>
      <motion.span
        initial={false}
        animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ type: 'spring', stiffness: 400, damping: 26 }}
        style={{
          position: 'absolute',
          bottom: '108%',
          left: '50%',
          translateX: '-50%',
          background: 'var(--sea)',
          color: '#fff',
          borderRadius: 'var(--r-pill)',
          padding: '0.3rem 0.75rem',
          fontSize: '0.75rem',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        {name}
      </motion.span>
    </motion.div>
  )
}

export default function About() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const name = useTextScramble('Vinícius Dourado', 1200)
  const role = useTypewriter(ROLES, 75, 2000)

  useSEO({
    title: 'Vinícius Dourado — Desenvolvedor front-end | Dourado Studio',
    description:
      'Trajetória de Vinícius Dourado: desenvolvedor front-end em Fortaleza, com experiência no Sistema Verdes Mares e formação em Ciências da Computação na Unifor.',
    path: '/sobre',
  })

  const { scrollY } = useScroll()
  const nameY = useTransform(scrollY, [0, 500], [0, -150])
  const badgeY = useTransform(scrollY, [0, 500], [0, -90])
  const particleY = useTransform(scrollY, [0, 500], [0, -25])

  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.8', 'end 0.2'],
  })
  const timelineScaleY = useTransform(timelineProgress, [0, 1], [0, 1])

  const [clock, setClock] = useState('')
  useEffect(() => {
    const update = () =>
      setClock(
        new Date().toLocaleTimeString('pt-BR', {
          timeZone: 'America/Fortaleza',
          hour: '2-digit',
          minute: '2-digit',
        })
      )
    update()
    const id = setInterval(update, 1000 * 30)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <main>
        {/* Hero */}
        <section
          style={{
            position: 'relative',
            minHeight: 'calc(100svh - 72px)',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            background:
              'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(217,162,27,0.12) 0%, transparent 70%), var(--white)',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(rgba(14,44,63,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(14,44,63,0.045) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          <motion.div style={{ y: particleY, position: 'absolute', inset: 0 }} aria-hidden="true">
            <ParticlesBackground />
          </motion.div>

          <div className="container-x" style={{ position: 'relative', zIndex: 1, paddingBlock: '5rem' }}>
            <motion.div style={{ y: badgeY }}>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="fs-small"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(217,162,27,0.14)',
                  border: '1px solid rgba(217,162,27,0.4)',
                  borderRadius: 'var(--r-pill)',
                  padding: '0.35rem 0.9rem',
                  color: 'var(--gold-deep)',
                  marginBottom: '2rem',
                  fontWeight: 600,
                }}
              >
                <span
                  className="pulse-dot"
                  style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gold)' }}
                />
                Disponível para oportunidades
              </motion.span>
            </motion.div>

            <motion.div style={{ y: nameY }}>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                style={{ fontSize: 'var(--fs-display)', marginBottom: '1rem' }}
              >
                {name}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="display"
                style={{
                  fontSize: 'clamp(1.35rem, 3.5vw, 2.25rem)',
                  color: 'var(--gold-deep)',
                  minHeight: '2.6rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {role}
                <span
                  className="caret"
                  style={{
                    display: 'inline-block',
                    width: 3,
                    height: '1em',
                    background: 'var(--gold)',
                    marginLeft: 4,
                  }}
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="fs-lead measure"
                style={{ color: 'var(--sea-soft)', marginBottom: '2.5rem' }}
              >
                Desenvolvedor front-end de Fortaleza, CE. Apaixonado por interfaces elegantes, código
                limpo e experiências de usuário que encantam.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
              >
                <MagneticButton>
                  <Link className="btn btn-primary" to="/projetos">
                    Ver projetos
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <a
                    className="btn btn-secondary"
                    href="#contato"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    Entrar em contato
                  </a>
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Sobre */}
        <section className="section-y" style={{ background: 'var(--sand)' }}>
          <div className="container-x">
            <ScrollReveal>
              <h2 className="fs-h2" style={{ marginBottom: '2.5rem', maxWidth: '16ch' }}>
                Construindo interfaces que importam
              </h2>
            </ScrollReveal>

            <div className="about-grid">
              <ScrollReveal delay={0.05}>
                <ProfilePhoto />
              </ScrollReveal>

              <div>
                <ScrollReveal delay={0.1}>
                  <p className="measure" style={{ color: 'var(--sea-soft)', marginBottom: '1rem' }}>
                    Sou Vinícius Dourado, desenvolvedor front-end de Fortaleza, CE. Curso Ciências da
                    Computação na Unifor (5º semestre), onde combino teoria sólida com prática intensa.
                  </p>
                  <p className="measure" style={{ color: 'var(--sea-soft)', marginBottom: '1rem' }}>
                    Trabalhei com React e TypeScript no maior portal de notícias do Ceará e, no tempo
                    livre, exploro tecnologias novas como Clojure e Ruby.
                  </p>
                  <p className="measure" style={{ color: 'var(--sea-soft)' }}>
                    Acredito que código bonito e interfaces elegantes não são excludentes — são o
                    objetivo. Inglês B1 e em constante evolução.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2.5rem' }}>
                    <StatCard value={10} suffix="+" label="Meses de experiência" />
                    <StatCard value={6} suffix="+" label="Projetos entregues" />
                    <StatCard value={3} suffix="" label="Produtos em produção" />
                    <StatCard value={1} suffix="" label="Idioma adicional (EN B1)" />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Aprendendo agora */}
        <section className="section-y" style={{ background: 'var(--white)' }}>
          <div className="container-x">
            <ScrollReveal>
              <h2 className="fs-h2" style={{ marginBottom: '3rem' }}>
                Atualmente aprendendo
              </h2>
            </ScrollReveal>

            <motion.div
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.25rem',
              }}
            >
              {LEARNING.map((item) => (
                <motion.div
                  key={item.title}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                  }}
                >
                  <TiltCard
                    style={{
                      background: 'var(--sand)',
                      border: '1px solid var(--line)',
                      borderRadius: 'var(--r-input)',
                      padding: '1.75rem 1.5rem',
                      height: '100%',
                    }}
                  >
                    <i className={`${item.icon} colored`} style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }} />
                    <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                    <p className="fs-small" style={{ color: 'var(--sea-soft)' }}>
                      {item.desc}
                    </p>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Skills */}
        <section className="section-y" style={{ background: 'var(--sand)' }}>
          <div className="container-x">
            <ScrollReveal>
              <h2 className="fs-h2" style={{ marginBottom: '3rem' }}>
                Stack e ferramentas
              </h2>
            </ScrollReveal>

            {Object.entries(SKILLS).map(([category, items], ci) => (
              <ScrollReveal key={category} delay={ci * 0.1}>
                <div style={{ marginBottom: '3rem' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>{category}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem 1rem' }}>
                    {items.map((skill) => (
                      <SkillIcon key={`${category}-${skill.name}`} name={skill.name} icon={skill.icon} />
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Experiência */}
        <section className="section-y" style={{ background: 'var(--white)' }}>
          <div className="container-x">
            <ScrollReveal>
              <h2 className="fs-h2" style={{ marginBottom: '3.5rem' }}>
                Experiência
              </h2>
            </ScrollReveal>

            <div ref={timelineRef} style={{ position: 'relative', paddingLeft: '2rem', maxWidth: '46rem' }}>
              <motion.div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: 2,
                  height: '100%',
                  background: 'var(--gold)',
                  transformOrigin: 'top',
                  scaleY: timelineScaleY,
                }}
              />

              {EXPERIENCE.map((item, i) => (
                <ScrollReveal key={item.role} delay={i * 0.12}>
                  <div style={{ position: 'relative', marginBottom: '3rem', paddingLeft: '1.5rem' }}>
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12 + 0.3, duration: 0.3 }}
                      style={{
                        position: 'absolute',
                        left: -23.5,
                        top: 6,
                        width: 11,
                        height: 11,
                        borderRadius: '50%',
                        background: 'var(--gold)',
                        boxShadow: '0 0 0 4px rgba(217,162,27,0.18)',
                      }}
                    />
                    <p className="fs-small" style={{ color: 'var(--gold-deep)', fontWeight: 600, marginBottom: '0.4rem' }}>
                      {item.period}
                    </p>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.3rem' }}>{item.role}</h3>
                    <p className="fs-small" style={{ color: 'var(--sea-soft)', fontWeight: 600, marginBottom: '0.75rem' }}>
                      {item.company}
                    </p>
                    <p className="fs-small measure" style={{ color: 'var(--sea-soft)' }}>
                      {item.desc}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1rem' }}>
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: '0.75rem',
                            padding: '0.25rem 0.7rem',
                            background: 'var(--sand)',
                            border: '1px solid var(--line)',
                            borderRadius: 'var(--r-pill)',
                            color: 'var(--sea-soft)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Contato */}
        <section id="contato" className="section-y" style={{ background: 'var(--sea)' }}>
          <div className="container-x">
            <ScrollReveal>
              <h2 className="fs-h2" style={{ color: '#fff', marginBottom: '1.25rem', maxWidth: '14ch' }}>
                Vamos trabalhar juntos?
              </h2>
              <p className="fs-lead measure" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '3rem' }}>
                Estou aberto a oportunidades, freelas e colaborações. Me manda uma mensagem.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {[
                  { label: 'WhatsApp', sub: WHATSAPP_DISPLAY, href: whatsappLink('Olá, Vinícius! Vi seu portfólio e quero conversar.') },
                  { label: 'E-mail', sub: EMAIL, href: `mailto:${EMAIL}` },
                  { label: 'LinkedIn', sub: 'vinícius-dourado', href: LINKEDIN },
                  { label: 'GitHub', sub: 'speedyvad', href: GITHUB },
                  { label: 'Instagram', sub: 'douradovini', href: INSTAGRAM },
                ].map((link) => (
                  <MagneticButton key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-card"
                      style={{
                        display: 'block',
                        padding: '1.25rem 1.75rem',
                        border: '1px solid rgba(255,255,255,0.22)',
                        borderRadius: 'var(--r-input)',
                        minWidth: 190,
                      }}
                    >
                      <span style={{ display: 'block', color: '#fff', fontWeight: 600 }}>{link.label}</span>
                      <span className="fs-small" style={{ display: 'block', color: 'rgba(255,255,255,0.65)', marginTop: '0.2rem' }}>
                        {link.sub}
                      </span>
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div
                style={{
                  marginTop: '3rem',
                  paddingTop: '2rem',
                  borderTop: '1px solid rgba(255,255,255,0.16)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <p className="fs-small" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Fortaleza, CE — {clock}
                </p>
                <a
                  className="btn btn-on-sea"
                  href="/cv-vinicius-dourado.pdf"
                  download
                  style={{ padding: '0.7rem 1.4rem', fontSize: '0.95rem' }}
                >
                  Baixar meu CV
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .about-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; align-items: start; }
        @media (min-width: 900px) {
          .about-grid { grid-template-columns: 0.8fr 1.6fr; gap: 3.5rem; }
        }
        .contact-card { transition: border-color 0.2s ease, background-color 0.2s ease; }
        .contact-card:hover { border-color: var(--gold); background-color: rgba(255,255,255,0.06); }
        .pulse-dot { animation: about-pulse 2s ease-in-out infinite; }
        .caret { animation: about-blink 1s step-end infinite; }
        @keyframes about-pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.35 } }
        @keyframes about-blink { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }
      `}</style>
    </>
  )
}
