import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PortalStudioForm } from "@/components/portal/portal-studio-form";
import { getAllPortals } from "@/lib/client-portal-store";
import {
  isValidPortalStudioSession,
  PORTAL_STUDIO_COOKIE,
} from "@/lib/portal-studio-access";

export const dynamic = "force-dynamic";

export default async function PortalStudioPage() {
  const cookieStore = await cookies();
  if (!isValidPortalStudioSession(cookieStore.get(PORTAL_STUDIO_COOKIE)?.value)) {
    redirect("/portal-studio/login");
  }

  const portals = await getAllPortals();

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.32em] text-muted">Portal Studio</p>
        <h1 className="mt-4 font-display text-5xl text-navy">Create client portals without touching the layout code.</h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          Start from the buyer template, edit the contingencies that matter for this deal, and save the finished portal.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/portal-studio"
          className="inline-flex items-center rounded-full bg-navy px-5 py-3 text-sm font-medium text-white"
          style={{ color: "#f8f5ef" }}
        >
          Create + Manage
        </Link>
        <Link
          href="/portal-studio/calendar"
          className="inline-flex items-center rounded-full border border-line bg-white px-5 py-3 text-sm font-medium text-navy transition hover:border-navy"
        >
          Master Calendar
        </Link>
      </div>

      <div className="mt-12 grid gap-10 xl:grid-cols-[minmax(0,1.2fr)_360px]">
        <PortalStudioForm />

        <aside className="space-y-6">
          <section className="rounded-[2rem] border border-line bg-white p-6 shadow-card">
            <p className="text-xs uppercase tracking-[0.28em] text-muted">Existing Portals</p>
            <div className="mt-5 space-y-4">
              {portals.map((portal) => (
                <div key={portal.slug} className="rounded-[1.3rem] border border-line bg-paper p-4">
                  <p className="font-semibold text-navy">{portal.clientNames}</p>
                  <p className="mt-1 text-sm text-muted">{portal.email}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.22em] text-muted">
                    /client-portal/{portal.slug}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href={`/portal-studio/${portal.slug}`}
                      className="inline-flex items-center rounded-full border border-line px-4 py-2 text-sm text-navy transition hover:border-navy"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/client-portal/${portal.slug}`}
                      className="inline-flex items-center rounded-full border border-line px-4 py-2 text-sm text-muted transition hover:border-navy hover:text-navy"
                    >
                      View portal
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-line bg-paper p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-muted">How this works</p>
            <p className="mt-4 text-sm leading-7 text-muted">
              This version stores portals in a local JSON file so you can test the workflow now. Later, this same setup can be moved to a database-backed login system.
            </p>
            <p className="mt-4 text-sm leading-7 text-muted">
              For cover photos, place JPG files in <span className="font-medium text-navy">public/client-portals</span> and use a path like <span className="font-medium text-navy">/client-portals/example-home.jpg</span>.
            </p>
          </section>
        </aside>
      </div>
    </section>
  );
}
