'use client';
import { useState } from 'react';
export default function Login() {
  const [err, setErr] = useState('');
  async function go(e) {
    e.preventDefault();
    const r = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(e.target))) });
    r.ok ? (location.href = '/admin') : setErr((await r.json()).error);
  }
  return <section><div className="wrap"><h2>Admin login</h2><form onSubmit={go}>
    <input name="email" type="email" placeholder="Email" required /><input name="password" type="password" placeholder="Password" required />
    <button className="btn p">Log in</button><p>{err}</p></form></div></section>;
}
