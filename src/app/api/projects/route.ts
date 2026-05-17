import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface ProjectUpdateInput {
  id: string;
  status: string;
  liveUrl?: string | null;
  githubUrl?: string | null;
  topicNumbers?: number[];
}

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body: ProjectUpdateInput = await request.json();
    const { id, status, liveUrl, githubUrl, topicNumbers } = body;

    const project = await prisma.project.update({
      where: { id },
      data: {
        status,
        liveUrl,
        githubUrl,
        topicNumbers,
        deployedAt: status === "Deployed" ? new Date() : null,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Failed to update project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 },
    );
  }
}
