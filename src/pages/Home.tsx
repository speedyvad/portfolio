import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import ParticlesBackground from '../components/ParticlesBackground'
import ScrollReveal from '../components/ScrollReveal'
import MagneticButton from '../components/MagneticButton'
import TiltCard from '../components/TiltCard'
import { useTextScramble } from '../hooks/useTextScramble'
import { useTypewriter } from '../hooks/useTypewriter'
import { useCountUp } from '../hooks/useCountUp'

const ROLES = ['Front-End Developer', 'React Specialist', 'UI/UX Enthusiast', 'CS Student']

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
  'Backend & Mobile': [
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
    { name: 'Jira', icon: 'devicon-jira-plain' },
  ],
}

const EXPERIENCE = [
  {
    role: 'Estagiário Full Stack',
    company: 'Verdes Mares',
    period: 'Set 2025 — Mai 2026 · 9 meses',
    desc: 'Responsável pela refatoração do aplicativo do Diário do Nordeste, melhorando estrutura do código e performance da aplicação mobile. Implementei interfaces responsivas nos portais Verdinha, FM 93 e SVM Insights — um dos maiores grupos de comunicação do Nordeste. Trabalhei com CMS Polopoly para gestão de conteúdo em grandes portais jornalísticos, integração de APIs e automação de testes.',
    tags: ['React', 'TypeScript', 'Node.js', 'Java', 'Android', 'CMS Polopoly', 'APIs REST', 'Scrum'],
  },
  {
    role: 'Pesquisador',
    company: 'Iniciação Científica — Unifor',
    period: '2024 · 6 meses',
    desc: 'Integrante de grupo de pesquisa em colaboração com a área da saúde na Unifor. Desenvolvimento de soluções tecnológicas aplicadas, com foco em comunicação científica, liderança de equipe e pensamento crítico em contextos de inovação.',
    tags: ['Pesquisa', 'Tecnologia em Saúde', 'Liderança', 'Comunicação'],
  },
  {
    role: 'Bacharelado em Ciências da Computação — 5º semestre',
    company: 'Unifor',
    period: 'Jan 2024 — Dez 2027 · Cursando',
    desc: 'Formação sólida em estruturas de dados, algoritmos, POO com Java, desenvolvimento web full stack e paradigma funcional com Clojure. Participação ativa em projetos acadêmicos com foco em sistemas reais e aplicáveis ao mercado.',
    tags: ['Java', 'Python', 'Clojure', 'Algoritmos', 'Estruturas de Dados', 'Matemática Discreta'],
  },
]

const LEARNING = [
  { title: 'React Native', desc: 'Desenvolvimento mobile cross-platform com a mesma base React', icon: 'devicon-react-original' },
  { title: 'Estruturas de Dados', desc: 'Grafos, árvores, algoritmos de busca e ordenação', icon: 'devicon-python-plain' },
  { title: 'Clojure', desc: 'Programação funcional com Lisp moderno na JVM', icon: 'devicon-clojure-plain' },
  { title: 'Node + PostgreSQL', desc: 'APIs REST robustas com banco relacional em produção', icon: 'devicon-postgresql-plain' },
]

function FooterClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString('pt-BR', {
          timeZone: 'America/Fortaleza',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      )
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return <span>Fortaleza, CE — {time}</span>
}

function ProfilePhoto() {
  const [error, setError] = useState(false)

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      style={{ position: 'relative', borderRadius: '1rem', overflow: 'hidden', aspectRatio: '3/4' }}
    >
      {error ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'var(--bg4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '1rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '4rem',
              fontWeight: 700,
              color: 'var(--yellow)',
              letterSpacing: '-0.04em',
            }}
          >
            VD
          </span>
        </div>
      ) : (
        <motion.img
          src="/images/profile.png"
          alt="Vinícius Dourado"
          loading="lazy"
          onError={() => setError(true)}
          variants={{
            rest: { filter: 'grayscale(100%) brightness(0.6)', scale: 1 },
            hover: { filter: 'grayscale(0%) brightness(1)', scale: 1.05 },
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      )}

      {/* Yellow overlay — fades on hover */}
      <motion.div
        variants={{ rest: { opacity: 1 }, hover: { opacity: 0 } }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(245,200,66,0.08)',
          pointerEvents: 'none',
        }}
      />

      {/* Border — appears on hover */}
      <motion.div
        variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          border: '2px solid rgba(245,200,66,0.3)',
          borderRadius: '1rem',
          pointerEvents: 'none',
          zIndex: 2,
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
        background: 'var(--bg3)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '1.5rem',
        textAlign: 'center',
        transition: 'border-color 0.2s',
        flex: 1,
        minWidth: 140,
      }}
    >
      <motion.div
        whileHover={{ borderColor: 'var(--yellow)' }}
        style={{ height: '100%' }}
      >
        <p
          ref={ref as React.RefObject<HTMLParagraphElement>}
          style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--yellow)', letterSpacing: '-0.04em' }}
        >
          {count}{suffix}
        </p>
        <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginTop: '0.25rem' }}>{label}</p>
      </motion.div>
    </TiltCard>
  )
}

