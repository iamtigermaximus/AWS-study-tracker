import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const lessonsPart6 = [
  {
    lessonNumber: 101,
    sectionNumber: 10,
    sectionName: "Big Data",
    title: "Streaming Architectures",
    duration: "00:08:19",
    domain: "Resilient",
    description: "Design patterns for streaming data pipelines.",
  },
  {
    lessonNumber: 102,
    sectionNumber: 10,
    sectionName: "Big Data",
    title: "Amazon MSK",
    duration: "00:03:51",
    domain: "Resilient",
    description: "Managed Apache Kafka service.",
  },
  {
    lessonNumber: 103,
    sectionNumber: 10,
    sectionName: "Big Data",
    title: "AWS Batch",
    duration: "00:07:12",
    domain: "Resilient",
    description: "Run batch computing jobs at any scale.",
  },
  {
    lessonNumber: 104,
    sectionNumber: 10,
    sectionName: "Big Data",
    title: "Amazon EMR",
    duration: "00:05:54",
    domain: "Resilient",
    description: "Big data platform using Hadoop, Spark, Hive.",
  },
  {
    lessonNumber: 105,
    sectionNumber: 10,
    sectionName: "Big Data",
    title: "Running Jobs on AWS",
    duration: "00:02:28",
    domain: "Resilient",
    description: "Compare EC2, ECS, Lambda, Batch, EMR for job execution.",
  },
  {
    lessonNumber: 106,
    sectionNumber: 10,
    sectionName: "Big Data",
    title: "AWS Glue",
    duration: "00:01:36",
    domain: "Resilient",
    description: "Serverless ETL and data catalog service.",
  },
  {
    lessonNumber: 107,
    sectionNumber: 10,
    sectionName: "Big Data",
    title: "Redshift",
    duration: "00:08:34",
    domain: "Resilient",
    description: "Petabyte-scale cloud data warehouse.",
  },
  {
    lessonNumber: 108,
    sectionNumber: 10,
    sectionName: "Big Data",
    title: "Amazon DocumentDB",
    duration: "00:02:06",
    domain: "Resilient",
    description: "MongoDB-compatible document database.",
  },
  {
    lessonNumber: 109,
    sectionNumber: 10,
    sectionName: "Big Data",
    title: "Amazon Timestream",
    duration: "00:02:18",
    domain: "Resilient",
    description: "Time-series database for IoT and operational apps.",
  },
  {
    lessonNumber: 110,
    sectionNumber: 10,
    sectionName: "Big Data",
    title: "Amazon Athena",
    duration: "00:05:28",
    domain: "Resilient",
    description: "Serverless query service for S3 data using SQL.",
  },
  {
    lessonNumber: 111,
    sectionNumber: 10,
    sectionName: "Big Data",
    title: "Amazon QuickSight",
    duration: "00:04:00",
    domain: "Resilient",
    description: "Cloud-native business intelligence and dashboards.",
  },
  {
    lessonNumber: 112,
    sectionNumber: 10,
    sectionName: "Big Data",
    title: "Big Data Architecture",
    duration: "00:04:17",
    domain: "Resilient",
    description: "End-to-end big data pipeline architecture.",
  },
  {
    lessonNumber: 113,
    sectionNumber: 11,
    sectionName: "Monitoring",
    title: "CloudWatch",
    duration: "00:06:11",
    domain: "Monitoring",
    description: "Metrics, logs, alarms, and dashboards.",
  },
  {
    lessonNumber: 114,
    sectionNumber: 11,
    sectionName: "Monitoring",
    title: "CloudWatch Logs",
    duration: "00:08:13",
    domain: "Monitoring",
    description: "Centralize, monitor, and store log files.",
  },
  {
    lessonNumber: 115,
    sectionNumber: 11,
    sectionName: "Monitoring",
    title: "Amazon EventBridge",
    duration: "00:07:01",
    domain: "Resilient",
    description: "Serverless event bus for app integration.",
  },
  {
    lessonNumber: 116,
    sectionNumber: 11,
    sectionName: "Monitoring",
    title: "X-Ray",
    duration: "00:01:28",
    domain: "Monitoring",
    description: "Trace and debug distributed applications.",
  },
  {
    lessonNumber: 117,
    sectionNumber: 11,
    sectionName: "Monitoring",
    title: "AWS Personal Health Dashboard",
    duration: "00:05:45",
    domain: "Monitoring",
    description: "Personalized view of AWS service health.",
  },
  {
    lessonNumber: 118,
    sectionNumber: 12,
    sectionName: "DevOps",
    title: "Elastic Beanstalk",
    duration: "00:07:15",
    domain: "Resilient",
    description: "PaaS for deploying and scaling web applications.",
  },
  {
    lessonNumber: 119,
    sectionNumber: 12,
    sectionName: "DevOps",
    title: "CodeDeploy",
    duration: "00:10:04",
    domain: "Resilient",
    description: "Automate code deployments to EC2, on-prem, Lambda.",
  },
  {
    lessonNumber: 120,
    sectionNumber: 12,
    sectionName: "DevOps",
    title: "CloudFormation",
    duration: "00:07:58",
    domain: "Resilient",
    description: "Infrastructure as Code using templates.",
  },
];

async function main() {
  console.log("🌱 Seeding Part 6: Lessons 101-120...");

  let count = 0;
  for (const lesson of lessonsPart6) {
    await prisma.curriculumTopic.create({
      data: {
        topicNumber: lesson.lessonNumber,
        title: lesson.title,
        domain: lesson.domain,
        subdomain: lesson.sectionName,
        keyServices: [],
        estimatedHours: 0.5,
        examWeight: lesson.domain === "Resilient" ? "High" : "Medium",
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

  console.log(`✅ Part 6 Complete! Inserted ${count} lessons (101-120)`);
  console.log("📌 Next: Run seed-part7.ts for lessons 121-140");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
