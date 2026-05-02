"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createPortalStudioSessionValue,
  PORTAL_STUDIO_COOKIE,
  verifyPortalStudioPassword,
} from "@/lib/portal-studio-access";

export type PortalStudioLoginState = {
  error?: string;
};

export async function loginPortalStudio(
  _prevState: PortalStudioLoginState,
  formData: FormData,
): Promise<PortalStudioLoginState> {
  const password = String(formData.get("password") || "");

  if (!verifyPortalStudioPassword(password)) {
    return { error: "That password did not match." };
  }

  const session = createPortalStudioSessionValue();
  if (!session) {
    return { error: "Portal Studio password is not configured." };
  }

  const cookieStore = await cookies();
  cookieStore.set(PORTAL_STUDIO_COOKIE, session, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  redirect("/portal-studio");
}
