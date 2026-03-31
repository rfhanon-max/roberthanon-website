import { notFound } from "next/navigation";
import { ClientPortalDashboard } from "@/components/portal/client-portal-dashboard";
import { getAllPortals, getPortalBySlug } from "@/lib/client-portal-store";

export async function generateStaticParams() {
  const portals = await getAllPortals();
  return portals.map((portal) => ({ slug: portal.slug }));
}

export default async function ClientPortalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const record = await getPortalBySlug(slug);

  if (!record) {
    notFound();
  }

  return <ClientPortalDashboard record={record} />;
}
