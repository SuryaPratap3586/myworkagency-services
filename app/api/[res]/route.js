import { NextResponse as R } from 'next/server';
import db from '@/lib/db';
import { M } from '@/models';
import { isAdmin } from '@/lib/auth';
const INBOX = ['leads', 'applications'];
const no = (m, s) => R.json({ error: m }, { status: s });
export async function GET(_, { params }) {
  const { res } = await params; const m = M[res];
  if (!m) return no('Not found', 404);
  const admin = await isAdmin();
  if (INBOX.includes(res) && !admin) return no('Unauthorized', 401);
  await db();
  return R.json(await m.find(admin ? {} : { published: { $ne: false } }).sort({ createdAt: -1 }).lean());
}
export async function POST(req, { params }) {
  const { res } = await params; const m = M[res];
  if (!m) return no('Not found', 404);
  const b = await req.json();
  if (INBOX.includes(res)) {
    if (b.website) return R.json({ ok: true }); // honeypot
    if (!b.name || !b.email) return no('Name and email are required', 400);
    delete b.status;
  } else if (!(await isAdmin())) return no('Unauthorized', 401);
  await db();
  try { return R.json(await m.create(b)); } catch (e) { return no(e.message, 400); }
}
