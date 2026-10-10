import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
await mongoose.connect(process.env.MONGODB_URI);
const U = mongoose.model('User', new mongoose.Schema({ email: String, password: String }));
const Sv = mongoose.model('Service', new mongoose.Schema({ title: String, slug: String, description: String, icon: String, published: { type: Boolean, default: true } }, { timestamps: true }));
const { ADMIN_EMAIL: e, ADMIN_PASSWORD: p } = process.env;
await U.findOneAndUpdate({ email: e }, { email: e, password: await bcrypt.hash(p, 10) }, { upsert: true });
if (!(await Sv.countDocuments())) {
  await Sv.insertMany([
    ['</>', 'Development', 'development', 'Fast, SEO-ready websites and web apps.'], ['▣', 'App Development', 'app-development', 'iOS and Android apps built to scale.'],
    ['◉', 'Digital Marketing', 'digital-marketing', 'Ads, SEO and funnels that convert.'], ['★', 'Influencer Marketing', 'influencer-marketing', 'Creators matched to your audience.'],
    ['✦', 'AI Video', 'ai-video', 'Ads and explainers made with AI.'], ['▶', 'Video Editing', 'video-editing', 'Reels, shorts and long-form edits.'],
    ['◐', 'Graphic Design', 'graphic-design', 'Logos, social posts and brand kits.'], ['▤', 'UI/UX Design', 'ui-ux-design', 'Clear flows and clean interfaces.'],
  ].map(([icon, title, slug, description]) => ({ icon, title, slug, description })));
  console.log('Default 8 services added');
}
console.log('Admin ready:', e); process.exit(0);
