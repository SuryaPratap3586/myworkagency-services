import Link from 'next/link';
import { get } from '@/lib/data';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Services', description: 'Development, marketing, AI video, design and more.' };
export default async function Services() {
  const list = await get('services');
  return <><header className="ph"><div className="wrap"><h1>Our services</h1><p>Everything you need to launch and grow your brand.</p></div></header>
    <section><div className="wrap"><div className="grid">
      {list.map(s => <Link className="card" href={`/services/${s.slug}`} key={s._id}><h3>{s.icon} {s.title}</h3><p>{s.description}</p></Link>)}</div>
      {!list.length && <p>No services yet. Add them in the admin panel.</p>}</div></section></>;
}
