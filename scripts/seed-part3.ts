import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const lessonsPart3 = [
  // SECTION 9: RDS + Aurora + ElastiCache (81-93)
  {
    lessonNumber: 81,
    sectionNumber: 9,
    sectionName: "RDS + Aurora + ElastiCache",
    title: "Amazon RDS Overview",
    duration: "00:03:39",
    domain: "Performance",
    description:
      "Relational Database Service - managed SQL databases. Supports PostgreSQL, MySQL, MariaDB, Oracle, SQL Server. Automated backups, patching, scaling.",
  },
  {
    lessonNumber: 82,
    sectionNumber: 9,
    sectionName: "RDS + Aurora + ElastiCache",
    title: "RDS Read Replicas vs Multi AZ",
    duration: "00:07:23",
    domain: "Resilient",
    description:
      "Read Replicas (scaling reads, up to 5) vs Multi-AZ (disaster recovery, automatic failover). Use cases and limitations.",
  },
  {
    lessonNumber: 83,
    sectionNumber: 9,
    sectionName: "RDS + Aurora + ElastiCache",
    title: "Amazon RDS Hands On",
    duration: "00:08:42",
    domain: "Performance",
    description:
      "Launch RDS database, configure backups and maintenance windows. Connect from EC2 and test read/write operations.",
  },
  {
    lessonNumber: 84,
    sectionNumber: 9,
    sectionName: "RDS + Aurora + ElastiCache",
    title: "RDS Custom for Oracle and Microsoft SQL Server",
    duration: "00:01:50",
    domain: "Performance",
    description:
      "RDS Custom - access to underlying database and operating system. For Oracle and SQL Server, maintain compatibility.",
  },
  {
    lessonNumber: 85,
    sectionNumber: 9,
    sectionName: "RDS + Aurora + ElastiCache",
    title: "Amazon Aurora",
    duration: "00:06:28",
    domain: "Performance",
    description:
      "Aurora - AWS native MySQL/PostgreSQL compatible. 5x performance of MySQL, 3x of PostgreSQL. Auto-scaling storage, 6 copies across 3 AZs.",
  },
  {
    lessonNumber: 86,
    sectionNumber: 9,
    sectionName: "RDS + Aurora + ElastiCache",
    title: "Amazon Aurora - Hands On",
    duration: "00:08:23",
    domain: "Performance",
    description:
      "Launch Aurora cluster, test auto-scaling storage, create read replicas, test failover to reader/writer.",
  },
  {
    lessonNumber: 87,
    sectionNumber: 9,
    sectionName: "RDS + Aurora + ElastiCache",
    title: "Amazon Aurora - Advanced Concepts",
    duration: "00:07:32",
    domain: "Performance",
    description:
      "Aurora Serverless, Aurora Global Database (cross-region replication), Aurora Machine Learning, Backtrack.",
  },
  {
    lessonNumber: 88,
    sectionNumber: 9,
    sectionName: "RDS + Aurora + ElastiCache",
    title: "RDS & Aurora - Backup and Monitoring",
    duration: "00:05:37",
    domain: "Resilient",
    description:
      "Automated backups (7-35 days), manual snapshots, point-in-time recovery. Monitoring with Enhanced Monitoring and Performance Insights.",
  },
  {
    lessonNumber: 89,
    sectionNumber: 9,
    sectionName: "RDS + Aurora + ElastiCache",
    title: "RDS Security",
    duration: "00:02:33",
    domain: "Security",
    description:
      "RDS security: KMS encryption at rest, SSL/TLS in transit, IAM authentication, Security Groups, subnet groups.",
  },
  {
    lessonNumber: 90,
    sectionNumber: 9,
    sectionName: "RDS + Aurora + ElastiCache",
    title: "RDS Proxy",
    duration: "00:04:33",
    domain: "Performance",
    description:
      "RDS Proxy - fully managed database proxy. Improves scalability, reduces failover time (66%), enforces IAM authentication.",
  },
  {
    lessonNumber: 91,
    sectionNumber: 9,
    sectionName: "RDS + Aurora + ElastiCache",
    title: "ElastiCache Overview",
    duration: "00:04:44",
    domain: "Performance",
    description:
      "ElastiCache - managed Redis/Memcached. In-memory cache for read-heavy workloads. Use cases: database query caching, session stores.",
  },
  {
    lessonNumber: 92,
    sectionNumber: 9,
    sectionName: "RDS + Aurora + ElastiCache",
    title: "ElastiCache Hands On",
    duration: "00:05:01",
    domain: "Performance",
    description:
      "Launch ElastiCache cluster, connect from EC2, implement caching pattern for database queries.",
  },
  {
    lessonNumber: 93,
    sectionNumber: 9,
    sectionName: "RDS + Aurora + ElastiCache",
    title: "ElastiCache for Solution Architects",
    duration: "00:03:01",
    domain: "Performance",
    description:
      "Cache strategies: Lazy Loading (cache-aside), Write-Through, Session Store. Cache invalidation patterns.",
  },

  // SECTION 10: Route 53 (94-113)
  {
    lessonNumber: 94,
    sectionNumber: 10,
    sectionName: "Route 53",
    title: "What is a DNS",
    duration: "00:06:25",
    domain: "Resilient",
    description:
      "Domain Name System (DNS) fundamentals: domain hierarchy, DNS records (A, AAAA, CNAME, MX, TXT), name servers, TTL.",
  },
  {
    lessonNumber: 95,
    sectionNumber: 10,
    sectionName: "Route 53",
    title: "Route 53 Overview",
    duration: "00:06:19",
    domain: "Resilient",
    description:
      "Route 53 - AWS DNS service. Features: domain registration, routing policies, health checks, traffic flow.",
  },
  {
    lessonNumber: 96,
    sectionNumber: 10,
    sectionName: "Route 53",
    title: "Route 53 - Registering a domain",
    duration: "00:03:25",
    domain: "Resilient",
    description:
      "Register custom domain names through Route 53. Domain pricing, renewal, transfer options.",
  },
  {
    lessonNumber: 97,
    sectionNumber: 10,
    sectionName: "Route 53",
    title: "Route 53 - Creating our first records",
    duration: "00:03:57",
    domain: "Resilient",
    description:
      "Create A records pointing to EC2 public IPs. Configure CNAME records for subdomains. Test DNS resolution.",
  },
  {
    lessonNumber: 98,
    sectionNumber: 10,
    sectionName: "Route 53",
    title: "Route 53 - EC2 Setup",
    duration: "00:05:41",
    domain: "Resilient",
    description:
      "Launch EC2 instances with web servers, get public IPs, create Route 53 records to route traffic.",
  },
  {
    lessonNumber: 99,
    sectionNumber: 10,
    sectionName: "Route 53",
    title: "Route 53 - TTL",
    duration: "00:05:29",
    domain: "Resilient",
    description:
      "Time To Live (TTL) - how long DNS resolvers cache records. High TTL (stability) vs Low TTL (quick failover).",
  },
  {
    lessonNumber: 100,
    sectionNumber: 10,
    sectionName: "Route 53",
    title: "Route 53 - CNAME vs Alias",
    duration: "00:07:01",
    domain: "Resilient",
    description:
      "CNAME (points domain to any hostname) vs Alias (points to AWS resources, free, health checks supported).",
  },
  {
    lessonNumber: 101,
    sectionNumber: 10,
    sectionName: "Route 53",
    title: "Routing Policy - Simple",
    duration: "00:04:06",
    domain: "Resilient",
    description:
      "Simple Routing Policy - route to single resource. No health checks, multiple values returned in random order.",
  },
  {
    lessonNumber: 102,
    sectionNumber: 10,
    sectionName: "Route 53",
    title: "Routing Policy - Weighted",
    duration: "00:05:03",
    domain: "Resilient",
    description:
      "Weighted Routing - distribute traffic based on weights (e.g., 10% to new version, 90% to stable).",
  },
  {
    lessonNumber: 103,
    sectionNumber: 10,
    sectionName: "Route 53",
    title: "Routing Policy - Latency",
    duration: "00:04:40",
    domain: "Resilient",
    description:
      "Latency-based Routing - route users to region with lowest latency. Improve global application performance.",
  },
  {
    lessonNumber: 104,
    sectionNumber: 10,
    sectionName: "Route 53",
    title: "Route 53 - Health Checks",
    duration: "00:04:55",
    domain: "Resilient",
    description:
      "Health Checks - monitor endpoint health (HTTP, TCP, HTTPS). Integrated with CloudWatch alarms, trigger failover.",
  },
  {
    lessonNumber: 105,
    sectionNumber: 10,
    sectionName: "Route 53",
    title: "Route 53 - Health Checks Hands On",
    duration: "00:04:40",
    domain: "Resilient",
    description:
      "Create health checks for EC2 instances, configure CloudWatch alarms on health check status.",
  },
  {
    lessonNumber: 106,
    sectionNumber: 10,
    sectionName: "Route 53",
    title: "Routing Policy - Failover",
    duration: "00:04:13",
    domain: "Resilient",
    description:
      "Active-Passive failover - primary resource with health check, secondary backup. Automatic failover.",
  },
  {
    lessonNumber: 107,
    sectionNumber: 10,
    sectionName: "Route 53",
    title: "Routing Policy - Geolocation",
    duration: "00:04:16",
    domain: "Resilient",
    description:
      "Geolocation Routing - route based on user's geographic location (continent, country, state).",
  },
  {
    lessonNumber: 108,
    sectionNumber: 10,
    sectionName: "Route 53",
    title: "Routing Policy - Geoproximity",
    duration: "00:03:22",
    domain: "Resilient",
    description:
      "Geoproximity Routing - shift traffic based on geographic distance. Use bias to expand/shrink traffic areas.",
  },
  {
    lessonNumber: 109,
    sectionNumber: 10,
    sectionName: "Route 53",
    title: "Routing Policy - IP-based",
    duration: "00:01:46",
    domain: "Resilient",
    description:
      "IP-based Routing - route based on client IP address ranges. Use cases: allow/block certain CIDR blocks.",
  },
  {
    lessonNumber: 110,
    sectionNumber: 10,
    sectionName: "Route 53",
    title: "Routing Policy - Multi Value",
    duration: "00:03:43",
    domain: "Resilient",
    description:
      "Multi-Value Routing - route to multiple resources (up to 8). Works with health checks, only return healthy IPs.",
  },
  {
    lessonNumber: 111,
    sectionNumber: 10,
    sectionName: "Route 53",
    title: "3rd Party Domains & Route 53",
    duration: "00:02:25",
    domain: "Resilient",
    description:
      "Using Route 53 with domains registered elsewhere (GoDaddy, Namecheap). Update NS records to delegate.",
  },
  {
    lessonNumber: 112,
    sectionNumber: 10,
    sectionName: "Route 53",
    title: "Route 53 Resolvers & Hybrid DNS",
    duration: "00:02:57",
    domain: "Resilient",
    description:
      "Route 53 Resolver - hybrid DNS between AWS and on-premises. Conditional forwarding rules.",
  },
  {
    lessonNumber: 113,
    sectionNumber: 10,
    sectionName: "Route 53",
    title: "Route 53 - Section Cleanup",
    duration: "00:01:22",
    domain: "Resilient",
    description:
      "Clean up Route 53 records, hosted zones, and health checks to avoid charges.",
  },

  // SECTION 11: Classic Solutions Architecture (114-120)
  {
    lessonNumber: 114,
    sectionNumber: 11,
    sectionName: "Classic Solutions Architecture",
    title: "Solutions Architecture Discussions Overview",
    duration: "00:01:13",
    domain: "Resilient",
    description:
      "Applying AWS services to real-world architectural problems. Design patterns, trade-offs, and best practices.",
  },
  {
    lessonNumber: 115,
    sectionNumber: 11,
    sectionName: "Classic Solutions Architecture",
    title: "WhatsTheTime.com",
    duration: "00:11:14",
    domain: "Resilient",
    description:
      "Architecture for a simple time website. Discuss: EC2 vs Serverless, scalability, cost optimization.",
  },
  {
    lessonNumber: 116,
    sectionNumber: 11,
    sectionName: "Classic Solutions Architecture",
    title: "MyClothes.com",
    duration: "00:09:39",
    domain: "Resilient",
    description:
      "E-commerce architecture with stateless web tier, stateful database tier, caching, CDN, auto scaling.",
  },
  {
    lessonNumber: 117,
    sectionNumber: 11,
    sectionName: "Classic Solutions Architecture",
    title: "MyWordPress.com",
    duration: "00:04:38",
    domain: "Resilient",
    description:
      "WordPress hosting architecture: RDS for database, EFS for shared uploads, CloudFront for CDN.",
  },
  {
    lessonNumber: 118,
    sectionNumber: 11,
    sectionName: "Classic Solutions Architecture",
    title: "Instantiating applications quickly",
    duration: "00:02:55",
    domain: "Resilient",
    description:
      "Quick deployment options: EC2 User Data, AMIs, Beanstalk, CloudFormation.",
  },
  {
    lessonNumber: 119,
    sectionNumber: 11,
    sectionName: "Classic Solutions Architecture",
    title: "Beanstalk Overview",
    duration: "00:05:11",
    domain: "Resilient",
    description:
      "Elastic Beanstalk - PaaS for web applications. Auto-scaling, load balancing, monitoring built-in.",
  },
  {
    lessonNumber: 120,
    sectionNumber: 11,
    sectionName: "Classic Solutions Architecture",
    title: "Beanstalk Hands On",
    duration: "00:08:22",
    domain: "Resilient",
    description:
      "Deploy sample application using Beanstalk. Customize environment, update versions, rollback.",
  },
];

async function main() {
  console.log("🌱 Seeding Part 3: Lessons 81-120...");

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

  console.log(`✅ Part 3 Complete! Inserted ${count} lessons (81-120)`);
  console.log(`📌 Total so far: 120 lessons`);
  console.log("📌 Next: Run part 4 for lessons 121-160");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
