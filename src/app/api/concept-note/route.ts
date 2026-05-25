import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch all notes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get("domain");
    const topicNumber = searchParams.get("topicNumber");

    console.log("🔍 GET /api/concept-note - Fetching notes");
    console.log("Filters - Domain:", domain, "TopicNumber:", topicNumber);

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

    console.log(`✅ Found ${notes.length} notes`);
    return NextResponse.json(notes);
  } catch (error) {
    console.error("❌ Error fetching notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 },
    );
  }
}

// POST - Create a new note
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, domain, examWeight, topicNumber } = body;

    console.log("📝 POST /api/concept-note - Creating new note:", title);

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 },
      );
    }

    const note = await prisma.conceptNote.create({
      data: {
        title,
        content,
        domain: domain || "Security",
        examWeight: examWeight || "Medium",
        topicNumber: topicNumber || null,
      },
    });

    console.log("✅ Note created:", note.id);
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating note:", error);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 },
    );
  }
}
