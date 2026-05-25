import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const lessonsPart4 = [
  {
    lessonNumber: 61,
    sectionNumber: 5,
    sectionName: "Compute",
    title: "Route 53 - Part 2",
    duration: "00:05:37",
    domain: "Networking",
    description:
      "Routing policies: simple, weighted, latency, failover, geolocation.",
  },
  {
    lessonNumber: 62,
    sectionNumber: 5,
    sectionName: "Compute",
    title: "Route 53 - Resolvers & Hybrid DNS",
    duration: "00:07:11",
    domain: "Networking",
    description: "Route 53 Resolver for hybrid cloud DNS resolution.",
  },
  {
    lessonNumber: 63,
    sectionNumber: 5,
    sectionName: "Compute",
    title: "AWS Global Accelerator",
    duration: "00:03:05",
    domain: "Networking",
    description: "Improve global application performance using Anycast IPs.",
  },
  {
    lessonNumber: 64,
    sectionNumber: 5,
    sectionName: "Compute",
    title: "Comparison of Solutions Architecture",
    duration: "00:10:32",
    domain: "Foundation",
    description:
      "Compare different architectural patterns and their trade-offs.",
  },
  {
    lessonNumber: 65,
    sectionNumber: 5,
    sectionName: "Compute",
    title: "AWS Outposts",
    duration: "00:03:43",
    domain: "Hybrid",
    description: "Run AWS infrastructure on-premises.",
  },
  {
    lessonNumber: 66,
    sectionNumber: 5,
    sectionName: "Compute",
    title: "AWS WaveLength",
    duration: "00:01:57",
    domain: "Networking",
    description: "Ultra-low latency for 5G devices at edge.",
  },
  {
    lessonNumber: 67,
    sectionNumber: 5,
    sectionName: "Compute",
    title: "AWS Local Zones",
    duration: "00:03:54",
    domain: "Networking",
    description: "Deploy latency-sensitive workloads closer to end users.",
  },
  {
    lessonNumber: 68,
    sectionNumber: 6,
    sectionName: "Storage",
    title: "EBS & Local Instance Store",
    duration: "00:08:54",
    domain: "Storage",
    description: "Elastic Block Store volumes and ephemeral instance storage.",
  },
  {
    lessonNumber: 69,
    sectionNumber: 6,
    sectionName: "Storage",
    title: "Amazon EFS",
    duration: "00:09:02",
    domain: "Storage",
    description: "Managed NFS file system for Linux EC2 instances.",
  },
  {
    lessonNumber: 70,
    sectionNumber: 6,
    sectionName: "Storage",
    title: "Amazon S3",
    duration: "00:10:06",
    domain: "Storage",
    description:
      "Object storage - buckets, versioning, replication, lifecycle.",
  },
  {
    lessonNumber: 71,
    sectionNumber: 6,
    sectionName: "Storage",
    title: "Amazon S3 - Storage Class Analysis",
    duration: "00:01:18",
    domain: "Cost",
    description: "Analyze access patterns to optimize storage classes.",
  },
  {
    lessonNumber: 72,
    sectionNumber: 6,
    sectionName: "Storage",
    title: "Amazon S3 - Storage Lens",
    duration: "00:05:39",
    domain: "Storage",
    description: "Organization-wide visibility into S3 storage metrics.",
  },
  {
    lessonNumber: 73,
    sectionNumber: 6,
    sectionName: "Storage",
    title: "S3 Solution Architecture",
    duration: "00:05:43",
    domain: "Resilient",
    description: "Architectural patterns using S3 with other services.",
  },
  {
    lessonNumber: 74,
    sectionNumber: 6,
    sectionName: "Storage",
    title: "Amazon FSx",
    duration: "00:08:23",
    domain: "Storage",
    description: "Fully managed Windows File Server and Lustre.",
  },
  {
    lessonNumber: 75,
    sectionNumber: 6,
    sectionName: "Storage",
    title: "Amazon FSx - Solution Architectures",
    duration: "00:03:08",
    domain: "Storage",
    description: "FSx deployment patterns and use cases.",
  },
  {
    lessonNumber: 76,
    sectionNumber: 6,
    sectionName: "Storage",
    title: "AWS DataSync",
    duration: "00:04:46",
    domain: "Migration",
    description: "Online data transfer service between on-prem and AWS.",
  },
  {
    lessonNumber: 77,
    sectionNumber: 6,
    sectionName: "Storage",
    title: "AWS DataSync - Solution Architecture",
    duration: "00:00:52",
    domain: "Migration",
    description: "DataSync architectural patterns.",
  },
  {
    lessonNumber: 78,
    sectionNumber: 6,
    sectionName: "Storage",
    title: "AWS Data Exchange",
    duration: "00:02:10",
    domain: "Storage",
    description: "Find, subscribe, and use third-party data in the cloud.",
  },
  {
    lessonNumber: 79,
    sectionNumber: 6,
    sectionName: "Storage",
    title: "AWS Transfer Family",
    duration: "00:04:35",
    domain: "Storage",
    description: "Managed SFTP, FTPS, FTP for S3.",
  },
  {
    lessonNumber: 80,
    sectionNumber: 6,
    sectionName: "Storage",
    title: "AWS Storage Services Price Comparison",
    duration: "00:03:11",
    domain: "Cost",
    description: "Compare pricing across EBS, EFS, S3, and FSx.",
  },
];

async function main() {
  console.log("🌱 Seeding Part 4: Lessons 61-80...");

  let count = 0;
  for (const lesson of lessonsPart4) {
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

  console.log(`✅ Part 4 Complete! Inserted ${count} lessons (61-80)`);
  console.log("📌 Next: Run seed-part5.ts for lessons 81-100");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
