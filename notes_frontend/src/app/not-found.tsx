import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-800">404 — Not Found</h1>
        <p className="text-gray-600 mt-2">The page you are looking for does not exist.</p>
        <Link href="/" className="primary-btn inline-block mt-4" aria-label="Go Home">
          Go Home
        </Link>
      </div>
    </main>
  );
}
