import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import { ClientPortalDashboard } from "@/components/portal/client-portal-dashboard";
import { CLIENT_PORTAL_COOKIE, isValidPortalSession } from "@/lib/client-portal-auth";
import { getPortalBySlug } from "@/lib/client-portal-store";

export default async function ClientPortalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const session = cookieStore.get(CLIENT_PORTAL_COOKIE)?.value;
  const record = await getPortalBySlug(slug);

  if (!record) {
    notFound();
  }

  if (!isValidPortalSession(session, record)) {
    redirect("/client-login");
  }

  return <ClientPortalDashboard record={record} />;
}
