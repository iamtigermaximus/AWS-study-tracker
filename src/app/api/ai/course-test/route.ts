import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const {
      courseId,
      questionCount = 10,
      difficulty = "Medium",
      specificTopic = "",
    } = await request.json();

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 },
      );
    }

    // Fetch the course from database
    const course = await prisma.shortCourse.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    console.log(`🎯 Generating test for course: ${course.title}`);
    console.log(`   Topic: ${specificTopic || "General"}`);
    console.log(`   Difficulty: ${difficulty}`);

    const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

    if (!DEEPSEEK_API_KEY) {
      return NextResponse.json({
        questions: getUniversalSampleQuestions(
          course.title,
          specificTopic,
          questionCount,
        ),
      });
    }

    // Build the prompt based on course context
    const systemPrompt = `You are an expert exam creator. Create realistic practice questions for the course: "${course.title}".

Course Tags: ${course.tags?.join(", ") || "General"}
${course.notes ? `Course Context: ${course.notes.substring(0, 300)}...` : ""}

For each question, return JSON with:
- id (number)
- scenario (realistic scenario related to the course)
- question (clear question testing understanding)
- options (array of 4 strings, labeled A, B, C, D)
- correctAnswer (A, B, C, or D)
- explanation (detailed explanation of why correct and why others wrong)
- domain (Main category from the course)
- difficulty (Easy, Medium, Hard)

Make questions practical and educational. Return ONLY valid JSON array.`;

    const userPrompt = `Generate ${questionCount} multiple-choice questions for the course "${course.title}"${specificTopic ? ` focusing specifically on "${specificTopic}"` : ""}.
Difficulty level: ${difficulty}.

The course covers: ${course.tags?.join(", ") || "Various topics"}.
Make questions that test real understanding, not just memorization.
Include scenario-based questions where appropriate.
Return the questions as a JSON array.`;

    const response = await fetch(
      "https://api.deepseek.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.7,
          max_tokens: 4000,
        }),
      },
    );

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    let questions;
    try {
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      questions = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(content);
      if (!Array.isArray(questions)) {
        questions = getUniversalSampleQuestions(
          course.title,
          specificTopic,
          questionCount,
        );
      }
    } catch {
      questions = getUniversalSampleQuestions(
        course.title,
        specificTopic,
        questionCount,
      );
    }

    return NextResponse.json({
      questions,
      course: { title: course.title, id: course.id },
    });
  } catch (error) {
    console.error("Course test generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate test" },
      { status: 500 },
    );
  }
}

function getUniversalSampleQuestions(
  courseTitle: string,
  topic: string,
  count: number,
) {
  const sampleQuestions = [
    {
      id: 1,
      scenario: `You are studying "${courseTitle}"${topic ? ` with a focus on "${topic}"` : ""}. This practice question tests your understanding of the core concepts.`,
      question: `What is a key fundamental concept you should understand about ${topic || courseTitle}?`,
      options: [
        "A) Understanding core principles and their practical application",
        "B) Memorizing every detail without understanding context",
        "C) Focusing only on theoretical knowledge without practice",
        "D) Skipping foundational concepts and jumping to advanced topics",
      ],
      correctAnswer: "A",
      explanation: `Understanding core principles and their practical application is essential for mastering ${courseTitle}. This builds a strong foundation for more advanced concepts and real-world application.`,
      domain: "Fundamentals",
      difficulty: "Easy",
    },
    {
      id: 2,
      scenario: `You've been learning about ${topic || courseTitle} and need to apply your knowledge in a practical situation.`,
      question: `What is the best approach to reinforce your learning of ${topic || courseTitle}?`,
      options: [
        "A) Only read theory without any practice",
        "B) Combine theoretical study with hands-on exercises and real-world examples",
        "C) Memorize answers without understanding the underlying concepts",
        "D) Skip difficult concepts and focus only on easy topics",
      ],
      correctAnswer: "B",
      explanation:
        "The most effective learning combines theory with practical application. Hands-on exercises help cement understanding, reveal gaps in knowledge, and prepare you for real-world scenarios.",
      domain: "Learning Strategy",
      difficulty: "Easy",
    },
    {
      id: 3,
      scenario: `You are preparing for an assessment on ${topic || courseTitle}. You need to demonstrate your understanding.`,
      question: `How can you best prepare to demonstrate mastery of ${topic || courseTitle}?`,
      options: [
        "A) Review notes and memorize key terms",
        "B) Practice with real-world scenarios and explain concepts in your own words",
        "C) Only study the night before the assessment",
        "D) Focus only on topics you already know",
      ],
      correctAnswer: "B",
      explanation:
        "Active recall, explaining concepts in your own words, and applying knowledge to scenarios are proven methods for demonstrating true mastery of any subject.",
      domain: "Study Strategy",
      difficulty: "Medium",
    },
  ];

  return sampleQuestions.slice(0, Math.min(count, sampleQuestions.length));
}
