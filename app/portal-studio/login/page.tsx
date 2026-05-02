import { PortalStudioLoginForm } from "@/components/portal/portal-studio-login-form";

export const dynamic = "force-dynamic";

export default function PortalStudioLoginPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-14 lg:px-8 lg:py-20">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.32em] text-muted">Client Portal</p>
        <h1 className="mt-4 font-display text-5xl text-navy">
          Secure access for portal updates.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          Once logged in, you can update dates, notes, completed items, and client portal details.
        </p>
      </div>

      <div className="mt-12">
        <PortalStudioLoginForm />
      </div>
    </section>
  );
}
