import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// For Next.js 15+, params is a Promise
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { title, content, domain, examWeight, topicNumber } =
      await request.json();

    const note = await prisma.conceptNote.update({
      where: { id },
      data: {
        title,
        content,
        domain,
        examWeight,
        topicNumber,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(note);
  } catch (error) {
    console.error("Failed to update note:", error);
    return NextResponse.json(
      { error: "Failed to update note" },
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

    console.log("🗑️ DELETE request for note ID:", id);

    // Check if note exists
    const existingNote = await prisma.conceptNote.findUnique({
      where: { id },
    });

    if (!existingNote) {
      console.log("❌ Note not found:", id);
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    console.log("✅ Note found, deleting:", existingNote.id);

    await prisma.conceptNote.delete({
      where: { id },
    });

    console.log("✅ Note deleted successfully");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete note:", error);
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 },
    );
  }
}
