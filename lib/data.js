import db from './db';
import { M } from '@/models';
export async function get(k, q = {}, one = false) {
  await db();
  const r = one ? await M[k].findOne(q).lean() : await M[k].find({ published: { $ne: false }, ...q }).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(r));
}

import { Setting } from '@/models';
export const DEFAULTS = {
  heroTitle: 'We build websites, apps and AI videos that bring you customers.',
  heroSub: 'Development, marketing and creative under one roof.',
  heroVideo: '/hero.mp4', cta1Text: 'Start your project', cta1Link: '/contact', cta2Text: 'See our work', cta2Link: '/work',
  showServices: 'yes', showProjects: 'yes', showTestimonials: 'yes', showBlog: 'yes', showCta: 'yes', showAiVideos: 'yes',
  ctaTitle: 'Ready to build something great?', ctaText: 'Tell us about your project and we will reply within one business day.',
  footerAbout: 'MyWorkAgency is a development, marketing and AI video agency.',
  footerEmail: 'hello@myworkagency.com', footerPhone: '', footerAddress: '',
  instagram: '', facebook: '', whatsapp: '', mapLink: '', linkedin: '', youtube: '', twitter: '', copyright: 'MyWorkAgency',
};
export async function settings() {
  await db();
  const d = await Setting.findOne({ key: 'site' }).lean();
  return { ...DEFAULTS, ...(d?.data || {}) };
}
