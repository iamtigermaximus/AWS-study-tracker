import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const lessonsPart8 = [
  {
    lessonNumber: 141,
    sectionNumber: 14,
    sectionName: "Migration",
    title: "AWS DMS - Database Migration Services",
    duration: "00:06:13",
    domain: "Migration",
    description: "Migrate databases with minimal downtime.",
  },
  {
    lessonNumber: 142,
    sectionNumber: 14,
    sectionName: "Migration",
    title: "AWS CART - Cloud Adoption Readiness Tool",
    duration: "00:00:51",
    domain: "Migration",
    description: "Assess cloud readiness and get migration plan.",
  },
  {
    lessonNumber: 143,
    sectionNumber: 14,
    sectionName: "Migration",
    title: "Disaster Recovery",
    duration: "00:11:31",
    domain: "Resilient",
    description:
      "DR strategies: Backup, Pilot Light, Warm Standby, Multi-site.",
  },
  {
    lessonNumber: 144,
    sectionNumber: 14,
    sectionName: "Migration",
    title: "AWS FIS - Fault Injection Simulator",
    duration: "00:01:56",
    domain: "Resilient",
    description: "Chaos engineering to test application resilience.",
  },
  {
    lessonNumber: 145,
    sectionNumber: 14,
    sectionName: "Migration",
    title: "VM Migrations Services",
    duration: "00:07:06",
    domain: "Migration",
    description: "Migrate VMs from on-prem to EC2.",
  },
  {
    lessonNumber: 146,
    sectionNumber: 14,
    sectionName: "Migration",
    title: "AWS Migration Evaluator",
    duration: "00:01:24",
    domain: "Migration",
    description: "Build business case for cloud migration.",
  },
  {
    lessonNumber: 147,
    sectionNumber: 14,
    sectionName: "Migration",
    title: "AWS Backup",
    duration: "00:03:11",
    domain: "Storage",
    description: "Centralized backup management across services.",
  },
  {
    lessonNumber: 148,
    sectionNumber: 15,
    sectionName: "Networking",
    title: "VPC - Basics",
    duration: "00:12:36",
    domain: "Networking",
    description: "Subnets, route tables, IGW, NAT, security groups, NACLs.",
  },
  {
    lessonNumber: 149,
    sectionNumber: 15,
    sectionName: "Networking",
    title: "VPC Peering",
    duration: "00:07:18",
    domain: "Networking",
    description: "Connect VPCs using private IP addresses.",
  },
  {
    lessonNumber: 150,
    sectionNumber: 15,
    sectionName: "Networking",
    title: "Transit Gateway",
    duration: "00:09:41",
    domain: "Networking",
    description: "Hub-and-spoke network for connecting VPCs and on-prem.",
  },
  {
    lessonNumber: 151,
    sectionNumber: 15,
    sectionName: "Networking",
    title: "VPC Endpoints",
    duration: "00:05:39",
    domain: "Networking",
    description: "Gateway and Interface endpoints for private AWS access.",
  },
  {
    lessonNumber: 152,
    sectionNumber: 15,
    sectionName: "Networking",
    title: "VPC Endpoint Policies",
    duration: "00:06:40",
    domain: "Security",
    description: "Fine-grained control over VPC endpoint access.",
  },
  {
    lessonNumber: 153,
    sectionNumber: 15,
    sectionName: "Networking",
    title: "PrivateLink",
    duration: "00:04:27",
    domain: "Networking",
    description: "Expose services to other VPCs privately.",
  },
  {
    lessonNumber: 154,
    sectionNumber: 15,
    sectionName: "Networking",
    title: "AWS S2S VPN",
    duration: "00:11:23",
    domain: "Networking",
    description: "Site-to-Site VPN for hybrid connectivity.",
  },
  {
    lessonNumber: 155,
    sectionNumber: 15,
    sectionName: "Networking",
    title: "AWS Client VPN",
    duration: "00:02:59",
    domain: "Networking",
    description: "Managed client VPN for remote access.",
  },
  {
    lessonNumber: 156,
    sectionNumber: 15,
    sectionName: "Networking",
    title: "Direct Connect",
    duration: "00:06:28",
    domain: "Networking",
    description: "Dedicated private network connection to AWS.",
  },
  {
    lessonNumber: 157,
    sectionNumber: 15,
    sectionName: "Networking",
    title: "On-Premise Redundant Connections",
    duration: "00:02:28",
    domain: "Networking",
    description: "High availability hybrid connectivity patterns.",
  },
  {
    lessonNumber: 158,
    sectionNumber: 15,
    sectionName: "Networking",
    title: "VPC Flow Logs",
    duration: "00:06:03",
    domain: "Security",
    description: "Capture IP traffic information in your VPC.",
  },
  {
    lessonNumber: 159,
    sectionNumber: 15,
    sectionName: "Networking",
    title: "AWS Network Firewall",
    duration: "00:05:31",
    domain: "Security",
    description: "Managed firewall for VPCs.",
  },
  {
    lessonNumber: 160,
    sectionNumber: 16,
    sectionName: "Machine Learning",
    title: "Rekognition Overview",
    duration: "00:03:47",
    domain: "ML",
    description: "Image and video analysis service.",
  },
];

async function main() {
  console.log("🌱 Seeding Part 8: Lessons 141-160...");

  let count = 0;
  for (const lesson of lessonsPart8) {
    await prisma.curriculumTopic.create({
      data: {
        topicNumber: lesson.lessonNumber,
        title: lesson.title,
        domain: lesson.domain,
        subdomain: lesson.sectionName,
        keyServices: [],
        estimatedHours: 0.5,
        examWeight:
          lesson.domain === "Networking"
            ? "High"
            : lesson.domain === "Security"
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

  console.log(`✅ Part 8 Complete! Inserted ${count} lessons (141-160)`);
  console.log("📌 Next: Run seed-part9.ts for lessons 161-180");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
