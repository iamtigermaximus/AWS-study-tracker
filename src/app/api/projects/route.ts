import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status, liveUrl, githubUrl } = body;

    const project = await prisma.project.update({
      where: { id: id },
      data: {
        status: status,
        liveUrl: liveUrl,
        githubUrl: githubUrl,
        deployedAt: status === "Deployed" ? new Date() : null,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("PUT /api/projects error:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 },
    );
  }
}
