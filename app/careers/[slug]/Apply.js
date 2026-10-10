'use client';
import { useState } from 'react';
export default function Apply({ job }) {
  const [s, setS] = useState('');
  async function go(e) {
    e.preventDefault(); setS('Sending…');
    const b = Object.fromEntries(new FormData(e.target));
    const r = await fetch('/api/applications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...b, job: job.title, jobSlug: job.slug }) });
    if (r.ok) { setS('Application sent. We will contact you soon.'); e.target.reset(); } else setS((await r.json()).error);
  }
  return <form onSubmit={go}><h3>Apply for this job</h3><input className="hp" name="website" tabIndex={-1} autoComplete="off" />
    <input name="name" placeholder="Full name" required /><input name="email" type="email" placeholder="Email" required /><input name="phone" placeholder="Phone" />
    <input name="experience" placeholder="Years of experience" /><input name="resumeUrl" placeholder="Resume link (Google Drive / LinkedIn)" />
    <textarea name="coverLetter" rows={4} placeholder="Why do you want to join us?" /><button className="btn p">Submit application</button><p>{s}</p></form>;
}
