import { useEffect, useState, type FormEvent } from 'react'
import { cafe, hours, menu, reviews } from './data'
import {
  loadMessages,
  resetMessages,
  sendMessage,
  validate,
  type ContactErrors,
  type ContactInput,
  type ContactMessage,
} from './contact'

const euro = (n: number) => n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })
const empty: ContactInput = { name: '', email: '', message: '' }

function Nav() {
  const [open, setOpen] = useState(false)
  const links = [
    ['#carta', 'Carta'],
    ['#horario', 'Horario'],
    ['#visitanos', 'Visítanos'],
    ['#contacto', 'Contacto'],
  ]
  return (
    <header className="nav">
      <a className="brand" href="#inicio">☕ {cafe.name}</a>
      <button className="nav-toggle" aria-expanded={open} aria-controls="menu-nav" onClick={() => setOpen(!open)}>
        <span className="sr-only">Menú</span>☰
      </button>
      <nav id="menu-nav" className={open ? 'open' : ''}>
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-text">
        <p className="eyebrow">Café de barrio desde 2014</p>
        <h1>Tu café de cada mañana, hecho con calma.</h1>
        <p className="lead">{cafe.claim}</p>
        <div className="actions">
          <a className="btn" href="#carta">Ver la carta</a>
          <a className="btn ghost" href="#contacto">Reservar o preguntar</a>
        </div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <svg viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="92" fill="var(--cream-2)" />
          <path d="M55 95h80v35a35 35 0 0 1-35 35h-10a35 35 0 0 1-35-35z" fill="var(--brown)" />
          <path d="M135 105h10a14 14 0 0 1 0 28h-10" fill="none" stroke="var(--brown)" strokeWidth="8" />
          <ellipse cx="95" cy="95" rx="40" ry="8" fill="var(--caramel)" />
          <path className="steam" d="M80 80c-8-10 8-16 0-28M98 78c-8-10 8-16 0-28M116 80c-8-10 8-16 0-28" fill="none" stroke="var(--caramel)" strokeWidth="5" strokeLinecap="round" />
        </svg>
      </div>
    </section>
  )
}

function Menu() {
  return (
    <section id="carta" className="section">
      <h2>La carta</h2>
      <p className="section-lead">Ingredientes de proximidad y café tostado en Madrid.</p>
      <div className="menu-grid">
        {menu.map((group) => (
          <article key={group.title} className="card">
            <h3>{group.title}</h3>
            <ul className="menu-list">
              {group.items.map((it) => (
                <li key={it.name}>
                  <div>
                    <strong>{it.name}</strong> {it.tag && <span className="tag">{it.tag}</span>}
                    <p>{it.desc}</p>
                  </div>
                  <span className="price">{euro(it.price)}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

function Hours() {
  return (
    <section id="horario" className="section alt">
      <div className="two-col">
        <div>
          <h2>Horario</h2>
          <table className="hours">
            <tbody>
              {hours.map((h) => (
                <tr key={h.days}><th scope="row">{h.days}</th><td>{h.time}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2>Lo que dicen</h2>
          <ul className="reviews">
            {reviews.map((r) => (
              <li key={r.author}><blockquote>“{r.text}”</blockquote><cite>— {r.author}</cite></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Visit() {
  return (
    <section id="visitanos" className="section">
      <h2>Visítanos</h2>
      <div className="visit card">
        <p><strong>{cafe.address}</strong></p>
        <p>Teléfono: <a href={`tel:${cafe.phone.replace(/\s/g, '')}`}>{cafe.phone}</a></p>
        <p>Email: <a href={`mailto:${cafe.email}`}>{cafe.email}</a></p>
        <a className="btn" href={cafe.mapsUrl} target="_blank" rel="noreferrer">Cómo llegar</a>
      </div>
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState<ContactInput>(empty)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [inbox, setInbox] = useState<ContactMessage[]>([])

  useEffect(() => {
    if (new URLSearchParams(location.search).has('reset')) resetMessages()
    setInbox(loadMessages())
  }, [])

  const set = (k: keyof ContactInput) => (e: { target: { value: string } }) => {
    setForm({ ...form, [k]: e.target.value })
    if (errors[k]) setErrors({ ...errors, [k]: undefined })
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length) return
    setStatus('sending')
    await sendMessage(form)
    setInbox(loadMessages())
    setForm(empty)
    setStatus('sent')
  }

  return (
    <section id="contacto" className="section alt">
      <h2>Escríbenos</h2>
      <p className="section-lead">Reservas para grupos, encargos de tartas o cualquier duda. Te respondemos en el día.</p>
      <form className="card form" onSubmit={onSubmit} noValidate>
        <label>
          Nombre
          <input name="name" autoComplete="name" value={form.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby="err-name" />
          {errors.name && <span id="err-name" className="error">{errors.name}</span>}
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" value={form.email} onChange={set('email')} aria-invalid={!!errors.email} aria-describedby="err-email" />
          {errors.email && <span id="err-email" className="error">{errors.email}</span>}
        </label>
        <label>
          Mensaje
          <textarea name="message" rows={5} value={form.message} onChange={set('message')} aria-invalid={!!errors.message} aria-describedby="err-message" />
          {errors.message && <span id="err-message" className="error">{errors.message}</span>}
        </label>
        <button className="btn" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
        </button>
        <p role="status" aria-live="polite" className="ok">
          {status === 'sent' && '¡Gracias! Hemos recibido tu mensaje y te responderemos pronto.'}
        </p>
      </form>

      <details className="inbox">
        <summary>Mensajes recibidos (demo) · {inbox.length}</summary>
        <p className="muted">El envío está simulado: los mensajes se guardan solo en este navegador.</p>
        {inbox.length === 0 ? (
          <p className="muted">Todavía no hay mensajes.</p>
        ) : (
          <ul>
            {inbox.map((m) => (
              <li key={m.id}>
                <strong>{m.name}</strong> &lt;{m.email}&gt; · {new Date(m.sentAt).toLocaleString('es-ES')}
                <p>{m.message}</p>
              </li>
            ))}
          </ul>
        )}
        <button className="btn ghost small" type="button" onClick={() => { resetMessages(); setInbox([]); setStatus('idle') }}>
          Reiniciar datos de ejemplo
        </button>
      </details>
    </section>
  )
}

export default function App() {
  return (
    <>
      <a className="skip" href="#carta">Saltar al contenido</a>
      <Nav />
      <main>
        <Hero />
        <Menu />
        <Hours />
        <Visit />
        <Contact />
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} {cafe.name} · {cafe.address}</p>
      </footer>
    </>
  )
}
