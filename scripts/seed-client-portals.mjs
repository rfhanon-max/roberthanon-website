import { readFile } from "node:fs/promises";
import { neon } from "@neondatabase/serverless";

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.NEON_DATABASE_URL ||
  process.env.STORAGE_URL;

if (!connectionString) {
  console.error("Set DATABASE_URL, POSTGRES_URL, or NEON_DATABASE_URL before running this script.");
  process.exit(1);
}

const sql = neon(connectionString);
const portals = JSON.parse(await readFile("data/client-portals.json", "utf-8"));

function getPortalViews(portal) {
  if (portal.portalViews?.length) {
    return portal.portalViews;
  }

  const isSeller = portal.transactionType.toLowerCase().includes("seller");

  return [
    {
      id: isSeller ? "selling" : "buying",
      label: isSeller ? "Selling" : "Buying",
      viewLabel: portal.viewLabel,
      address: portal.address,
      propertyImage: portal.propertyImage,
      propertyImageAlt: portal.propertyImageAlt,
      transactionType: portal.transactionType,
      closingDate: portal.closingDate,
      summaryNote: portal.summaryNote,
      milestones: portal.milestones,
    },
  ];
}

await sql`
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

await sql`
  create table if not exists client_portal_milestones (
    id bigserial primary key,
    portal_slug text not null references client_portals(slug) on delete cascade,
    view_id text,
    order_index integer not null,
    title text not null,
    deadline date not null,
    notes text not null,
    completed boolean not null default false,
    created_at timestamptz not null default now()
  )
`;

await sql`
  alter table client_portal_milestones
  add column if not exists view_id text
`;

await sql`
  create table if not exists client_portal_views (
    id bigserial primary key,
    portal_slug text not null references client_portals(slug) on delete cascade,
    view_id text not null,
    order_index integer not null,
    label text not null,
    view_label text not null,
    address text not null,
    property_image text not null,
    property_image_alt text not null,
    transaction_type text not null,
    closing_date date not null,
    summary_note text not null,
    created_at timestamptz not null default now(),
    unique (portal_slug, view_id)
  )
`;

await sql`
  create index if not exists client_portal_milestones_portal_slug_idx
  on client_portal_milestones(portal_slug)
`;

await sql`
  create index if not exists client_portal_views_portal_slug_idx
  on client_portal_views(portal_slug)
`;

for (const portal of portals) {
  const portalViews = getPortalViews(portal);
  const primaryView = portalViews[0];

  await sql`
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
      ${portal.slug},
      ${portal.clientNames},
      ${primaryView.viewLabel},
      ${primaryView.address},
      ${primaryView.propertyImage},
      ${primaryView.propertyImageAlt},
      ${primaryView.transactionType},
      ${primaryView.closingDate},
      ${primaryView.summaryNote},
      ${portal.email},
      ${portal.accessCode}
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

  await sql`delete from client_portal_views where portal_slug = ${portal.slug}`;
  await sql`delete from client_portal_milestones where portal_slug = ${portal.slug}`;

  for (const [viewIndex, view] of portalViews.entries()) {
    await sql`
      insert into client_portal_views (
        portal_slug,
        view_id,
        order_index,
        label,
        view_label,
        address,
        property_image,
        property_image_alt,
        transaction_type,
        closing_date,
        summary_note
      )
      values (
        ${portal.slug},
        ${view.id},
        ${viewIndex},
        ${view.label},
        ${view.viewLabel},
        ${view.address},
        ${view.propertyImage},
        ${view.propertyImageAlt},
        ${view.transactionType},
        ${view.closingDate},
        ${view.summaryNote}
      )
    `;
  }

  for (const view of portalViews) {
    for (const [index, milestone] of view.milestones.entries()) {
      await sql`
        insert into client_portal_milestones (
          portal_slug,
          view_id,
          order_index,
          title,
          deadline,
          notes,
          completed
        )
        values (
          ${portal.slug},
          ${view.id},
          ${index},
          ${milestone.title},
          ${milestone.deadline},
          ${milestone.notes},
          ${milestone.completed}
        )
      `;
    }
  }
}

console.log(`Seeded ${portals.length} client portals.`);
