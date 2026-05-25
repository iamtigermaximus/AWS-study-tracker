import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const lessonsPart2 = [
  {
    lessonNumber: 21,
    sectionNumber: 4,
    sectionName: "Security",
    title: "SSL Encryption, SNI & MITM",
    duration: "00:07:39",
    domain: "Security",
    description: "SSL/TLS, Server Name Indication, Man-in-the-Middle attacks.",
  },
  {
    lessonNumber: 22,
    sectionNumber: 4,
    sectionName: "Security",
    title: "AWS Certificate Manager - ACM",
    duration: "00:03:35",
    domain: "Security",
    description: "Provision, manage, and deploy SSL/TLS certificates.",
  },
  {
    lessonNumber: 23,
    sectionNumber: 4,
    sectionName: "Security",
    title: "CloudHSM",
    duration: "00:05:10",
    domain: "Security",
    description: "Dedicated hardware security module in AWS.",
  },
  {
    lessonNumber: 24,
    sectionNumber: 4,
    sectionName: "Security",
    title: "Solution Architecture - SSL on ELB",
    duration: "00:03:11",
    domain: "Resilient",
    description: "Offload SSL termination at the load balancer.",
  },
  {
    lessonNumber: 25,
    sectionNumber: 4,
    sectionName: "Security",
    title: "S3 Security",
    duration: "00:10:16",
    domain: "Security",
    description: "Bucket policies, ACLs, pre-signed URLs, encryption.",
  },
  {
    lessonNumber: 26,
    sectionNumber: 4,
    sectionName: "Security",
    title: "S3 Access Points",
    duration: "00:03:35",
    domain: "Storage",
    description: "Simplify permissions management for S3 at scale.",
  },
  {
    lessonNumber: 27,
    sectionNumber: 4,
    sectionName: "Security",
    title: "S3 Multi-Region Access Points",
    duration: "00:02:41",
    domain: "Storage",
    description: "Global endpoints for multi-region S3 buckets.",
  },
  {
    lessonNumber: 28,
    sectionNumber: 4,
    sectionName: "Security",
    title: "S3 Multi-Region Access Points - Hands On",
    duration: "00:03:44",
    domain: "Storage",
    description: "Practical demo of multi-region access points.",
  },
  {
    lessonNumber: 29,
    sectionNumber: 4,
    sectionName: "Security",
    title: "S3 Object Lambda",
    duration: "00:03:12",
    domain: "Storage",
    description: "Transform data as it is retrieved from S3.",
  },
  {
    lessonNumber: 30,
    sectionNumber: 4,
    sectionName: "Security",
    title: "DDoS and AWS Shield",
    duration: "00:06:00",
    domain: "Security",
    description: "Shield Standard vs Advanced for DDoS protection.",
  },
  {
    lessonNumber: 31,
    sectionNumber: 4,
    sectionName: "Security",
    title: "AWS WAF - Web Application Firewall",
    duration: "00:06:13",
    domain: "Security",
    description: "Filter web requests based on rules (SQLi, XSS, IP, etc.).",
  },
  {
    lessonNumber: 32,
    sectionNumber: 4,
    sectionName: "Security",
    title: "AWS Firewall Manager",
    duration: "00:02:43",
    domain: "Security",
    description: "Centrally configure and manage WAF across accounts.",
  },
  {
    lessonNumber: 33,
    sectionNumber: 4,
    sectionName: "Security",
    title: "Blocking an IP Address",
    duration: "00:05:30",
    domain: "Security",
    description: "Methods to block IPs: NACLs, WAF, Network Firewall.",
  },
  {
    lessonNumber: 34,
    sectionNumber: 4,
    sectionName: "Security",
    title: "Amazon Inspector",
    duration: "00:04:23",
    domain: "Security",
    description: "Automated vulnerability scanning for EC2 and ECR.",
  },
  {
    lessonNumber: 35,
    sectionNumber: 4,
    sectionName: "Security",
    title: "AWS Config",
    duration: "00:04:23",
    domain: "Governance",
    description: "Evaluate, audit, and track resource configurations.",
  },
  {
    lessonNumber: 36,
    sectionNumber: 4,
    sectionName: "Security",
    title: "AWS Managed Logs",
    duration: "00:01:26",
    domain: "Monitoring",
    description: "Centralized logging services overview.",
  },
  {
    lessonNumber: 37,
    sectionNumber: 4,
    sectionName: "Security",
    title: "Amazon GuardDuty",
    duration: "00:03:18",
    domain: "Security",
    description: "Intelligent threat detection using machine learning.",
  },
  {
    lessonNumber: 38,
    sectionNumber: 4,
    sectionName: "Security",
    title: "IAM Advanced Policies",
    duration: "00:04:17",
    domain: "Security",
    description: "Policy conditions, principals, and advanced constructs.",
  },
  {
    lessonNumber: 39,
    sectionNumber: 4,
    sectionName: "Security",
    title: "EC2 Instance Connect",
    duration: "00:01:48",
    domain: "Resilient",
    description: "SSH access without managing SSH keys.",
  },
  {
    lessonNumber: 40,
    sectionNumber: 4,
    sectionName: "Security",
    title: "AWS Security Hub",
    duration: "00:02:44",
    domain: "Security",
    description: "Central security posture management across accounts.",
  },
];

async function main() {
  console.log("🌱 Seeding Part 2: Lessons 21-40...");

  let count = 0;
  for (const lesson of lessonsPart2) {
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

  console.log(`✅ Part 2 Complete! Inserted ${count} lessons (21-40)`);
  console.log("📌 Next: Run seed-part3.ts for lessons 41-60");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
