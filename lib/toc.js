export function withToc(html = '') {
  const toc = [], used = new Set();
  const out = html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (m, l, a, t) => {
    const text = t.replace(/<[^>]+>/g, '').trim();
    let id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section', k = id, n = 1;
    while (used.has(k)) k = `${id}-${++n}`;
    used.add(k); toc.push({ id: k, text, level: +l });
    return `<h${l} id="${k}"${a}>${t}</h${l}>`;
  });
  return { html: out, toc };
}
