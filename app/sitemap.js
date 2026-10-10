import { get } from '@/lib/data';
export default async function sitemap() {
  const b = process.env.SITE_URL || 'http://localhost:3000', [posts, sv, pj] = await Promise.all([get('posts'), get('services'), get('projects')]);
  return [b, `${b}/services`, `${b}/work`, `${b}/ai-videos`, `${b}/careers`, `${b}/blog`, `${b}/contact`].map(url => ({ url })).concat(posts.map(p => ({ url: `${b}/blog/${p.slug}`, lastModified: p.updatedAt })), sv.map(s => ({ url: `${b}/services/${s.slug}` })), pj.map(p => ({ url: `${b}/work/${p.slug}` })));
}
