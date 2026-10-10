import Link from 'next/link';
import { get } from '@/lib/data';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'AI videos', description: 'Ads, films and explainers made with AI.' };
export default async function AiVideos() {
  const list = await get('projects', { category: 'Video' });
  return <><header className="ph"><div className="wrap"><h1>AI videos</h1><p>Ads, films and explainers made with AI. Open a card to play.</p></div></header>
    <section><div className="wrap"><div className="grid">
      {list.map(p => <Link className="card" href={`/work/${p.slug}`} key={p._id}><div className="vt">{p.image ? <img src={p.image} alt={p.title} /> : p.video && <video src={p.video} muted playsInline preload="metadata" />}</div><h3>{p.title}</h3><p>{p.description}</p></Link>)}</div>
      {!list.length && <p>No videos yet. Add a project with category "Video" in the admin panel.</p>}</div></section></>;
}
