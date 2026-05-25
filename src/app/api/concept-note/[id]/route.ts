import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch a single note by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    console.log("🔍 GET /api/concept-note/[id] - Fetching note:", id);

    const note = await prisma.conceptNote.findUnique({
      where: { id },
    });

    if (!note) {
      console.log("❌ Note not found:", id);
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    console.log("✅ Note found:", note.id);
    return NextResponse.json(note);
  } catch (error) {
    console.error("❌ Error fetching note:", error);
    return NextResponse.json(
      { error: "Failed to fetch note" },
      { status: 500 },
    );
  }
}

// PUT - Update a note
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, content, domain, examWeight, topicNumber } = body;

    console.log("✏️ PUT /api/concept-note/[id] - Updating note:", id);

    // Check if note exists
    const existingNote = await prisma.conceptNote.findUnique({
      where: { id },
    });

    if (!existingNote) {
      console.log("❌ Note not found for update:", id);
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    const updatedNote = await prisma.conceptNote.update({
      where: { id },
      data: {
        title,
        content,
        domain,
        examWeight,
        topicNumber: topicNumber || null,
        updatedAt: new Date(),
      },
    });

    console.log("✅ Note updated:", updatedNote.id);
    return NextResponse.json(updatedNote);
  } catch (error) {
    console.error("❌ Error updating note:", error);
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 },
    );
  }
}

// DELETE - Delete a note
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    console.log("🗑️ DELETE /api/concept-note/[id] - Deleting note:", id);

    // Check if note exists
    const existingNote = await prisma.conceptNote.findUnique({
      where: { id },
    });

    if (!existingNote) {
      console.log("❌ Note not found for deletion:", id);
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    await prisma.conceptNote.delete({
      where: { id },
    });

    console.log("✅ Note deleted:", id);
    return NextResponse.json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error deleting note:", error);
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 },
    );
  }
}
