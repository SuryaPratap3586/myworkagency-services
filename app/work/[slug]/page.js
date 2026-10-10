import Link from 'next/link';
import { notFound } from 'next/navigation';
import { get } from '@/lib/data';
export const dynamic = 'force-dynamic';
const find = async s => { const x = await get('projects', { slug: s }, true); return x && x.published !== false ? x : null; };
export async function generateMetadata({ params }) {
  const p = await find((await params).slug);
  return p ? { title: p.title, description: p.description, openGraph: { images: p.image ? [p.image] : [] } } : {};
}
export default async function Project({ params }) {
  const p = await find((await params).slug); if (!p) notFound();
  return <><header className="ph"><div className="wrap"><p><Link href="/work">← Our work</Link></p><h1>{p.title}</h1><p>{p.category}</p></div></header>
    <section><div className="wrap prose">
      {p.video ? <video src={p.video} poster={p.image} controls playsInline style={{ width: '100%', borderRadius: 12 }} />
        : p.image && <img src={p.image} alt={p.title} style={{ width: '100%', borderRadius: 12 }} />}
      <p style={{ marginTop: 20 }}>{p.description}</p>
      <p style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {p.url && <a className="btn p" href={p.url} target="_blank" rel="noopener noreferrer">Visit live project</a>}
        <Link className="btn" href="/contact">Start a similar project</Link></p></div></section></>;
}
