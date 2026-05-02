"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CLIENT_PORTAL_COOKIE, createPortalSessionValue } from "@/lib/client-portal-auth";
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
  cookieStore.set(CLIENT_PORTAL_COOKIE, createPortalSessionValue(portal), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  redirect("/client-portal/me");
}
