import { NextResponse as R } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { isAdmin } from '@/lib/auth';
export async function POST(req) {
  if (!(await isAdmin())) return R.json({ error: 'Unauthorized' }, { status: 401 });
  const f = (await req.formData()).get('file');
  if (!f || f.size > 25e6) return R.json({ error: 'File missing or larger than 25MB' }, { status: 400 });
  const ext = path.extname(f.name).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4', '.webm'].includes(ext)) return R.json({ error: 'Only images and mp4/webm videos are allowed' }, { status: 400 });
  const name = Date.now() + '-' + Math.random().toString(36).slice(2, 8) + ext;
  await mkdir('uploads', { recursive: true });
  await writeFile(path.join('uploads', name), Buffer.from(await f.arrayBuffer()));
  return R.json({ url: '/uploads/' + name });
}
