import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";

export const metadata: Metadata = {
  title: "Robert Hanon | Southeastern Wisconsin Real Estate",
  description:
    "Personal real estate guidance for buyers and sellers in Southeastern Wisconsin, built on trust, legacy, and careful service.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/android-chrome-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Shared site layout keeps the main structure consistent across every page. */}
        <div className="site-shell">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
