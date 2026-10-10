'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const N = [['/admin', 'Dashboard'], ['/admin/leads', 'Leads'], ['/admin/blogs', 'Blogs'], ['/admin/projects', 'Projects'], ['/admin/videos', 'AI videos'], ['/admin/services', 'Services'], ['/admin/testimonials', 'Testimonials'], ['/admin/jobs', 'Jobs'], ['/admin/applications', 'Applications'], ['/admin/settings', 'Home & footer']];
export default function AdminNav() {
  const p = usePathname();
  return <aside><b style={{ padding: '4px 12px 12px' }}>MyWork<span style={{ color: 'var(--g)' }}>Agency</span> admin</b>
    {N.map(([h, l]) => <Link key={h} href={h} className={p === h ? 'on' : ''}>{l}</Link>)}
    <Link href="/" target="_blank">View site ↗</Link><a href="/api/logout">Log out</a></aside>;
}
