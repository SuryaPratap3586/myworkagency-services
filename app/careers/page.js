import Link from 'next/link';
import { get } from '@/lib/data';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Careers', description: 'Join MyWorkAgency. See our open positions.' };
export default async function Careers() {
  const jobs = await get('jobs');
  return <><header className="ph"><div className="wrap"><h1>Careers</h1><p>Build great work with us. Apply for an open role below.</p></div></header>
    <section><div className="wrap"><div className="grid">
      {jobs.map(j => <Link className="card" href={`/careers/${j.slug}`} key={j._id}><h3>{j.title}</h3><p>{[j.department, j.location, j.type].filter(Boolean).join(' · ')}</p></Link>)}</div>
      {!jobs.length && <p>No open positions right now. Please check back soon.</p>}</div></section></>;
}
