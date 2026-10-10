import Link from 'next/link';
import { get } from '@/lib/data';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Blog' };
export default async function Blog() {
  const posts = await get('posts');
  return <section><div className="wrap"><h2>Blog</h2><div className="grid">
    {posts.map(p => <Link className="card" href={`/blog/${p.slug}`} key={p._id}>{p.image && <img src={p.image} alt="" />}<h3>{p.title}</h3><p>{p.excerpt}</p></Link>)}</div></div></section>;
}
