import { notFound } from 'next/navigation';
import { get } from '@/lib/data';
import { withToc } from '@/lib/toc';
export const dynamic = 'force-dynamic';
const find = async s => { const p = await get('posts', { slug: s }, true); return p && p.published !== false ? p : null; };
export async function generateMetadata({ params }) {
  const p = await find((await params).slug); if (!p) return {};
  const title = p.metaTitle || p.title, description = p.metaDescription || p.excerpt;
  return { title, description, keywords: p.keywords, alternates: p.canonical ? { canonical: p.canonical } : undefined, openGraph: { title, description, images: p.image ? [p.image] : [] } };
}
export default async function Post({ params }) {
  const p = await find((await params).slug); if (!p) notFound();
  const { html, toc } = withToc(p.content);
  const ld = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title, description: p.excerpt, image: p.image, datePublished: p.createdAt, publisher: { '@type': 'Organization', name: 'MyWorkAgency' } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    <header className="ph"><div className="wrap"><p>{p.category} · {new Date(p.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}</p><h1>{p.title}</h1></div></header>
    <section><div className="wrap bl">
      <aside className="toc"><h4>Table of contents</h4>{toc.map(t => <a key={t.id} href={`#${t.id}`} className={t.level === 3 ? 'sub3' : ''}>{t.text}</a>)}</aside>
      <article className="art">{p.image && <img src={p.image} alt={p.title} />}<div dangerouslySetInnerHTML={{ __html: html }} /></article>
    </div></section></>;
}
