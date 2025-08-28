## SaaS PDF Tools (Next.js + Supabase + pdf-lib)

### Quickstart

1) Install

```bash
npm install
```

2) Env Vars (create `.env.local`)

```
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_URL=your-url
SUPABASE_ANON_KEY=your-anon-key
```

3) Supabase setup

- Create storage bucket named `pdfs` and make it public (or add signed URL logic).
- Run SQL in `prisma.sql` to create `actions_log` and RLS policies.
- Set Auth URL: add redirect `https://localhost:3000/auth/callback` and your Vercel URL.

4) Dev

```bash
npm run dev
```

Open http://localhost:3000

### Features

- Email/password auth (signup/login/reset)
- Upload PDF to Supabase Storage
- Dashboard listing files and action history
- PDF tools: compress, merge, split, add signature
- Action logging to Supabase table

### Deploy (Vercel)

- Add env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Set `VERCEL_ENV` project; no special build steps required.

# cs