import { NextResponse as R } from 'next/server';
import db from '@/lib/db';
import { M } from '@/models';
import { isAdmin } from '@/lib/auth';
async function guard(params) {
  const { res, id } = await params;
  if (!M[res] || !(await isAdmin())) return [null];
  await db(); return [M[res], id];
}
export async function PUT(req, { params }) {
  const [m, id] = await guard(params);
  if (!m) return R.json({ error: 'Unauthorized' }, { status: 401 });
  return R.json(await m.findByIdAndUpdate(id, await req.json(), { new: true }));
}
export async function DELETE(_, { params }) {
  const [m, id] = await guard(params);
  if (!m) return R.json({ error: 'Unauthorized' }, { status: 401 });
  await m.findByIdAndDelete(id); return R.json({ ok: true });
}
