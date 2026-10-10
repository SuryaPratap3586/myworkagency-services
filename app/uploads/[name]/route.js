import { readFile } from 'fs/promises';
import path from 'path';
const T = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif', '.mp4': 'video/mp4', '.webm': 'video/webm' };
export async function GET(_, { params }) {
  const n = path.basename((await params).name), t = T[path.extname(n)];
  if (!t) return new Response('Not found', { status: 404 });
  try { return new Response(await readFile(path.join('uploads', n)), { headers: { 'Content-Type': t, 'Cache-Control': 'public, max-age=31536000, immutable' } }); }
  catch { return new Response('Not found', { status: 404 }); }
}
