import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    console.log("🔍 GET /api/topic-notes/[id] - Fetching note:", id);

    const note = await prisma.topicNote.findUnique({
      where: { id },
    });

    if (!note) {
      console.log("❌ Note not found:", id);
      return NextResponse.json(
        { error: "Topic note not found" },
        { status: 404 },
      );
    }

    console.log("✅ Note found:", note.id);
    return NextResponse.json(note);
  } catch (error) {
    console.error("❌ Error fetching topic note:", error);
    return NextResponse.json(
      { error: "Failed to fetch topic note", details: String(error) },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, content, domain, examWeight } = body;

    console.log("✏️ PUT /api/topic-notes/[id] - Updating note:", id);

    // Check if note exists
    const existingNote = await prisma.topicNote.findUnique({
      where: { id },
    });

    if (!existingNote) {
      console.log("❌ Note not found for update:", id);
      return NextResponse.json(
        { error: "Topic note not found" },
        { status: 404 },
      );
    }

    // Update the note
    const updatedNote = await prisma.topicNote.update({
      where: { id },
      data: {
        title: title || existingNote.title,
        content: content || existingNote.content,
        domain: domain || existingNote.domain,
        examWeight: examWeight || existingNote.examWeight,
        updatedAt: new Date(),
      },
    });

    console.log("✅ Note updated:", updatedNote.id);
    return NextResponse.json(updatedNote);
  } catch (error) {
    console.error("❌ Error updating topic note:", error);
    return NextResponse.json(
      { error: "Failed to update topic note", details: String(error) },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    console.log("🗑️ DELETE /api/topic-notes/[id] - Deleting note:", id);

    // Check if note exists
    const existingNote = await prisma.topicNote.findUnique({
      where: { id },
    });

    if (!existingNote) {
      console.log("❌ Note not found for deletion:", id);
      return NextResponse.json(
        { error: "Topic note not found" },
        { status: 404 },
      );
    }

    // Delete the note
    await prisma.topicNote.delete({
      where: { id },
    });

    console.log("✅ Note deleted:", id);
    return NextResponse.json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error deleting topic note:", error);
    return NextResponse.json(
      { error: "Failed to delete topic note", details: String(error) },
      { status: 500 },
    );
  }
}
