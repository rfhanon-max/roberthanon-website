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
    order_index integer not null,
    title text not null,
    deadline date not null,
    notes text not null,
    completed boolean not null default false,
    created_at timestamptz not null default now()
  )
`;

await sql`
  create index if not exists client_portal_milestones_portal_slug_idx
  on client_portal_milestones(portal_slug)
`;

for (const portal of portals) {
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
      ${portal.viewLabel},
      ${portal.address},
      ${portal.propertyImage},
      ${portal.propertyImageAlt},
      ${portal.transactionType},
      ${portal.closingDate},
      ${portal.summaryNote},
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

  await sql`delete from client_portal_milestones where portal_slug = ${portal.slug}`;

  for (const [index, milestone] of portal.milestones.entries()) {
    await sql`
      insert into client_portal_milestones (
        portal_slug,
        order_index,
        title,
        deadline,
        notes,
        completed
      )
      values (
        ${portal.slug},
        ${index},
        ${milestone.title},
        ${milestone.deadline},
        ${milestone.notes},
        ${milestone.completed}
      )
    `;
  }
}

console.log(`Seeded ${portals.length} client portals.`);
