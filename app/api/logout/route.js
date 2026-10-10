import { NextResponse } from 'next/server';
export async function GET(req) {
  const res = NextResponse.redirect(new URL('/admin/login', req.url));
  res.cookies.set('token', '', { path: '/', maxAge: 0 });
  return res;
}
