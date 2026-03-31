import Image from "next/image";
import Link from "next/link";
import { navigation, siteContent } from "@/lib/site-content";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/92 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link href="/" className="max-w-xs">
          <div>
            <p className="font-display text-xl text-navy">{siteContent.brand.name}</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-muted">
              {siteContent.brand.tagline}
            </p>
          </div>
        </Link>

        <nav aria-label="Primary" className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-navy">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/client-login"
            className="inline-flex items-center justify-center rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#1a2c47]"
            style={{ color: "#f8f5ef" }}
          >
            Client Login
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-line px-5 py-2.5 text-sm text-navy transition hover:border-navy hover:bg-navy hover:text-white"
          >
            Get in Touch
          </Link>
          <a
            href="https://roberthanon.shorewest.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit Robert Hanon's Shorewest website"
            className="inline-flex items-center justify-center rounded-full border border-line bg-white px-3 py-2 transition hover:border-navy hover:bg-[#faf6ef]"
          >
            <span className="relative block h-7 w-[5.9rem] overflow-hidden">
              <Image
                src="/branding/Shorewest Logo.gif"
                alt="Shorewest logo"
                fill
                className="object-contain"
                sizes="95px"
              />
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
