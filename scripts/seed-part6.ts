import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const lessonsPart6 = [
  // SECTION 18: Containers on AWS (continued from 201)
  {
    lessonNumber: 201,
    sectionNumber: 18,
    sectionName: "Containers on AWS",
    title: "AWS App Runner - Hands On",
    duration: "00:04:00",
    domain: "Performance",
    description:
      "Deploy application to App Runner from source code. Configure auto-scaling, connect to database.",
  },
  {
    lessonNumber: 202,
    sectionNumber: 18,
    sectionName: "Containers on AWS",
    title: "AWS App2Container",
    duration: "00:01:43",
    domain: "Performance",
    description:
      "App2Container - lift and shift tool to containerize .NET and Java applications without code changes.",
  },

  // SECTION 19: Serverless (203-219)
  {
    lessonNumber: 203,
    sectionNumber: 19,
    sectionName: "Serverless",
    title: "Serverless Introduction",
    duration: "00:02:20",
    domain: "Performance",
    description:
      "Serverless = no server management. Pay per execution, auto-scaling, high availability. Lambda, API Gateway, DynamoDB.",
  },
  {
    lessonNumber: 204,
    sectionNumber: 19,
    sectionName: "Serverless",
    title: "Lambda Overview",
    duration: "00:07:09",
    domain: "Performance",
    description:
      "AWS Lambda - FaaS (Function as a Service). Supports Node.js, Python, Java, Go, C#, Ruby. Triggers: API Gateway, S3, DynamoDB, SQS, CloudWatch.",
  },
  {
    lessonNumber: 205,
    sectionNumber: 19,
    sectionName: "Serverless",
    title: "Lambda Hands-On",
    duration: "00:06:38",
    domain: "Performance",
    description:
      "Create Lambda function using console. Write Python/Node.js code. Test with test events. View CloudWatch logs.",
  },
  {
    lessonNumber: 206,
    sectionNumber: 19,
    sectionName: "Serverless",
    title: "Lambda Limits",
    duration: "00:01:45",
    domain: "Performance",
    description:
      "Lambda limits: 15 min timeout, 10GB memory (CPU proportional), 5MB request, 512MB disk (/tmp), 1000 concurrent executions (soft limit).",
  },
  {
    lessonNumber: 207,
    sectionNumber: 19,
    sectionName: "Serverless",
    title: "Lambda Concurrency",
    duration: "00:06:02",
    domain: "Performance",
    description:
      "Concurrency limits: Reserved Concurrency (guaranteed capacity), Provisioned Concurrency (no cold starts). Throttling behavior.",
  },
  {
    lessonNumber: 208,
    sectionNumber: 19,
    sectionName: "Serverless",
    title: "Lambda Concurrency - Hands On",
    duration: "00:02:40",
    domain: "Performance",
    description:
      "Configure reserved and provisioned concurrency. Monitor concurrency metrics in CloudWatch.",
  },
  {
    lessonNumber: 209,
    sectionNumber: 19,
    sectionName: "Serverless",
    title: "Lambda SnapStart",
    duration: "00:01:22",
    domain: "Performance",
    description:
      "Lambda SnapStart (Java only) - improve cold start performance from 5-10 seconds to sub-second.",
  },
  {
    lessonNumber: 210,
    sectionNumber: 19,
    sectionName: "Serverless",
    title: "Lambda@Edge & CloudFront Functions",
    duration: "00:05:39",
    domain: "Performance",
    description:
      "Lambda@Edge (Node.js/Python) - run Lambda at CloudFront edge locations. CloudFront Functions (JavaScript) - lightweight edge functions.",
  },
  {
    lessonNumber: 211,
    sectionNumber: 19,
    sectionName: "Serverless",
    title: "Lambda in VPC",
    duration: "00:03:13",
    domain: "Security",
    description:
      "Lambda in VPC - access private resources (RDS, ElastiCache). Requires ENI, cannot reach internet without NAT Gateway.",
  },
  {
    lessonNumber: 212,
    sectionNumber: 19,
    sectionName: "Serverless",
    title: "RDS - Invoking Lambda & Event Notifications",
    duration: "00:02:36",
    domain: "Performance",
    description:
      "RDS event notifications to Lambda (performance insights, backups). For complex business logic, use before/after triggers.",
  },
  {
    lessonNumber: 213,
    sectionNumber: 19,
    sectionName: "Serverless",
    title: "Amazon DynamoDB",
    duration: "00:05:23",
    domain: "Performance",
    description:
      "DynamoDB - NoSQL database. Single-digit millisecond latency. Supports both document and key-value. Auto-scaling, on-demand capacity.",
  },
  {
    lessonNumber: 214,
    sectionNumber: 19,
    sectionName: "Serverless",
    title: "Amazon DynamoDB - Hands-On",
    duration: "00:04:48",
    domain: "Performance",
    description:
      "Create DynamoDB table, add items, query by partition key, scan with filter. Configure capacity modes.",
  },
  {
    lessonNumber: 215,
    sectionNumber: 19,
    sectionName: "Serverless",
    title: "Amazon DynamoDB - Advanced Features",
    duration: "00:08:35",
    domain: "Performance",
    description:
      "DAX (cache), DynamoDB Streams (CDC), Global Tables (multi-region), TTL (expiration), Transactions (ACID).",
  },
  {
    lessonNumber: 216,
    sectionNumber: 19,
    sectionName: "Serverless",
    title: "API Gateway Overview",
    duration: "00:06:38",
    domain: "Performance",
    description:
      "API Gateway - create REST/HTTP/WebSocket APIs. Features: throttling, caching, API keys, request validation, transformation.",
  },
  {
    lessonNumber: 217,
    sectionNumber: 19,
    sectionName: "Serverless",
    title: "API Gateway Basics Hands-On",
    duration: "00:10:20",
    domain: "Performance",
    description:
      "Create REST API, resources, methods. Integrate with Lambda. Test using API endpoint. Enable CloudWatch logs.",
  },
  {
    lessonNumber: 218,
    sectionNumber: 19,
    sectionName: "Serverless",
    title: "Step Functions",
    duration: "00:01:33",
    domain: "Performance",
    description:
      "Step Functions - visual workflow to coordinate Lambda functions. Standard (long-running) vs Express (high-volume).",
  },
  {
    lessonNumber: 219,
    sectionNumber: 19,
    sectionName: "Serverless",
    title: "Amazon Cognito Overview",
    duration: "00:06:33",
    domain: "Security",
    description:
      "Cognito - identity platform. User Pools (user directory, sign-up/in), Identity Pools (AWS credentials). Integrates with API Gateway.",
  },

  // SECTION 20: Serverless Architectures (220-223)
  {
    lessonNumber: 220,
    sectionNumber: 20,
    sectionName: "Serverless Architectures",
    title: "Mobile Application MyTodoList",
    duration: "00:04:46",
    domain: "Resilient",
    description:
      "Serverless mobile app architecture: Cognito (auth), API Gateway + Lambda (backend), DynamoDB (database).",
  },
  {
    lessonNumber: 221,
    sectionNumber: 20,
    sectionName: "Serverless Architectures",
    title: "Serverless Website MyBlog.com",
    duration: "00:05:39",
    domain: "Resilient",
    description:
      "Serverless website: S3 (hosting), CloudFront (CDN), API Gateway + Lambda (dynamic content), DynamoDB (storage).",
  },
  {
    lessonNumber: 222,
    sectionNumber: 20,
    sectionName: "Serverless Architectures",
    title: "MicroServices Architecture",
    duration: "00:03:53",
    domain: "Resilient",
    description:
      "Microservices patterns: API Gateway as entry point, Lambda functions per service, DynamoDB per service (or shared).",
  },
  {
    lessonNumber: 223,
    sectionNumber: 20,
    sectionName: "Serverless Architectures",
    title: "Software updates distribution",
    duration: "00:02:10",
    domain: "Resilient",
    description:
      "Software distribution: S3 for artifacts, CloudFront for CDN, Lambda for license validation.",
  },

  // SECTION 21: Databases in AWS (224-233)
  {
    lessonNumber: 224,
    sectionNumber: 21,
    sectionName: "Databases in AWS",
    title: "Choosing the right database",
    duration: "00:03:22",
    domain: "Performance",
    description:
      "Database selection: RDS (relational, joins), DynamoDB (NoSQL, key-value), Aurora (MySQL/PostgreSQL), Redshift (analytics), ElastiCache (cache).",
  },
  {
    lessonNumber: 225,
    sectionNumber: 21,
    sectionName: "Databases in AWS",
    title: "RDS",
    duration: "00:02:50",
    domain: "Performance",
    description:
      "RDS use cases: traditional apps, CRM, ERP, e-commerce where relationships and ACID transactions matter.",
  },
  {
    lessonNumber: 226,
    sectionNumber: 21,
    sectionName: "Databases in AWS",
    title: "Aurora",
    duration: "00:02:42",
    domain: "Performance",
    description:
      "Aurora use cases: high-performance MySQL/PostgreSQL, global databases, serverless workloads.",
  },
  {
    lessonNumber: 227,
    sectionNumber: 21,
    sectionName: "Databases in AWS",
    title: "ElastiCache",
    duration: "00:01:44",
    domain: "Performance",
    description:
      "ElastiCache use cases: database query caching, session store, leaderboards (Redis Sorted Sets).",
  },
  {
    lessonNumber: 228,
    sectionNumber: 21,
    sectionName: "Databases in AWS",
    title: "DynamoDB",
    duration: "00:03:44",
    domain: "Performance",
    description:
      "DynamoDB use cases: serverless apps, high-traffic web apps, gaming leaderboards, IoT data, real-time bidding.",
  },
  {
    lessonNumber: 229,
    sectionNumber: 21,
    sectionName: "Databases in AWS",
    title: "S3",
    duration: "00:02:51",
    domain: "Cost",
    description:
      "S3 as database: static data, JSON/CSV files, data lakes. Not suitable for frequent updates or complex queries.",
  },
  {
    lessonNumber: 230,
    sectionNumber: 21,
    sectionName: "Databases in AWS",
    title: "DocumentDB",
    duration: "00:01:16",
    domain: "Performance",
    description:
      "DocumentDB - MongoDB-compatible document database. For JSON data, nested structures, agile schemas.",
  },
  {
    lessonNumber: 231,
    sectionNumber: 21,
    sectionName: "Databases in AWS",
    title: "Neptune",
    duration: "00:02:55",
    domain: "Performance",
    description:
      "Neptune - graph database. For social networks, recommendation engines, fraud detection, knowledge graphs.",
  },
  {
    lessonNumber: 232,
    sectionNumber: 21,
    sectionName: "Databases in AWS",
    title: "Keyspaces (for Apache Cassandra)",
    duration: "00:01:23",
    domain: "Performance",
    description:
      "Keyspaces - Cassandra-compatible database. For high-throughput, partition-based workloads (time-series, IoT).",
  },
  {
    lessonNumber: 233,
    sectionNumber: 21,
    sectionName: "Databases in AWS",
    title: "Timestream",
    duration: "00:02:18",
    domain: "Performance",
    description:
      "Timestream - time-series database. For IoT, DevOps monitoring, application telemetry. Automatically scales.",
  },

  // SECTION 22: Data & Analytics (234-245)
  {
    lessonNumber: 234,
    sectionNumber: 22,
    sectionName: "Data & Analytics",
    title: "Athena",
    duration: "00:05:28",
    domain: "Cost",
    description:
      "Athena - serverless query service for S3 data using SQL (Presto). Pay per query. For ad-hoc analytics, logs, CSV/JSON/Parquet.",
  },
  {
    lessonNumber: 235,
    sectionNumber: 22,
    sectionName: "Data & Analytics",
    title: "Athena Hands On",
    duration: "00:05:44",
    domain: "Cost",
    description:
      "Create Athena table on S3 data. Run SQL queries. Use partition projection for performance. Save results to S3.",
  },
  {
    lessonNumber: 236,
    sectionNumber: 22,
    sectionName: "Data & Analytics",
    title: "Redshift",
    duration: "00:06:46",
    domain: "Performance",
    description:
      "Redshift - columnar data warehouse. Massively parallel processing (MPP). For BI reports, analytics, data aggregation.",
  },
  {
    lessonNumber: 237,
    sectionNumber: 22,
    sectionName: "Data & Analytics",
    title: "OpenSearch (ex ElasticSearch)",
    duration: "00:03:52",
    domain: "Performance",
    description:
      "OpenSearch - search and analytics engine. For log analytics, full-text search, application monitoring (ELK stack).",
  },
  {
    lessonNumber: 238,
    sectionNumber: 22,
    sectionName: "Data & Analytics",
    title: "EMR",
    duration: "00:02:48",
    domain: "Performance",
    description:
      "EMR - managed Hadoop/Spark cluster. For big data processing (ETL), machine learning, data transformation.",
  },
  {
    lessonNumber: 239,
    sectionNumber: 22,
    sectionName: "Data & Analytics",
    title: "QuickSight",
    duration: "00:04:00",
    domain: "Cost",
    description:
      "QuickSight - serverless BI dashboard. Connect to RDS, Redshift, Athena, S3. ML insights (forecasting, anomalies).",
  },
  {
    lessonNumber: 240,
    sectionNumber: 22,
    sectionName: "Data & Analytics",
    title: "Glue",
    duration: "00:04:05",
    domain: "Cost",
    description:
      "Glue - serverless ETL service. Data catalog, crawlers, Python/Scala jobs. Prepares data for analytics.",
  },
];

async function main() {
  console.log("🌱 Seeding Part 6: Lessons 201-240...");

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

  console.log(`✅ Part 6 Complete! Inserted ${count} lessons (201-240)`);
  console.log(`📌 Total so far: 240 lessons`);
  console.log("📌 Next: Run part 7 for lessons 241-280");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
