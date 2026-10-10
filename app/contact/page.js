'use client';
import { useState } from 'react';
const SV = ['Development', 'App Development', 'Digital Marketing', 'Influencer Marketing', 'AI Video', 'Video Editing', 'Graphic Design', 'UI/UX Design'];
export default function Contact() {
  const [s, setS] = useState('');
  async function submit(e) {
    e.preventDefault(); setS('Sending…');
    const r = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(e.target))) });
    if (r.ok) { setS('Request sent. We reply within one business day.'); e.target.reset(); } else setS((await r.json()).error);
  }
  return <section><div className="wrap"><h2>Tell us about your project</h2>
    <form onSubmit={submit}><input className="hp" name="website" tabIndex={-1} autoComplete="off" />
      <input name="name" placeholder="Name" required /><input name="email" type="email" placeholder="Email" required />
      <input name="phone" placeholder="Phone" /><input name="company" placeholder="Company" />
      <select name="service"><option value="">Service interested in</option>{SV.map(x => <option key={x}>{x}</option>)}</select>
      <input name="budget" placeholder="Budget (optional)" /><textarea name="message" rows={5} placeholder="Project details" required />
      <button className="btn p">Send request</button><p>{s}</p></form></div></section>;
}
