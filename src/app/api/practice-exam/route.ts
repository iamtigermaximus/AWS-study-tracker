import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface PracticeExamInput {
  score: number;
  source: string;
  questionCount: number;
  domainScores?: Record<string, number>;
  notes?: string;
}

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

    const aiExams = exams.filter((e) => e.source === "AI-Generated");
    const aiAvgScore =
      aiExams.length > 0
        ? aiExams.reduce((sum, e) => sum + e.score, 0) / aiExams.length
        : 0;

    return NextResponse.json({
      exams,
      avgScore,
      aiAvgScore,
      totalExams: exams.length,
    });
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
    const body: PracticeExamInput = await request.json();
    const { score, source, questionCount, domainScores, notes } = body;

    const exam = await prisma.practiceExam.create({
      data: {
        score,
        source,
        questionCount,
        notes,
        domainScores: domainScores || {},
      },
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
