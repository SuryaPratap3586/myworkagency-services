'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
export default function Dashboard() {
  const [d, setD] = useState({});
  useEffect(() => { ['leads', 'applications', 'posts', 'projects', 'jobs'].forEach(k => fetch('/api/' + k).then(r => r.json()).then(x => setD(p => ({ ...p, [k]: x })))); }, []);
  const n = (k, f = () => true) => d[k] ? d[k].filter(f).length : '…';
  const cards = [
    ['Leads', n('leads'), `${n('leads', l => l.status === 'New')} new`, '/admin/leads'],
    ['Blogs', n('posts'), 'Write and edit articles', '/admin/blogs'],
    ['Projects', n('projects', p => p.category !== 'Video'), 'Website and app work', '/admin/projects'],
    ['AI videos', n('projects', p => p.category === 'Video'), 'Add or upload videos', '/admin/videos'],
    ['Jobs', n('jobs'), 'Open vacancies', '/admin/jobs'],
    ['Applications', n('applications'), `${n('applications', a => a.status === 'New')} new`, '/admin/applications'],
  ];
  return <section><div className="wrap"><h2>Dashboard</h2>
    <div className="grid">{cards.map(([t, c, s, h]) => <Link className="card" href={h} key={t}><p>{t}</p><h3 style={{ fontSize: 34, color: 'var(--g)' }}>{c}</h3><p>{s}</p></Link>)}</div>
    <h3 style={{ margin: '32px 0 10px' }}>Latest leads</h3>
    <table><tbody>{(d.leads || []).slice(0, 5).map(l => <tr key={l._id}><td>{l.name}</td><td>{l.email}</td><td>{l.service}</td><td>{l.status}</td></tr>)}</tbody></table></div></section>;
}
