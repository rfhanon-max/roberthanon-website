import { createHmac, timingSafeEqual } from "node:crypto";
import type { ClientPortalRecord } from "@/lib/client-portal-schema";

export const CLIENT_PORTAL_COOKIE = "client_portal_session";

function signPortalSession(record: ClientPortalRecord) {
  return createHmac("sha256", record.accessCode)
    .update(`${record.slug}:${record.email.trim().toLowerCase()}`)
    .digest("base64url");
}

export function createPortalSessionValue(record: ClientPortalRecord) {
  return `${record.slug}.${signPortalSession(record)}`;
}

export function getPortalSlugFromSession(value?: string) {
  if (!value) {
    return null;
  }

  const [slug] = value.split(".");
  return slug || null;
}

export function isValidPortalSession(value: string | undefined, record: ClientPortalRecord) {
  if (!value) {
    return false;
  }

  const [slug, signature] = value.split(".");
  if (slug !== record.slug || !signature) {
    return false;
  }

  const expected = signPortalSession(record);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  return (
    signatureBuffer.length === expectedBuffer.length &&
    timingSafeEqual(signatureBuffer, expectedBuffer)
  );
}
