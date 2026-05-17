import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const lessonsPart5 = [
  // SECTION 15: CloudFront & Global Accelerator (continued from 161)
  {
    lessonNumber: 161,
    sectionNumber: 15,
    sectionName: "CloudFront & Global Accelerator",
    title: "CloudFront - Cache Invalidation",
    duration: "00:02:41",
    domain: "Performance",
    description:
      "Cache invalidation - remove cached content from edge locations. Use wildcards (*) to invalidate multiple paths.",
  },
  {
    lessonNumber: 162,
    sectionNumber: 15,
    sectionName: "CloudFront & Global Accelerator",
    title: "AWS Global Accelerator - Overview",
    duration: "00:06:07",
    domain: "Performance",
    description:
      "Global Accelerator - improves global application performance using anycast IP addresses. Traffic enters AWS edge locations, travels over AWS backbone.",
  },
  {
    lessonNumber: 163,
    sectionNumber: 15,
    sectionName: "CloudFront & Global Accelerator",
    title: "AWS Global Accelerator - Hands On",
    duration: "00:08:50",
    domain: "Performance",
    description:
      "Create Global Accelerator, add endpoints (ALB, NLB, EC2). Test anycast IP addresses and traffic routing.",
  },

  // SECTION 16: AWS Storage Extras (164-173)
  {
    lessonNumber: 164,
    sectionNumber: 16,
    sectionName: "AWS Storage Extras",
    title: "AWS Snow Family Overview",
    duration: "00:02:55",
    domain: "Cost",
    description:
      "Snow Family - physical data transport devices. Snowcone (8TB), Snowball Edge (80TB), Snowmobile (100PB). For offline data migration.",
  },
  {
    lessonNumber: 165,
    sectionNumber: 16,
    sectionName: "AWS Storage Extras",
    title: "AWS Snow Family Hands On",
    duration: "00:02:18",
    domain: "Cost",
    description:
      "Order Snowball device in console. Create job, prepare device, data transfer process.",
  },
  {
    lessonNumber: 166,
    sectionNumber: 16,
    sectionName: "AWS Storage Extras",
    title: "Architecture Snowball into Glacier",
    duration: "00:00:38",
    domain: "Cost",
    description:
      "Architecture pattern: Snowball → S3 → Lifecycle policy → Glacier for archival.",
  },
  {
    lessonNumber: 167,
    sectionNumber: 16,
    sectionName: "AWS Storage Extras",
    title: "Amazon FSx",
    duration: "00:08:23",
    domain: "Resilient",
    description:
      "Amazon FSx - fully managed file systems: FSx for Windows (SMB, AD integration), FSx for Lustre (HPC).",
  },
  {
    lessonNumber: 168,
    sectionNumber: 16,
    sectionName: "AWS Storage Extras",
    title: "Amazon FSx - Hands On",
    duration: "00:02:57",
    domain: "Resilient",
    description:
      "Create FSx for Windows file system. Mount on EC2, test file sharing and permissions.",
  },
  {
    lessonNumber: 169,
    sectionNumber: 16,
    sectionName: "AWS Storage Extras",
    title: "Storage Gateway Overview",
    duration: "00:08:07",
    domain: "Cost",
    description:
      "Storage Gateway - hybrid storage connecting on-premises to AWS. Types: S3 File Gateway, FSx File Gateway, Volume Gateway, Tape Gateway.",
  },
  {
    lessonNumber: 170,
    sectionNumber: 16,
    sectionName: "AWS Storage Extras",
    title: "Storage Gateway Hands On",
    duration: "00:02:08",
    domain: "Cost",
    description:
      "Deploy Storage Gateway VM. Configure S3 File Gateway, mount on on-premises server.",
  },
  {
    lessonNumber: 171,
    sectionNumber: 16,
    sectionName: "AWS Storage Extras",
    title: "AWS Transfer Family",
    duration: "00:02:20",
    domain: "Security",
    description:
      "AWS Transfer Family - managed SFTP, FTPS, FTP for S3. Use existing authentication systems (AD, LDAP).",
  },
  {
    lessonNumber: 172,
    sectionNumber: 16,
    sectionName: "AWS Storage Extras",
    title: "DataSync - Overview",
    duration: "00:04:46",
    domain: "Resilient",
    description:
      "DataSync - online data transfer service between on-premises and AWS or between AWS services. Supports EFS, FSx, S3.",
  },
  {
    lessonNumber: 173,
    sectionNumber: 16,
    sectionName: "AWS Storage Extras",
    title: "All AWS Storage Options Compared",
    duration: "00:03:35",
    domain: "Cost",
    description:
      "Comparison: S3 (object), EBS (block), EFS/FSx (file), Storage Gateway (hybrid), Snowball (offline).",
  },

  // SECTION 17: Decoupling Applications - SQS, SNS, Kinesis (174-189)
  {
    lessonNumber: 174,
    sectionNumber: 17,
    sectionName: "Decoupling Applications",
    title: "Introduction to Messaging",
    duration: "00:02:46",
    domain: "Performance",
    description:
      "Decoupling applications using message queues. Benefits: fault tolerance, scalability, asynchronous processing.",
  },
  {
    lessonNumber: 175,
    sectionNumber: 17,
    sectionName: "Decoupling Applications",
    title: "Amazon SQS - Standard Queues Overview",
    duration: "00:10:34",
    domain: "Performance",
    description:
      "SQS Standard Queues: unlimited throughput, at-least-once delivery, best-effort ordering. Use cases: decouple microservices.",
  },
  {
    lessonNumber: 176,
    sectionNumber: 17,
    sectionName: "Decoupling Applications",
    title: "SQS - Standard Queue Hands On",
    duration: "00:06:28",
    domain: "Performance",
    description:
      "Create SQS queue, send messages, receive messages, delete messages using AWS Console and CLI.",
  },
  {
    lessonNumber: 177,
    sectionNumber: 17,
    sectionName: "Decoupling Applications",
    title: "SQS - Message Visibility Timeout",
    duration: "00:05:19",
    domain: "Performance",
    description:
      "Visibility Timeout - message becomes invisible to other consumers after being received. Default 30 seconds, adjust for processing time.",
  },
  {
    lessonNumber: 178,
    sectionNumber: 17,
    sectionName: "Decoupling Applications",
    title: "SQS - Long Polling",
    duration: "00:01:30",
    domain: "Performance",
    description:
      "Long Polling - reduce empty responses by waiting up to 20 seconds for messages. Reduces cost and latency.",
  },
  {
    lessonNumber: 179,
    sectionNumber: 17,
    sectionName: "Decoupling Applications",
    title: "SQS - FIFO Queues",
    duration: "00:03:29",
    domain: "Performance",
    description:
      "FIFO Queues: first-in-first-out, exactly-once processing, limited throughput (300 msg/sec). Use when order matters.",
  },
  {
    lessonNumber: 180,
    sectionNumber: 17,
    sectionName: "Decoupling Applications",
    title: "SQS + Auto Scaling Group",
    duration: "00:04:34",
    domain: "Resilient",
    description:
      "Architecture: SQS queue + ASG with scaling policy based on queue length (ApproximateNumberOfMessages).",
  },
  {
    lessonNumber: 181,
    sectionNumber: 17,
    sectionName: "Decoupling Applications",
    title: "Amazon Simple Notification Service (AWS SNS)",
    duration: "00:04:19",
    domain: "Performance",
    description:
      "SNS - pub/sub messaging. One message to multiple subscribers (SQS, Lambda, Email, SMS, HTTP).",
  },
  {
    lessonNumber: 182,
    sectionNumber: 17,
    sectionName: "Decoupling Applications",
    title: "SNS and SQS - Fan Out Pattern",
    duration: "00:05:57",
    domain: "Performance",
    description:
      "Fan Out pattern: publish one SNS message to multiple SQS queues. For parallel processing by different consumers.",
  },
  {
    lessonNumber: 183,
    sectionNumber: 17,
    sectionName: "Decoupling Applications",
    title: "SNS - Hands On",
    duration: "00:04:36",
    domain: "Performance",
    description:
      "Create SNS topic, add subscriptions (email, SQS). Publish message, verify delivery to all subscribers.",
  },
  {
    lessonNumber: 184,
    sectionNumber: 17,
    sectionName: "Decoupling Applications",
    title: "Amazon Kinesis Data Streams",
    duration: "00:04:13",
    domain: "Performance",
    description:
      "Kinesis Data Streams - real-time streaming data processing. Shards determine capacity. Data stored for 1-365 days.",
  },
  {
    lessonNumber: 185,
    sectionNumber: 17,
    sectionName: "Decoupling Applications",
    title: "Amazon Kinesis Data Streams - Hands On",
    duration: "00:09:39",
    domain: "Performance",
    description:
      "Create Kinesis data stream, put records using CLI, read records using consumer application.",
  },
  {
    lessonNumber: 186,
    sectionNumber: 17,
    sectionName: "Decoupling Applications",
    title: "Amazon Data Firehose",
    duration: "00:04:04",
    domain: "Performance",
    description:
      "Firehose - load streaming data to destinations (S3, Redshift, OpenSearch). Near real-time, fully managed.",
  },
  {
    lessonNumber: 187,
    sectionNumber: 17,
    sectionName: "Decoupling Applications",
    title: "Amazon Data Firehose - Hands On",
    duration: "00:07:53",
    domain: "Performance",
    description:
      "Create Firehose delivery stream to S3. Configure buffer size and interval. Send test data.",
  },
  {
    lessonNumber: 188,
    sectionNumber: 17,
    sectionName: "Decoupling Applications",
    title: "SQS vs SNS vs Kinesis",
    duration: "00:03:01",
    domain: "Performance",
    description:
      "Comparison: SQS (message queue, one consumer), SNS (pub/sub, many consumers), Kinesis (real-time streaming, replay).",
  },
  {
    lessonNumber: 189,
    sectionNumber: 17,
    sectionName: "Decoupling Applications",
    title: "Amazon MQ",
    duration: "00:02:43",
    domain: "Performance",
    description:
      "Amazon MQ - managed Apache ActiveMQ/RabbitMQ. For migrating existing message brokers to AWS.",
  },

  // SECTION 18: Containers on AWS (190-202)
  {
    lessonNumber: 190,
    sectionNumber: 18,
    sectionName: "Containers on AWS",
    title: "Docker Introduction",
    duration: "00:05:11",
    domain: "Performance",
    description:
      "Docker containers: packaging applications with dependencies. Images vs containers. Dockerfile, build, run.",
  },
  {
    lessonNumber: 191,
    sectionNumber: 18,
    sectionName: "Containers on AWS",
    title: "Amazon ECS",
    duration: "00:06:44",
    domain: "Performance",
    description:
      "ECS - managed container orchestration. Launch types: Fargate (serverless) and EC2 (more control). Task definitions, services, clusters.",
  },
  {
    lessonNumber: 192,
    sectionNumber: 18,
    sectionName: "Containers on AWS",
    title: "Creating ECS Cluster - Hands On",
    duration: "00:05:57",
    domain: "Performance",
    description:
      "Create ECS cluster with EC2 launch type. Configure auto-scaling group, launch instances into cluster.",
  },
  {
    lessonNumber: 193,
    sectionNumber: 18,
    sectionName: "Containers on AWS",
    title: "Creating ECS Service - Hands On",
    duration: "00:09:46",
    domain: "Performance",
    description:
      "Define task definition (container image, CPU, memory). Create service with desired number of tasks.",
  },
  {
    lessonNumber: 194,
    sectionNumber: 18,
    sectionName: "Containers on AWS",
    title: "Amazon ECS - Auto Scaling",
    duration: "00:03:22",
    domain: "Resilient",
    description:
      "ECS auto scaling: Service Auto Scaling (task count) and Cluster Auto Scaling (EC2 instances). Target tracking policies.",
  },
  {
    lessonNumber: 195,
    sectionNumber: 18,
    sectionName: "Containers on AWS",
    title: "Amazon ECS - Solutions Architectures",
    duration: "00:03:10",
    domain: "Resilient",
    description:
      "ECS architecture patterns: with ALB (load balancing), with Service Discovery (internal DNS), with EFS (shared storage).",
  },
  {
    lessonNumber: 196,
    sectionNumber: 18,
    sectionName: "Containers on AWS",
    title: "Amazon ECS - Clean Up - Hands On",
    duration: "00:01:27",
    domain: "Cost",
    description:
      "Clean up ECS resources: delete services, task definitions, clusters, EC2 instances to avoid charges.",
  },
  {
    lessonNumber: 197,
    sectionNumber: 18,
    sectionName: "Containers on AWS",
    title: "Amazon ECR",
    duration: "00:01:39",
    domain: "Performance",
    description:
      "ECR - managed Docker container registry. Push/pull images with IAM authentication. Integrated with ECS.",
  },
  {
    lessonNumber: 198,
    sectionNumber: 18,
    sectionName: "Containers on AWS",
    title: "Amazon EKS - Overview",
    duration: "00:03:59",
    domain: "Performance",
    description:
      "EKS - managed Kubernetes. Control plane managed by AWS. Worker nodes in your account. Compatible with standard K8s tools.",
  },
  {
    lessonNumber: 199,
    sectionNumber: 18,
    sectionName: "Containers on AWS",
    title: "Amazon EKS - Hands On",
    duration: "00:06:51",
    domain: "Performance",
    description:
      "Create EKS cluster using eksctl. Deploy sample application using kubectl. Access cluster via API server.",
  },
  {
    lessonNumber: 200,
    sectionNumber: 18,
    sectionName: "Containers on AWS",
    title: "AWS App Runner",
    duration: "00:01:40",
    domain: "Performance",
    description:
      "App Runner - fully managed container application service. Deploy from source code or container registry. No infrastructure management.",
  },
];

async function main() {
  console.log("🌱 Seeding Part 5: Lessons 161-200...");

  let count = 0;
  for (const lesson of lessonsPart5) {
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

  console.log(`✅ Part 5 Complete! Inserted ${count} lessons (161-200)`);
  console.log(`📌 Total so far: 200 lessons`);
  console.log("📌 Next: Run part 6 for lessons 201-240");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
