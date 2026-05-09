# SmartQuotation

Production-oriented web app for **swimming pool construction quotations**: customer & project details, section-wise bill of quantities (A–D), GST totals, printable preview, **PDF** (Puppeteer) and **Word** (.docx), product catalog, and company branding.

## Stack

- Next.js 15 (App Router), TypeScript, Tailwind CSS v4  
- PostgreSQL + Prisma ORM  
- React Hook Form + Zod  
- iron-session (credential login)  
- Puppeteer / puppeteer-core + `@sparticuz/chromium` on Vercel  
- `docx` for Word export  
- Zustand (draft store; optional UI state)

## Prerequisites

- Node.js 20+  
- PostgreSQL database  
- For local **PDF** generation, a normal Puppeteer install (downloads Chromium on first run). On **Vercel**, the API routes use `puppeteer-core` + `@sparticuz/chromium` when `VERCEL=1`.

## Setup

1. **Clone and install**

   ```bash
   npm install
   ```

2. **Environment**

   Copy `.env.example` to `.env` and set:

   - `DATABASE_URL` — PostgreSQL connection string  
   - `SESSION_SECRET` — **at least 32 characters** (required by iron-session)

3. **Database**

   ```bash
   npx prisma migrate deploy
   ```

   Or during development:

   ```bash
   npx prisma db push
   ```

4. **Seed** (admin user, company defaults, product master)

   ```bash
   npm run db:seed
   ```

   Default admin (unless you set `SEED_ADMIN_PASSWORD` when seeding):

   - **Email:** `admin@smartquotation.local`  
   - **Password:** `ChangeMe!Smart2026`  

   Change the password after first login by re-seeding with `SEED_ADMIN_PASSWORD` or updating the user in the database.

5. **Run**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). You will be redirected to `/login` until authenticated.

### Database connection errors (`PrismaClientInitializationError`)

If you see **Authentication failed against database server** when logging in:

1. **PostgreSQL must be running** and must match `DATABASE_URL` (host, port, user, password, database name).
2. Run **`npx prisma migrate deploy`** (or `db push`) and **`npm run db:seed`** after the DB is up.

**Easy local database (Docker)** — from the project root:

```bash
docker compose up -d
```

Then put this in `.env` (Docker is mapped to port **5433** so it does not clash with another Postgres on 5432):

`DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5433/smartquotation?schema=public"`

Restart `npm run dev`, run migrate + seed again, then try logging in.

## Deploying on Vercel

- Add the same env vars: `DATABASE_URL`, `SESSION_SECRET` (32+ chars).  
- Connect a hosted Postgres (Vercel Postgres, Neon, Supabase, etc.).  
- Run migrations against production: `npx prisma migrate deploy` (CI or local with prod `DATABASE_URL`).  
- PDF routes use `nodejs` runtime and `maxDuration` 60s; adjust in `app/api/quotations/[id]/pdf/route.ts` if your plan allows.  
- Large logo/signature **data URLs** in `CompanySettings` count toward DB size; for very large assets consider moving to object storage later.

## Project layout (high level)

| Path | Role |
|------|------|
| `app/(dashboard)/` | Protected UI: dashboard, quotations, products, settings |
| `app/api/` | PDF / DOCX / product JSON |
| `components/` | UI + quotation editor, tables |
| `lib/` | Prisma client, session, totals utilities, actions |
| `templates/quotation-html.ts` | Print/PDF HTML |
| `prisma/` | Schema + migrations + `seed.ts` |

## Features

- Quote numbers like `MRSP-2026-001`  
- Indian **amount in words** on totals  
- Soft-delete quotations (`deletedAt`)  
- Auto-save draft (debounced) when editing an existing quote  
- Duplicate quotation (new customer + new quote number)  
- WhatsApp share link from preview (prefilled text + page URL)

## License

Private / use for your business. Adjust as needed.
