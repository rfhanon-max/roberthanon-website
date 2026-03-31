import Link from "next/link";
import { contactDetails, navigation, siteContent } from "@/lib/site-content";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="max-w-xl">
          <p className="font-display text-2xl text-navy">{siteContent.brand.name}</p>
          <p className="mt-2 text-sm uppercase tracking-[0.26em] text-muted">
            {siteContent.brand.subtitle}
          </p>
          <p className="mt-5 text-sm leading-7 text-muted">{siteContent.footer.description}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Navigation</p>
          <div className="mt-5 flex flex-col gap-3 text-sm text-muted">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-navy">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Contact</p>
          <div className="mt-5 space-y-3 text-sm text-muted">
            <p>{contactDetails.office}</p>
            <p>{contactDetails.region}</p>
            <p>{contactDetails.phone}</p>
            <p>{contactDetails.email}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
