import { neon } from "@neondatabase/serverless";
import type { ClientPortalRecord } from "@/lib/client-portal-schema";

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.NEON_DATABASE_URL ||
  process.env.STORAGE_URL;

export const hasClientPortalDatabase = Boolean(connectionString);

const sql = connectionString ? neon(connectionString) : null;

type PortalRow = {
  slug: string;
  client_names: string;
  view_label: string;
  address: string;
  property_image: string;
  property_image_alt: string;
  transaction_type: string;
  closing_date: string | Date;
  summary_note: string;
  email: string;
  access_code: string;
};

type MilestoneRow = {
  title: string;
  deadline: string | Date;
  notes: string;
  completed: boolean;
  order_index: number;
};

function formatDate(value: string | Date) {
  if (typeof value === "string") {
    return value.slice(0, 10);
  }

  return value.toISOString().slice(0, 10);
}

function mapPortal(row: PortalRow, milestones: MilestoneRow[]): ClientPortalRecord {
  return {
    slug: row.slug,
    clientNames: row.client_names,
    viewLabel: row.view_label,
    address: row.address,
    propertyImage: row.property_image,
    propertyImageAlt: row.property_image_alt,
    transactionType: row.transaction_type,
    closingDate: formatDate(row.closing_date),
    summaryNote: row.summary_note,
    email: row.email,
    accessCode: row.access_code,
    milestones: milestones
      .sort((a, b) => a.order_index - b.order_index)
      .map((milestone) => ({
        title: milestone.title,
        deadline: formatDate(milestone.deadline),
        notes: milestone.notes,
        completed: milestone.completed,
      })),
  };
}

function requireSql() {
  if (!sql) {
    throw new Error("Client portal database is not configured.");
  }

  return sql;
}

export async function getAllPortalsFromDb() {
  const db = requireSql();
  const rows = (await db`
    select
      slug,
      client_names,
      view_label,
      address,
      property_image,
      property_image_alt,
      transaction_type,
      closing_date,
      summary_note,
      email,
      access_code
    from client_portals
    order by client_names asc
  `) as PortalRow[];

  const milestoneRows = (await db`
    select portal_slug, title, deadline, notes, completed, order_index
    from client_portal_milestones
    order by portal_slug asc, order_index asc
  `) as (MilestoneRow & { portal_slug: string })[];

  const milestonesBySlug = new Map<string, MilestoneRow[]>();
  for (const milestone of milestoneRows) {
    const current = milestonesBySlug.get(milestone.portal_slug) ?? [];
    current.push(milestone);
    milestonesBySlug.set(milestone.portal_slug, current);
  }

  return rows.map((row) => mapPortal(row, milestonesBySlug.get(row.slug) ?? []));
}

export async function getPortalBySlugFromDb(slug: string) {
  const db = requireSql();
  const rows = (await db`
    select
      slug,
      client_names,
      view_label,
      address,
      property_image,
      property_image_alt,
      transaction_type,
      closing_date,
      summary_note,
      email,
      access_code
    from client_portals
    where slug = ${slug}
    limit 1
  `) as PortalRow[];

  if (!rows[0]) {
    return null;
  }

  const milestones = (await db`
    select title, deadline, notes, completed, order_index
    from client_portal_milestones
    where portal_slug = ${slug}
    order by order_index asc
  `) as MilestoneRow[];

  return mapPortal(rows[0], milestones);
}

export async function savePortalToDb(record: ClientPortalRecord) {
  await createClientPortalTables();
  const db = requireSql();

  await db`
    insert into client_portals (
      slug,
      client_names,
      view_label,
      address,
      property_image,
      property_image_alt,
      transaction_type,
      closing_date,
      summary_note,
      email,
      access_code
    )
    values (
      ${record.slug},
      ${record.clientNames},
      ${record.viewLabel},
      ${record.address},
      ${record.propertyImage},
      ${record.propertyImageAlt},
      ${record.transactionType},
      ${record.closingDate},
      ${record.summaryNote},
      ${record.email},
      ${record.accessCode}
    )
    on conflict (slug) do update set
      client_names = excluded.client_names,
      view_label = excluded.view_label,
      address = excluded.address,
      property_image = excluded.property_image,
      property_image_alt = excluded.property_image_alt,
      transaction_type = excluded.transaction_type,
      closing_date = excluded.closing_date,
      summary_note = excluded.summary_note,
      email = excluded.email,
      access_code = excluded.access_code,
      updated_at = now()
  `;

  await db`delete from client_portal_milestones where portal_slug = ${record.slug}`;

  for (const [index, milestone] of record.milestones.entries()) {
    await db`
      insert into client_portal_milestones (
        portal_slug,
        order_index,
        title,
        deadline,
        notes,
        completed
      )
      values (
        ${record.slug},
        ${index},
        ${milestone.title},
        ${milestone.deadline},
        ${milestone.notes},
        ${milestone.completed}
      )
    `;
  }

  return record;
}

export async function deletePortalFromDb(slug: string) {
  await createClientPortalTables();
  const db = requireSql();
  const result = (await db`
    delete from client_portals
    where slug = ${slug}
    returning slug
  `) as { slug: string }[];

  return result.length > 0;
}

export async function createClientPortalTables() {
  const db = requireSql();
  await db`
    create table if not exists client_portals (
      slug text primary key,
      client_names text not null,
      view_label text not null,
      address text not null,
      property_image text not null,
      property_image_alt text not null,
      transaction_type text not null,
      closing_date date not null,
      summary_note text not null,
      email text not null,
      access_code text not null,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `;

  await db`
    create table if not exists client_portal_milestones (
      id bigserial primary key,
      portal_slug text not null references client_portals(slug) on delete cascade,
      order_index integer not null,
      title text not null,
      deadline date not null,
      notes text not null,
      completed boolean not null default false,
      created_at timestamptz not null default now()
    )
  `;

  await db`
    create index if not exists client_portal_milestones_portal_slug_idx
    on client_portal_milestones(portal_slug)
  `;
}

export async function seedPortalsToDb(portals: ClientPortalRecord[]) {
  await createClientPortalTables();

  for (const portal of portals) {
    await savePortalToDb(portal);
  }
}
