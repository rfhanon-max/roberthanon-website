import { ClientLoginForm } from "@/components/portal/client-login-form";

export default function ClientLoginPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-14 lg:px-8 lg:py-20">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.32em] text-muted">Client Portal</p>
        <h1 className="mt-4 font-display text-5xl text-navy">A private place for dates, deadlines, and next steps.</h1>
      </div>

      <div className="mt-12">
        <ClientLoginForm />
      </div>
    </section>
  );
}
