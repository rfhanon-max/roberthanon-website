"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPortalByCredentials } from "@/lib/client-portal-store";

export type LoginState = {
  error?: string;
};

export async function loginClientPortal(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") || "").trim();
  const accessCode = String(formData.get("accessCode") || "").trim();

  if (!email || !accessCode) {
    return { error: "Enter the client email and access code." };
  }

  const portal = await getPortalByCredentials(email, accessCode);
  if (!portal) {
    return { error: "We could not match that login. Please check the email and access code." };
  }

  const cookieStore = await cookies();
  cookieStore.set("client_portal_slug", portal.slug, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect("/client-portal/me");
}
