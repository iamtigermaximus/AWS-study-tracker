import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const lessonsPart7 = [
  {
    lessonNumber: 121,
    sectionNumber: 12,
    sectionName: "DevOps",
    title: "Service Catalog",
    duration: "00:04:18",
    domain: "Governance",
    description: "Create and manage approved IT service catalogs.",
  },
  {
    lessonNumber: 122,
    sectionNumber: 12,
    sectionName: "DevOps",
    title: "SAM - Serverless Application Model",
    duration: "00:01:55",
    domain: "Resilient",
    description: "Framework for building serverless apps on AWS.",
  },
  {
    lessonNumber: 123,
    sectionNumber: 12,
    sectionName: "DevOps",
    title: "AWS CDK - Cloud Development Kit",
    duration: "00:02:00",
    domain: "Resilient",
    description: "Define cloud infrastructure using familiar languages.",
  },
  {
    lessonNumber: 124,
    sectionNumber: 12,
    sectionName: "DevOps",
    title: "AWS Systems Manager - SSM",
    duration: "00:07:50",
    domain: "Governance",
    description: "Operational insights and management for AWS resources.",
  },
  {
    lessonNumber: 125,
    sectionNumber: 12,
    sectionName: "DevOps",
    title: "AWS Cloud Map",
    duration: "00:02:07",
    domain: "Resilient",
    description: "Service discovery for cloud resources.",
  },
  {
    lessonNumber: 126,
    sectionNumber: 13,
    sectionName: "Cost",
    title: "Cost Allocation Tags",
    duration: "00:01:21",
    domain: "Cost",
    description: "Tag resources for detailed cost tracking.",
  },
  {
    lessonNumber: 127,
    sectionNumber: 13,
    sectionName: "Cost",
    title: "AWS Tag Editor",
    duration: "00:00:27",
    domain: "Cost",
    description: "Manage tags across multiple AWS services.",
  },
  {
    lessonNumber: 128,
    sectionNumber: 13,
    sectionName: "Cost",
    title: "Trusted Advisor",
    duration: "00:04:25",
    domain: "Cost",
    description: "Optimize costs, security, and performance.",
  },
  {
    lessonNumber: 129,
    sectionNumber: 13,
    sectionName: "Cost",
    title: "AWS Service Quotas",
    duration: "00:01:09",
    domain: "Governance",
    description: "Manage and monitor service limits.",
  },
  {
    lessonNumber: 130,
    sectionNumber: 13,
    sectionName: "Cost",
    title: "EC2 Launch Types & Savings Plan",
    duration: "00:03:05",
    domain: "Cost",
    description: "Optimize EC2 costs with Savings Plans.",
  },
  {
    lessonNumber: 131,
    sectionNumber: 13,
    sectionName: "Cost",
    title: "S3 Cost Savings",
    duration: "00:04:02",
    domain: "Cost",
    description: "Lifecycle policies, tiering, and intelligent tiering.",
  },
  {
    lessonNumber: 132,
    sectionNumber: 13,
    sectionName: "Cost",
    title: "S3 Storage Classes - Reminder",
    duration: "00:06:13",
    domain: "Cost",
    description: "S3 Standard, IA, One Zone IA, Glacier, Deep Archive.",
  },
  {
    lessonNumber: 133,
    sectionNumber: 13,
    sectionName: "Cost",
    title: "AWS Budgets & Cost Explorer",
    duration: "00:05:43",
    domain: "Cost",
    description: "Track spending and forecast future costs.",
  },
  {
    lessonNumber: 134,
    sectionNumber: 13,
    sectionName: "Cost",
    title: "AWS Compute Optimizer",
    duration: "00:01:36",
    domain: "Cost",
    description: "Recommend optimal EC2 instance types.",
  },
  {
    lessonNumber: 135,
    sectionNumber: 13,
    sectionName: "Cost",
    title: "EC2 Reserved Instance",
    duration: "00:01:08",
    domain: "Cost",
    description: "Significant discounts for committed usage.",
  },
  {
    lessonNumber: 136,
    sectionNumber: 14,
    sectionName: "Migration",
    title: "Cloud Migration Strategies - The 7Rs",
    duration: "00:04:43",
    domain: "Migration",
    description:
      "Retire, Retain, Rehost, Relocate, Replatform, Refactor, Repurchase.",
  },
  {
    lessonNumber: 137,
    sectionNumber: 14,
    sectionName: "Migration",
    title: "Storage Gateway",
    duration: "00:10:23",
    domain: "Storage",
    description: "Hybrid cloud storage with caching.",
  },
  {
    lessonNumber: 138,
    sectionNumber: 14,
    sectionName: "Migration",
    title: "Storage Gateway - Advanced Concepts",
    duration: "00:04:35",
    domain: "Storage",
    description: "File, Volume, Tape Gateway deep dive.",
  },
  {
    lessonNumber: 139,
    sectionNumber: 14,
    sectionName: "Migration",
    title: "Snow Family",
    duration: "00:02:56",
    domain: "Migration",
    description: "Physical data transfer devices.",
  },
  {
    lessonNumber: 140,
    sectionNumber: 14,
    sectionName: "Migration",
    title: "Snow Family - Improving Performance",
    duration: "00:01:18",
    domain: "Migration",
    description: "Optimize Snowball and Snowcone data transfer.",
  },
];

async function main() {
  console.log("🌱 Seeding Part 7: Lessons 121-140...");

  let count = 0;
  for (const lesson of lessonsPart7) {
    await prisma.curriculumTopic.create({
      data: {
        topicNumber: lesson.lessonNumber,
        title: lesson.title,
        domain: lesson.domain,
        subdomain: lesson.sectionName,
        keyServices: [],
        estimatedHours: 0.5,
        examWeight:
          lesson.domain === "Migration"
            ? "High"
            : lesson.domain === "Storage"
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

  console.log(`✅ Part 7 Complete! Inserted ${count} lessons (121-140)`);
  console.log("📌 Next: Run seed-part8.ts for lessons 141-160");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
