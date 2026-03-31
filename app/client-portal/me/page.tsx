import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ClientPortalDashboard } from "@/components/portal/client-portal-dashboard";
import { getPortalBySlug } from "@/lib/client-portal-store";

export default async function ClientPortalMePage() {
  const cookieStore = await cookies();
  const slug = cookieStore.get("client_portal_slug")?.value;

  if (!slug) {
    redirect("/client-login");
  }

  const record = await getPortalBySlug(slug);
  if (!record) {
    redirect("/client-login");
  }

  return <ClientPortalDashboard record={record} />;
}
