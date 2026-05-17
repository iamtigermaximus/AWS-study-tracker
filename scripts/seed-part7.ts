import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const lessonsPart7 = [
  // SECTION 22: Data & Analytics (continued from 241)
  {
    lessonNumber: 241,
    sectionNumber: 22,
    sectionName: "Data & Analytics",
    title: "Lake Formation",
    duration: "00:04:07",
    domain: "Security",
    description:
      "Lake Formation - build/manage data lakes. Centralized permissions, fine-grained access control. Integrates with Glue, S3.",
  },
  {
    lessonNumber: 242,
    sectionNumber: 22,
    sectionName: "Data & Analytics",
    title: "Amazon Managed Service for Apache Flink",
    duration: "00:01:42",
    domain: "Performance",
    description:
      "Managed Flink - real-time stream processing using Java/Scala. For complex analytics on Kinesis streams.",
  },
  {
    lessonNumber: 243,
    sectionNumber: 22,
    sectionName: "Data & Analytics",
    title: "Amazon Managed Service for Apache Flink - Hands On",
    duration: "00:02:04",
    domain: "Performance",
    description:
      "Create Flink application, configure Kinesis data source, deploy and monitor streaming analytics.",
  },
  {
    lessonNumber: 244,
    sectionNumber: 22,
    sectionName: "Data & Analytics",
    title: "MSK - Managed Streaming for Apache Kafka",
    duration: "00:03:51",
    domain: "Performance",
    description:
      "MSK - managed Kafka service. Fully compatible with open-source Kafka. For high-throughput streaming.",
  },
  {
    lessonNumber: 245,
    sectionNumber: 22,
    sectionName: "Data & Analytics",
    title: "Big Data Ingestion Pipeline",
    duration: "00:04:12",
    domain: "Resilient",
    description:
      "Big data pipeline: Kafka/Kinesis → Flink (real-time) → S3 → Glue (ETL) → Redshift/Athena (analytics).",
  },

  // SECTION 23: Machine Learning (246-257)
  {
    lessonNumber: 246,
    sectionNumber: 23,
    sectionName: "Machine Learning",
    title: "Rekognition Overview",
    duration: "00:03:47",
    domain: "Security",
    description:
      "Rekognition - image/video analysis. Object detection, face recognition, content moderation, celebrity recognition.",
  },
  {
    lessonNumber: 247,
    sectionNumber: 23,
    sectionName: "Machine Learning",
    title: "Transcribe Overview",
    duration: "00:02:58",
    domain: "Performance",
    description:
      "Transcribe - speech-to-text API. Automatic language identification, punctuation, speaker diarization.",
  },
  {
    lessonNumber: 248,
    sectionNumber: 23,
    sectionName: "Machine Learning",
    title: "Polly Overview",
    duration: "00:04:13",
    domain: "Performance",
    description:
      "Polly - text-to-speech service. Multiple voices/languages, SSML support, speech marks for timing.",
  },
  {
    lessonNumber: 249,
    sectionNumber: 23,
    sectionName: "Machine Learning",
    title: "Translate Overview",
    duration: "00:00:36",
    domain: "Performance",
    description:
      "Translate - neural machine translation. Supports 75+ languages, custom terminology, batch processing.",
  },
  {
    lessonNumber: 250,
    sectionNumber: 23,
    sectionName: "Machine Learning",
    title: "Lex + Connect Overview",
    duration: "00:01:57",
    domain: "Performance",
    description:
      "Lex - chatbots (Alexa technology). Connect - cloud contact center. Integrate for customer service bots.",
  },
  {
    lessonNumber: 251,
    sectionNumber: 23,
    sectionName: "Machine Learning",
    title: "Comprehend Overview",
    duration: "00:01:49",
    domain: "Performance",
    description:
      "Comprehend - NLP (natural language processing). Entity recognition, sentiment analysis, topic modeling.",
  },
  {
    lessonNumber: 252,
    sectionNumber: 23,
    sectionName: "Machine Learning",
    title: "Comprehend Medical Overview",
    duration: "00:02:05",
    domain: "Performance",
    description:
      "Comprehend Medical - healthcare NLP. Extracts medical conditions, medications, protected health information (PHI).",
  },
  {
    lessonNumber: 253,
    sectionNumber: 23,
    sectionName: "Machine Learning",
    title: "SageMaker AI Overview",
    duration: "00:03:30",
    domain: "Performance",
    description:
      "SageMaker - managed ML platform. Build, train, deploy models. Supports Jupyter, built-in algorithms, auto-scaling.",
  },
  {
    lessonNumber: 254,
    sectionNumber: 23,
    sectionName: "Machine Learning",
    title: "Kendra Overview",
    duration: "00:01:23",
    domain: "Performance",
    description:
      "Kendra - intelligent search. Natural language queries, relevance tuning, document indexing from S3, databases.",
  },
  {
    lessonNumber: 255,
    sectionNumber: 23,
    sectionName: "Machine Learning",
    title: "Personalize Overview",
    duration: "00:01:37",
    domain: "Performance",
    description:
      "Personalize - real-time recommendations (Amazon.com technology). E-commerce, content recommendation, personalization.",
  },
  {
    lessonNumber: 256,
    sectionNumber: 23,
    sectionName: "Machine Learning",
    title: "Textract Overview",
    duration: "00:00:57",
    domain: "Performance",
    description:
      "Textract - OCR plus form/table extraction. Detect text, forms, tables from documents. Use for invoices, receipts.",
  },
  {
    lessonNumber: 257,
    sectionNumber: 23,
    sectionName: "Machine Learning",
    title: "Machine Learning Summary",
    duration: "00:01:07",
    domain: "Performance",
    description:
      "ML services summary: Rekognition (vision), Transcribe (speech-to-text), Polly (text-to-speech), Comprehend (NLP).",
  },

  // SECTION 24: AWS Monitoring & Audit (258-275)
  {
    lessonNumber: 258,
    sectionNumber: 24,
    sectionName: "AWS Monitoring & Audit",
    title: "AWS Monitoring - Section Introduction",
    duration: "00:00:39",
    domain: "Security",
    description:
      "Monitoring services: CloudWatch (metrics/logs), CloudTrail (API audit), Config (compliance).",
  },
  {
    lessonNumber: 259,
    sectionNumber: 24,
    sectionName: "AWS Monitoring & Audit",
    title: "CloudWatch Metrics",
    duration: "00:04:10",
    domain: "Security",
    description:
      "CloudWatch Metrics - collect/access metrics from AWS services. Custom metrics (high-resolution, dimensions).",
  },
  {
    lessonNumber: 260,
    sectionNumber: 24,
    sectionName: "AWS Monitoring & Audit",
    title: "CloudWatch Logs",
    duration: "00:06:03",
    domain: "Security",
    description:
      "CloudWatch Logs - store/access log files. Log groups, log streams, metric filters, log retention.",
  },
  {
    lessonNumber: 261,
    sectionNumber: 24,
    sectionName: "AWS Monitoring & Audit",
    title: "CloudWatch Logs - Hands On",
    duration: "00:05:10",
    domain: "Security",
    description:
      "Create log group, install CloudWatch agent on EC2, push logs, create metric filters to monitor errors.",
  },
  {
    lessonNumber: 262,
    sectionNumber: 24,
    sectionName: "AWS Monitoring & Audit",
    title: "CloudWatch Logs - Live Tail - Hands On",
    duration: "00:02:01",
    domain: "Security",
    description:
      "Use Live Tail feature to monitor logs in real-time. Filter by keywords, follow specific log streams.",
  },
  {
    lessonNumber: 263,
    sectionNumber: 24,
    sectionName: "AWS Monitoring & Audit",
    title: "CloudWatch Agent & CloudWatch Logs Agent",
    duration: "00:03:17",
    domain: "Security",
    description:
      "Unified CloudWatch Agent - collect logs and metrics. Replaces older CloudWatch Logs Agent.",
  },
  {
    lessonNumber: 264,
    sectionNumber: 24,
    sectionName: "AWS Monitoring & Audit",
    title: "CloudWatch Alarms",
    duration: "00:04:14",
    domain: "Security",
    description:
      "CloudWatch Alarms - trigger actions based on metric thresholds. States: OK, ALARM, INSUFFICIENT_DATA.",
  },
  {
    lessonNumber: 265,
    sectionNumber: 24,
    sectionName: "AWS Monitoring & Audit",
    title: "CloudWatch Alarms Hands On",
    duration: "00:04:39",
    domain: "Security",
    description:
      "Create CPU utilization alarm for EC2. Configure SNS notification. Test by stressing CPU.",
  },
  {
    lessonNumber: 266,
    sectionNumber: 24,
    sectionName: "AWS Monitoring & Audit",
    title: "CloudWatch Network Synthetic Monitor",
    duration: "00:01:01",
    domain: "Security",
    description:
      "CloudWatch Synthetics - Node.js/Python canaries that simulate user behavior and API calls.",
  },
  {
    lessonNumber: 267,
    sectionNumber: 24,
    sectionName: "AWS Monitoring & Audit",
    title: "EventBridge Overview (formerly CloudWatch Events)",
    duration: "00:07:01",
    domain: "Performance",
    description:
      "EventBridge - serverless event bus. Connect applications using events. Schedule cron jobs, react to AWS events.",
  },
  {
    lessonNumber: 268,
    sectionNumber: 24,
    sectionName: "AWS Monitoring & Audit",
    title: "Amazon EventBridge - Hands On",
    duration: "00:05:59",
    domain: "Performance",
    description:
      "Create EventBridge rule to trigger Lambda on schedule. Configure event bus with custom events.",
  },
  {
    lessonNumber: 269,
    sectionNumber: 24,
    sectionName: "AWS Monitoring & Audit",
    title: "CloudWatch Insights and Operational Visibility",
    duration: "00:05:39",
    domain: "Security",
    description:
      "Container Insights, Lambda Insights, Contributor Insights for performance analysis and troubleshooting.",
  },
  {
    lessonNumber: 270,
    sectionNumber: 24,
    sectionName: "AWS Monitoring & Audit",
    title: "CloudTrail Overview",
    duration: "00:05:43",
    domain: "Security",
    description:
      "CloudTrail - audit API calls in AWS. Recorded in log files. For governance, compliance, operational auditing.",
  },
  {
    lessonNumber: 271,
    sectionNumber: 24,
    sectionName: "AWS Monitoring & Audit",
    title: "CloudTrail Hands On",
    duration: "00:01:31",
    domain: "Security",
    description:
      "Create trail to send logs to S3. Search event history for user activity. Enable multi-region trail.",
  },
  {
    lessonNumber: 272,
    sectionNumber: 24,
    sectionName: "AWS Monitoring & Audit",
    title: "CloudTrail - EventBridge Integration",
    duration: "00:01:39",
    domain: "Security",
    description:
      "Send CloudTrail events to EventBridge. Trigger automated responses (e.g., revoke keys after suspicious activity).",
  },
  {
    lessonNumber: 273,
    sectionNumber: 24,
    sectionName: "AWS Monitoring & Audit",
    title: "AWS Config - Overview",
    duration: "00:04:45",
    domain: "Security",
    description:
      "AWS Config - resource compliance service. Records configuration changes, evaluates against rules, shows compliance history.",
  },
  {
    lessonNumber: 274,
    sectionNumber: 24,
    sectionName: "AWS Monitoring & Audit",
    title: "AWS Config - Hands On",
    duration: "00:09:38",
    domain: "Security",
    description:
      "Enable Config recorder. Create config rules (e.g., S3 bucket public read). View compliance timeline.",
  },
  {
    lessonNumber: 275,
    sectionNumber: 24,
    sectionName: "AWS Monitoring & Audit",
    title: "CloudTrail vs CloudWatch vs Config",
    duration: "00:02:30",
    domain: "Security",
    description:
      "CloudTrail (who did what), CloudWatch (performance/logs), Config (configuration/compliance). All for different purposes.",
  },

  // SECTION 25: Advanced Identity (276-285)
  {
    lessonNumber: 276,
    sectionNumber: 25,
    sectionName: "Advanced Identity",
    title: "Organizations - Overview",
    duration: "00:06:31",
    domain: "Cost",
    description:
      "AWS Organizations - manage multiple accounts. Consolidated billing, aggregated CloudTrail, Service Control Policies (SCPs).",
  },
  {
    lessonNumber: 277,
    sectionNumber: 25,
    sectionName: "Advanced Identity",
    title: "Organizations - Hands On",
    duration: "00:10:00",
    domain: "Cost",
    description:
      "Create organization, invite member accounts. Create OUs, apply SCPs, enable trusted access for services.",
  },
  {
    lessonNumber: 278,
    sectionNumber: 25,
    sectionName: "Advanced Identity",
    title: "Organizations - Tag Policies",
    duration: "00:01:27",
    domain: "Cost",
    description:
      "Tag Policies - standardize resource tagging across organization. Enforce case, allowed values, required tags.",
  },
  {
    lessonNumber: 279,
    sectionNumber: 25,
    sectionName: "Advanced Identity",
    title: "IAM - Advanced Policies",
    duration: "00:04:17",
    domain: "Security",
    description:
      "Advanced IAM policies: Conditions (aws:SourceIp, aws:RequestedRegion), NotAction, NotResource, Policy Variables.",
  },
  {
    lessonNumber: 280,
    sectionNumber: 25,
    sectionName: "Advanced Identity",
    title: "IAM - Resource-based Policies vs IAM Roles",
    duration: "00:03:38",
    domain: "Security",
    description:
      "Resource-based policies (S3 bucket policy) vs IAM Roles (cross-account access). When to use each.",
  },
];

async function main() {
  console.log("🌱 Seeding Part 7: Lessons 241-280...");

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

  console.log(`✅ Part 7 Complete! Inserted ${count} lessons (241-280)`);
  console.log(`📌 Total so far: 280 lessons`);
  console.log("📌 Next: Run part 8 for lessons 281-320");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
