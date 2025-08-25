This app is configured with Next.js static export (next.config.ts: output: "export").

Notes on runtime:
- If using NEXT_PUBLIC_NOTES_API_BASE, ensure it is available at build time (for static export, env is inlined).
- LocalStorage mode requires no backend and works fully client-side.
- If deploying to a static host, use `npm run build` and serve the `out/` directory.
