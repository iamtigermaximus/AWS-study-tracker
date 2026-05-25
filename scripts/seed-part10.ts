import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const lessonsPart10 = [
  {
    lessonNumber: 181,
    sectionNumber: 17,
    sectionName: "Other Services",
    title: "AWS Device Farm",
    duration: "00:01:26",
    domain: "DevOps",
    description: "Test mobile and web apps on real devices.",
  },
  {
    lessonNumber: 182,
    sectionNumber: 17,
    sectionName: "Other Services",
    title: "Amazon Macie",
    duration: "00:01:04",
    domain: "Security",
    description: "Discover and protect sensitive data in S3.",
  },
  {
    lessonNumber: 183,
    sectionNumber: 17,
    sectionName: "Other Services",
    title: "Amazon SES",
    duration: "00:02:49",
    domain: "Resilient",
    description: "Email sending and receiving service.",
  },
  {
    lessonNumber: 184,
    sectionNumber: 17,
    sectionName: "Other Services",
    title: "Amazon Pinpoint",
    duration: "00:01:53",
    domain: "Resilient",
    description: "Customer engagement and messaging.",
  },
  {
    lessonNumber: 185,
    sectionNumber: 17,
    sectionName: "Other Services",
    title: "EC2 Image Builder",
    duration: "00:03:07",
    domain: "DevOps",
    description: "Automate AMI creation and maintenance.",
  },
  {
    lessonNumber: 186,
    sectionNumber: 17,
    sectionName: "Other Services",
    title: "AWS IoT Core",
    duration: "00:02:01",
    domain: "Resilient",
    description: "Connect IoT devices to AWS.",
  },
  {
    lessonNumber: 187,
    sectionNumber: 18,
    sectionName: "Exam Prep",
    title: "Exam Walkthrough and Signup",
    duration: "00:04:38",
    domain: "Foundation",
    description: "How to register for the SAA-C03 exam.",
  },
  {
    lessonNumber: 188,
    sectionNumber: 18,
    sectionName: "Exam Prep",
    title: "Save 50 on your AWS Exam Cost!",
    duration: "00:01:11",
    domain: "Foundation",
    description: "Discount vouchers and cost-saving tips.",
  },
  {
    lessonNumber: 189,
    sectionNumber: 18,
    sectionName: "Exam Prep",
    title:
      "Get an Extra 30 Minutes on your AWS Exam - Non Native English Speakers only",
    duration: "00:01:05",
    domain: "Foundation",
    description: "ESL accommodation for exam timing.",
  },
  {
    lessonNumber: 190,
    sectionNumber: 18,
    sectionName: "Exam Prep",
    title:
      "Get an Extra 30 Minutes on your AWS Exam - Non Native English Speakers only",
    duration: "00:01:05",
    domain: "Foundation",
    description: "ESL accommodation for exam timing (duplicate).",
  },
  {
    lessonNumber: 191,
    sectionNumber: 18,
    sectionName: "Exam Prep",
    title: "Exam Guide & Sample Questions",
    duration: "00:02:13",
    domain: "Foundation",
    description: "Official exam guide and question format.",
  },
  {
    lessonNumber: 192,
    sectionNumber: 18,
    sectionName: "Exam Prep",
    title: "Sample Question 1",
    duration: "00:06:50",
    domain: "Foundation",
    description: "Practice question walkthrough.",
  },
  {
    lessonNumber: 193,
    sectionNumber: 18,
    sectionName: "Exam Prep",
    title: "Sample Question 2",
    duration: "00:06:38",
    domain: "Foundation",
    description: "Practice question walkthrough.",
  },
  {
    lessonNumber: 194,
    sectionNumber: 18,
    sectionName: "Exam Prep",
    title: "Sample Question 3",
    duration: "00:05:44",
    domain: "Foundation",
    description: "Practice question walkthrough.",
  },
  {
    lessonNumber: 195,
    sectionNumber: 18,
    sectionName: "Exam Prep",
    title: "Sample Question 4",
    duration: "00:07:13",
    domain: "Foundation",
    description: "Practice question walkthrough.",
  },
  {
    lessonNumber: 196,
    sectionNumber: 18,
    sectionName: "Exam Prep",
    title: "Sample Question 5",
    duration: "00:05:48",
    domain: "Foundation",
    description: "Practice question walkthrough.",
  },
  {
    lessonNumber: 197,
    sectionNumber: 18,
    sectionName: "Exam Prep",
    title: "Sample Question 6",
    duration: "00:05:13",
    domain: "Foundation",
    description: "Practice question walkthrough.",
  },
  {
    lessonNumber: 198,
    sectionNumber: 18,
    sectionName: "Exam Prep",
    title: "Sample Question 7",
    duration: "00:07:01",
    domain: "Foundation",
    description: "Practice question walkthrough.",
  },
  {
    lessonNumber: 199,
    sectionNumber: 18,
    sectionName: "Exam Prep",
    title: "Sample Question 8",
    duration: "00:06:16",
    domain: "Foundation",
    description: "Practice question walkthrough.",
  },
  {
    lessonNumber: 200,
    sectionNumber: 18,
    sectionName: "Exam Prep",
    title: "Sample Question 10",
    duration: "00:03:07",
    domain: "Foundation",
    description: "Practice question walkthrough.",
  },
  {
    lessonNumber: 201,
    sectionNumber: 19,
    sectionName: "Conclusion",
    title: "AWS Certification Paths",
    duration: "00:06:06",
    domain: "Foundation",
    description: "Next steps after Solutions Architect Associate.",
  },
  {
    lessonNumber: 202,
    sectionNumber: 19,
    sectionName: "Conclusion",
    title: "Congratulations",
    duration: "00:01:37",
    domain: "Foundation",
    description: "Course wrap-up and congratulations.",
  },
];

async function main() {
  console.log("🌱 Seeding Part 10: Lessons 181-202...");

  let count = 0;
  for (const lesson of lessonsPart10) {
    await prisma.curriculumTopic.create({
      data: {
        topicNumber: lesson.lessonNumber,
        title: lesson.title,
        domain: lesson.domain,
        subdomain: lesson.sectionName,
        keyServices: [],
        estimatedHours: 0.5,
        examWeight: lesson.domain === "Security" ? "High" : "Low",
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

  console.log(`✅ Part 10 Complete! Inserted ${count} lessons (181-202)`);
  console.log("🎉 ALL LESSONS SEEDED SUCCESSFULLY!");
  console.log("Total: 202 lessons from Stephane Maarek's course.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
