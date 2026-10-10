import { NextResponse as R } from 'next/server';
import db from '@/lib/db';
import { Setting } from '@/models';
import { isAdmin } from '@/lib/auth';
import { settings } from '@/lib/data';
export const dynamic = 'force-dynamic';
export async function GET() { return R.json(await settings()); }
export async function PUT(req) {
  if (!(await isAdmin())) return R.json({ error: 'Unauthorized' }, { status: 401 });
  await db();
  await Setting.findOneAndUpdate({ key: 'site' }, { key: 'site', data: await req.json() }, { upsert: true });
  return R.json({ ok: true });
}
