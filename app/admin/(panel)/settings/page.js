'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
const Y = 'y', T = 't';
const G = [
  ['Hero', [['heroTitle', 'Headline', T], ['heroSub', 'Sub-headline', T], ['heroVideo', 'Hero video URL (e.g. /hero.mp4)'], ['cta1Text', 'Button 1 text'], ['cta1Link', 'Button 1 link'], ['cta2Text', 'Button 2 text'], ['cta2Link', 'Button 2 link']]],
  ['Home sections', [['showServices', 'Services', Y], ['showProjects', 'Projects', Y], ['showTestimonials', 'Testimonials', Y], ['showBlog', 'Blog', Y], ['showAiVideos', 'AI video showcase', Y], ['showCta', 'Call-to-action band', Y], ['ctaTitle', 'CTA title'], ['ctaText', 'CTA text', T]]],
  ['Footer', [['footerAbout', 'About text', T], ['footerEmail', 'Email'], ['footerPhone', 'Phone'], ['footerAddress', 'Address'], ['instagram', 'Instagram URL'], ['facebook', 'Facebook URL'], ['whatsapp', 'WhatsApp link'], ['mapLink', 'Google Maps link'], ['linkedin', 'LinkedIn URL'], ['youtube', 'YouTube URL'], ['twitter', 'X URL'], ['copyright', 'Copyright name']]],
];
export default function Settings() {
  const [s, setS] = useState(null), [msg, setMsg] = useState('');
  useEffect(() => {
    fetch('/api/leads').then(r => r.status === 401 && (location.href = '/admin/login'));
    fetch('/api/settings').then(r => r.json()).then(setS);
  }, []);
  async function save(e) {
    e.preventDefault();
    const r = await fetch('/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(s) });
    setMsg(r.ok ? 'Saved' : 'Could not save. Log in again.');
  }
  if (!s) return <section><div className="wrap">Loading…</div></section>;
  return <section><div className="wrap"><h2>Home page and footer</h2><p><Link href="/admin">← Back to admin</Link></p>
    <form onSubmit={save} style={{ marginTop: 20 }}>
      {G.map(([h, fs]) => <fieldset key={h} style={{ border: '1px solid #2a2a2a', borderRadius: 12, padding: 16, display: 'grid', gap: 10 }}><legend>{h}</legend>
        {fs.map(([k, l, t]) => <label key={k}>{l}
          {t === Y ? <select value={s[k] || 'yes'} onChange={e => setS({ ...s, [k]: e.target.value })}><option value="yes">Show</option><option value="no">Hide</option></select>
            : t === T ? <textarea rows={3} value={s[k] || ''} onChange={e => setS({ ...s, [k]: e.target.value })} />
            : <input value={s[k] || ''} onChange={e => setS({ ...s, [k]: e.target.value })} />}</label>)}
      </fieldset>)}
      <button className="btn p">Save changes</button><p>{msg}</p></form></div></section>;
}
