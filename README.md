# Tathastu — Monorepo

B2B marketing site for **Tathastu Techno Solution** — hardware, software, and plugins for creative industries (VFX/M&E, AEC, Education, Manufacturing).

## Stack

| Layer | Technology |
|---|---|
| CMS / API | Strapi 5, TypeScript, SQLite (dev) / PostgreSQL (prod) |
| Frontend | Next.js 15 (App Router), TypeScript, Tailwind CSS v4 |
| Infra | Docker Compose (postgres + cms + web) |

---

## Prerequisites

- Node.js ≥ 20
- npm ≥ 10
- Docker & Docker Compose (for full stack)

---

## Local Development (without Docker)

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp apps/cms/.env.example apps/cms/.env
cp apps/web/.env.example apps/web/.env
# Edit both .env files with your local values
```

### 3. Start Strapi CMS (port 1337)
```bash
npm run dev:cms
```

On first run, Strapi will create the SQLite database and prompt you to create an admin user at http://localhost:1337/admin.

### 4. Seed content
```bash
npm run seed
```

### 5. Start Next.js frontend (port 3000)
```bash
npm run dev:web
```

Visit http://localhost:3000

---

## Docker Compose (Full Stack)

```bash
cp .env.example .env
# Edit .env with Postgres credentials
docker-compose up --build
```

Services:
- `postgres` → port 5432
- `cms` (Strapi) → http://localhost:1337
- `web` (Next.js) → http://localhost:3000

---

## Project Structure

```
tathastu/
├── apps/
│   ├── cms/          # Strapi 5 CMS
│   └── web/          # Next.js 15 frontend
├── packages/
│   └── types/        # Shared TypeScript types
├── docker-compose.yml
├── .env.example
├── package.json      # npm workspaces root
└── README.md
```

---

## Environment Variables

See `.env.example` at the repo root and within each app directory.

### Key variables

| Variable | App | Description |
|---|---|---|
| `DATABASE_URL` | cms | Postgres connection string (prod) |
| `JWT_SECRET` | cms | Strapi JWT secret (32+ chars) |
| `ADMIN_JWT_SECRET` | cms | Strapi admin JWT secret |
| `API_TOKEN_SALT` | cms | Strapi API token salt |
| `NEXT_PUBLIC_STRAPI_URL` | web | Strapi base URL (e.g. http://localhost:1337) |
| `STRAPI_API_TOKEN` | web | Strapi read-only API token (server-side only) |

---

## Content Management

Access the Strapi admin at http://localhost:1337/admin (or your deployed CMS URL).

- **Homepage sections** are managed via the Dynamic Zone on the `homepage` single type.
- **Site-wide settings** (nav, footer, contact info) are in `siteSettings`.
- **Blog posts, industries, team members, etc.** are standard collection types.

---

## Deployment Notes

- Set `NODE_ENV=production` in both apps.
- CMS: configure a PostgreSQL `DATABASE_URL` and set `STRAPI_PLUGIN_I18N_DEFAULT_LOCALE=en`.
- Web: set `NEXT_PUBLIC_STRAPI_URL` to the production CMS URL and `STRAPI_API_TOKEN` to a read-only token generated in the Strapi admin.
- For media uploads in production, configure an S3-compatible provider via `UPLOAD_PROVIDER` env var.

---

## Content Fixes (vs. Figma source)

| Issue | Applied Fix |
|---|---|
| Page "Blogk" in Figma | → "Blog" |
| Footer email `info@tathastu.global.com` (double TLD) | → `info@tathastu.global` ⚠️ *please confirm* |
| Typo "thier" in Expertise card | → "their" |
| Lorem ipsum blog posts | → Real draft content |
