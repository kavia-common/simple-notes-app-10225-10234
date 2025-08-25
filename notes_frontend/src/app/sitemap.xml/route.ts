import { NextResponse } from "next/server";

export const dynamic = "force-static";

// PUBLIC_INTERFACE
export async function GET() {
  /** Serve a minimal sitemap.xml. */
  const base = process.env.NEXT_PUBLIC_SITE_URL || "";
  const url = (p: string) => `${base}${p}`;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${url("/")}</loc></url>
  <url><loc>${url("/health")}</loc></url>
</urlset>`;
  return new NextResponse(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
