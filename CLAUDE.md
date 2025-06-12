# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a Next.js website built with Payload CMS as the backend, specifically customized for Save Sinovac. The architecture combines:

- **Frontend**: Next.js 15 App Router with TypeScript
- **CMS**: Payload CMS v3.32.0 with custom collections and blocks
- **Database**: SQLite with Turso for production
- **Styling**: TailwindCSS with shadcn/ui components
- **Content**: Webflow integration via devlink for component generation

### Key Architecture Points

- **Hybrid Webflow Integration**: The `data/devlink/` directory contains generated components from Webflow, while `src/blocks/` contains Payload CMS block configurations that wrap these components
- **Builder System**: The `builder/` directory contains scripts for syncing data between Webflow, Payload CMS, and various storage systems (Vercel Blob, S3, etc.)
- **Localization**: Configured for Chinese (`zh`) as the default locale
- **Block-Based Layout**: Pages use a layout builder system with reusable blocks (HomeHeader, HomeIntro, Footer, etc.)

## Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
pnpm lint:fix

# Generate Payload types
pnpm generate:types

# Generate import map
pnpm generate:importmap

# Sync Webflow components
pnpm sync
```

## Data Management Architecture

The project uses a sophisticated data pipeline:

1. **Webflow → devlink**: Components synced via `pnpm sync`
2. **Builder Scripts**: Located in `builder/` for data transformation and syncing
3. **Payload Collections**: Custom collections (HomepageBlocks, Resources, Pages)
4. **Storage**: Vercel Blob for media, SQLite/Turso for data

### Key Collections

- **Pages**: Layout builder enabled with nested docs
- **HomepageBlocks**: Blocks for homepage content
- **Resources**: Content resources
- **Media**: File uploads with image optimization

## Block System

Blocks are in `src/blocks/` with each having:
- `config.ts`: Payload field configuration  
- `index.jsx`: React component (wraps Webflow devlink components)
- `client.jsx`: Client-side interactivity
- `.module.css`: Component styles

## Environment Requirements

- Node.js 20.18.2
- Database: SQLite with optional Turso (DATABASE_URI, DATABASE_TOKEN)
- Storage: Vercel Blob (BLOB_READ_WRITE_TOKEN)
- Email: SMTP configuration for nodemailer