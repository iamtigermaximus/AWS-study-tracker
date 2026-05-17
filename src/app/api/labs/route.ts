import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const labs = await prisma.sectionLab.findMany({
      orderBy: { sectionNumber: "asc" },
    });

    return NextResponse.json(labs);
  } catch (error) {
    console.error("Failed to fetch labs:", error);
    return NextResponse.json(
      { error: "Failed to fetch labs" },
      { status: 500 },
    );
  }
}
