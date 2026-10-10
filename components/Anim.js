'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
export default function Anim() {
  const p = usePathname();
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
    document.querySelectorAll('.card,section h2,.ph h1,.prose>*,.art>*,.toc,.fgrid>div,.cta,.hd').forEach((el, i) => { el.classList.add('rv'); el.style.transitionDelay = (i % 4) * 80 + 'ms'; io.observe(el); });
    return () => io.disconnect();
  }, [p]);
  return null;
}
