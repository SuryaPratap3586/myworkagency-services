# MyWorkAgency: Next.js + Node + MongoDB
1. `npm install`
2. `cp .env.example .env.local` and fill in MONGODB_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
3. `npm run seed` creates the admin user
4. `npm run dev`, then open http://localhost:3000 and log in at /admin/login
Home page and footer text, hero video and section visibility are editable at /admin/settings.
Blog content is HTML (only admins can write it). Image/video fields take URLs.

## Routes
/ (home) · /services · /services/[slug] · /work · /work/[slug] · /blog · /blog/[slug] · /contact · /admin · /admin/settings
Slug is required for services, projects and posts (lowercase, hyphens, e.g. `web-development`).

## Admin
Tabs: leads, applications (job applicants), projects (Website / App / Video), services, posts, jobs (careers), testimonials, plus "home & footer".
Blog editor: use the H2/H3/Image buttons. Headings automatically become the table of contents beside the article.
Uploads are saved in the `uploads/` folder (works on a VPS or local; on Vercel use cloud storage instead).

## Admin URLs (login at /admin/login)
/admin (dashboard) · /admin/leads · /admin/blogs · /admin/projects · /admin/videos · /admin/services · /admin/testimonials · /admin/jobs · /admin/applications · /admin/settings
