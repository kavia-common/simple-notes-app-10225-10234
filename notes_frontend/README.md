# Simple Notes Frontend

A minimalistic, light-themed Next.js app to create, view, edit, delete, and search notes.  
Layout: responsive header, sidebar (categories), main area with notes list and editor.

Colors:
- Primary: #1976D2
- Secondary: #424242
- Accent: #FFB300

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Data Storage

By default, the app persists notes to localStorage in the browser.

Optionally, you can point it to a backend API. Set the following env variable:

- NEXT_PUBLIC_NOTES_API_BASE=http://localhost:4000/api

When set, the app will use:
- GET    {NEXT_PUBLIC_NOTES_API_BASE}/notes?q=&category=
- GET    {NEXT_PUBLIC_NOTES_API_BASE}/notes/:id
- POST   {NEXT_PUBLIC_NOTES_API_BASE}/notes           (body: {title?,content?,category?})
- PUT    {NEXT_PUBLIC_NOTES_API_BASE}/notes/:id       (body: partial note)
- DELETE {NEXT_PUBLIC_NOTES_API_BASE}/notes/:id

## Environment Variables

Create a .env.local file with:

```
# Optional: point to a backend to persist notes
NEXT_PUBLIC_NOTES_API_BASE=
```

Do not commit real secrets. These values are read at build/runtime by the browser.

## Scripts

- npm run dev — start dev server
- npm run build — build for production
- npm run start — start production server
- npm run lint — run linter

## Project Structure

- src/app/page.tsx — main UI (header, sidebar, list, editor)
- src/components/* — modular UI components
- src/lib/storage.ts — storage service (localStorage or HTTP API)
- src/lib/types.ts — shared types
- src/lib/hooks.ts — utilities (debounce)

## Accessibility

- Buttons and inputs have labels or aria-labels
- Keyboard- and screen-reader-friendly semantics
