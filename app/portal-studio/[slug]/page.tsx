import { notFound } from "next/navigation";
import { PortalStudioForm } from "@/components/portal/portal-studio-form";
import { getPortalBySlug } from "@/lib/client-portal-store";
import { isPortalStudioEnabled } from "@/lib/portal-studio-access";

type PortalStudioEditPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PortalStudioEditPage({ params }: PortalStudioEditPageProps) {
  if (!isPortalStudioEnabled()) {
    notFound();
  }

  const { slug } = await params;
  const portal = await getPortalBySlug(slug);

  if (!portal) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.32em] text-muted">Portal Studio</p>
        <h1 className="mt-4 font-display text-5xl text-navy">Edit {portal.clientNames}</h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          Update dates, notes, completed items, or the cover photo path, then save the changes.
        </p>
      </div>

      <div className="mt-12">
        <PortalStudioForm initialPortal={portal} />
      </div>
    </section>
  );
}