function SkillIcon({ name, icon }: { name: string; icon: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.15 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'default' }}
      className="skill-icon-wrapper"
    >
      <i className={`${icon} colored`} style={{ fontSize: '2.5rem' }} />
      <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 500 }}>{name}</span>
      <motion.div
        className="skill-tooltip"
        initial={{ opacity: 0, y: 8 }}
        whileHover={{ opacity: 1, y: 0 }}
        style={{
          position: 'absolute',
          bottom: '110%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--bg4)',
          border: '1px solid var(--border2)',
          borderRadius: '6px',
          padding: '0.35rem 0.75rem',
          fontSize: '0.75rem',
          color: 'var(--text)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        {name}
      </motion.div>
    </motion.div>
  )
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const name = useTextScramble('Vinícius Dourado', 1200)
  const role = useTypewriter(ROLES, 75, 2000)

  const { scrollY } = useScroll()
  const nameY = useTransform(scrollY, [0, 500], [0, -150])
  const badgeY = useTransform(scrollY, [0, 500], [0, -90])
  const particleY = useTransform(scrollY, [0, 500], [0, -25])

  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.8', 'end 0.2'],
  })
  const timelineScaleY = useTransform(timelineProgress, [0, 1], [0, 1])

  return (
    <main>
      {/* Hero */}
      <section
        ref={heroRef}
        id="hero"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          background: `
            radial-gradient(ellipse 60% 50% at 50% 0%, rgba(245,200,66,0.07) 0%, transparent 70%),
            var(--bg)
          `,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            zIndex: 0,
          }}
        />

        <motion.div style={{ y: particleY, position: 'absolute', inset: 0, zIndex: 0 }}>
          <ParticlesBackground />
        </motion.div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto', padding: '0 2rem', paddingTop: '80px' }}>
          <motion.div style={{ y: badgeY }}>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(245,200,66,0.1)',
                border: '1px solid rgba(245,200,66,0.25)',
                borderRadius: '100px',
                padding: '0.35rem 0.9rem',
                fontSize: '0.8rem',
                color: 'var(--yellow)',
                marginBottom: '2rem',
                fontWeight: 500,
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--yellow)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              Disponível para oportunidades
            </motion.span>
          </motion.div>

          <motion.div style={{ y: nameY }}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 8vw, 6.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                marginBottom: '1rem',
                color: 'var(--text)',
              }}
            >
              {name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: 'var(--yellow)',
                minHeight: '3rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
              }}
            >
              {role}
              <span style={{ display: 'inline-block', width: 3, height: '1em', background: 'var(--yellow)', marginLeft: 2, animation: 'blink 1s step-end infinite' }} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              style={{ fontSize: '1.1rem', color: 'var(--muted)', maxWidth: '520px', lineHeight: 1.7, marginBottom: '2.5rem' }}
            >
              Desenvolvedor Front-End de Fortaleza, CE. Apaixonado por interfaces elegantes, código limpo e experiências de usuário que encantam.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
            >
              <MagneticButton>
                <Link
                  to="/projects"
                  style={{
                    display: 'inline-block',
                    background: 'var(--yellow)',
                    color: '#000',
                    fontWeight: 700,
                    padding: '0.85rem 2rem',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.95rem',
                    letterSpacing: '-0.01em',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--yellow)'; e.currentTarget.style.color = '#000' }}
                >
                  Ver projetos
                </Link>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                  style={{
                    display: 'inline-block',
                    border: '1px solid var(--border2)',
                    color: 'var(--text)',
                    fontWeight: 500,
                    padding: '0.85rem 2rem',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--yellow)'; e.currentTarget.style.color = 'var(--yellow)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--text)' }}
                >
                  Entrar em contato
                </a>
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '1.75rem', flexWrap: 'wrap' }}
            >
              <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>— ou me encontre em →</span>
              {[
                { label: 'GitHub', href: 'https://github.com/speedyvad' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vinícius-dourado-29a5422b7' },
                { label: 'Instagram', href: 'https://www.instagram.com/douradovini/' },
              ].map((s, i) => (
                <span key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  {i > 0 && <span style={{ color: 'var(--border2)', lineHeight: 1 }}>·</span>}
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--muted)', fontSize: '0.85rem', fontWeight: 500, transition: 'color 0.2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--yellow)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)' }}
                  >
                    {s.label}
                  </a>
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--muted)',
            fontSize: '0.75rem',
            zIndex: 1,
          }}
        >
          <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, var(--yellow), transparent)' }} />
          scroll
        </motion.div>

        <style>{`
          @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
          @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        `}</style>
      </section>

      {/* About */}
      <section id="about" style={{ background: 'var(--bg2)', padding: '7rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <ScrollReveal>
            <p style={{ color: 'var(--yellow)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Sobre mim
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
              Construindo interfaces que<br />
              <span style={{ color: 'var(--yellow)' }}>importam</span>
            </h2>
          </ScrollReveal>

          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', alignItems: 'start' }}>
            {/* Photo column */}
            <ScrollReveal delay={0.05}>
              <ProfilePhoto />
            </ScrollReveal>

            {/* Text + stats column */}
            <div>
              <ScrollReveal delay={0.1}>
                <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1rem' }}>
                  Sou Vinícius Dourado, desenvolvedor Front-End de Fortaleza, CE. Cursando Ciências da Computação na Unifor (5º semestre), onde combino teoria sólida com prática intensa.
                </p>
                <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1rem' }}>
                  Trabalho com React e TypeScript no maior portal de notícias do Ceará, e no tempo livre exploro novas tecnologias como Clojure e React Native.
                </p>
                <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '1.05rem' }}>
                  Acredito que código bonito e interfaces elegantes não são excludentes — são o objetivo. Inglês B1 e em constante evolução.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem' }}>
                  <StatCard value={10} suffix="+" label="Meses de experiência" />
                  <StatCard value={5} suffix="+" label="Projetos entregues" />
                  <StatCard value={3} suffix="" label="Produtos em produção" />
                  <StatCard value={1} suffix="" label="Idioma adicional (EN B1)" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Learning */}
      <section id="learning" style={{ background: 'var(--bg)', padding: '7rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <ScrollReveal>
            <p style={{ color: 'var(--yellow)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Aprendizado contínuo
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.04em', marginBottom: '3rem' }}>
              Atualmente aprendendo
            </h2>
          </ScrollReveal>

          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}
          >
            {LEARNING.map((item) => (
              <motion.div
                key={item.title}
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } }}
              >
                <TiltCard
                  style={{
                    background: 'var(--bg3)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    padding: '1.75rem 1.5rem',
                    height: '100%',
                    transition: 'border-color 0.2s, transform 0.2s',
                  }}
                >
                  <motion.div whileHover={{ borderColor: 'var(--yellow)' }} style={{ height: '100%' }}>
                    <i className={`${item.icon} colored`} style={{ fontSize: '2rem', marginBottom: '1rem', display: 'block' }} />
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{item.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</p>
                  </motion.div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" style={{ background: 'var(--bg2)', padding: '7rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <ScrollReveal>
            <p style={{ color: 'var(--yellow)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Tecnologias
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.04em', marginBottom: '3rem' }}>
              Stack & Skills
            </h2>
          </ScrollReveal>

          {Object.entries(SKILLS).map(([category, items], ci) => (
            <ScrollReveal key={category} delay={ci * 0.1}>
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                  {category}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                  {items.map((skill) => (
                    <SkillIcon key={skill.name} name={skill.name} icon={skill.icon} />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" style={{ background: 'var(--bg)', padding: '7rem 2rem' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <ScrollReveal>
            <p style={{ color: 'var(--yellow)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Trajetória
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.04em', marginBottom: '3.5rem' }}>
              Experiência
            </h2>
          </ScrollReveal>

          <div ref={timelineRef} style={{ position: 'relative', paddingLeft: '2rem' }}>
            <motion.div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: 2,
                height: '100%',
                background: 'var(--yellow)',
                transformOrigin: 'top',
                scaleY: timelineScaleY,
              }}
            />

            {EXPERIENCE.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div style={{ position: 'relative', marginBottom: '3rem', paddingLeft: '1.5rem' }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.3, duration: 0.3 }}
                    style={{
                      position: 'absolute',
                      left: -2.5 - 16,
                      top: 4,
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: 'var(--yellow)',
                      border: '2px solid var(--bg)',
                      boxShadow: '0 0 0 4px rgba(245,200,66,0.15)',
                    }}
                  />
                  <p style={{ fontSize: '0.8rem', color: 'var(--yellow)', fontWeight: 600, marginBottom: '0.35rem', letterSpacing: '0.05em' }}>{item.period}</p>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.25rem' }}>{item.role}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--yellow)', opacity: 0.7, marginBottom: '0.75rem', fontWeight: 500 }}>{item.company}</p>
                  <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.7 }}>{item.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.9rem' }}>
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '0.7rem',
                          padding: '0.2rem 0.6rem',
                          background: 'var(--bg3)',
                          border: '1px solid var(--border)',
                          borderRadius: '4px',
                          color: 'var(--muted)',
                          fontWeight: 500,
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

      {/* Contact */}
      <section id="contact" style={{ background: 'var(--bg2)', padding: '7rem 2rem' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <ScrollReveal>
            <p style={{ color: 'var(--yellow)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Contato
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.04em', marginBottom: '1rem' }}>
              Vamos trabalhar<br /><span style={{ color: 'var(--yellow)' }}>juntos?</span>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '3rem' }}>
              Estou aberto a oportunidades, freelas e colaborações. Me manda uma mensagem!
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              {[
                { label: 'Email', href: 'mailto:viniciusdourado020506@gmail.com', icon: '✉' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vinícius-dourado-29a5422b7', icon: 'in' },
                { label: 'GitHub', href: 'https://github.com/speedyvad', icon: '⌥' },
                { label: 'Instagram', href: 'https://www.instagram.com/douradovini/', icon: '◎' },
              ].map((link) => (
                <MagneticButton key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '1.5rem 2rem',
                      background: 'var(--bg3)',
                      border: '1px solid var(--border)',
                      borderRadius: '12px',
                      minWidth: '120px',
                      transition: 'border-color 0.2s, background 0.2s, transform 0.2s',
                      color: 'var(--text)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--yellow)'
                      e.currentTarget.style.transform = 'translateY(-4px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <span style={{ fontSize: '1.5rem', color: 'var(--yellow)' }}>{link.icon}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{link.label}</span>
                  </a>
                </MagneticButton>
              ))}

              {/* WhatsApp */}
              <MagneticButton>
                <a
                  href="https://wa.me/5585982116585"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '1.5rem 2rem',
                    background: 'var(--bg3)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    minWidth: '120px',
                    transition: 'border-color 0.2s, background 0.2s, transform 0.2s',
                    color: 'var(--text)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--yellow)'
                    e.currentTarget.style.transform = 'translateY(-4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <span style={{ fontSize: '1.5rem', color: 'var(--yellow)' }}>◈</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>WhatsApp</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>+55 (85) 98211-6585</span>
                </a>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '2rem 2rem 2.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
              © 2025 Vinícius Dourado — Feito com React, TypeScript & Framer Motion
            </p>
            <p style={{ color: 'var(--muted)', fontSize: '0.78rem', opacity: 0.6 }}>
              <FooterClock />
            </p>
          </div>
          <a
            href="/cv-vinicius-dourado.pdf"
            download
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--muted)',
              fontSize: '0.85rem',
              fontWeight: 500,
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '0.45rem 1rem',
              transition: 'color 0.2s, border-color 0.2s',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--yellow)'
              e.currentTarget.style.borderColor = 'rgba(245,200,66,0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--muted)'
              e.currentTarget.style.borderColor = 'var(--border)'
            }}
          >
            ↓ Download CV
          </a>
        </div>
      </footer>
    </main>
  )
}
