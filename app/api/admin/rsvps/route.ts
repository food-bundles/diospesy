import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const rsvps = await prisma.rSVP.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(rsvps);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
