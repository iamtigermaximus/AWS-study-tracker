import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const {
      questionCount = 10,
      domain = "All",
      difficulty = "Medium",
    } = await request.json();

    const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

    if (!DEEPSEEK_API_KEY) {
      return NextResponse.json({
        questions: getSampleQuestions(questionCount),
      });
    }

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
              content: `You are an AWS SAA-C03 exam question generator. Generate ${questionCount} practice questions.

For each question, return JSON with:
- id (number)
- scenario (detailed scenario)
- question (what the architect should do)
- options (array of 4 strings)
- correctAnswer (A, B, C, or D)
- explanation (why correct and why others wrong)
- domain (Security, Resilient, Performance, Cost)
- difficulty (Easy, Medium, Hard)

Return ONLY valid JSON.`,
            },
            {
              role: "user",
              content: `Generate ${questionCount} AWS SAA-C03 practice questions. ${domain !== "All" ? `Focus on ${domain} domain.` : ""} Difficulty: ${difficulty}.`,
            },
          ],
          temperature: 0.7,
          max_tokens: 3000,
        }),
      },
    );

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    let questions;
    try {
      const parsed = JSON.parse(content);
      questions = parsed.questions;
    } catch {
      questions = getSampleQuestions(questionCount);
    }

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("AI practice test generation failed:", error);
    return NextResponse.json(
      { questions: getSampleQuestions(10) },
      { status: 200 },
    );
  }
}

function getSampleQuestions(count: number) {
  const allQuestions = [
    {
      id: 1,
      scenario:
        "A company runs a web application on EC2 instances behind an Application Load Balancer. The application experiences sudden traffic spikes during business hours.",
      question:
        "What is the MOST cost-effective way to handle the variable traffic pattern?",
      options: [
        "A) Use larger EC2 instances",
        "B) Configure an Auto Scaling Group with scaling policies",
        "C) Use Spot Instances exclusively",
        "D) Add more Application Load Balancers",
      ],
      correctAnswer: "B",
      explanation:
        "Auto Scaling Groups automatically adjust capacity based on demand. Larger instances don't help with spikes. Spot instances can be terminated. Extra ALBs don't handle instance capacity.",
      domain: "Resilient",
      difficulty: "Medium",
    },
    {
      id: 2,
      scenario:
        "A company needs to store customer data accessed frequently for 30 days, then rarely after that. Data older than 90 days must be retained for compliance.",
      question: "What is the MOST cost-effective storage strategy?",
      options: [
        "A) Store all data in S3 Standard",
        "B) Store all data in S3 Glacier Deep Archive",
        "C) Use S3 Standard then transition to IA after 30 days, then Glacier after 90 days",
        "D) Store data in EBS volumes",
      ],
      correctAnswer: "C",
      explanation:
        "S3 lifecycle policies transition data to cheaper storage classes based on age.",
      domain: "Cost",
      difficulty: "Medium",
    },
    {
      id: 3,
      scenario:
        "A company wants to host a static website with global low latency and HTTPS support.",
      question: "Which combination is MOST appropriate?",
      options: [
        "A) EC2 with ELB",
        "B) S3 with CloudFront",
        "C) Lambda with API Gateway",
        "D) RDS with Route 53",
      ],
      correctAnswer: "B",
      explanation:
        "S3 hosts static content, CloudFront provides CDN for global low latency.",
      domain: "Performance",
      difficulty: "Easy",
    },
    {
      id: 4,
      scenario:
        "A company needs to give developers access to S3 but not EC2. They want to follow least privilege.",
      question: "What should they use?",
      options: [
        "A) Root user access",
        "B) IAM policy allowing S3 actions only",
        "C) AdministratorAccess policy",
        "D) EC2 instance role",
      ],
      correctAnswer: "B",
      explanation:
        "Custom IAM policy with only S3 permissions follows least privilege.",
      domain: "Security",
      difficulty: "Easy",
    },
    {
      id: 5,
      scenario:
        "An application writes logs that are analyzed weekly. The logs are not needed after 90 days.",
      question: "What is the MOST cost-effective storage?",
      options: [
        "A) S3 Standard",
        "B) S3 Standard-IA",
        "C) S3 Glacier Flexible Retrieval",
        "D) EBS gp2",
      ],
      correctAnswer: "B",
      explanation:
        "Standard-IA is for infrequent access, cheaper than Standard but with retrieval fee.",
      domain: "Cost",
      difficulty: "Easy",
    },
  ];

  return allQuestions.slice(0, Math.min(count, allQuestions.length));
}
