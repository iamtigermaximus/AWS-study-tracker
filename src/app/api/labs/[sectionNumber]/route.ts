import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: Promise<{ sectionNumber: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { sectionNumber } = await params;
    const sectionNum = parseInt(sectionNumber);

    const lab = await prisma.sectionLab.findUnique({
      where: { sectionNumber: sectionNum },
    });

    if (!lab) {
      return NextResponse.json({ error: "Lab not found" }, { status: 404 });
    }

    return NextResponse.json(lab);
  } catch (error) {
    console.error("Failed to fetch lab:", error);
    return NextResponse.json({ error: "Failed to fetch lab" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { sectionNumber } = await params;
    const sectionNum = parseInt(sectionNumber);
    const body = await request.json();

    const lab = await prisma.sectionLab.update({
      where: { sectionNumber: sectionNum },
      data: {
        status: body.status,
        screenshotUrl: body.screenshotUrl,
        liveUrl: body.liveUrl,
        githubUrl: body.githubUrl,
        notes: body.notes,
        completedAt: body.completedAt ? new Date(body.completedAt) : undefined,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(lab);
  } catch (error) {
    console.error("Failed to update lab:", error);
    return NextResponse.json(
      { error: "Failed to update lab" },
      { status: 500 },
    );
  }
}
