import { NextResponse } from "next/server";
import { getPortalBySlug } from "@/lib/client-portal-store";
import { buildPortalCalendarIcs } from "@/lib/client-portal-calendar";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const record = await getPortalBySlug(slug);

  if (!record) {
    return new NextResponse("Not found", { status: 404 });
  }

  const calendar = buildPortalCalendarIcs(record);

  return new NextResponse(calendar, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${record.slug}-deadlines.ics"`,
      "Cache-Control": "no-store",
    },
  });
}
