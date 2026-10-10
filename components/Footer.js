import Link from 'next/link';
const ic = d => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{d}</svg>;
export default function Footer({ s }) {
  const soc = [
    ['Facebook', s.facebook, <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />],
    ['Instagram', s.instagram, <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" /></>],
    ['LinkedIn', s.linkedin, <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 11v6M8 7.5v.01M12 17v-6m0 3c0-2 4-3 4 0v3" /></>],
    ['YouTube', s.youtube, <><rect x="2" y="5" width="20" height="14" rx="4" /><path d="M10 9l5 3-5 3z" /></>],
    ['X', s.twitter, <path d="M4 4l16 16M20 4L4 20" />],
    ['WhatsApp', s.whatsapp, <path d="M3 21l1.6-4.6A9 9 0 1 1 8 19.6z" />],
  ].filter(x => x[1]);
  return (<footer><div className="wrap fgrid">
    <div><b>MyWork<span style={{ color: 'var(--g)' }}>Agency</span></b><p>{s.footerAbout}</p>
      <div className="soc">{soc.map(([n, u, d]) => <a key={n} href={u} aria-label={n} target="_blank" rel="noopener noreferrer">{ic(d)}</a>)}</div></div>
    <div><h4>Explore</h4><Link href="/">Home</Link><Link href="/services">Services</Link><Link href="/work">Our work</Link><Link href="/ai-videos">AI Videos</Link><Link href="/blog">Blog</Link><Link href="/careers">Careers</Link><Link href="/contact">Contact</Link></div>
    <div><h4>Contact</h4>{s.footerAddress && <span>📍 {s.footerAddress}</span>}{s.mapLink && <a href={s.mapLink} target="_blank" rel="noopener noreferrer">View on map</a>}
      {s.footerPhone && <a href={`tel:${s.footerPhone}`}>📞 {s.footerPhone}</a>}{s.footerEmail && <a href={`mailto:${s.footerEmail}`}>✉ {s.footerEmail}</a>}</div>
  </div><div className="wrap fcopy">© {new Date().getFullYear()} {s.copyright}. All rights reserved.</div></footer>);
}
