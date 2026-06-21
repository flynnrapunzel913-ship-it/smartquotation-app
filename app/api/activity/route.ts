import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { listRecentActivity } from "@/lib/data/activity";
import type { ActivityFilter } from "@/lib/activity";

const VALID_FILTERS = new Set<ActivityFilter>(["all", "mr-quotations", "quotations", "invoices"]);

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit") || "20");
    const filterParam = (searchParams.get("filter") || "all") as ActivityFilter;
    const filter = VALID_FILTERS.has(filterParam) ? filterParam : "all";

    const items = await listRecentActivity({ limit, filter });
    return NextResponse.json(items);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
