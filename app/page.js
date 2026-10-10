import Link from 'next/link';
import { get, settings } from '@/lib/data';
export const dynamic = 'force-dynamic';
export default async function Home() {
  const [s, services, projects, tests, posts] = await Promise.all([settings(), get('services'), get('projects'), get('testimonials'), get('posts')]);
  const on = k => s[k] !== 'no';
  return (<>
    <header className="hero">{s.heroVideo && <video src={s.heroVideo} autoPlay muted loop playsInline />}
      <div className="wrap"><h1>{s.heroTitle}</h1><p>{s.heroSub}</p>
        <div className="row">{s.cta1Text && <Link className="btn p" href={s.cta1Link || '/contact'}>{s.cta1Text}</Link>}
          {s.cta2Text && <Link className="btn" href={s.cta2Link || '/work'}>{s.cta2Text}</Link>}</div></div></header>
    {on('showServices') && <section id="services"><div className="wrap"><div className="hd"><h2>Services</h2><Link href="/services">View all</Link></div><div className="grid">
      {services.map(x => <Link className="card" href={`/services/${x.slug}`} key={x._id}><h3>{x.icon} {x.title}</h3><p>{x.description}</p></Link>)}</div></div></section>}
    {on('showProjects') && <section id="projects"><div className="wrap"><div className="hd"><h2>Our work</h2><Link href="/work">View all</Link></div><div className="grid">
      {projects.map(p => <Link className="card" href={`/work/${p.slug}`} key={p._id}>{p.image && <img src={p.image} alt={p.title} />}<h3>{p.title}</h3><p>{p.category} · {p.description}</p></Link>)}</div></div></section>}
    {on('showTestimonials') && tests.length > 0 && <section><div className="wrap"><h2>Clients say</h2><div className="grid">
      {tests.map(t => <div className="card" key={t._id}><p style={{ color: '#fff' }}>{t.quote}</p><p>{t.name}, {t.role}</p></div>)}</div></div></section>}
    {on('showBlog') && <section><div className="wrap"><h2>Latest articles</h2><div className="grid">
      {posts.slice(0, 3).map(p => <Link className="card" href={`/blog/${p.slug}`} key={p._id}><h3>{p.title}</h3><p>{p.excerpt}</p></Link>)}</div></div></section>}
    {on('showAiVideos') && projects.some(p => p.category === 'Video') && <section><div className="wrap"><div className="hd"><h2>AI video showcase</h2><Link href="/ai-videos">View all</Link></div><div className="grid">
      {projects.filter(p => p.category === 'Video').slice(0, 3).map(p => <Link className="card" href={`/work/${p.slug}`} key={p._id}><div className="vt">{p.image ? <img src={p.image} alt={p.title} /> : p.video && <video src={p.video} muted playsInline preload="metadata" />}</div><h3>{p.title}</h3><p>{p.description}</p></Link>)}</div></div></section>}
    {on('showCta') && <section><div className="wrap cta"><h2>{s.ctaTitle}</h2><p>{s.ctaText}</p><Link className="btn p" href="/contact">Get a quote</Link></div></section>}
  </>);
}
