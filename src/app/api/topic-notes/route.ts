import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const topicNumber = searchParams.get("topicNumber");

    console.log("🔍 GET /api/topic-notes - Fetching notes");
    console.log("TopicNumber filter:", topicNumber);

    // Build where clause
    const where: any = {};
    if (topicNumber) {
      where.topicNumber = parseInt(topicNumber);
    }

    const notes = await prisma.topicNote.findMany({
      where,
      orderBy: { updatedAt: "desc" },
    });

    console.log(`✅ Found ${notes.length} topic notes`);
    return NextResponse.json(notes);
  } catch (error) {
    console.error("❌ Error fetching topic notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch topic notes", details: String(error) },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, topicNumber, domain, examWeight, courseId } = body;

    console.log("📝 POST /api/topic-notes - Creating note:", {
      title,
      topicNumber,
    });

    // Validation
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 },
      );
    }

    if (!topicNumber) {
      return NextResponse.json(
        { error: "topicNumber is required" },
        { status: 400 },
      );
    }

    // Create the note
    const note = await prisma.topicNote.create({
      data: {
        title,
        content,
        topicNumber: parseInt(topicNumber.toString()),
        domain: domain || "General",
        examWeight: examWeight || "Medium",
        courseId: courseId || "maarek-saa",
      },
    });

    console.log("✅ Topic note created:", note.id);
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating topic note:", error);
    return NextResponse.json(
      { error: "Failed to create topic note", details: String(error) },
      { status: 500 },
    );
  }
}
