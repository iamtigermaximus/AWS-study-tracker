import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const courses = await prisma.shortCourse.findMany({
      orderBy: { completedAt: "desc" },
    });
    return NextResponse.json(courses);
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      provider,
      type,
      certificateUrl,
      credentialId,
      notes,
      tags,
      completedAt,
    } = body;

    const course = await prisma.shortCourse.create({
      data: {
        title,
        provider: provider || null,
        type: type || null,
        status: "Completed",
        certificateUrl: certificateUrl || null,
        credentialId: credentialId || null,
        notes: notes || null,
        tags: tags || [],
        completedAt: completedAt ? new Date(completedAt) : new Date(),
      },
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error("Failed to create course:", error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 },
    );
  }
}
