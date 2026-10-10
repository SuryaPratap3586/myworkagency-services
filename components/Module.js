'use client';
import { useEffect, useRef, useState } from 'react';
const PB = ['published', 's', ['true', 'false']];
const C = {
  leads: { api: 'leads', title: 'Leads', inbox: ['name', 'email', 'phone', 'service', 'budget', 'message'], st: ['New', 'Contacted', 'In Discussion', 'Converted', 'Lost'] },
  applications: { api: 'applications', title: 'Job applications', inbox: ['job', 'name', 'email', 'phone', 'experience', 'resumeUrl', 'coverLetter'], st: ['New', 'Shortlisted', 'Interview', 'Hired', 'Rejected'] },
  blogs: { api: 'posts', title: 'Blogs', fields: [['title'], ['slug'], ['category'], ['keywords'], ['metaTitle'], ['metaDescription', 't'], ['excerpt', 't'], ['canonical'], ['image', 'u'], ['content', 'c'], PB] },
  projects: { api: 'projects', title: 'Projects (Website & App)', filter: r => r.category !== 'Video', fields: [['title'], ['slug'], ['category', 's', ['Website', 'App']], ['description', 't'], ['image', 'u'], ['url'], PB] },
  videos: { api: 'projects', title: 'AI videos', filter: r => r.category === 'Video', defaults: { category: 'Video' }, fields: [['title'], ['slug'], ['description', 't'], ['video', 'u'], ['image', 'u'], ['url'], PB] },
  services: { api: 'services', title: 'Services', fields: [['title'], ['slug'], ['icon'], ['description', 't'], PB] },
  testimonials: { api: 'testimonials', title: 'Testimonials', fields: [['name'], ['role'], ['quote', 't'], ['photo', 'u'], ['rating']] },
  jobs: { api: 'jobs', title: 'Jobs (Careers)', fields: [['title'], ['slug'], ['department'], ['location'], ['type', 's', ['Full-time', 'Part-time', 'Internship', 'Contract']], ['salary'], ['description', 't'], ['requirements', 't'], PB] },
};
const TOOLS = [['H2', '\n<h2>Heading</h2>\n'], ['H3', '\n<h3>Sub heading</h3>\n'], ['Text', '\n<p>Write here</p>\n'], ['List', '\n<ul><li>Point</li></ul>\n'], ['Bold', '<strong>text</strong>'], ['Link', '<a href="https://">text</a>']];
const api = (u, m = 'GET', b) => fetch(u, { method: m, headers: { 'Content-Type': 'application/json' }, body: b && JSON.stringify(b) });
async function up(file) {
  if (!file) return;
  const fd = new FormData(); fd.append('file', file);
  const r = await fetch('/api/upload', { method: 'POST', body: fd }), d = await r.json();
  if (!r.ok) return alert(d.error); return d.url;
}
export default function Module({ k }) {
  const cfg = C[k], [rows, setRows] = useState([]), [edit, setEdit] = useState(null), img = useRef();
  async function load() {
    const r = await api('/api/' + cfg.api);
    if (r.status === 401) return (location.href = '/admin/login');
    const d = await r.json(); setRows(cfg.filter ? d.filter(cfg.filter) : d);
  }
  useEffect(() => { setEdit(null); load(); }, [k]);
  async function save(e) {
    e.preventDefault();
    const b = { ...cfg.defaults, ...Object.fromEntries(new FormData(e.target)) };
    if (b.keywords !== undefined) b.keywords = b.keywords.split(',').map(x => x.trim()).filter(Boolean);
    const r = edit._id ? await api(`/api/${cfg.api}/${edit._id}`, 'PUT', b) : await api('/api/' + cfg.api, 'POST', b);
    if (!r.ok) return alert((await r.json()).error);
    setEdit(null); load();
  }
  const del = async id => confirm('Delete this item?') && (await api(`/api/${cfg.api}/${id}`, 'DELETE'), load());
  const setStatus = async (id, status) => { await api(`/api/${cfg.api}/${id}`, 'PUT', { status }); load(); };
  const insert = s => { const t = document.querySelector('textarea[name=content]'); t.setRangeText(s, t.selectionStart, t.selectionEnd, 'end'); t.focus(); };
  async function pickImg(e) { const f = e.target.files[0]; if (!f) return; const alt = prompt('Image description (alt text)') || ''; const u = await up(f); if (u) insert(`\n<img src="${u}" alt="${alt}">\n`); e.target.value = ''; }
  const fld = ([n, t, o]) => {
    const v = edit[n], d = Array.isArray(v) ? v.join(', ') : v ?? (n === 'published' ? true : '');
    if (t === 's') return <label key={n}>{n}<select name={n} defaultValue={String(d)}>{o.map(x => <option key={x}>{x}</option>)}</select></label>;
    if (t === 'c') return <label key={n}>Blog content (H2/H3 headings become the table of contents)
      <div className="tabs">{TOOLS.map(([l, s]) => <button type="button" className="btn" key={l} onClick={() => insert(s)}>{l}</button>)}
        <button type="button" className="btn" onClick={() => img.current.click()}>Image</button></div>
      <textarea name={n} rows={18} defaultValue={d} /></label>;
    return <label key={n}>{n}{t === 't' ? <textarea name={n} rows={3} defaultValue={d} /> : <input name={n} defaultValue={d} />}
      {t === 'u' && <input type="file" accept="image/*,video/mp4,video/webm" onChange={async e => { const u = await up(e.target.files[0]); if (u) e.target.form[n].value = u; }} />}</label>;
  };
  return <section><div className="wrap"><h2>{cfg.title}</h2>
    <input ref={img} type="file" accept="image/*" hidden onChange={pickImg} />
    {cfg.inbox ? <div style={{ overflowX: 'auto' }}><table><thead><tr>{cfg.inbox.map(c => <th key={c}>{c}</th>)}<th>status</th><th /></tr></thead><tbody>
      {rows.map(r => <tr key={r._id}>{cfg.inbox.map(c => <td key={c}>{c === 'resumeUrl' && r[c] ? <a href={r[c]} target="_blank" rel="noopener noreferrer">open</a> : r[c]}</td>)}
        <td><select value={r.status} onChange={e => setStatus(r._id, e.target.value)}>{cfg.st.map(s => <option key={s}>{s}</option>)}</select></td>
        <td><button className="btn" onClick={() => del(r._id)}>Delete</button></td></tr>)}</tbody></table>{!rows.length && <p>Nothing here yet.</p>}</div>
    : <>
      <button className="btn p" onClick={() => setEdit({})}>Add new</button>
      {edit && <form key={edit._id || 'new'} onSubmit={save} style={{ margin: '20px 0', maxWidth: 900 }}>{cfg.fields.map(fld)}
        <div className="row"><button className="btn p">Save</button><button type="button" className="btn" onClick={() => setEdit(null)}>Cancel</button></div></form>}
      <table><tbody>{rows.map(r => <tr key={r._id}><td>{r.title || r.name}{r.published === false && ' (hidden)'}</td><td>{r.category}</td>
        <td><button className="btn" onClick={() => setEdit(r)}>Edit</button> <button className="btn" onClick={() => del(r._id)}>Delete</button></td></tr>)}</tbody></table>
      {!rows.length && !edit && <p>Nothing here yet. Click "Add new".</p>}</>}
  </div></section>;
}
