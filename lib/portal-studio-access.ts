import { createHmac, timingSafeEqual } from "node:crypto";

export const PORTAL_STUDIO_COOKIE = "portal_studio_session";

function getAdminPassword() {
  return (
    process.env.PORTAL_STUDIO_PASSWORD ||
    process.env.Portal_Studio_Password ||
    process.env.ADMIN_PASSWORD
  )?.trim();
}

function signStudioSession() {
  const password = getAdminPassword();
  if (!password) {
    return null;
  }

  return createHmac("sha256", password).update("portal-studio").digest("base64url");
}

export function isPortalStudioAvailable() {
  return process.env.NODE_ENV !== "production" || Boolean(getAdminPassword());
}

export function createPortalStudioSessionValue() {
  return signStudioSession();
}

export function isValidPortalStudioSession(value?: string) {
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  const expected = signStudioSession();
  if (!value || !expected) {
    return false;
  }

  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);

  return valueBuffer.length === expectedBuffer.length && timingSafeEqual(valueBuffer, expectedBuffer);
}

export function verifyPortalStudioPassword(value: string) {
  const password = getAdminPassword();
  return Boolean(password && value.trim() === password);
}
