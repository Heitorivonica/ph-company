import { Suspense, lazy, useEffect, useState } from 'react'

const Scene = lazy(() => import('./components/Scene.jsx'))

// O 3D só carrega depois que a página já está usável, e é pulado em aparelhos
// fracos, com economia de dados ou com "reduzir movimento" ativado.
function useShowScene() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const nav = navigator
    const weak = (nav.hardwareConcurrency || 8) <= 2 || (nav.deviceMemory || 8) <= 2
    const saver = nav.connection?.saveData
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (weak || saver || reduced) return

    const start = () => setShow(true)
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 300))
    const id = idle(start, { timeout: 1500 })
    return () => (window.cancelIdleCallback || clearTimeout)(id)
  }, [])

  return show
}

const services = [
  {
    title: 'Sites',
    text: 'Sites institucionais rápidos, modernos e pensados para transmitir confiança e ser encontrados.',
    icon: '◈',
  },
  {
    title: 'E-commerces',
    text: 'Lojas virtuais completas, com catálogo, carrinho e pagamento, prontas para vender.',
    icon: '◉',
  },
  {
    title: 'Landing pages',
    text: 'Páginas focadas em conversão para campanhas, lançamentos e captação de clientes.',
    icon: '▲',
  },
]

const pillars = [
  {
    title: 'Para todos os tamanhos',
    text: 'Do pequeno comércio da esquina à grande empresa: todo negócio merece ser encontrado e bem representado online.',
  },
  {
    title: 'Visibilidade de verdade',
    text: 'Sites rápidos, bonitos e pensados para aparecer nas buscas e destacar sua marca da concorrência.',
  },
  {
    title: 'Parceria próxima',
    text: 'Ouvimos a sua necessidade e acompanhamos cada etapa, do primeiro contato ao site no ar.',
  },
]

// Exemplos provisórios: troque pelos projetos reais de vocês
const projects = [
  {
    name: 'PH Company',
    type: 'Site institucional',
    tag: 'Nosso site',
    url: 'https://ph-company.vercel.app/',
    image: `${import.meta.env.BASE_URL}preview.jpg`,
  },
  { name: 'Projeto Exemplo 02', type: 'E-commerce', tag: 'Em breve' },
  { name: 'Projeto Exemplo 03', type: 'Landing page', tag: 'Em breve' },
]

export default function App() {
  const [sent, setSent] = useState(false)
  const showScene = useShowScene()
  const [sceneReady, setSceneReady] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    // TODO: ligar a um serviço de envio (e-mail/WhatsApp)
    setSent(true)
  }

  return (
    <>
      <header className="nav">
        <a href="#inicio" className="logo">
          <span className="logo-mark">PH</span> Company
        </a>
        <nav>
          <a href="#sobre">Sobre</a>
          <a href="#servicos">Serviços</a>
          <a href="#portfolio">Portfólio</a>
          <a href="#contato" className="btn btn-small">Contato</a>
        </nav>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="hero-canvas">
            <div className={`orb${sceneReady ? ' off' : ''}`} aria-hidden="true" />
            {showScene && (
              <Suspense fallback={null}>
                <Scene onReady={() => setSceneReady(true)} />
              </Suspense>
            )}
          </div>
          <div className="hero-text">
            <p className="eyebrow">Pedro &amp; Heitor</p>
            <h1>
              Sites que fazem sua marca <span className="grad">ser vista.</span>
            </h1>
            <p className="lead">
              Criamos sites, e-commerces e landing pages bem desenvolvidos, com design que chama atenção e
              aumenta a visibilidade do seu negócio.
            </p>
            <div className="actions">
              <a href="#contato" className="btn">Pedir orçamento</a>
              <a href="#portfolio" className="btn btn-ghost">Ver portfólio</a>
            </div>
          </div>
        </section>

        <section id="sobre" className="section about">
          <h2>Sobre nós</h2>
          <p className="about-intro">
            Somos a <strong>PH Company</strong>, criada por Pedro e Heitor com um objetivo claro:{' '}
            <strong>ajudar pequenos e grandes negócios a serem vistos</strong>. Hoje, quem não está na internet
            simplesmente não existe para boa parte dos clientes, e é isso que queremos mudar.
          </p>
          <div className="grid">
            {pillars.map((p) => (
              <article key={p.title} className="card">
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
          <p className="mission">
            <span>Nossa missão:</span> transformar a presença digital do seu negócio, com sites, lojas virtuais e
            páginas que atraem olhares, geram confiança e trazem clientes.
          </p>
        </section>

        <section id="servicos" className="section">
          <h2>Serviços</h2>
          <div className="grid">
            {services.map((s) => (
              <article key={s.title} className="card metal">
                <span className="icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="portfolio" className="section">
          <h2>Portfólio</h2>
          <p className="sub">Este site é a nossa vitrine. Veja alguns dos projetos que criamos.</p>
          <div className="grid">
            {projects.map((p) => {
              const Wrapper = p.url ? 'a' : 'article'
              const link = p.url ? { href: p.url, target: '_blank', rel: 'noopener noreferrer' } : {}
              return (
                <Wrapper key={p.name} className={`card project${p.url ? ' is-link' : ''}`} {...link}>
                  <div className="thumb">
                    {p.image && <img src={p.image} alt={`Prévia do projeto ${p.name}`} loading="lazy" width="960" height="600" />}
                  </div>
                  <span className="chip">{p.tag}</span>
                  <h3>{p.name}</h3>
                  <p>{p.type}</p>
                  {p.url && <span className="visit">Visitar site →</span>}
                </Wrapper>
              )
            })}
          </div>
        </section>

        <section id="contato" className="section contact">
          <h2>Vamos conversar?</h2>
          <p className="sub">Conte sobre o seu projeto e respondemos o quanto antes.</p>
          {sent ? (
            <p className="thanks">Mensagem recebida! Em breve entramos em contato.</p>
          ) : (
            <form onSubmit={onSubmit} className="form">
              <input required placeholder="Seu nome" />
              <input required type="email" placeholder="Seu e-mail" />
              <textarea required rows="4" placeholder="Conte sobre o projeto" />
              <button className="btn" type="submit">Enviar</button>
            </form>
          )}
        </section>
      </main>

      <footer className="footer">© {new Date().getFullYear()} PH Company — Pedro &amp; Heitor</footer>
    </>
  )
}
