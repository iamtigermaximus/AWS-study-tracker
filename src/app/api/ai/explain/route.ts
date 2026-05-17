import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface AIRequest {
  conceptTitle: string;
  topicNumber: number;
  domain: string;
}

export async function POST(request: Request) {
  try {
    const body: AIRequest = await request.json();
    const { conceptTitle, topicNumber, domain } = body;

    // Get DeepSeek API key from environment
    const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

    if (!DEEPSEEK_API_KEY) {
      // Fallback response if no API key
      return NextResponse.json({
        explanation: `📚 ${conceptTitle}\n\nThis is a ${domain} domain topic. Write your own notes here!\n\nKey points to remember:\n• Check the lesson description above\n• Add your own understanding\n• Mark as complete when done`,
      });
    }

    // Call DeepSeek API
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
            {
              role: "system",
              content: `You are an AWS SAA exam tutor. Explain AWS concepts in simple terms with analogies. Focus on what's tested in the exam. Keep explanations under 200 words.`,
            },
            {
              role: "user",
              content: `Explain "${conceptTitle}" (Domain: ${domain}) for AWS Solutions Architect exam. Include: 1) Simple explanation 2) Real-world analogy 3) Exam tip`,
            },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      },
    );

    const data = await response.json();
    const explanation =
      data.choices?.[0]?.message?.content ||
      `Failed to generate explanation for ${conceptTitle}`;

    return NextResponse.json({ explanation });
  } catch (error) {
    console.error("AI explanation failed:", error);
    return NextResponse.json(
      {
        explanation: `Unable to generate AI explanation. Please try again later or write your own notes for this topic.`,
      },
      { status: 200 },
    ); // Return 200 with fallback message
  }
}
