import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
export async function isAdmin() {
  try { return !!jwt.verify((await cookies()).get('token')?.value, process.env.JWT_SECRET); }
  catch { return false; }
}
