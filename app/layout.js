import './globals.css';
import Link from 'next/link';
import Anim from '@/components/Anim';
import Footer from '@/components/Footer';
import { settings } from '@/lib/data';
export const dynamic = 'force-dynamic';
export const metadata = { metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'), title: { default: 'MyWorkAgency', template: '%s | MyWorkAgency' }, description: 'Development, marketing and AI video agency.' };
export default async function L({ children }) {
  const s = await settings();
  return (<html lang="en"><body>
    <nav><div className="wrap"><Link href="/"><b>MyWork<span style={{ color: 'var(--g)' }}>Agency</span></b></Link>
      <div><Link href="/">Home</Link><Link href="/services">Services</Link><Link href="/work">Our work</Link><Link href="/ai-videos">AI Videos</Link><Link href="/blog">Blog</Link><Link href="/careers">Careers</Link><Link href="/contact">Contact</Link></div></div></nav>
    {children}
    <Footer s={s} />
    <Anim />
  </body></html>);
}
