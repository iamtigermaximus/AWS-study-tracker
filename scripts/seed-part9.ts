import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const lessonsPart9 = [
  {
    lessonNumber: 161,
    sectionNumber: 16,
    sectionName: "Machine Learning",
    title: "Transcribe Overview",
    duration: "00:02:58",
    domain: "ML",
    description: "Automatic speech recognition (ASR).",
  },
  {
    lessonNumber: 162,
    sectionNumber: 16,
    sectionName: "Machine Learning",
    title: "Polly Overview",
    duration: "00:04:13",
    domain: "ML",
    description: "Text-to-Speech service.",
  },
  {
    lessonNumber: 163,
    sectionNumber: 16,
    sectionName: "Machine Learning",
    title: "Translate Overview",
    duration: "00:00:36",
    domain: "ML",
    description: "Neural machine translation service.",
  },
  {
    lessonNumber: 164,
    sectionNumber: 16,
    sectionName: "Machine Learning",
    title: "Lex + Connect Overview",
    duration: "00:01:57",
    domain: "ML",
    description: "Conversational AI for chatbots and contact centers.",
  },
  {
    lessonNumber: 165,
    sectionNumber: 16,
    sectionName: "Machine Learning",
    title: "Comprehend Overview",
    duration: "00:01:49",
    domain: "ML",
    description: "NLP service for insights in text.",
  },
  {
    lessonNumber: 166,
    sectionNumber: 16,
    sectionName: "Machine Learning",
    title: "Comprehend Medical Overview",
    duration: "00:02:05",
    domain: "ML",
    description: "Medical-specific natural language processing.",
  },
  {
    lessonNumber: 167,
    sectionNumber: 16,
    sectionName: "Machine Learning",
    title: "SageMaker Overview",
    duration: "00:03:30",
    domain: "ML",
    description: "Build, train, and deploy ML models.",
  },
  {
    lessonNumber: 168,
    sectionNumber: 16,
    sectionName: "Machine Learning",
    title: "Forecast Overview",
    duration: "00:01:01",
    domain: "ML",
    description: "Time-series forecasting service.",
  },
  {
    lessonNumber: 169,
    sectionNumber: 16,
    sectionName: "Machine Learning",
    title: "Kendra Overview",
    duration: "00:01:23",
    domain: "ML",
    description: "Intelligent enterprise search.",
  },
  {
    lessonNumber: 170,
    sectionNumber: 16,
    sectionName: "Machine Learning",
    title: "Personalize Overview",
    duration: "00:01:37",
    domain: "ML",
    description: "Real-time personalization and recommendations.",
  },
  {
    lessonNumber: 171,
    sectionNumber: 16,
    sectionName: "Machine Learning",
    title: "Textract Overview",
    duration: "00:00:57",
    domain: "ML",
    description: "Extract text and data from documents.",
  },
  {
    lessonNumber: 172,
    sectionNumber: 16,
    sectionName: "Machine Learning",
    title: "Machine Learning Summary",
    duration: "00:01:10",
    domain: "ML",
    description: "Recap of AWS ML services for exam.",
  },
  {
    lessonNumber: 173,
    sectionNumber: 17,
    sectionName: "Other Services",
    title: "Other Services",
    duration: "00:00:28",
    domain: "Foundation",
    description: "Brief overview of additional AWS services.",
  },
  {
    lessonNumber: 174,
    sectionNumber: 17,
    sectionName: "Other Services",
    title: "IMPORTANT CodeCommit Discontinuation",
    duration: "00:00:52",
    domain: "DevOps",
    description: "Important update about AWS CodeCommit.",
  },
  {
    lessonNumber: 175,
    sectionNumber: 17,
    sectionName: "Other Services",
    title: "CICD",
    duration: "00:08:45",
    domain: "DevOps",
    description: "CodePipeline, CodeBuild, CodeDeploy, CodeCommit.",
  },
  {
    lessonNumber: 176,
    sectionNumber: 17,
    sectionName: "Other Services",
    title: "Amazon CodeGuru",
    duration: "00:03:23",
    domain: "DevOps",
    description: "Code reviews and performance recommendations.",
  },
  {
    lessonNumber: 177,
    sectionNumber: 17,
    sectionName: "Other Services",
    title: "Alexa for Business, Lex & Connect",
    duration: "00:02:13",
    domain: "ML",
    description: "Voice and contact center services overview.",
  },
  {
    lessonNumber: 178,
    sectionNumber: 17,
    sectionName: "Other Services",
    title: "Kinesis Video Streams",
    duration: "00:02:13",
    domain: "Resilient",
    description: "Ingest and process real-time video.",
  },
  {
    lessonNumber: 179,
    sectionNumber: 17,
    sectionName: "Other Services",
    title: "AWS WorkSpaces",
    duration: "00:05:51",
    domain: "End User",
    description: "Desktop-as-a-Service (DaaS).",
  },
  {
    lessonNumber: 180,
    sectionNumber: 17,
    sectionName: "Other Services",
    title: "Amazon AppStream 2.0",
    duration: "00:02:06",
    domain: "End User",
    description: "Stream desktop applications to browsers.",
  },
];

async function main() {
  console.log("🌱 Seeding Part 9: Lessons 161-180...");

  let count = 0;
  for (const lesson of lessonsPart9) {
    await prisma.curriculumTopic.create({
      data: {
        topicNumber: lesson.lessonNumber,
        title: lesson.title,
        domain: lesson.domain,
        subdomain: lesson.sectionName,
        keyServices: [],
        estimatedHours: 0.5,
        examWeight: "Low",
        isCompleted: false,
        studyMinutes: 0,
        description: lesson.description,
        duration: lesson.duration,
        lessonNumber: lesson.lessonNumber,
        sectionNumber: lesson.sectionNumber,
        sectionName: lesson.sectionName,
      },
    });
    count++;
    if (count % 10 === 0) console.log(`   Inserted ${count} lessons...`);
  }

  console.log(`✅ Part 9 Complete! Inserted ${count} lessons (161-180)`);
  console.log("📌 Next: Run seed-part10.ts for lessons 181-202");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
