import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/auth';
import AdminNav from '@/components/AdminNav';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Admin', robots: { index: false, follow: false } };
export default async function AdminLayout({ children }) {
  if (!(await isAdmin())) redirect('/admin/login');
  return <div className="ash"><AdminNav /><main>{children}</main></div>;
}
