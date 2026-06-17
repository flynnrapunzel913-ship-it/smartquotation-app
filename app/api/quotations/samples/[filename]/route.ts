import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import {
  loadMrSampleFormValues,
  resolveMrQuotationSample,
} from "@/lib/sample-mr-quotation";

type RouteContext = { params: Promise<{ filename: string }> };

export async function GET(_req: Request, context: RouteContext) {
  try {
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { filename } = await context.params;
    const decoded = decodeURIComponent(filename);
    const resolved = resolveMrQuotationSample(decoded);

    if (resolved === "MASTER_TEMPLATE") {
      return NextResponse.json({ error: "Use wizard default for master template" }, { status: 400 });
    }

    const formValues = loadMrSampleFormValues(resolved);
    return NextResponse.json(formValues);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
