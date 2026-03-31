import Link from "next/link";
import { SectionHeading } from "@/components/site/section-heading";

type PortalFeatureSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  bullets: readonly string[];
};

export function PortalFeatureSection({
  eyebrow,
  title,
  description,
  bullets,
}: PortalFeatureSectionProps) {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8 lg:py-24">
      <div>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/client-login"
            className="inline-flex items-center rounded-full bg-navy px-6 py-3 text-sm font-medium text-white transition hover:bg-[#1a2c47]"
            style={{ color: "#f8f5ef" }}
          >
            Open Client Login
          </Link>
          <a
            href="https://roberthanon.shorewest.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-line px-6 py-3 text-sm text-navy transition hover:border-navy"
          >
            Visit Shorewest Profile
          </a>
        </div>
      </div>

      <div className="rounded-[2rem] border border-line bg-white p-6 shadow-panel md:p-8">
        <div className="rounded-[1.75rem] bg-[linear-gradient(180deg,#22395d_0%,#18273e_100%)] p-6 text-white">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/60">Client Portal</p>
              <p className="mt-2 font-display text-2xl">Private, organized, and easy to revisit.</p>
            </div>
            <div className="rounded-full border border-white/20 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/70">
              Secure Login
            </div>
          </div>

          <div className="mt-8 grid gap-4">
            {bullets.map((bullet, index) => (
              <div
                key={bullet}
                className="grid gap-3 rounded-[1.25rem] border border-white/10 bg-white/8 px-4 py-4 md:grid-cols-[auto_1fr] md:items-start"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/12 text-sm font-medium text-white">
                  {index + 1}
                </div>
                <p className="text-sm leading-7 text-white/80">{bullet}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
