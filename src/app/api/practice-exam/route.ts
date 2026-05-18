import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const exams = await prisma.practiceExam.findMany({
      orderBy: { date: "desc" },
      take: 20,
    });

    const avgScore =
      exams.length > 0
        ? exams.reduce((sum, e) => sum + e.score, 0) / exams.length
        : 0;

    return NextResponse.json({ exams, avgScore });
  } catch (error) {
    console.error("Failed to fetch practice exams:", error);
    return NextResponse.json(
      { error: "Failed to fetch practice exams" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { score, source, questionCount, notes } = await request.json();

    const exam = await prisma.practiceExam.create({
      data: { score, source, questionCount, notes },
    });

    return NextResponse.json(exam, { status: 201 });
  } catch (error) {
    console.error("Failed to save practice exam:", error);
    return NextResponse.json(
      { error: "Failed to save practice exam" },
      { status: 500 },
    );
  }
}
