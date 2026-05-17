import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const lessonsPart10 = [
  // SECTION 30: Other Services (continued from 361)
  {
    lessonNumber: 361,
    sectionNumber: 30,
    sectionName: "Other Services",
    title: "CloudFormation Intro",
    duration: "00:03:32",
    domain: "Foundation",
    description:
      "CloudFormation - Infrastructure as Code (IaC). Create AWS resources using YAML/JSON templates. Repeatable, version-controlled infrastructure.",
  },
  {
    lessonNumber: 362,
    sectionNumber: 30,
    sectionName: "Other Services",
    title: "CloudFormation - Hands On",
    duration: "00:08:33",
    domain: "Foundation",
    description:
      "Write CloudFormation template (YAML), create stack via console. Update stack, delete resources automatically.",
  },
  {
    lessonNumber: 363,
    sectionNumber: 30,
    sectionName: "Other Services",
    title: "CloudFormation - Service Role",
    duration: "00:03:22",
    domain: "Security",
    description:
      "CloudFormation service role - IAM role for CloudFormation to make API calls. Least privilege for stack operations.",
  },
  {
    lessonNumber: 364,
    sectionNumber: 30,
    sectionName: "Other Services",
    title: "Amazon SES",
    duration: "00:01:21",
    domain: "Performance",
    description:
      "SES (Simple Email Service) - email sending/receiving. For marketing, transactional emails, notifications.",
  },
  {
    lessonNumber: 365,
    sectionNumber: 30,
    sectionName: "Other Services",
    title: "Amazon Pinpoint",
    duration: "00:01:53",
    domain: "Performance",
    description:
      "Pinpoint - customer engagement platform. Email, SMS, push notifications. For marketing campaigns, user segmentation.",
  },
  {
    lessonNumber: 366,
    sectionNumber: 30,
    sectionName: "Other Services",
    title: "SSM Session Manager",
    duration: "00:05:46",
    domain: "Security",
    description:
      "Session Manager - access EC2 via browser without SSH. No open ports, no bastion host. Uses Systems Manager agent.",
  },
  {
    lessonNumber: 367,
    sectionNumber: 30,
    sectionName: "Other Services",
    title: "SSM Other Services",
    duration: "00:04:32",
    domain: "Performance",
    description:
      "SSM features: Run Command (execute scripts), Patch Manager (automated patching), Inventory (software collection).",
  },
  {
    lessonNumber: 368,
    sectionNumber: 30,
    sectionName: "Other Services",
    title: "AWS Cost Explorer",
    duration: "00:02:10",
    domain: "Cost",
    description:
      "Cost Explorer - visualize, understand, manage AWS costs. Filters by service, region, tag. Forecast future costs.",
  },
  {
    lessonNumber: 369,
    sectionNumber: 30,
    sectionName: "Other Services",
    title: "AWS Cost Anomaly Detection",
    duration: "00:01:11",
    domain: "Cost",
    description:
      "Cost Anomaly Detection - ML to detect unusual spending. Alert on unexpected cost spikes. Integrates with SNS.",
  },
  {
    lessonNumber: 370,
    sectionNumber: 30,
    sectionName: "Other Services",
    title: "AWS Outposts",
    duration: "00:02:39",
    domain: "Cost",
    description:
      "Outposts - run AWS services in on-premises data center. Hybrid cloud, low latency workloads, data residency.",
  },
  {
    lessonNumber: 371,
    sectionNumber: 30,
    sectionName: "Other Services",
    title: "AWS Batch",
    duration: "00:03:09",
    domain: "Performance",
    description:
      "Batch - run batch computing workloads. Dynamic scaling, job queues, optimal resource utilization (Spot/On-Demand).",
  },
  {
    lessonNumber: 372,
    sectionNumber: 30,
    sectionName: "Other Services",
    title: "Amazon AppFlow",
    duration: "00:01:24",
    domain: "Performance",
    description:
      "AppFlow - no-code data integration between SaaS apps (Salesforce, Zendesk) and AWS. Scheduled or event-driven.",
  },
  {
    lessonNumber: 373,
    sectionNumber: 30,
    sectionName: "Other Services",
    title: "AWS Amplify",
    duration: "00:02:00",
    domain: "Performance",
    description:
      "Amplify - full-stack web/mobile app development. Hosting, CI/CD, authentication, GraphQL API, storage.",
  },
  {
    lessonNumber: 374,
    sectionNumber: 30,
    sectionName: "Other Services",
    title: "Instance Scheduler on AWS",
    duration: "00:05:42",
    domain: "Cost",
    description:
      "Instance Scheduler - start/stop EC2 and RDS on schedule. Reduces costs by turning off non-production instances (e.g., weekends).",

    // SECTION 31: Whitepapers & Architectures (375-378)
  },
  {
    lessonNumber: 375,
    sectionNumber: 31,
    sectionName: "Whitepapers & Architectures",
    title: "WhitePaper Section Introduction",
    duration: "00:00:54",
    domain: "Foundation",
    description:
      "Important whitepapers: Well-Architected Framework, Pricing, Security best practices, AWS CAF.",
  },
  {
    lessonNumber: 376,
    sectionNumber: 31,
    sectionName: "Whitepapers & Architectures",
    title: "AWS Well-Architected Framework & Well-Architected Tool",
    duration: "00:06:08",
    domain: "Foundation",
    description:
      "Well-Architected Framework: 6 pillars (Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability).",
  },
  {
    lessonNumber: 377,
    sectionNumber: 31,
    sectionName: "Whitepapers & Architectures",
    title: "AWS Trusted Advisor Overview + Hands-On",
    duration: "00:03:19",
    domain: "Cost",
    description:
      "Trusted Advisor - real-time recommendations (cost, security, performance, fault tolerance). 7 core checks for Basic support.",
  },
  {
    lessonNumber: 378,
    sectionNumber: 31,
    sectionName: "Whitepapers & Architectures",
    title:
      "Examples of Architecture - AWS Certified Solutions Architect Associate",
    duration: "00:04:19",
    domain: "Resilient",
    description:
      "Sample exam architecture scenarios: multi-tier web app, disaster recovery, serverless website, hybrid storage.",

    // SECTION 32: Exam Preparation (379-385)
  },
  {
    lessonNumber: 379,
    sectionNumber: 32,
    sectionName: "Exam Preparation",
    title: "Exam Preparation - Section Introduction",
    duration: "00:00:32",
    domain: "Foundation",
    description:
      "Exam prep strategies: review domains, identify weak areas, take practice exams, time management.",
  },
  {
    lessonNumber: 380,
    sectionNumber: 32,
    sectionName: "Exam Preparation",
    title:
      "State of Learning Checkpoint - AWS Certified Solutions Architect Associate",
    duration: "00:04:23",
    domain: "Foundation",
    description:
      "Assess exam readiness based on completed lessons and practice test scores. Identify topics needing review.",
  },
  {
    lessonNumber: 381,
    sectionNumber: 32,
    sectionName: "Exam Preparation",
    title: "Exam Tips - AWS Certified Solutions Architect Associate",
    duration: "00:03:25",
    domain: "Foundation",
    description:
      "SAA exam tips: time management (2 mins/question), process of elimination, flag questions, read carefully.",
  },
  {
    lessonNumber: 382,
    sectionNumber: 32,
    sectionName: "Exam Preparation",
    title: "Exam Walkthrough and Signup",
    duration: "00:04:38",
    domain: "Foundation",
    description:
      "AWS Certification portal walkthrough. Schedule exam, choose delivery options (Pearson VUE or PSI).",
  },
  {
    lessonNumber: 383,
    sectionNumber: 32,
    sectionName: "Exam Preparation",
    title: "Save 50% on your AWS Exam Cost!",
    duration: "00:01:11",
    domain: "Cost",
    description:
      "Exam discounts: retake option ($50), practice exam voucher, 50% off next exam promotion after passing.",
  },
  {
    lessonNumber: 384,
    sectionNumber: 32,
    sectionName: "Exam Preparation",
    title:
      "Get an Extra 30 Minutes on your AWS Exam - Non Native English Speakers only",
    duration: "00:01:05",
    domain: "Foundation",
    description:
      "ESL +30 minutes accommodation for non-native English speakers. Request during scheduling, proof not required.",
  },
  {
    lessonNumber: 385,
    sectionNumber: 32,
    sectionName: "Exam Preparation",
    title: "How does the exam work",
    duration: "00:01:42",
    domain: "Foundation",
    description:
      "Exam format: 65 questions (multiple choice + multiple response). 130 minutes. No negative scoring. 720/1000 passing score.",

    // SECTION 33: Congratulations & Next Steps (386-387)
  },
  {
    lessonNumber: 386,
    sectionNumber: 33,
    sectionName: "Congratulations & Next Steps",
    title: "AWS Certification Paths",
    duration: "00:06:07",
    domain: "Foundation",
    description:
      "Certification paths: Cloud Practitioner → Associate (Solutions Architect, Developer, SysOps) → Professional → Specialty.",
  },
  {
    lessonNumber: 387,
    sectionNumber: 33,
    sectionName: "Congratulations & Next Steps",
    title: "Congratulations",
    duration: "00:01:37",
    domain: "Foundation",
    description:
      "Congratulations on completing SAA course! Next steps: take practice exams, review weak areas, schedule official exam.",
  },
];

async function main() {
  console.log("🌱 Seeding Part 10: Lessons 361-387 (FINAL)...");

  let count = 0;
  for (const lesson of lessonsPart10) {
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

  console.log(`✅ Part 10 Complete! Inserted ${count} lessons (361-387)`);
  console.log(`📌 TOTAL LESSONS: ${count} lessons (1-387)`);
  console.log(
    "🎉 ALL 387 LESSONS FROM STEPHANE MAAREK COURSE HAVE BEEN SEEDED!",
  );
  console.log(
    "📌 You can now start tracking your progress in the Topics page.",
  );
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
