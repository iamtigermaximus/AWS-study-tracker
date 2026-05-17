import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const topics = await prisma.curriculumTopic.findMany({
      orderBy: { topicNumber: "asc" },
    });

    const completedCount = topics.filter((t) => t.isCompleted).length;
    const nextTopic = topics.find((t) => !t.isCompleted);

    return NextResponse.json({
      topics,
      nextTopic,
      completedCount,
      total: topics.length,
    });
  } catch (error) {
    console.error("GET /api/curriculum error:", error);
    return NextResponse.json(
      { error: "Failed to fetch curriculum" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { topicNumber, completed, studyMinutes } = body;

    const topic = await prisma.curriculumTopic.update({
      where: { topicNumber: topicNumber },
      data: {
        isCompleted: completed,
        completedAt: completed ? new Date() : null,
        studyMinutes: { increment: studyMinutes || 0 },
      },
    });

    return NextResponse.json(topic);
  } catch (error) {
    console.error("POST /api/curriculum error:", error);
    return NextResponse.json(
      { error: "Failed to update topic" },
      { status: 500 },
    );
  }
}
