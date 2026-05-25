import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const lessonsPart1 = [
  // Section 1-2: Introduction (1-2)
  {
    lessonNumber: 1,
    sectionNumber: 1,
    sectionName: "Introduction",
    title: "Course Introduction - Please Watch",
    duration: "00:03:56",
    domain: "Foundation",
    description:
      "Course overview, SAA-C03 exam structure, and how to navigate.",
  },
  {
    lessonNumber: 2,
    sectionNumber: 1,
    sectionName: "Introduction",
    title: "About your instructor",
    duration: "00:02:40",
    domain: "Foundation",
    description: "Stephane Maarek's background and teaching approach.",
  },
  // Section 3: IAM (3-13)
  {
    lessonNumber: 3,
    sectionNumber: 3,
    sectionName: "IAM",
    title: "IAM",
    duration: "00:13:21",
    domain: "Security",
    description: "IAM Users, Groups, Policies - core identity management.",
  },
  {
    lessonNumber: 4,
    sectionNumber: 3,
    sectionName: "IAM",
    title: "IAM Access Analyzer",
    duration: "00:02:38",
    domain: "Security",
    description: "Analyze resource permissions and identify unintended access.",
  },
  {
    lessonNumber: 5,
    sectionNumber: 3,
    sectionName: "IAM",
    title: "STS",
    duration: "00:12:28",
    domain: "Security",
    description: "AWS Security Token Service - temporary credentials.",
  },
  {
    lessonNumber: 6,
    sectionNumber: 3,
    sectionName: "IAM",
    title: "Identity Federation & Cognito",
    duration: "00:08:53",
    domain: "Security",
    description: "Federate external identities into AWS using Cognito.",
  },
  {
    lessonNumber: 7,
    sectionNumber: 3,
    sectionName: "IAM",
    title: "AWS Directory Services",
    duration: "00:13:11",
    domain: "Security",
    description: "Managed Microsoft AD, Simple AD, AD Connector.",
  },
  {
    lessonNumber: 8,
    sectionNumber: 3,
    sectionName: "IAM",
    title: "AWS Organizations",
    duration: "00:06:29",
    domain: "Governance",
    description: "Central management of multiple AWS accounts.",
  },
  {
    lessonNumber: 9,
    sectionNumber: 3,
    sectionName: "IAM",
    title: "AWS Organizations Policies",
    duration: "00:11:05",
    domain: "Governance",
    description: "SCPs, consolidated billing, and policy types.",
  },
  {
    lessonNumber: 10,
    sectionNumber: 3,
    sectionName: "IAM",
    title: "AWS IAM Identity Center",
    duration: "00:06:47",
    domain: "Security",
    description: "Successor to AWS SSO - central identity management.",
  },
  {
    lessonNumber: 11,
    sectionNumber: 3,
    sectionName: "IAM",
    title: "AWS Control Tower",
    duration: "00:03:50",
    domain: "Governance",
    description: "Automated setup of multi-account environment.",
  },
  {
    lessonNumber: 12,
    sectionNumber: 3,
    sectionName: "IAM",
    title: "AWS Resource Access Manager - RAM",
    duration: "00:05:09",
    domain: "Networking",
    description: "Share resources across accounts securely.",
  },
  {
    lessonNumber: 13,
    sectionNumber: 3,
    sectionName: "IAM",
    title: "Summary of Identity & Federation",
    duration: "00:02:22",
    domain: "Security",
    description: "Recap of identity services and federation options.",
  },
  // Section 4: Security (14-20)
  {
    lessonNumber: 14,
    sectionNumber: 4,
    sectionName: "Security",
    title: "CloudTrail",
    duration: "00:05:43",
    domain: "Security",
    description: "Audit logging of all AWS API calls.",
  },
  {
    lessonNumber: 15,
    sectionNumber: 4,
    sectionName: "Security",
    title: "CloudTrail - EventBridge Integration",
    duration: "00:01:39",
    domain: "Security",
    description: "React to API calls using EventBridge rules.",
  },
  {
    lessonNumber: 16,
    sectionNumber: 4,
    sectionName: "Security",
    title: "CloudTrail - SA Pro",
    duration: "00:07:26",
    domain: "Security",
    description: "Advanced CloudTrail concepts for Solutions Architect Pro.",
  },
  {
    lessonNumber: 17,
    sectionNumber: 4,
    sectionName: "Security",
    title: "KMS",
    duration: "00:08:18",
    domain: "Security",
    description: "Key Management Service - central encryption key management.",
  },
  {
    lessonNumber: 18,
    sectionNumber: 4,
    sectionName: "Security",
    title: "Parameter Store",
    duration: "00:04:17",
    domain: "Security",
    description: "Secure storage for configuration and secrets.",
  },
  {
    lessonNumber: 19,
    sectionNumber: 4,
    sectionName: "Security",
    title: "Secrets Manager",
    duration: "00:05:33",
    domain: "Security",
    description: "Rotate, manage, and retrieve database credentials.",
  },
  {
    lessonNumber: 20,
    sectionNumber: 4,
    sectionName: "Security",
    title: "RDS Security",
    duration: "00:01:18",
    domain: "Security",
    description: "Encryption at rest and in transit for RDS.",
  },
];

async function main() {
  console.log("🌱 Seeding Part 1: Lessons 1-20...");

  const existingCount = await prisma.curriculumTopic.count();
  if (existingCount > 0) {
    console.log(`⚠️  Found ${existingCount} existing topics. Clearing...`);
    await prisma.curriculumTopic.deleteMany();
  }

  let count = 0;
  for (const lesson of lessonsPart1) {
    await prisma.curriculumTopic.create({
      data: {
        topicNumber: lesson.lessonNumber,
        title: lesson.title,
        domain: lesson.domain,
        subdomain: lesson.sectionName,
        keyServices: [],
        estimatedHours: 0.5,
        examWeight:
          lesson.domain === "Security"
            ? "High"
            : lesson.domain === "Resilient"
              ? "High"
              : "Medium",
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

  console.log(`✅ Part 1 Complete! Inserted ${count} lessons (1-20)`);
  console.log("📌 Next: Run seed-part2.ts for lessons 21-40");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
