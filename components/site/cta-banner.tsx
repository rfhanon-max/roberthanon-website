import Link from "next/link";

type CtaBannerProps = {
  title: string;
  description: string;
  action: { label: string; href: string };
};

export function CtaBanner({ title, description, action }: CtaBannerProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-10 lg:px-8 lg:py-16">
      <div className="rounded-[2rem] border border-line bg-white px-8 py-10 shadow-panel md:px-12 md:py-14">
        <p className="text-xs uppercase tracking-[0.32em] text-muted">Next Step</p>
        <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl leading-tight text-navy md:text-4xl">{title}</h2>
            <p className="mt-4 text-base leading-8 text-muted md:text-lg">{description}</p>
          </div>
          <Link
            href={action.href}
            className="inline-flex items-center justify-center rounded-full bg-navy px-6 py-3 text-sm text-white transition hover:bg-accent"
            style={{ color: "#f8f5ef" }}
          >
            {action.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
