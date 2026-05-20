# Users & Roles (Next.js + Prisma Postgres + Vercel)

End-to-end app with **User** and **Role** tables in Prisma Postgres, a `GET /users` JSON API, and a paginated home page with validation, fallback data, and failure alerts.

## Environment variables

| Variable | Purpose |
| -------- | ------- |
| `DATABASE_URL` | **Required by Prisma** — connection string for schema & client |
| `POSTGRES_URL` | Vercel / Prisma Postgres direct URL (set same value as `DATABASE_URL`) |
| `PRISMA_DATABASE_URL` | Prisma Postgres URL (optional fallback) |

Copy the example and paste your values from the [Prisma Data Platform](https://console.prisma.io) or Vercel storage integration:

```bash
cp .env.example .env
```

Never commit `.env` — it is gitignored.

## Local development

```bash
npm install
npm run db:push    # create tables (first time)
npm run db:seed    # seed roles + sample users
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push the repo to GitHub (or GitLab / Bitbucket).

2. Import the project in [Vercel](https://vercel.com/new).

3. Add environment variables (from Prisma Postgres / Vercel integration — use the **same** connection string for each):
   - `DATABASE_URL` (required)
   - `POSTGRES_URL`
   - `PRISMA_DATABASE_URL`

4. Deploy. Vercel runs `prisma generate && next build` (see `vercel.json`).

5. **One-time:** apply schema and seed the remote database from your machine (with env vars set):

   ```bash
   npm run db:push
   npm run db:seed
   ```

   Or use the Vercel CLI after linking:

   ```bash
   vercel env pull .env.local
   npm run db:push
   npm run db:seed
   ```

## API

`GET /users` — JSON array of users with nested role:

```json
[
  {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "role": { "id": 1, "name": "Admin" }
  }
]
```

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Dev server |
| `npm run build` | Prisma generate + production build |
| `npm run db:push` | Push schema to Postgres |
| `npm run db:seed` | Seed roles and users |
| `npm run db:studio` | Prisma Studio |

## Stack

- Next.js App Router
- Prisma 6 + PostgreSQL (Prisma Postgres / Vercel)
- TanStack Table (pagination)
- Client-side API validation, fallback rows, dismissible failure alert
