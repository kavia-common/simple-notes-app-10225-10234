import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simple Notes",
  description: "Create, view, edit, delete, and search notes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="container-app" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
