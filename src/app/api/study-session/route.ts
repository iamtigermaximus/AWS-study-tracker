import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface StudySessionInput {
  minutes: number;
  topic: string;
  domain: string;
  notes?: string;
}

export async function GET() {
  try {
    const sessions = await prisma.studySession.findMany({
      orderBy: { date: "desc" },
      take: 30,
    });

    const totalMinutes = sessions.reduce((sum, s) => sum + s.minutes, 0);

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const streakDay = await prisma.studyStreak.findUnique({
        where: { date },
      });
      if (streakDay?.completed) streak++;
      else break;
    }

    return NextResponse.json({ sessions, totalMinutes, streak });
  } catch (error) {
    console.error("Failed to fetch study sessions:", error);
    return NextResponse.json(
      { error: "Failed to fetch study sessions" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: StudySessionInput = await request.json();
    const { minutes, topic, domain, notes } = body;

    const session = await prisma.studySession.create({
      data: { minutes, topic, domain, notes },
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await prisma.studyStreak.upsert({
      where: { date: today },
      update: { minutes: { increment: minutes }, completed: true },
      create: { date: today, minutes, completed: true },
    });

    return NextResponse.json(session, { status: 201 });
  } catch (error) {
    console.error("Failed to create study session:", error);
    return NextResponse.json(
      { error: "Failed to create study session" },
      { status: 500 },
    );
  }
}
