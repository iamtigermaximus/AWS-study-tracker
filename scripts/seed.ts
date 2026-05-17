import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const topics = [
  // FOUNDATION DOMAIN (7 topics)
  {
    topicNumber: 1,
    title: "AWS Global Infrastructure (Regions, AZs, Edge Locations)",
    domain: "Foundation",
    subdomain: "Global Infrastructure",
    keyServices: [],
    examWeight: "Prerequisite",
    estimatedHours: 2,
  },
  {
    topicNumber: 2,
    title: "Shared Responsibility Model",
    domain: "Foundation",
    subdomain: "Security",
    keyServices: [],
    examWeight: "Prerequisite",
    estimatedHours: 1,
  },
  {
    topicNumber: 3,
    title: "IAM Basics (Users, Groups, Roles, Policies)",
    domain: "Foundation",
    subdomain: "IAM",
    keyServices: ["IAM"],
    examWeight: "Prerequisite",
    estimatedHours: 2,
  },
  {
    topicNumber: 4,
    title: "S3 Basics (Buckets, Objects, Versioning)",
    domain: "Foundation",
    subdomain: "Storage",
    keyServices: ["S3"],
    examWeight: "Prerequisite",
    estimatedHours: 2,
  },
  {
    topicNumber: 5,
    title: "EC2 Basics (Instance Types, AMIs, Key Pairs)",
    domain: "Foundation",
    subdomain: "Compute",
    keyServices: ["EC2"],
    examWeight: "Prerequisite",
    estimatedHours: 2,
  },
  {
    topicNumber: 6,
    title: "VPC Basics (Subnets, Internet Gateway, Route Tables)",
    domain: "Foundation",
    subdomain: "Networking",
    keyServices: ["VPC"],
    examWeight: "Prerequisite",
    estimatedHours: 2,
  },
  {
    topicNumber: 7,
    title: "AWS Pricing Models (On-Demand, Reserved, Spot)",
    domain: "Foundation",
    subdomain: "Cost",
    keyServices: ["Cost Explorer"],
    examWeight: "Prerequisite",
    estimatedHours: 2,
  },

  // SECURITY DOMAIN (10 topics - 30% of exam)
  {
    topicNumber: 8,
    title: "IAM Policy Evaluation Logic (Explicit Deny > Allow)",
    domain: "Security",
    subdomain: "IAM",
    keyServices: ["IAM"],
    examWeight: "High",
    estimatedHours: 2,
  },
  {
    topicNumber: 9,
    title: "Security Groups vs NACLs (Stateful vs Stateless)",
    domain: "Security",
    subdomain: "Networking",
    keyServices: ["VPC", "EC2"],
    examWeight: "High",
    estimatedHours: 2,
  },
  {
    topicNumber: 10,
    title: "S3 Encryption (SSE-S3, SSE-KMS, SSE-C)",
    domain: "Security",
    subdomain: "Storage",
    keyServices: ["S3", "KMS"],
    examWeight: "High",
    estimatedHours: 2,
  },
  {
    topicNumber: 11,
    title: "KMS (Key Types, Rotation, Envelope Encryption)",
    domain: "Security",
    subdomain: "Encryption",
    keyServices: ["KMS"],
    examWeight: "High",
    estimatedHours: 2,
  },
  {
    topicNumber: 12,
    title: "AWS WAF & Shield (DDoS Protection)",
    domain: "Security",
    subdomain: "Security",
    keyServices: ["WAF", "Shield"],
    examWeight: "Medium",
    estimatedHours: 2,
  },
  {
    topicNumber: 13,
    title: "Secrets Manager vs Parameter Store",
    domain: "Security",
    subdomain: "Secrets",
    keyServices: ["Secrets Manager"],
    examWeight: "Medium",
    estimatedHours: 1,
  },
  {
    topicNumber: 14,
    title: "CloudTrail vs CloudWatch vs Config",
    domain: "Security",
    subdomain: "Monitoring",
    keyServices: ["CloudTrail", "CloudWatch", "Config"],
    examWeight: "High",
    estimatedHours: 2,
  },
  {
    topicNumber: 15,
    title: "VPC Endpoints (Gateway vs Interface, PrivateLink)",
    domain: "Security",
    subdomain: "Networking",
    keyServices: ["VPC Endpoints"],
    examWeight: "Medium",
    estimatedHours: 2,
  },
  {
    topicNumber: 16,
    title: "Cognito (User Pools vs Identity Pools)",
    domain: "Security",
    subdomain: "Auth",
    keyServices: ["Cognito"],
    examWeight: "Low",
    estimatedHours: 2,
  },
  {
    topicNumber: 17,
    title: "Resource-Based Policies vs IAM Roles",
    domain: "Security",
    subdomain: "IAM",
    keyServices: ["IAM", "S3"],
    examWeight: "High",
    estimatedHours: 2,
  },

  // RESILIENT DOMAIN (10 topics - 26% of exam)
  {
    topicNumber: 18,
    title: "EC2 Instance Families (General, Compute, Memory, Storage)",
    domain: "Resilient",
    subdomain: "Compute",
    keyServices: ["EC2"],
    examWeight: "Medium",
    estimatedHours: 2,
  },
  {
    topicNumber: 19,
    title: "Auto Scaling Groups (Scaling Policies, Health Checks)",
    domain: "Resilient",
    subdomain: "Compute",
    keyServices: ["ASG"],
    examWeight: "High",
    estimatedHours: 2,
  },
  {
    topicNumber: 20,
    title: "Load Balancers (ALB vs NLB vs GWLB)",
    domain: "Resilient",
    subdomain: "Networking",
    keyServices: ["ELB"],
    examWeight: "High",
    estimatedHours: 2,
  },
  {
    topicNumber: 21,
    title: "RDS (Multi-AZ vs Read Replicas vs Aurora)",
    domain: "Resilient",
    subdomain: "Database",
    keyServices: ["RDS", "Aurora"],
    examWeight: "High",
    estimatedHours: 2,
  },
  {
    topicNumber: 22,
    title: "Route 53 Routing Policies",
    domain: "Resilient",
    subdomain: "DNS",
    keyServices: ["Route 53"],
    examWeight: "High",
    estimatedHours: 2,
  },
  {
    topicNumber: 23,
    title: "Disaster Recovery (Backup, Pilot Light, Warm Standby)",
    domain: "Resilient",
    subdomain: "DR",
    keyServices: [],
    examWeight: "High",
    estimatedHours: 2,
  },
  {
    topicNumber: 24,
    title: "EBS vs EFS vs Instance Store",
    domain: "Resilient",
    subdomain: "Storage",
    keyServices: ["EBS", "EFS"],
    examWeight: "Medium",
    estimatedHours: 2,
  },
  {
    topicNumber: 25,
    title: "S3 Cross-Region Replication (CRR)",
    domain: "Resilient",
    subdomain: "Storage",
    keyServices: ["S3"],
    examWeight: "Medium",
    estimatedHours: 1,
  },
  {
    topicNumber: 26,
    title: "Database Migration Service (DMS)",
    domain: "Resilient",
    subdomain: "Database",
    keyServices: ["DMS"],
    examWeight: "Low",
    estimatedHours: 2,
  },
  {
    topicNumber: 27,
    title: "AWS Backup",
    domain: "Resilient",
    subdomain: "Backup",
    keyServices: ["AWS Backup"],
    examWeight: "Low",
    estimatedHours: 1,
  },

  // PERFORMANCE DOMAIN (9 topics - 24% of exam)
  {
    topicNumber: 28,
    title: "CloudFront CDN (Edge Locations, TTL, Invalidations)",
    domain: "Performance",
    subdomain: "CDN",
    keyServices: ["CloudFront"],
    examWeight: "High",
    estimatedHours: 2,
  },
  {
    topicNumber: 29,
    title: "ElastiCache (Redis vs Memcached)",
    domain: "Performance",
    subdomain: "Database",
    keyServices: ["ElastiCache"],
    examWeight: "High",
    estimatedHours: 2,
  },
  {
    topicNumber: 30,
    title: "DynamoDB (Single-Table Design, Partition Keys, GSI/LSI)",
    domain: "Performance",
    subdomain: "Database",
    keyServices: ["DynamoDB"],
    examWeight: "High",
    estimatedHours: 3,
  },
  {
    topicNumber: 31,
    title: "API Gateway (Caching, Throttling, Stages)",
    domain: "Performance",
    subdomain: "API",
    keyServices: ["API Gateway"],
    examWeight: "High",
    estimatedHours: 2,
  },
  {
    topicNumber: 32,
    title: "SQS (Standard vs FIFO, Visibility Timeout, DLQ)",
    domain: "Performance",
    subdomain: "Integration",
    keyServices: ["SQS"],
    examWeight: "High",
    estimatedHours: 2,
  },
  {
    topicNumber: 33,
    title: "SNS (Pub/Sub, Topics, Subscriptions)",
    domain: "Performance",
    subdomain: "Integration",
    keyServices: ["SNS"],
    examWeight: "Medium",
    estimatedHours: 2,
  },
  {
    topicNumber: 34,
    title: "Kinesis (Data Streams, Firehose, Analytics)",
    domain: "Performance",
    subdomain: "Streaming",
    keyServices: ["Kinesis"],
    examWeight: "Low",
    estimatedHours: 2,
  },
  {
    topicNumber: 35,
    title: "Aurora (Serverless, Global Database)",
    domain: "Performance",
    subdomain: "Database",
    keyServices: ["Aurora"],
    examWeight: "Medium",
    estimatedHours: 2,
  },
  {
    topicNumber: 36,
    title: "DAX (DynamoDB Accelerator)",
    domain: "Performance",
    subdomain: "Database",
    keyServices: ["DAX"],
    examWeight: "Low",
    estimatedHours: 1,
  },

  // COST DOMAIN (9 topics - 20% of exam)
  {
    topicNumber: 37,
    title: "S3 Lifecycle Policies (Transition to IA/Glacier)",
    domain: "Cost",
    subdomain: "Storage",
    keyServices: ["S3"],
    examWeight: "High",
    estimatedHours: 2,
  },
  {
    topicNumber: 38,
    title: "Savings Plans vs Reserved Instances",
    domain: "Cost",
    subdomain: "Compute",
    keyServices: ["Cost Explorer"],
    examWeight: "High",
    estimatedHours: 2,
  },
  {
    topicNumber: 39,
    title: "Spot Instances (Use Cases, Interruption Handling)",
    domain: "Cost",
    subdomain: "Compute",
    keyServices: ["EC2 Spot"],
    examWeight: "Medium",
    estimatedHours: 2,
  },
  {
    topicNumber: 40,
    title: "Lambda Cost Model (Requests, Duration, Memory)",
    domain: "Cost",
    subdomain: "Compute",
    keyServices: ["Lambda"],
    examWeight: "Medium",
    estimatedHours: 2,
  },
  {
    topicNumber: 41,
    title: "Data Transfer Costs (In vs Out, Cross-Region)",
    domain: "Cost",
    subdomain: "Networking",
    keyServices: [],
    examWeight: "Medium",
    estimatedHours: 1,
  },
  {
    topicNumber: 42,
    title: "Compute Optimizer",
    domain: "Cost",
    subdomain: "Compute",
    keyServices: ["Compute Optimizer"],
    examWeight: "Low",
    estimatedHours: 1,
  },
  {
    topicNumber: 43,
    title: "Trusted Advisor",
    domain: "Cost",
    subdomain: "Support",
    keyServices: ["Trusted Advisor"],
    examWeight: "Low",
    estimatedHours: 1,
  },
  {
    topicNumber: 44,
    title: "Storage Gateway",
    domain: "Cost",
    subdomain: "Storage",
    keyServices: ["Storage Gateway"],
    examWeight: "Low",
    estimatedHours: 2,
  },
  {
    topicNumber: 45,
    title: "AWS Organizations (Consolidated Billing, SCPs)",
    domain: "Cost",
    subdomain: "Management",
    keyServices: ["Organizations"],
    examWeight: "Medium",
    estimatedHours: 2,
  },
];

