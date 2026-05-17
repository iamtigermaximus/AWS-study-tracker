import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface ConceptNoteCreateInput {
  title: string;
  content: string;
  domain: string;
  examWeight: string;
  topicNumber?: number;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get("domain");
    const topicNumber = searchParams.get("topicNumber");

    const where: {
      domain?: string;
      topicNumber?: number;
    } = {};

    if (domain) where.domain = domain;
    if (topicNumber) where.topicNumber = parseInt(topicNumber);

    const notes = await prisma.conceptNote.findMany({
      where,
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(notes);
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: ConceptNoteCreateInput = await request.json();
    const { title, content, domain, examWeight, topicNumber } = body;

    const note = await prisma.conceptNote.create({
      data: {
        title,
        content,
        domain,
        examWeight,
        topicNumber,
      },
    });

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error("Failed to create note:", error);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 },
    );
  }
}
