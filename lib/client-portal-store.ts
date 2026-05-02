import { promises as fs } from "node:fs";
import path from "node:path";
import { ClientPortalRecord, portalTemplates } from "@/lib/client-portal-schema";
import {
  deletePortalFromDb,
  getAllPortalsFromDb,
  getPortalBySlugFromDb,
  hasClientPortalDatabase,
  savePortalToDb,
  seedPortalsToDb,
} from "@/lib/client-portal-db";

export { portalTemplates };

const PORTALS_PATH = path.join(process.cwd(), "data", "client-portals.json");

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function getAllPortalsFromJson(): Promise<ClientPortalRecord[]> {
  const raw = await fs.readFile(PORTALS_PATH, "utf-8");
  return JSON.parse(raw) as ClientPortalRecord[];
}

async function savePortalsToJson(portals: ClientPortalRecord[]) {
  await fs.writeFile(PORTALS_PATH, JSON.stringify(portals, null, 2), "utf-8");
}

export async function getAllPortals(): Promise<ClientPortalRecord[]> {
  if (hasClientPortalDatabase) {
    try {
      const portals = await getAllPortalsFromDb();
      if (portals.length > 0) {
        return portals;
      }

      const jsonPortals = await getAllPortalsFromJson();
      await seedPortalsToDb(jsonPortals);
      return jsonPortals;
    } catch (error) {
      console.error("Falling back to JSON client portals.", error);
      try {
        const jsonPortals = await getAllPortalsFromJson();
        await seedPortalsToDb(jsonPortals);
        return jsonPortals;
      } catch (seedError) {
        console.error("Unable to seed client portal database.", seedError);
      }
    }
  }

  return getAllPortalsFromJson();
}

export async function getPortalBySlug(slug: string) {
  if (hasClientPortalDatabase) {
    try {
      const portal = await getPortalBySlugFromDb(slug);
      if (portal) {
        return portal;
      }
    } catch (error) {
      console.error("Falling back to JSON client portal lookup.", error);
    }
  }

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

  if (hasClientPortalDatabase) {
    return savePortalToDb(nextRecord);
  }

  await savePortalsToJson([...portals, nextRecord]);
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

  if (hasClientPortalDatabase) {
    return savePortalToDb(nextRecord);
  }

  portals[portalIndex] = nextRecord;
  await savePortalsToJson(portals);
  return nextRecord;
}

export async function deletePortal(slug: string) {
  if (hasClientPortalDatabase) {
    return deletePortalFromDb(slug);
  }

  const portals = await getAllPortals();
  const nextPortals = portals.filter((portal) => portal.slug !== slug);

  if (nextPortals.length === portals.length) {
    return false;
  }

  await savePortalsToJson(nextPortals);
  return true;
}
