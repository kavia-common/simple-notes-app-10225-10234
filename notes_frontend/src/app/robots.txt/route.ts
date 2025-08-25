import { NextResponse } from "next/server";

export const dynamic = "force-static";

// PUBLIC_INTERFACE
export async function GET() {
  /** Serve a minimal robots.txt for static hosting. */
  const body = `User-agent: *
Allow: /
Sitemap: /sitemap.xml
`;
  return new NextResponse(body, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
