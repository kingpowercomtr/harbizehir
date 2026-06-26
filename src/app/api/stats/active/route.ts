export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import {
  activeFormFillersFromVisitors,
  getActiveVisitorCount,
} from "@/lib/active-visitors";

/** Landing FOMO — auth gerektirmez, sadece özet sayılar */
export async function GET() {
  const activeVisitors = await getActiveVisitorCount();
  const formFillers = activeFormFillersFromVisitors(activeVisitors);

  return NextResponse.json(
    { activeVisitors, formFillers },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
