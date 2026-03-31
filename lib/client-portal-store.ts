import { promises as fs } from "node:fs";
import path from "node:path";
import { ClientPortalRecord, portalTemplates } from "@/lib/client-portal-schema";

export { portalTemplates };

const PORTALS_PATH = path.join(process.cwd(), "data", "client-portals.json");

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function getAllPortals(): Promise<ClientPortalRecord[]> {
  const raw = await fs.readFile(PORTALS_PATH, "utf-8");
  return JSON.parse(raw) as ClientPortalRecord[];
}

export async function getPortalBySlug(slug: string) {
  const portals = await getAllPortals();
  return portals.find((portal) => portal.slug === slug);
}

export async function getPortalByCredentials(email: string, accessCode: string) {
  const portals = await getAllPortals();
  return portals.find(
    (portal) =>
      portal.email.trim().toLowerCase() === email.trim().toLowerCase() &&
      portal.accessCode === accessCode,
  );
}

export async function createPortal(input: Omit<ClientPortalRecord, "slug"> & { slug?: string }) {
  const portals = await getAllPortals();
  const slugBase = normalizeSlug(input.slug || input.clientNames);
  let slug = slugBase;
  let counter = 2;

  while (portals.some((portal) => portal.slug === slug)) {
    slug = `${slugBase}-${counter}`;
    counter += 1;
  }

  const nextRecord: ClientPortalRecord = {
    ...input,
    slug,
  };

  portals.push(nextRecord);
  await fs.writeFile(PORTALS_PATH, JSON.stringify(portals, null, 2), "utf-8");
  return nextRecord;
}

export async function updatePortal(
  slug: string,
  input: Omit<ClientPortalRecord, "slug">,
) {
  const portals = await getAllPortals();
  const portalIndex = portals.findIndex((portal) => portal.slug === slug);

  if (portalIndex === -1) {
    return null;
  }

  const nextRecord: ClientPortalRecord = {
    ...input,
    slug,
  };

  portals[portalIndex] = nextRecord;
  await fs.writeFile(PORTALS_PATH, JSON.stringify(portals, null, 2), "utf-8");
  return nextRecord;
}

export async function deletePortal(slug: string) {
  const portals = await getAllPortals();
  const nextPortals = portals.filter((portal) => portal.slug !== slug);

  if (nextPortals.length === portals.length) {
    return false;
  }

  await fs.writeFile(PORTALS_PATH, JSON.stringify(nextPortals, null, 2), "utf-8");
  return true;
}
