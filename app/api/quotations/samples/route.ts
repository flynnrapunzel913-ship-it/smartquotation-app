import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { listMrSampleCatalog } from "@/lib/sample-mr-quotation";

export async function GET() {
  try {
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(listMrSampleCatalog());
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
