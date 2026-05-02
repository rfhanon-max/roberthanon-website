import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deletePortal } from "@/lib/client-portal-store";
import {
  isPortalStudioAvailable,
  isValidPortalStudioSession,
  PORTAL_STUDIO_COOKIE,
} from "@/lib/portal-studio-access";

type Payload = {
  slug?: string;
};

function getDeleteErrorMessage(error: unknown) {
  if (error instanceof Error && error.message.includes("EROFS")) {
    return "Portal Studio can only delete portals while the site is running locally. The live website is read-only, so delete the portal locally, commit it, and redeploy.";
  }

  return error instanceof Error ? error.message : "Unable to delete portal.";
}

export async function POST(request: Request) {
  try {
    if (!isPortalStudioAvailable()) {
      return NextResponse.json(
        { error: "Portal Studio is not available on the live website." },
        { status: 404 },
      );
    }

    const cookieStore = await cookies();
    if (!isValidPortalStudioSession(cookieStore.get(PORTAL_STUDIO_COOKIE)?.value)) {
      return NextResponse.json({ error: "Portal Studio login is required." }, { status: 401 });
    }

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
  } catch (error) {
    return NextResponse.json({ error: getDeleteErrorMessage(error) }, { status: 500 });
  }
}
