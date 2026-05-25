import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const lessonsPart5 = [
  {
    lessonNumber: 81,
    sectionNumber: 7,
    sectionName: "CDN",
    title: "CloudFront - Part 1",
    duration: "00:06:56",
    domain: "Resilient",
    description: "Content Delivery Network - global caching and acceleration.",
  },
  {
    lessonNumber: 82,
    sectionNumber: 7,
    sectionName: "CDN",
    title: "CloudFront - Part 2",
    duration: "00:05:03",
    domain: "Resilient",
    description: "CloudFront behaviors, origins, and invalidations.",
  },
  {
    lessonNumber: 83,
    sectionNumber: 7,
    sectionName: "CDN",
    title: "Lambda@Edge and CloudFront Functions",
    duration: "00:10:00",
    domain: "Resilient",
    description: "Run code at edge locations to customize content.",
  },
  {
    lessonNumber: 84,
    sectionNumber: 7,
    sectionName: "CDN",
    title: "Lambda@Edge Reduce Latency",
    duration: "00:02:42",
    domain: "Resilient",
    description: "Optimize user experience with edge compute.",
  },
  {
    lessonNumber: 85,
    sectionNumber: 7,
    sectionName: "CDN",
    title: "Amazon ElastiCache",
    duration: "00:05:13",
    domain: "Resilient",
    description: "In-memory caching with Redis or Memcached.",
  },
  {
    lessonNumber: 86,
    sectionNumber: 7,
    sectionName: "CDN",
    title: "Handling Extreme Rates",
    duration: "00:05:27",
    domain: "Resilient",
    description: "Design patterns for high-traffic scenarios.",
  },
  {
    lessonNumber: 87,
    sectionNumber: 8,
    sectionName: "Databases",
    title: "DynamoDB",
    duration: "00:12:01",
    domain: "Resilient",
    description: "NoSQL key-value and document database.",
  },
  {
    lessonNumber: 88,
    sectionNumber: 8,
    sectionName: "Databases",
    title: "Amazon OpenSearch",
    duration: "00:03:07",
    domain: "Resilient",
    description: "Search and analytics engine (formerly Elasticsearch).",
  },
  {
    lessonNumber: 89,
    sectionNumber: 8,
    sectionName: "Databases",
    title: "RDS",
    duration: "00:10:10",
    domain: "Resilient",
    description: "Managed relational databases: MySQL, PostgreSQL, etc.",
  },
  {
    lessonNumber: 90,
    sectionNumber: 8,
    sectionName: "Databases",
    title: "Aurora - Part 1",
    duration: "00:07:21",
    domain: "Resilient",
    description: "AWS-native MySQL/PostgreSQL compatible database.",
  },
  {
    lessonNumber: 91,
    sectionNumber: 8,
    sectionName: "Databases",
    title: "Aurora - Part 2",
    duration: "00:06:40",
    domain: "Resilient",
    description: "Aurora Serverless, Global Database, and Backtrack.",
  },
  {
    lessonNumber: 92,
    sectionNumber: 9,
    sectionName: "Serverless",
    title: "Step Functions",
    duration: "00:09:37",
    domain: "Resilient",
    description:
      "Orchestrate serverless workflows using visual state machines.",
  },
  {
    lessonNumber: 93,
    sectionNumber: 9,
    sectionName: "Serverless",
    title: "SQS",
    duration: "00:08:33",
    domain: "Resilient",
    description: "Simple Queue Service - fully managed message queuing.",
  },
  {
    lessonNumber: 94,
    sectionNumber: 9,
    sectionName: "Serverless",
    title: "Amazon MQ",
    duration: "00:02:24",
    domain: "Resilient",
    description: "Managed Apache ActiveMQ and RabbitMQ.",
  },
  {
    lessonNumber: 95,
    sectionNumber: 9,
    sectionName: "Serverless",
    title: "Amazon SNS",
    duration: "00:04:19",
    domain: "Resilient",
    description: "Pub/sub messaging and notifications.",
  },
  {
    lessonNumber: 96,
    sectionNumber: 9,
    sectionName: "Serverless",
    title: "Amazon SNS - SQS Fan Out Pattern",
    duration: "00:05:57",
    domain: "Resilient",
    description: "Publish once, deliver to multiple SQS queues.",
  },
  {
    lessonNumber: 97,
    sectionNumber: 9,
    sectionName: "Serverless",
    title: "Amazon SNS - Message Delivery Retries",
    duration: "00:02:58",
    domain: "Resilient",
    description: "Retry policies and dead-letter queues for SNS.",
  },
  {
    lessonNumber: 98,
    sectionNumber: 10,
    sectionName: "Big Data",
    title: "Amazon Kinesis Data Streams",
    duration: "00:04:13",
    domain: "Resilient",
    description: "Real-time streaming data ingestion.",
  },
  {
    lessonNumber: 99,
    sectionNumber: 10,
    sectionName: "Big Data",
    title: "Amazon Data Firehose",
    duration: "00:08:47",
    domain: "Resilient",
    description: "Load streaming data to S3, Redshift, OpenSearch.",
  },
  {
    lessonNumber: 100,
    sectionNumber: 10,
    sectionName: "Big Data",
    title: "Amazon Managed Service for Apache Flink",
    duration: "00:01:42",
    domain: "Resilient",
    description: "Real-time stream processing using Flink.",
  },
];

async function main() {
  console.log("🌱 Seeding Part 5: Lessons 81-100...");

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

  console.log(`✅ Part 5 Complete! Inserted ${count} lessons (81-100)`);
  console.log("📌 Next: Run seed-part6.ts for lessons 101-120");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