const projects = [
  {
    name: "Cloud Resume",
    description:
      "Static portfolio website hosted on S3 with CloudFront CDN and a serverless visitor counter using Lambda + DynamoDB.",
    status: "Planning",
    awsServices: ["S3", "CloudFront", "Route 53", "Lambda", "DynamoDB", "IAM"],
    topicNumbers: [4, 10, 14, 28],
  },
  {
    name: "URL Shortener",
    description:
      "Serverless API that creates short URLs and redirects. Uses API Gateway, Lambda, and DynamoDB with single-table design.",
    status: "Planning",
    awsServices: ["API Gateway", "Lambda", "DynamoDB", "CloudWatch", "IAM"],
    topicNumbers: [8, 30, 31, 32],
  },
  {
    name: "Image Processing Pipeline",
    description:
      "Event-driven image resizing pipeline. Upload triggers S3 event → SQS → Lambda processes and creates thumbnails.",
    status: "Planning",
    awsServices: ["S3", "SQS", "Lambda", "KMS", "CloudFront", "IAM"],
    topicNumbers: [4, 11, 28, 32, 33],
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Seed topics
  for (const topic of topics) {
    await prisma.curriculumTopic.upsert({
      where: { topicNumber: topic.topicNumber },
      update: topic,
      create: topic,
    });
  }
  console.log(`✅ Seeded ${topics.length} topics`);

  // Seed projects
  for (const project of projects) {
    await prisma.project.upsert({
      where: { id: project.name },
      update: project,
      create: project,
    });
  }
  console.log(`✅ Seeded ${projects.length} projects`);

  console.log("🎉 Database seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
