// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// interface AIRequest {
//   conceptTitle: string;
//   topicNumber: number;
//   domain: string;
// }

// export async function POST(request: Request) {
//   try {
//     const body: AIRequest = await request.json();
//     const { conceptTitle, topicNumber, domain } = body;

//     // Get DeepSeek API key from environment
//     const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

//     if (!DEEPSEEK_API_KEY) {
//       // Fallback response if no API key
//       return NextResponse.json({
//         explanation: `📚 ${conceptTitle}\n\nThis is a ${domain} domain topic. Write your own notes here!\n\nKey points to remember:\n• Check the lesson description above\n• Add your own understanding\n• Mark as complete when done`,
//       });
//     }

//     // Call DeepSeek API
//     const response = await fetch(
//       "https://api.deepseek.com/v1/chat/completions",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
//         },
//         body: JSON.stringify({
//           model: "deepseek-chat",
//           messages: [
//             {
//               role: "system",
//               content: `You are an AWS SAA exam tutor. Explain AWS concepts in simple terms with analogies. Focus on what's tested in the exam. Keep explanations under 200 words.`,
//             },
//             {
//               role: "user",
//               content: `Explain "${conceptTitle}" (Domain: ${domain}) for AWS Solutions Architect exam. Include: 1) Simple explanation 2) Real-world analogy 3) Exam tip`,
//             },
//           ],
//           temperature: 0.7,
//           max_tokens: 500,
//         }),
//       },
//     );

//     const data = await response.json();
//     const explanation =
//       data.choices?.[0]?.message?.content ||
//       `Failed to generate explanation for ${conceptTitle}`;

//     return NextResponse.json({ explanation });
//   } catch (error) {
//     console.error("AI explanation failed:", error);
//     return NextResponse.json(
//       {
//         explanation: `Unable to generate AI explanation. Please try again later or write your own notes for this topic.`,
//       },
//       { status: 200 },
//     ); // Return 200 with fallback message
//   }
// }
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Handle both old and new request formats
    const conceptTitle = body.conceptTitle || body.topic || body.concept_title;
    const topicNumber = body.topicNumber;
    const domain = body.domain || body.examWeight || "General";
    const context = body.context || body.courseContext;
    const examWeight = body.examWeight;

    // Determine what to explain
    const topicToExplain = conceptTitle || body.conceptTitle;

    if (!topicToExplain) {
      return NextResponse.json(
        { error: "Please provide a topic to explain" },
        { status: 400 },
      );
    }

    console.log("🤖 AI Explainer requested for:", topicToExplain);
    console.log("Context:", context || "AWS SAA Exam Prep");
    console.log("Domain:", domain);
    console.log("Topic Number:", topicNumber);

    const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

    if (!DEEPSEEK_API_KEY) {
      // Fallback response if no API key
      return NextResponse.json({
        explanation: `# ${topicToExplain}\n\n## Overview\nThis is a ${domain} domain topic. Write your own notes here!\n\n## Key Points\n• Check the lesson description above\n• Add your own understanding\n• Mark as complete when done\n\n## Summary\nKeep studying and add your own insights to this topic.`,
        topic: topicToExplain,
        generatedAt: new Date().toISOString(),
      });
    }

    // Create a dynamic prompt based on the context
    const isAWSContext =
      context?.toLowerCase().includes("aws") ||
      domain?.toLowerCase().includes("aws") ||
      topicToExplain?.toLowerCase().includes("aws") ||
      topicNumber !== undefined;

    let systemPrompt = "";
    let userPrompt = "";

    if (isAWSContext) {
      // AWS-specific prompt
      systemPrompt = `You are an AWS SAA exam tutor. Explain AWS concepts in simple terms with analogies. Focus on what's tested in the exam. Keep explanations comprehensive but focused.`;
      userPrompt = `Explain "${topicToExplain}" ${topicNumber ? `(Topic ${topicNumber}) ` : ""}for AWS Solutions Architect exam. Include:
1. Simple explanation
2. Real-world analogy
3. Key exam points
4. Common pitfalls
5. Quick summary
Use markdown formatting with headers, bullet points, and bold text.`;
    } else {
      // Universal prompt for any topic
      systemPrompt = `You are an expert tutor who explains concepts clearly and thoroughly. You provide detailed, well-structured explanations with examples, key points, and summaries. You adapt your explanations to the user's context and needs.`;
      userPrompt = `Please explain "${topicToExplain}" in a clear, comprehensive way.

Please provide:

# ${topicToExplain}

## Overview
[A brief introduction to the concept]

## Key Points
- Point 1 with explanation
- Point 2 with explanation
- Point 3 with explanation

## Detailed Explanation
[In-depth explanation with examples and use cases]

## Important Notes
- Note 1: [Important consideration]
- Note 2: [Key takeaway]
- Note 3: [Common misunderstanding]

## Summary
[Concise summary of the most important information]

${examWeight === "High" ? "## Exam Tips\n- Tip 1: What to focus on\n- Tip 2: Common questions\n- Tip 3: Memory tricks" : ""}

Use clear markdown formatting with headers, bullet points, and bold text for emphasis. Make it educational but engaging.`;
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
              content: systemPrompt,
            },
            {
              role: "user",
              content: userPrompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("DeepSeek API error:", errorData);
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    const explanation =
      data.choices?.[0]?.message?.content ||
      `Failed to generate explanation for ${topicToExplain}`;

    console.log("✅ AI explanation generated successfully");

    return NextResponse.json({
      explanation,
      topic: topicToExplain,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("AI explanation failed:", error);

    // Return a helpful fallback response
    const body = await request.json().catch(() => ({}));
    const topic = body.conceptTitle || body.topic || "this topic";

    return NextResponse.json(
      {
        explanation: `# ${topic}

## Overview
I apologize, but I'm having trouble generating an explanation right now.

## What You Can Do
1. **Research Online**: Search for "${topic}" on Google, YouTube, or your favorite learning platform
2. **Break It Down**: Identify the key components of this topic and study them separately
3. **Practice**: Look for exercises or practical examples related to this concept
4. **Ask Questions**: Try asking more specific questions about what you'd like to understand

## Alternative Approach
Try rephrasing your question or asking about a more specific aspect of this topic. For example:
- "What are the key features of ${topic}?"
- "How does ${topic} work in practice?"
- "What are common use cases for ${topic}?"

I'll be ready to help with a more specific question!`,
        topic: topic,
        generatedAt: new Date().toISOString(),
        fallback: true,
      },
      { status: 200 },
    );
  }
}
