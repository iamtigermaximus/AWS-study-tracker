import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const course = await prisma.shortCourse.findUnique({
      where: { id },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("Failed to fetch course:", error);
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
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

    const existingCourse = await prisma.shortCourse.findUnique({
      where: { id },
    });

    if (!existingCourse) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const updatedCourse = await prisma.shortCourse.update({
      where: { id },
      data: {
        title: title !== undefined ? title : undefined,
        provider: provider !== undefined ? provider : null,
        type: type !== undefined ? type : null,
        certificateUrl: certificateUrl !== undefined ? certificateUrl : null,
        credentialId: credentialId !== undefined ? credentialId : null,
        notes: notes !== undefined ? notes : null,
        tags: tags !== undefined ? tags : undefined,
        completedAt:
          completedAt !== undefined
            ? completedAt
              ? new Date(completedAt)
              : new Date()
            : undefined,
      },
    });

    return NextResponse.json(updatedCourse);
  } catch (error) {
    console.error("Failed to update course:", error);
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const existingCourse = await prisma.shortCourse.findUnique({
      where: { id },
    });

    if (!existingCourse) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    await prisma.shortCourse.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete course:", error);
    return NextResponse.json(
      { error: "Failed to delete course" },
      { status: 500 },
    );
  }
}
