import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const lessonsPart8 = [
  // SECTION 25: Advanced Identity (continued from 281)
  {
    lessonNumber: 281,
    sectionNumber: 25,
    sectionName: "Advanced Identity",
    title: "IAM - Policy Evaluation Logic",
    duration: "00:06:51",
    domain: "Security",
    description:
      "IAM policy evaluation: 1) Explicit DENY overrides ALLOW, 2) At least one ALLOW grants access, 3) Default DENY.",
  },
  {
    lessonNumber: 282,
    sectionNumber: 25,
    sectionName: "Advanced Identity",
    title: "AWS IAM Identity Center",
    duration: "00:06:46",
    domain: "Security",
    description:
      "IAM Identity Center (AWS SSO) - central user/group management across multiple AWS accounts. Integrates with Active Directory.",
  },
  {
    lessonNumber: 283,
    sectionNumber: 25,
    sectionName: "Advanced Identity",
    title: "AWS Directory Services",
    duration: "00:05:59",
    domain: "Security",
    description:
      "Directory Services: AWS Managed Microsoft AD (full AD), AD Connector (proxy), Simple AD (Samba-based).",
  },
  {
    lessonNumber: 284,
    sectionNumber: 25,
    sectionName: "Advanced Identity",
    title: "AWS Directory Services - Hands On",
    duration: "00:01:20",
    domain: "Security",
    description:
      "Create Simple AD directory. Join EC2 instances to domain. Test authentication.",
  },
  {
    lessonNumber: 285,
    sectionNumber: 25,
    sectionName: "Advanced Identity",
    title: "AWS Control Tower",
    duration: "00:02:50",
    domain: "Cost",
    description:
      "Control Tower - automated multi-account setup and governance. Guardrails (SCPs), Account Factory, centralized logging.",

    // SECTION 26: AWS Security & Encryption (286-306)
  },
  {
    lessonNumber: 286,
    sectionNumber: 26,
    sectionName: "AWS Security & Encryption",
    title: "AWS Security - Section Introduction",
    duration: "00:00:45",
    domain: "Security",
    description:
      "Security services: KMS (encryption), SSM Parameter Store (secrets), WAF (web ACL), Shield (DDoS).",
  },
  {
    lessonNumber: 287,
    sectionNumber: 26,
    sectionName: "AWS Security & Encryption",
    title: "Encryption 101",
    duration: "00:04:00",
    domain: "Security",
    description:
      "Encryption basics: symmetric (same key) vs asymmetric (public/private key). Data at rest, in transit.",
  },
  {
    lessonNumber: 288,
    sectionNumber: 26,
    sectionName: "AWS Security & Encryption",
    title: "KMS Overview",
    duration: "00:07:29",
    domain: "Security",
    description:
      "AWS KMS - managed encryption keys. Symmetric (AES-256) and Asymmetric (RSA, ECC). Automatic key rotation.",
  },
  {
    lessonNumber: 289,
    sectionNumber: 26,
    sectionName: "AWS Security & Encryption",
    title: "KMS Hands On w CLI",
    duration: "00:09:32",
    domain: "Security",
    description:
      "Create KMS keys via CLI. Encrypt/decrypt using aws kms encrypt CLI. Key policies for cross-account access.",
  },
  {
    lessonNumber: 290,
    sectionNumber: 26,
    sectionName: "AWS Security & Encryption",
    title: "KMS - Multi-Region Keys",
    duration: "00:06:12",
    domain: "Security",
    description:
      "Multi-Region KMS keys - same key ID in multiple regions. Use for cross-region encryption (DynamoDB Global Tables).",
  },
  {
    lessonNumber: 291,
    sectionNumber: 26,
    sectionName: "AWS Security & Encryption",
    title: "S3 Replication with Encryption",
    duration: "00:01:42",
    domain: "Security",
    description:
      "S3 replication with encrypted objects. Requires SSL, bucket policies, and appropriate KMS key permissions.",
  },
  {
    lessonNumber: 292,
    sectionNumber: 26,
    sectionName: "AWS Security & Encryption",
    title: "Encrypted AMI Sharing Process",
    duration: "00:01:34",
    domain: "Security",
    description:
      "Share encrypted AMIs across accounts. Must share KMS key, then AMI. Launch EC2 with shared AMI.",
  },
  {
    lessonNumber: 293,
    sectionNumber: 26,
    sectionName: "AWS Security & Encryption",
    title: "SSM Parameter Store Overview",
    duration: "00:04:17",
    domain: "Security",
    description:
      "SSM Parameter Store - secure storage for configuration/secrets (passwords, DB strings). Free tier, versioning.",
  },
  {
    lessonNumber: 294,
    sectionNumber: 26,
    sectionName: "AWS Security & Encryption",
    title: "SSM Parameter Store Hands On (CLI)",
    duration: "00:06:56",
    domain: "Security",
    description:
      "Create parameters (String, StringList, SecureString). Get parameters via CLI. IAM permissions for access.",
  },
  {
    lessonNumber: 295,
    sectionNumber: 26,
    sectionName: "AWS Security & Encryption",
    title: "AWS Secrets Manager - Overview",
    duration: "00:02:11",
    domain: "Security",
    description:
      "Secrets Manager - manage RDS secrets. Automatic rotation (every 30 days). Costs more than Parameter Store.",
  },
  {
    lessonNumber: 296,
    sectionNumber: 26,
    sectionName: "AWS Security & Encryption",
    title: "AWS Secrets Manager - Hands On",
    duration: "00:04:01",
    domain: "Security",
    description:
      "Create secret for RDS database. Configure automatic rotation with Lambda. Retrieve secret via CLI/SDK.",
  },
  {
    lessonNumber: 297,
    sectionNumber: 26,
    sectionName: "AWS Security & Encryption",
    title: "AWS Certificate Manager (ACM)",
    duration: "00:08:01",
    domain: "Security",
    description:
      "ACM - provision SSL/TLS certificates. For use with CloudFront, ALB, API Gateway. Automatic renewal (public certs).",
  },
  {
    lessonNumber: 298,
    sectionNumber: 26,
    sectionName: "AWS Security & Encryption",
    title: "AWS CloudHSM",
    duration: "00:04:47",
    domain: "Security",
    description:
      "CloudHSM - dedicated hardware security module. FIPS 140-2 Level 3. For strict regulatory requirements.",
  },
  {
    lessonNumber: 299,
    sectionNumber: 26,
    sectionName: "AWS Security & Encryption",
    title: "Web Application Firewall (WAF)",
    duration: "00:03:02",
    domain: "Security",
    description:
      "AWS WAF - protect web apps. Filter based on IP, SQL injection, XSS, custom rules. Regional or CloudFront.",
  },
  {
    lessonNumber: 300,
    sectionNumber: 26,
    sectionName: "AWS Security & Encryption",
    title: "Shield - DDoS Protection",
    duration: "00:02:05",
    domain: "Security",
    description:
      "AWS Shield Standard (free) - protection from common DDoS attacks. Shield Advanced (paid) - 24/7 DDoS Response Team.",
  },
  {
    lessonNumber: 301,
    sectionNumber: 26,
    sectionName: "AWS Security & Encryption",
    title: "Firewall Manager",
    duration: "00:02:43",
    domain: "Security",
    description:
      "Firewall Manager - central WAF/Shield/Security Group management across organizations. For multi-account compliance.",
  },
  {
    lessonNumber: 302,
    sectionNumber: 26,
    sectionName: "AWS Security & Encryption",
    title: "WAF & Shield - Hands On",
    duration: "00:04:22",
    domain: "Security",
    description:
      "Enable Shield Advanced. Create WAF web ACL with rate-based rule. Attach to CloudFront or ALB.",
  },
  {
    lessonNumber: 303,
    sectionNumber: 26,
    sectionName: "AWS Security & Encryption",
    title: "DDoS Protection Best Practices",
    duration: "00:05:54",
    domain: "Security",
    description:
      "DDoS protection layers: CloudFront (caching), WAF (rate limiting), Shield Advanced (response), ASG (auto scaling).",
  },
  {
    lessonNumber: 304,
    sectionNumber: 26,
    sectionName: "AWS Security & Encryption",
    title: "Amazon GuardDuty",
    duration: "00:02:33",
    domain: "Security",
    description:
      "GuardDuty - intelligent threat detection. Analyzes CloudTrail, VPC Flow Logs, DNS logs. Uses ML for anomalies.",
  },
  {
    lessonNumber: 305,
    sectionNumber: 26,
    sectionName: "AWS Security & Encryption",
    title: "Amazon Inspector",
    duration: "00:02:30",
    domain: "Security",
    description:
      "Inspector - automated security assessment for EC2. Checks for vulnerabilities, unintended network exposure.",
  },
  {
    lessonNumber: 306,
    sectionNumber: 26,
    sectionName: "AWS Security & Encryption",
    title: "Amazon Macie",
    duration: "00:01:04",
    domain: "Security",
    description:
      "Macie - data security/classification for S3. Uses ML to discover PII (personal identifiable information).",

    // SECTION 27: Amazon VPC (307-343)
  },
  {
    lessonNumber: 307,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "Section Introduction",
    duration: "00:01:06",
    domain: "Security",
    description:
      "VPC topics: CIDR, subnets, IGW, NAT, Bastion, NACL, SG, VPC Peering, Endpoints, Transit Gateway.",
  },
  {
    lessonNumber: 308,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "CIDR, Private vs Public IP",
    duration: "00:06:41",
    domain: "Security",
    description:
      "CIDR notation (calculate subnet masks). Private IP ranges (RFC 1918): 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.",
  },
  {
    lessonNumber: 309,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "Default VPC Overview",
    duration: "00:05:25",
    domain: "Security",
    description:
      "Default VPC in each region. /16 CIDR, internet gateway, default subnets in each AZ, public IP by default.",
  },
  {
    lessonNumber: 310,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "VPC Overview",
    duration: "00:01:11",
    domain: "Security",
    description:
      "VPC = virtual network in AWS. Region-scoped, spans all AZs. Isolated network with complete control.",
  },
  {
    lessonNumber: 311,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "VPC Hands On",
    duration: "00:02:09",
    domain: "Security",
    description:
      "Create custom VPC (10.0.0.0/16). Add tags and see default components created.",
  },
  {
    lessonNumber: 312,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "Subnet Overview",
    duration: "00:01:41",
    domain: "Security",
    description:
      "Subnets = sub-network inside VPC, tied to specific AZ. Public (route to IGW) vs private (no IGW route).",
  },
  {
    lessonNumber: 313,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "Subnet Hands On",
    duration: "00:03:54",
    domain: "Security",
    description:
      "Create public (10.0.1.0/24) and private (10.0.2.0/24) subnets in different AZs.",
  },
  {
    lessonNumber: 314,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "Internet Gateways & Route Tables",
    duration: "00:01:14",
    domain: "Security",
    description:
      "IGW - horizontally scaled, redundant gateway for internet access. Route tables control traffic flow.",
  },
  {
    lessonNumber: 315,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "Internet Gateways & Route Tables Hands On",
    duration: "00:07:03",
    domain: "Security",
    description:
      "Create IGW, attach to VPC. Create route table with default route to IGW. Associate with public subnet.",
  },
  {
    lessonNumber: 316,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "Bastion Hosts",
    duration: "00:02:42",
    domain: "Security",
    description:
      "Bastion host (jump box) - EC2 in public subnet to SSH into private instances. Protects private instances.",
  },
  {
    lessonNumber: 317,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "Bastion Hosts Hands On",
    duration: "00:05:03",
    domain: "Security",
    description:
      "Launch bastion in public subnet. Launch private EC2 (no public IP). SSH via bastion using SSH forwarding.",
  },
  {
    lessonNumber: 318,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "NAT Instances",
    duration: "00:03:42",
    domain: "Security",
    description:
      "NAT Instance (deprecated) - EC2 instance for private subnet outbound internet. Requires source/dest check disabled.",
  },
  {
    lessonNumber: 319,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "NAT Instances Hands On",
    duration: "00:05:59",
    domain: "Security",
    description:
      "Launch AMI for NAT instance, disable source/dest check. Add route from private subnet to NAT instance.",
  },
  {
    lessonNumber: 320,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "NAT Gateways",
    duration: "00:03:49",
    domain: "Security",
    description:
      "NAT Gateway - managed, highly available (AZ-specific), scales automatically. Pay per hour + data processed.",
  },
];

async function main() {
  console.log("🌱 Seeding Part 8: Lessons 281-320...");

  let count = 0;
  for (const lesson of lessonsPart8) {
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

  console.log(`✅ Part 8 Complete! Inserted ${count} lessons (281-320)`);
  console.log(`📌 Total so far: 320 lessons`);
  console.log("📌 Next: Run part 9 for lessons 321-360");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
