import Link from "next/link";
import { getAllPortals } from "@/lib/client-portal-store";

export default async function ClientPortalIndexPage() {
  const portals = await getAllPortals();

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.32em] text-muted">Portal Studio</p>
        <h1 className="mt-4 font-display text-5xl text-navy">Client portals created from one repeatable template.</h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          Use the studio to create a new portal, then send the client their email and access code for login.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/portal-studio"
          className="inline-flex items-center rounded-full bg-navy px-5 py-3 text-sm text-white transition hover:bg-[#1a2c47]"
          style={{ color: "#f8f5ef" }}
        >
          Open Portal Studio
        </Link>
        <Link
          href="/client-login"
          className="inline-flex items-center rounded-full border border-line px-5 py-3 text-sm text-navy transition hover:border-navy"
        >
          Open Client Login
        </Link>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {portals.map((portal) => (
          <article key={portal.slug} className="rounded-[2rem] border border-line bg-white p-8 shadow-card">
            <p className="text-xs uppercase tracking-[0.28em] text-muted">{portal.transactionType} Portal</p>
            <h2 className="mt-4 font-display text-3xl text-navy">{portal.clientNames}</h2>
            <p className="mt-3 text-base leading-8 text-muted">{portal.address}</p>
            <p className="mt-6 text-sm text-muted">Client login: {portal.email}</p>
            <p className="mt-2 text-sm text-muted">Access code: {portal.accessCode}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/client-portal/${portal.slug}`}
                className="inline-flex items-center rounded-full border border-line px-5 py-2.5 text-sm text-navy transition hover:border-navy"
              >
                Preview Portal
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
