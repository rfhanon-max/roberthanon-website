import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";

export const metadata: Metadata = {
  title: "Robert Hanon | Southeastern Wisconsin Real Estate",
  description:
    "Personal real estate guidance for buyers and sellers in Southeastern Wisconsin, built on trust, legacy, and careful service.",
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
      </body>
    </html>
  );
}
