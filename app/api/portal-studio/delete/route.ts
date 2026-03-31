import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deletePortal } from "@/lib/client-portal-store";

type Payload = {
  slug?: string;
};

export async function POST(request: Request) {
  const payload = (await request.json()) as Payload;

  if (!payload.slug) {
    return NextResponse.json({ error: "Portal slug is required." }, { status: 400 });
  }

  const deleted = await deletePortal(payload.slug);

  if (!deleted) {
    return NextResponse.json({ error: "Portal not found." }, { status: 404 });
  }

  revalidatePath("/client-portal");
  revalidatePath(`/client-portal/${payload.slug}`);
  revalidatePath("/portal-studio");
  revalidatePath(`/portal-studio/${payload.slug}`);

  return NextResponse.json({ ok: true });
}
