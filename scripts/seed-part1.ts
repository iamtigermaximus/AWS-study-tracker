import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const lessonsPart1 = [
  // SECTION 1-2: Introduction (1-4)
  {
    lessonNumber: 1,
    sectionNumber: 1,
    sectionName: "Introduction",
    title: "Course Introduction - AWS Certified Solutions Architect Associate",
    duration: "00:03:51",
    domain: "Foundation",
    description:
      "Overview of SAA-C03 certification: 65 questions, 130 minutes, passing score 720/1000.",
  },
  {
    lessonNumber: 2,
    sectionNumber: 1,
    sectionName: "Introduction",
    title: "Creating an AWS Account",
    duration: "00:03:24",
    domain: "Foundation",
    description:
      "Step-by-step AWS Free Tier account creation. Email verification, billing alerts.",
  },
  {
    lessonNumber: 3,
    sectionNumber: 1,
    sectionName: "Introduction",
    title: "Important Message",
    duration: "00:01:01",
    domain: "Foundation",
    description: "Course updates and SAA-C03 exam changes.",
  },
  {
    lessonNumber: 4,
    sectionNumber: 1,
    sectionName: "Introduction",
    title: "About your instructor",
    duration: "00:02:40",
    domain: "Foundation",
    description:
      "Stephane Maarek's background: AWS Certified, 12+ certifications, 1M+ students.",
  },

  // SECTION 3: AWS Cloud Overview (5-7)
  {
    lessonNumber: 5,
    sectionNumber: 3,
    sectionName: "AWS Cloud Overview",
    title: "AWS Cloud Overview - Regions & AZ",
    duration: "00:08:02",
    domain: "Foundation",
    description:
      "AWS Global Infrastructure: Regions, Availability Zones, Edge Locations.",
  },
  {
    lessonNumber: 6,
    sectionNumber: 3,
    sectionName: "AWS Cloud Overview",
    title: "Important AWS Console UI Update",
    duration: "00:01:15",
    domain: "Foundation",
    description:
      "AWS Console interface changes: new navigation, unified search.",
  },
  {
    lessonNumber: 7,
    sectionNumber: 3,
    sectionName: "AWS Cloud Overview",
    title: "Tour of the AWS Console & Services in AWS",
    duration: "00:03:53",
    domain: "Foundation",
    description: "Navigate AWS Console, overview of main service categories.",
  },

  // SECTION 4: IAM (8-26)
  {
    lessonNumber: 8,
    sectionNumber: 4,
    sectionName: "IAM",
    title: "IAM Introduction Users, Groups, Policies",
    duration: "00:03:23",
    domain: "Security",
    description:
      "IAM - Global service. Root user vs IAM users. Groups and policies.",
  },
  {
    lessonNumber: 9,
    sectionNumber: 4,
    sectionName: "IAM",
    title: "IAM Users & Groups Hands On",
    duration: "00:06:24",
    domain: "Security",
    description:
      "Create IAM users, groups. Add users to groups. Test permissions.",
  },
  {
    lessonNumber: 10,
    sectionNumber: 4,
    sectionName: "IAM",
    title: "AWS Console Simultaneous Sign-in",
    duration: "00:01:49",
    domain: "Security",
    description: "Switch Role feature for multi-account environments.",
  },
  {
    lessonNumber: 11,
    sectionNumber: 4,
    sectionName: "IAM",
    title: "IAM Policies",
    duration: "00:02:51",
    domain: "Security",
    description:
      "IAM Policy structure: Version, Statement, Effect, Action, Resource.",
  },
  {
    lessonNumber: 12,
    sectionNumber: 4,
    sectionName: "IAM",
    title: "IAM Policies Hands On",
    duration: "00:08:02",
    domain: "Security",
    description: "Create custom policy, attach to user, test permissions.",
  },
  {
    lessonNumber: 13,
    sectionNumber: 4,
    sectionName: "IAM",
    title: "IAM MFA Overview",
    duration: "00:04:11",
    domain: "Security",
    description: "Multi-Factor Authentication - password + security token.",
  },
  {
    lessonNumber: 14,
    sectionNumber: 4,
    sectionName: "IAM",
    title: "IAM MFA Hands On",
    duration: "00:04:02",
    domain: "Security",
    description: "Enable MFA on root account using Google Authenticator.",
  },
  {
    lessonNumber: 15,
    sectionNumber: 4,
    sectionName: "IAM",
    title: "AWS Access Keys, CLI and SDK",
    duration: "00:04:04",
    domain: "Security",
    description:
      "Access Keys for programmatic access. Never share Secret Access Key.",
  },
  {
    lessonNumber: 16,
    sectionNumber: 4,
    sectionName: "IAM",
    title: "AWS CLI Setup on Windows",
    duration: "00:01:46",
    domain: "Security",
    description: "Download AWS CLI MSI installer, run setup.",
  },
  {
    lessonNumber: 17,
    sectionNumber: 4,
    sectionName: "IAM",
    title: "AWS CLI Setup on Mac OS X",
    duration: "00:01:29",
    domain: "Security",
    description: "Install AWS CLI via Homebrew: 'brew install awscli'.",
  },
  {
    lessonNumber: 18,
    sectionNumber: 4,
    sectionName: "IAM",
    title: "AWS CLI Setup on Linux",
    duration: "00:01:31",
    domain: "Security",
    description: "Install via pip: 'pip install awscli --upgrade'.",
  },
  {
    lessonNumber: 19,
    sectionNumber: 4,
    sectionName: "IAM",
    title: "AWS CLI Hands On",
    duration: "00:03:51",
    domain: "Security",
    description: "Configure AWS CLI, test commands.",
  },
  {
    lessonNumber: 20,
    sectionNumber: 4,
    sectionName: "IAM",
    title: "AWS CloudShell",
    duration: "00:03:54",
    domain: "Security",
    description: "Browser-based terminal with AWS CLI pre-installed.",
  },
  {
    lessonNumber: 21,
    sectionNumber: 4,
    sectionName: "IAM",
    title: "IAM Roles for AWS Services",
    duration: "00:01:40",
    domain: "Security",
    description: "IAM Roles - assign permissions to AWS services.",
  },
  {
    lessonNumber: 22,
    sectionNumber: 4,
    sectionName: "IAM",
    title: "IAM Roles Hands On",
    duration: "00:02:06",
    domain: "Security",
    description: "Create EC2 role with S3 read access. Launch EC2 with role.",
  },
  {
    lessonNumber: 23,
    sectionNumber: 4,
    sectionName: "IAM",
    title: "IAM Security Tools",
    duration: "00:00:55",
    domain: "Security",
    description: "IAM Credential Report and Access Advisor.",
  },
  {
    lessonNumber: 24,
    sectionNumber: 4,
    sectionName: "IAM",
    title: "IAM Security Tools Hands On",
    duration: "00:02:24",
    domain: "Security",
    description: "Generate Credential Report, analyze Access Advisor.",
  },
  {
    lessonNumber: 25,
    sectionNumber: 4,
    sectionName: "IAM",
    title: "IAM Best Practices",
    duration: "00:01:30",
    domain: "Security",
    description: "IAM best practices: least privilege, MFA, roles.",
  },
  {
    lessonNumber: 26,
    sectionNumber: 4,
    sectionName: "IAM",
    title: "IAM Summary",
    duration: "00:01:06",
    domain: "Security",
    description: "Summary of IAM concepts for exam.",
  },

  // SECTION 5: EC2 Fundamentals (27-41)
  {
    lessonNumber: 27,
    sectionNumber: 5,
    sectionName: "EC2 Fundamentals",
    title: "AWS Budget Setup",
    duration: "00:05:06",
    domain: "Cost",
    description: "Set up AWS Budgets to monitor spending.",
  },
  {
    lessonNumber: 28,
    sectionNumber: 5,
    sectionName: "EC2 Fundamentals",
    title: "EC2 Basics",
    duration: "00:03:33",
    domain: "Foundation",
    description: "EC2 = virtual server in cloud. IaaS.",
  },
  {
    lessonNumber: 29,
    sectionNumber: 5,
    sectionName: "EC2 Fundamentals",
    title:
      "Create an EC2 Instance with EC2 User Data to have a Website Hands On",
    duration: "00:13:49",
    domain: "Resilient",
    description: "Launch EC2 with user data script to install Apache.",
  },
  {
    lessonNumber: 30,
    sectionNumber: 5,
    sectionName: "EC2 Fundamentals",
    title: "EC2 Instance Types Basics",
    duration: "00:05:43",
    domain: "Resilient",
    description: "Instance families: t3, c5, r5, i3, p3/g4.",
  },
  {
    lessonNumber: 31,
    sectionNumber: 5,
    sectionName: "EC2 Fundamentals",
    title: "Security Groups & Classic Ports Overview",
    duration: "00:07:19",
    domain: "Security",
    description: "Security Groups = virtual firewalls. Stateful.",
  },
  {
    lessonNumber: 32,
    sectionNumber: 5,
    sectionName: "EC2 Fundamentals",
    title: "Security Groups Hands On",
    duration: "00:04:46",
    domain: "Security",
    description: "Create Security Group with SSH, HTTP rules.",
  },
  {
    lessonNumber: 33,
    sectionNumber: 5,
    sectionName: "EC2 Fundamentals",
    title: "SSH Overview",
    duration: "00:02:48",
    domain: "Resilient",
    description: "SSH protocol for secure remote access.",
  },
  {
    lessonNumber: 34,
    sectionNumber: 5,
    sectionName: "EC2 Fundamentals",
    title: "How to SSH using Linux or Mac",
    duration: "00:07:06",
    domain: "Resilient",
    description: "SSH from terminal: 'ssh -i key.pem ec2-user@public-ip'.",
  },
  {
    lessonNumber: 35,
    sectionNumber: 5,
    sectionName: "EC2 Fundamentals",
    title: "How to SSH using Windows",
    duration: "00:06:09",
    domain: "Resilient",
    description: "Use PuTTY: convert .pem to .ppk.",
  },
  {
    lessonNumber: 36,
    sectionNumber: 5,
    sectionName: "EC2 Fundamentals",
    title: "How to SSH using Windows 10",
    duration: "00:05:02",
    domain: "Resilient",
    description: "Built-in OpenSSH in Windows 10+.",
  },
  {
    lessonNumber: 37,
    sectionNumber: 5,
    sectionName: "EC2 Fundamentals",
    title: "EC2 Instance Connect",
    duration: "00:03:16",
    domain: "Resilient",
    description: "Browser-based SSH from AWS Console.",
  },
  {
    lessonNumber: 38,
    sectionNumber: 5,
    sectionName: "EC2 Fundamentals",
    title: "EC2 Instance Roles Demo",
    duration: "00:04:20",
    domain: "Security",
    description: "Create IAM Role, launch EC2 with role.",
  },
  {
    lessonNumber: 39,
    sectionNumber: 5,
    sectionName: "EC2 Fundamentals",
    title: "EC2 Instance Purchasing Options",
    duration: "00:09:49",
    domain: "Cost",
    description: "On-Demand, Reserved, Spot, Savings Plans.",
  },
  {
    lessonNumber: 40,
    sectionNumber: 5,
    sectionName: "EC2 Fundamentals",
    title: "Spot Instances & Spot Fleet",
    duration: "00:09:42",
    domain: "Cost",
    description: "Spot Instances: bid for unused capacity.",
  },
];

async function main() {
  console.log("🌱 Seeding Part 1: Lessons 1-40...");

  const existingCount = await prisma.curriculumTopic.count();
  if (existingCount > 0) {
    console.log(`⚠️  Found ${existingCount} existing topics. Clearing...`);
    await prisma.curriculumTopic.deleteMany();
  }

  let count = 0;
  for (const lesson of lessonsPart1) {
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

  console.log(`✅ Part 1 Complete! Inserted ${count} lessons (1-40)`);
  console.log("📌 Next: Run part 2 for lessons 41-80");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
