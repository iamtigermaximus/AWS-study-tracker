import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const lessonsPart4 = [
  // SECTION 12-13: S3 Fundamentals (121-135)
  {
    lessonNumber: 121,
    sectionNumber: 12,
    sectionName: "S3 Fundamentals",
    title: "S3 Overview",
    duration: "00:05:07",
    domain: "Foundation",
    description:
      "Amazon S3 - object storage for any data type. Key concepts: Buckets (containers), Objects (files), Keys (paths). Unlimited storage, 5TB max per object.",
  },
  {
    lessonNumber: 122,
    sectionNumber: 12,
    sectionName: "S3 Fundamentals",
    title: "S3 Hands On",
    duration: "00:07:03",
    domain: "Foundation",
    description:
      "Create S3 buckets, upload objects, set object properties, enable versioning, configure public access.",
  },
  {
    lessonNumber: 123,
    sectionNumber: 12,
    sectionName: "S3 Fundamentals",
    title: "S3 Security Bucket Policy",
    duration: "00:05:04",
    domain: "Security",
    description:
      "S3 bucket policies - resource-based IAM policies. Control access at bucket level. Cross-account access, public buckets.",
  },
  {
    lessonNumber: 124,
    sectionNumber: 12,
    sectionName: "S3 Fundamentals",
    title: "S3 Security Bucket Policy Hands On",
    duration: "00:03:17",
    domain: "Security",
    description:
      "Write bucket policies for specific IP addresses, VPC endpoints, cross-account access.",
  },
  {
    lessonNumber: 125,
    sectionNumber: 12,
    sectionName: "S3 Fundamentals",
    title: "S3 Website Overview",
    duration: "00:01:08",
    domain: "Foundation",
    description:
      "Host static websites on S3. Index document, error document, custom error pages, redirection rules.",
  },
  {
    lessonNumber: 126,
    sectionNumber: 12,
    sectionName: "S3 Fundamentals",
    title: "S3 Website Hands On",
    duration: "00:01:59",
    domain: "Foundation",
    description:
      "Configure S3 bucket for static website hosting. Upload HTML/CSS/JS and access via bucket endpoint.",
  },
  {
    lessonNumber: 127,
    sectionNumber: 12,
    sectionName: "S3 Fundamentals",
    title: "S3 Versioning",
    duration: "00:01:14",
    domain: "Foundation",
    description:
      "S3 Versioning - keep multiple versions of objects. Protect against accidental deletes/overwrites.",
  },
  {
    lessonNumber: 128,
    sectionNumber: 12,
    sectionName: "S3 Fundamentals",
    title: "S3 Versioning - Hands On",
    duration: "00:04:18",
    domain: "Foundation",
    description:
      "Enable versioning, upload new versions, delete objects (add delete markers), restore previous versions.",
  },
  {
    lessonNumber: 129,
    sectionNumber: 12,
    sectionName: "S3 Fundamentals",
    title: "S3 Replication",
    duration: "00:01:26",
    domain: "Resilient",
    description:
      "S3 Replication - replicate objects across buckets (same/different regions). Compliance, latency, disaster recovery.",
  },
  {
    lessonNumber: 130,
    sectionNumber: 12,
    sectionName: "S3 Fundamentals",
    title: "S3 Replication Notes",
    duration: "00:00:58",
    domain: "Resilient",
    description:
      "Important notes: replication requires versioning, existing objects not replicated by default.",
  },
  {
    lessonNumber: 131,
    sectionNumber: 12,
    sectionName: "S3 Fundamentals",
    title: "S3 Replication - Hands On",
    duration: "00:06:30",
    domain: "Resilient",
    description:
      "Configure cross-region replication (CRR), same-region replication (SRR). Test with IAM roles.",
  },
  {
    lessonNumber: 132,
    sectionNumber: 12,
    sectionName: "S3 Fundamentals",
    title: "S3 Storage Classes Overview",
    duration: "00:06:13",
    domain: "Cost",
    description:
      "S3 storage tiers: Standard, Intelligent-Tiering, Standard-IA, One Zone-IA, Glacier Instant, Glacier Flexible, Glacier Deep Archive.",
  },
  {
    lessonNumber: 133,
    sectionNumber: 12,
    sectionName: "S3 Fundamentals",
    title: "S3 Storage Classes Hands On",
    duration: "00:03:38",
    domain: "Cost",
    description:
      "Upload objects with different storage classes, check storage class property, modify using lifecycle rules.",
  },
  {
    lessonNumber: 134,
    sectionNumber: 12,
    sectionName: "S3 Fundamentals",
    title: "S3 Express One Zone",
    duration: "00:01:51",
    domain: "Cost",
    description:
      "S3 Express One Zone - highest performance storage class (microsecond latency). Single AZ, great for frequently accessed data.",
  },
  {
    lessonNumber: 135,
    sectionNumber: 13,
    sectionName: "Advanced S3",
    title: "S3 Lifecycle Rules (with S3 Analytics)",
    duration: "00:04:21",
    domain: "Cost",
    description:
      "Lifecycle rules: transition objects to cheaper tiers after X days, expire objects (delete). S3 Analytics for recommendations.",
  },
  {
    lessonNumber: 136,
    sectionNumber: 13,
    sectionName: "Advanced S3",
    title: "S3 Lifecycle Rules - Hands On",
    duration: "00:02:25",
    domain: "Cost",
    description:
      "Create lifecycle rules to transition objects to Glacier after 30 days, delete after 365 days.",
  },
  {
    lessonNumber: 137,
    sectionNumber: 13,
    sectionName: "Advanced S3",
    title: "S3 Requester Pays",
    duration: "00:01:39",
    domain: "Cost",
    description:
      "Requester Pays buckets - requester pays for requests and data transfer. For large datasets shared publicly.",
  },
  {
    lessonNumber: 138,
    sectionNumber: 13,
    sectionName: "Advanced S3",
    title: "S3 Event Notifications",
    duration: "00:03:31",
    domain: "Performance",
    description:
      "S3 Event Notifications - trigger actions on object creation, deletion, restore. Targets: SQS, SNS, Lambda.",
  },
  {
    lessonNumber: 139,
    sectionNumber: 13,
    sectionName: "Advanced S3",
    title: "S3 Event Notifications - Hands On",
    duration: "00:05:43",
    domain: "Performance",
    description:
      "Configure S3 event notification to SQS. Upload file, verify message in queue.",
  },
  {
    lessonNumber: 140,
    sectionNumber: 13,
    sectionName: "Advanced S3",
    title: "S3 Performance",
    duration: "00:04:54",
    domain: "Performance",
    description:
      "S3 performance: 3500 PUT/COPY/POST/DELETE requests per second, 5500 GET/HEAD per second. Use prefixes to increase performance.",
  },
  {
    lessonNumber: 141,
    sectionNumber: 13,
    sectionName: "Advanced S3",
    title: "S3 Batch Operations",
    duration: "00:02:02",
    domain: "Performance",
    description:
      "S3 Batch Operations - perform bulk actions (copy, tag, restore) on millions of objects using a single request.",
  },
  {
    lessonNumber: 142,
    sectionNumber: 13,
    sectionName: "Advanced S3",
    title: "S3 Storage Lens",
    duration: "00:05:39",
    domain: "Cost",
    description:
      "S3 Storage Lens - organization-wide visibility into S3 storage usage and activity trends. Metrics and recommendations.",
  },

  // SECTION 14: S3 Security & Encryption (143-156)
  {
    lessonNumber: 143,
    sectionNumber: 14,
    sectionName: "S3 Security",
    title: "S3 Encryption",
    duration: "00:07:32",
    domain: "Security",
    description:
      "S3 encryption options: SSE-S3 (AES-256), SSE-KMS (KMS integration), SSE-C (customer-provided keys), Client-side encryption.",
  },
  {
    lessonNumber: 144,
    sectionNumber: 14,
    sectionName: "S3 Security",
    title: "S3 Encryption - Hands On",
    duration: "00:04:56",
    domain: "Security",
    description:
      "Enable default encryption on bucket. Upload encrypted objects using different encryption methods.",
  },
  {
    lessonNumber: 145,
    sectionNumber: 14,
    sectionName: "S3 Security",
    title: "S3 Default Encryption",
    duration: "00:01:24",
    domain: "Security",
    description:
      "Default encryption - automatically encrypt all objects uploaded to bucket. Use SSE-S3 or SSE-KMS.",
  },
  {
    lessonNumber: 146,
    sectionNumber: 14,
    sectionName: "S3 Security",
    title: "S3 CORS",
    duration: "00:04:20",
    domain: "Security",
    description:
      "CORS (Cross-Origin Resource Sharing) - allow web applications from one domain to access S3 resources from another domain.",
  },
  {
    lessonNumber: 147,
    sectionNumber: 14,
    sectionName: "S3 Security",
    title: "S3 CORS Hands On",
    duration: "00:07:24",
    domain: "Security",
    description:
      "Configure CORS rules on S3 bucket. Test cross-origin requests from different domains.",
  },
  {
    lessonNumber: 148,
    sectionNumber: 14,
    sectionName: "S3 Security",
    title: "S3 MFA Delete",
    duration: "00:01:25",
    domain: "Security",
    description:
      "MFA Delete - require MFA to permanently delete object versions or suspend versioning on bucket.",
  },
  {
    lessonNumber: 149,
    sectionNumber: 14,
    sectionName: "S3 Security",
    title: "S3 MFA Delete Hands On",
    duration: "00:06:26",
    domain: "Security",
    description:
      "Enable MFA Delete using AWS CLI (cannot be done in console). Test with and without MFA.",
  },
  {
    lessonNumber: 150,
    sectionNumber: 14,
    sectionName: "S3 Security",
    title: "S3 Access Logs",
    duration: "00:01:17",
    domain: "Security",
    description:
      "S3 Access Logs - detailed records of requests made to S3 bucket. Log to another bucket for analysis.",
  },
  {
    lessonNumber: 151,
    sectionNumber: 14,
    sectionName: "S3 Security",
    title: "S3 Access Logs - Hands On",
    duration: "00:03:34",
    domain: "Security",
    description:
      "Enable access logging on bucket. Make requests, check log files in target bucket.",
  },
  {
    lessonNumber: 152,
    sectionNumber: 14,
    sectionName: "S3 Security",
    title: "S3 Pre-signed URLs",
    duration: "00:01:51",
    domain: "Security",
    description:
      "Pre-signed URLs - grant temporary access to private S3 objects. Generate via AWS CLI or SDK.",
  },
  {
    lessonNumber: 153,
    sectionNumber: 14,
    sectionName: "S3 Security",
    title: "S3 Pre-signed URLs - Hands On",
    duration: "00:01:49",
    domain: "Security",
    description:
      "Generate pre-signed URL for private object. Test access with and without URL expiration.",
  },
  {
    lessonNumber: 154,
    sectionNumber: 14,
    sectionName: "S3 Security",
    title: "Glacier Vault Lock & S3 Object Lock",
    duration: "00:04:14",
    domain: "Security",
    description:
      "Glacier Vault Lock (WORM storage for compliance). S3 Object Lock (retention periods, legal holds).",
  },
  {
    lessonNumber: 155,
    sectionNumber: 14,
    sectionName: "S3 Security",
    title: "S3 Access Points",
    duration: "00:03:35",
    domain: "Security",
    description:
      "S3 Access Points - simplify access management for large buckets with different permission sets for each application.",
  },
  {
    lessonNumber: 156,
    sectionNumber: 14,
    sectionName: "S3 Security",
    title: "S3 Object Lambda",
    duration: "00:03:12",
    domain: "Performance",
    description:
      "S3 Object Lambda - modify data returned by S3 GET requests using Lambda functions (add watermarks, redact PII).",
  },

  // SECTION 15: CloudFront & Global Accelerator (157-163)
  {
    lessonNumber: 157,
    sectionNumber: 15,
    sectionName: "CloudFront & Global Accelerator",
    title: "CloudFront Overview",
    duration: "00:05:23",
    domain: "Performance",
    description:
      "CloudFront - CDN with 400+ edge locations. Caches content at edge for low latency. Supports S3, ALB, EC2 origins.",
  },
  {
    lessonNumber: 158,
    sectionNumber: 15,
    sectionName: "CloudFront & Global Accelerator",
    title: "CloudFront with S3 - Hands On",
    duration: "00:05:39",
    domain: "Performance",
    description:
      "Create CloudFront distribution pointing to S3 bucket. Test cache behavior and invalidation.",
  },
  {
    lessonNumber: 159,
    sectionNumber: 15,
    sectionName: "CloudFront & Global Accelerator",
    title: "CloudFront - ALB/EC2 as an Origin",
    duration: "00:02:37",
    domain: "Performance",
    description:
      "Configure CloudFront with ALB or EC2 origin. Add custom origin headers.",
  },
  {
    lessonNumber: 160,
    sectionNumber: 15,
    sectionName: "CloudFront & Global Accelerator",
    title: "CloudFront - Geo Restriction",
    duration: "00:01:40",
    domain: "Security",
    description:
      "Geo Restriction - allow or block users from specific countries using CloudFront geo-ip feature.",
  },
];

async function main() {
  console.log("🌱 Seeding Part 4: Lessons 121-160...");

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

  console.log(`✅ Part 4 Complete! Inserted ${count} lessons (121-160)`);
  console.log(`📌 Total so far: 160 lessons`);
  console.log("📌 Next: Run part 5 for lessons 161-200");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
