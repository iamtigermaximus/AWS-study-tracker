import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get("domain");

    const where: any = {};
    if (domain) where.domain = domain;

    const notes = await prisma.conceptNote.findMany({
      where,
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(notes);
  } catch (error) {
    console.error("GET /api/concept-note error:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, domain, examWeight, topicNumber } = body;

    const note = await prisma.conceptNote.create({
      data: { title, content, domain, examWeight, topicNumber },
    });

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error("POST /api/concept-note error:", error);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 },
    );
  }
}
