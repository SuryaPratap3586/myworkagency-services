import { NextResponse as R } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '@/lib/db';
import { User } from '@/models';
export async function POST(req) {
  const { email, password } = await req.json(); await db();
  const u = await User.findOne({ email });
  if (!u || !(await bcrypt.compare(password || '', u.password))) return R.json({ error: 'Wrong email or password' }, { status: 401 });
  const res = R.json({ ok: true });
  res.cookies.set('token', jwt.sign({ id: u.id }, process.env.JWT_SECRET, { expiresIn: '7d' }), { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 604800 });
  return res;
}
