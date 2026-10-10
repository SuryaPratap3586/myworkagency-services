import Link from 'next/link';
import { notFound } from 'next/navigation';
import { get } from '@/lib/data';
import Apply from './Apply';
export const dynamic = 'force-dynamic';
const find = async s => { const j = await get('jobs', { slug: s }, true); return j && j.published !== false ? j : null; };
export async function generateMetadata({ params }) { const j = await find((await params).slug); return j ? { title: `${j.title} (Careers)`, description: j.description?.slice(0, 150) } : {}; }
export default async function Job({ params }) {
  const j = await find((await params).slug); if (!j) notFound();
  return <><header className="ph"><div className="wrap"><p><Link href="/careers">← All jobs</Link></p><h1>{j.title}</h1><p>{[j.department, j.location, j.type, j.salary].filter(Boolean).join(' · ')}</p></div></header>
    <section><div className="wrap bl"><div className="prose" style={{ whiteSpace: 'pre-line' }}><h3>About the role</h3><p>{j.description}</p>{j.requirements && <><h3>Requirements</h3><p>{j.requirements}</p></>}</div>
      <Apply job={{ title: j.title, slug: j.slug }} /></div></section></>;
}
