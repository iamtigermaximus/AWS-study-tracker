import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const lessonsPart3 = [
  {
    lessonNumber: 41,
    sectionNumber: 4,
    sectionName: "Security",
    title: "Amazon Detective",
    duration: "00:01:10",
    domain: "Security",
    description: "Analyze security findings and investigate root causes.",
  },
  {
    lessonNumber: 42,
    sectionNumber: 5,
    sectionName: "Compute",
    title: "Solution Architecture on AWS",
    duration: "00:04:26",
    domain: "Foundation",
    description: "Design patterns for well-architected solutions.",
  },
  {
    lessonNumber: 43,
    sectionNumber: 5,
    sectionName: "Compute",
    title: "EC2",
    duration: "00:10:12",
    domain: "Resilient",
    description: "Comprehensive EC2 overview for Solutions Architect.",
  },
  {
    lessonNumber: 44,
    sectionNumber: 5,
    sectionName: "Compute",
    title: "High Performance Computing (HPC)",
    duration: "00:06:25",
    domain: "Resilient",
    description: "EC2 placements, ENAs, and HPC optimizations.",
  },
  {
    lessonNumber: 45,
    sectionNumber: 5,
    sectionName: "Compute",
    title: "Auto Scaling",
    duration: "00:07:39",
    domain: "Resilient",
    description: "ASGs, scaling policies, and lifecycle hooks.",
  },
  {
    lessonNumber: 46,
    sectionNumber: 5,
    sectionName: "Compute",
    title: "Auto Scaling Update Strategies",
    duration: "00:05:28",
    domain: "Resilient",
    description: "Rolling, immutable, and blue/green deployments.",
  },
  {
    lessonNumber: 47,
    sectionNumber: 5,
    sectionName: "Compute",
    title: "Spot Instances & Spot Fleet",
    duration: "00:05:00",
    domain: "Cost",
    description: "Spot best practices, reclaim rate, and Spot Fleet.",
  },
  {
    lessonNumber: 48,
    sectionNumber: 5,
    sectionName: "Compute",
    title: "Amazon ECS - Elastic Container Service",
    duration: "00:10:52",
    domain: "Resilient",
    description: "Container orchestration using AWS native ECS.",
  },
  {
    lessonNumber: 49,
    sectionNumber: 5,
    sectionName: "Compute",
    title: "Amazon ECR - Elastic Container Registry",
    duration: "00:03:06",
    domain: "Storage",
    description: "Store, manage, and deploy Docker container images.",
  },
  {
    lessonNumber: 50,
    sectionNumber: 5,
    sectionName: "Compute",
    title: "Amazon EKS - Elastic Kubernetes Service",
    duration: "00:03:59",
    domain: "Resilient",
    description: "Managed Kubernetes on AWS.",
  },
  {
    lessonNumber: 51,
    sectionNumber: 5,
    sectionName: "Compute",
    title: "AWS App Runner",
    duration: "00:02:47",
    domain: "Resilient",
    description: "Fully managed container app deployment.",
  },
  {
    lessonNumber: 52,
    sectionNumber: 5,
    sectionName: "Compute",
    title: "ECS Anywhere & EKS Anywhere",
    duration: "00:03:50",
    domain: "Resilient",
    description: "Run container orchestration on-premises.",
  },
  {
    lessonNumber: 53,
    sectionNumber: 5,
    sectionName: "Compute",
    title: "AWS Lambda - Part 1",
    duration: "00:06:53",
    domain: "Resilient",
    description: "Serverless functions - triggers, limits, and use cases.",
  },
  {
    lessonNumber: 54,
    sectionNumber: 5,
    sectionName: "Compute",
    title: "AWS Lambda - Part 2",
    duration: "00:06:45",
    domain: "Resilient",
    description: "Lambda advanced: VPC, concurrency, and best practices.",
  },
  {
    lessonNumber: 55,
    sectionNumber: 5,
    sectionName: "Compute",
    title: "Elastic Load Balancers - Part 1",
    duration: "00:08:56",
    domain: "Resilient",
    description: "ALB vs NLB vs GLB - features and use cases.",
  },
  {
    lessonNumber: 56,
    sectionNumber: 5,
    sectionName: "Compute",
    title: "Elastic Load Balancers - Part 2",
    duration: "00:07:05",
    domain: "Resilient",
    description: "Sticky sessions, cross-zone, SSL termination.",
  },
  {
    lessonNumber: 57,
    sectionNumber: 5,
    sectionName: "Compute",
    title: "API Gateway",
    duration: "00:12:48",
    domain: "Resilient",
    description: "Create, deploy, and secure REST/HTTP APIs.",
  },
  {
    lessonNumber: 58,
    sectionNumber: 5,
    sectionName: "Compute",
    title: "API Gateway - Part 2",
    duration: "00:04:40",
    domain: "Resilient",
    description: "API caching, throttling, and usage plans.",
  },
  {
    lessonNumber: 59,
    sectionNumber: 5,
    sectionName: "Compute",
    title: "AWS AppSync",
    duration: "00:02:50",
    domain: "Resilient",
    description: "Managed GraphQL API service.",
  },
  {
    lessonNumber: 60,
    sectionNumber: 5,
    sectionName: "Compute",
    title: "Route 53 - Part 1",
    duration: "00:11:36",
    domain: "Networking",
    description: "DNS fundamentals and record types (A, CNAME, Alias).",
  },
];

async function main() {
  console.log("🌱 Seeding Part 3: Lessons 41-60...");

  let count = 0;
  for (const lesson of lessonsPart3) {
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
              : lesson.domain === "Cost"
                ? "Medium"
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

  console.log(`✅ Part 3 Complete! Inserted ${count} lessons (41-60)`);
  console.log("📌 Next: Run seed-part4.ts for lessons 61-80");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
