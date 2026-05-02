import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ClientPortalDashboard } from "@/components/portal/client-portal-dashboard";
import {
  CLIENT_PORTAL_COOKIE,
  getPortalSlugFromSession,
  isValidPortalSession,
} from "@/lib/client-portal-auth";
import { getPortalBySlug } from "@/lib/client-portal-store";

export default async function ClientPortalMePage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(CLIENT_PORTAL_COOKIE)?.value;
  const slug = getPortalSlugFromSession(session);

  if (!slug) {
    redirect("/client-login");
  }

  const record = await getPortalBySlug(slug);
  if (!record || !isValidPortalSession(session, record)) {
    redirect("/client-login");
  }

  return <ClientPortalDashboard record={record} />;
}
