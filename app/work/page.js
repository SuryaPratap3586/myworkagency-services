import Link from 'next/link';
import { get } from '@/lib/data';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Our work', description: 'Selected websites, apps and videos.' };
const order = ['Website', 'App', 'Video'], rank = x => (order.includes(x) ? order.indexOf(x) : 99);
export default async function Work({ searchParams }) {
  const { cat: q } = await searchParams, all = await get('projects');
  const cats = [...new Set(all.map(p => p.category).filter(Boolean))].sort((a, b) => rank(a) - rank(b));
  const cat = cats.includes(q) ? q : cats[0], list = all.filter(p => p.category === cat);
  return <><header className="ph"><div className="wrap"><h1>Our work</h1><p>Websites, apps and videos we have delivered.</p></div></header>
    <section><div className="wrap">
      <div className="tabs">{cats.map(c => <Link key={c} className={'btn ' + (cat === c ? 'on' : '')} href={`/work?cat=${encodeURIComponent(c)}`}>{c}</Link>)}</div>
      <div className="grid">{list.map(p => <Link className="card" href={`/work/${p.slug}`} key={p._id}>{p.image && <img src={p.image} alt={p.title} />}<h3>{p.title}</h3><p>{p.category} · {p.description}</p></Link>)}</div>
      {!list.length && <p>No projects yet. Add them in the admin panel.</p>}</div></section></>;
}
