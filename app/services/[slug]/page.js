import Link from 'next/link';
import { notFound } from 'next/navigation';
import { get } from '@/lib/data';
export const dynamic = 'force-dynamic';
const find = async s => { const x = await get('services', { slug: s }, true); return x && x.published !== false ? x : null; };
export async function generateMetadata({ params }) {
  const s = await find((await params).slug); return s ? { title: s.title, description: s.description } : {};
}
export default async function Service({ params }) {
  const s = await find((await params).slug); if (!s) notFound();
  return <><header className="ph"><div className="wrap"><p><Link href="/services">← All services</Link></p><h1>{s.icon} {s.title}</h1></div></header>
    <section><div className="wrap prose"><p>{s.description}</p>
      <p style={{ marginTop: 28 }}><Link className="btn p" href="/contact">Talk to us about {s.title}</Link></p></div></section></>;
}
