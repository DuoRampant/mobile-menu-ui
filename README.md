# Mobile Menu UI

A production-ready collection of **11 mobile bottom navigation bar styles** built with React, TypeScript, and Tailwind CSS. Preview every style in an interactive phone simulator, customize tabs, icons, badges, and colors, then export clean copy-paste code for your own project.

## Features

- **11 distinct menu styles** — minimal, glassmorphism, floating, neumorphism, pill highlight, center FAB, gradient, outline, sliding indicator, curved notch, and iOS-style dock.
- **Live phone simulator** with four wallpaper options and animated screen transitions (Framer Motion).
- **Customizer** — reorder-free tab editing: rename labels, pick icons, add badges, choose accent themes (7 palettes), toggle labels and RTL layout.
- **RTL support** — every menu style fully supports right-to-left layouts using logical CSS properties.
- **Dark mode** — class-based dark theme toggle across the entire studio.
- **Code exporter** — generates a self-contained React + TypeScript + Framer Motion component or plain Tailwind HTML markup from your current configuration.
- **Preset library** — save configurations to Supabase and load them back with one click.

## Tech Stack

| Layer      | Tools                                                        |
| ---------- | ------------------------------------------------------------ |
| Frontend   | React 19, TypeScript, Vite 7, Tailwind CSS 4                 |
| Animation  | Framer Motion                                                |
| Icons      | Lucide React                                                 |
| Backend    | Vercel serverless functions (`api/`)                         |
| Database   | Supabase (PostgreSQL)                                        |

## Getting Started

### Prerequisites

- Node.js 20+
- A Supabase project (for the preset library; the UI works without it)

### Install & run

```bash
npm install
npm run dev
```

### Environment variables

Copy `.env.example` to `.env` and fill in the values:

| Variable                    | Scope    | Description                                              |
| --------------------------- | -------- | -------------------------------------------------------- |
| `SUPABASE_URL`              | server   | Your Supabase project URL                                |
| `SUPABASE_SERVICE_ROLE_KEY` | server   | Service role key — server-side only, never commit        |
| `API_ADMIN_TOKEN`           | server   | Required header value for update/delete endpoints        |
| `ALLOWED_ORIGIN`            | optional | Restricts CORS to your deployed origin (defaults to `*`) |

> Server variables are read by the Vercel functions at runtime — set them in your hosting dashboard for production deployments.

### Database setup

Run the migration to enable atomic like counters:

```sql
-- supabase/migrations/0001_increment_likes.sql
```

Execute it in the Supabase SQL editor, or via the Supabase CLI.

## Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start the development server      |
| `npm run build`   | Type-check and build for production |
| `npm run lint`    | Lint the codebase                 |
| `npm run preview` | Preview the production build      |

## Project Structure

```
├── api/                     # Vercel serverless functions
│   ├── db-client.js         # Supabase client factory (service role)
│   └── menu-presets.js      # Preset CRUD + likes endpoint
├── src/
│   ├── components/
│   │   ├── MenuStyles/      # The 11 navigation bar implementations
│   │   ├── PhoneSimulator   # Interactive device preview
│   │   ├── MenuCustomizer   # Tab/icon/badge/theme editor
│   │   ├── CodeExporter     # Config → code generator
│   │   └── PresetLibrary    # Saved configuration browser
│   ├── lib/themes.ts        # Accent color token definitions
│   ├── types/menu.ts        # Shared types & style metadata
│   └── index.css            # Tailwind entry + dark mode variant
└── supabase/migrations/     # Database migrations
```

## Security Notes

- All mutating API operations are validated server-side (enum checks, length limits, item shape).
- Update and delete endpoints require the `X-Admin-Token` header matching `API_ADMIN_TOKEN`.
- Likes use an atomic database function to prevent race conditions.
- Search input is sanitized before being passed to PostgREST filters.
- Never commit real credentials — configure them through environment variables.

## License

MIT
