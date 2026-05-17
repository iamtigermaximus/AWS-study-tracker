import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const lessonsPart9 = [
  // SECTION 27: Amazon VPC (continued from 321)
  {
    lessonNumber: 321,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "NAT Gateways Hands On",
    duration: "00:03:04",
    domain: "Security",
    description:
      "Create NAT Gateway in public subnet. Update private subnet route table to use NAT Gateway. Test internet access from private EC2.",
  },
  {
    lessonNumber: 322,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "NACL & Security Groups",
    duration: "00:10:44",
    domain: "Security",
    description:
      "NACL (stateless, subnet level, number rules) vs Security Group (stateful, instance level, only allow rules).",
  },
  {
    lessonNumber: 323,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "NACL & Security Groups Hands On",
    duration: "00:06:33",
    domain: "Security",
    description:
      "Create custom NACL, add allow/deny rules. Test traffic blocking. Compare with Security Group behavior.",
  },
  {
    lessonNumber: 324,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "VPC Peering",
    duration: "00:02:07",
    domain: "Security",
    description:
      "VPC Peering - connect two VPCs (same or different accounts/regions). Transitive peering not supported.",
  },
  {
    lessonNumber: 325,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "VPC Peering Hands On",
    duration: "00:05:48",
    domain: "Security",
    description:
      "Create VPC peering connection between two VPCs. Accept request, update route tables. Test connectivity.",
  },
  {
    lessonNumber: 326,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "VPC Endpoints",
    duration: "00:05:46",
    domain: "Security",
    description:
      "VPC Endpoints - private connection to AWS services. Gateway endpoints (S3, DynamoDB) vs Interface endpoints (AWS PrivateLink).",
  },
  {
    lessonNumber: 327,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "VPC Endpoints Hands On",
    duration: "00:06:41",
    domain: "Security",
    description:
      "Create Gateway endpoint for S3. Update route table. Test S3 access from private subnet without NAT.",
  },
  {
    lessonNumber: 328,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "VPC Flow Logs",
    duration: "00:04:17",
    domain: "Security",
    description:
      "VPC Flow Logs - capture IP traffic information (ENI level). Log to S3/CloudWatch. For troubleshooting.",
  },
  {
    lessonNumber: 329,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "VPC Flow Logs Hands On + Athena",
    duration: "00:10:12",
    domain: "Security",
    description:
      "Enable VPC Flow Logs to S3. Use Athena to query logs. Analyze traffic patterns, find rejected connections.",
  },
  {
    lessonNumber: 330,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "Site to Site VPN, Virtual Private Gateway & Customer Gateway",
    duration: "00:03:59",
    domain: "Security",
    description:
      "Site-to-Site VPN - connect on-premises to AWS. Virtual Private Gateway (AWS side), Customer Gateway (on-premises side).",
  },
  {
    lessonNumber: 331,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title:
      "Site to Site VPN, Virtual Private Gateway & Customer Gateway Hands On",
    duration: "00:01:55",
    domain: "Security",
    description:
      "Create Virtual Private Gateway, attach to VPC. Create Customer Gateway with on-premises IP. Create VPN connection.",
  },
  {
    lessonNumber: 332,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "Direct Connect & Direct Connect Gateway",
    duration: "00:06:37",
    domain: "Security",
    description:
      "Direct Connect - dedicated private connection to AWS. DX Gateway - connect to multiple VPCs/regions. Higher throughput, lower latency.",
  },
  {
    lessonNumber: 333,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "Direct Connect + Site to Site VPN",
    duration: "00:01:01",
    domain: "Security",
    description:
      "DX + VPN for encrypted failover. Backup VPN over DX or separate connection. Hybrid architecture with redundancy.",
  },
  {
    lessonNumber: 334,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "Transit Gateway",
    duration: "00:05:11",
    domain: "Security",
    description:
      "Transit Gateway - hub for connecting multiple VPCs and on-premises. Supports transitive peering, simplifies network topology.",
  },
  {
    lessonNumber: 335,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "VPC Traffic Mirroring",
    duration: "00:02:11",
    domain: "Security",
    description:
      "Traffic Mirroring - copy network traffic from ENI to security appliances. For content inspection, threat monitoring.",
  },
  {
    lessonNumber: 336,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "IPv6 for VPC",
    duration: "00:03:21",
    domain: "Security",
    description:
      "IPv6 support in VPC. Dual-stack (IPv4 + IPv6) or IPv6-only subnets. No NAT for IPv6 (public IPs).",
  },
  {
    lessonNumber: 337,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "IPv6 for VPC - Hands On",
    duration: "00:03:50",
    domain: "Security",
    description:
      "Associate IPv6 CIDR to VPC. Create IPv6 subnet. Launch EC2 with IPv6, test connectivity.",
  },
  {
    lessonNumber: 338,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "Egress Only Internet Gateway",
    duration: "00:03:09",
    domain: "Security",
    description:
      "Egress-Only IGW - allows IPv6 outbound only (no inbound). For private subnets to access internet via IPv6.",
  },
  {
    lessonNumber: 339,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "Egress Only Internet Gateway Hands On",
    duration: "00:01:01",
    domain: "Security",
    description:
      "Create Egress-Only IGW, attach to VPC. Update route table for IPv6 default route. Test outbound access.",
  },
  {
    lessonNumber: 340,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "Section Cleanup",
    duration: "00:02:23",
    domain: "Cost",
    description:
      "Clean up VPC resources: subnets, IGW, NAT Gateway, VPN, endpoints, security groups, NACLs.",
  },
  {
    lessonNumber: 341,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "VPC Section Summary",
    duration: "00:09:18",
    domain: "Security",
    description:
      "VPC summary: CIDR, subnets, IGW, NAT, Bastion, NACL, SG, Peering, Endpoints, Flow Logs, VPN, DX, Transit Gateway.",
  },
  {
    lessonNumber: 342,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "Networking Costs in AWS",
    duration: "00:03:01",
    domain: "Cost",
    description:
      "Networking costs: data transfer within AZ (free), across AZ (cost), across regions (higher cost), internet (egress costs).",
  },
  {
    lessonNumber: 343,
    sectionNumber: 27,
    sectionName: "Amazon VPC",
    title: "AWS Network Firewall",
    duration: "00:11:29",
    domain: "Security",
    description:
      "Network Firewall - managed firewall service for VPC. Intrusion detection/prevention (IDS/IPS), URL filtering, traffic inspection.",

    // SECTION 28: Disaster Recovery & Migrations (344-354)
  },
  {
    lessonNumber: 344,
    sectionNumber: 28,
    sectionName: "Disaster Recovery & Migrations",
    title: "Disaster Recovery in AWS",
    duration: "00:02:55",
    domain: "Resilient",
    description:
      "DR strategies: Backup & Restore (low cost, high RTO), Pilot Light (minimal running), Warm Standby (reduced capacity), Multi-Site (active-active).",
  },
  {
    lessonNumber: 345,
    sectionNumber: 28,
    sectionName: "Disaster Recovery & Migrations",
    title: "Elastic Disaster Recovery (DRS)",
    duration: "00:01:49",
    domain: "Resilient",
    description:
      "DRS - continuous block-level replication for on-premises servers. Recover in AWS with fast RTO/RPO. Agent-based.",
  },
  {
    lessonNumber: 346,
    sectionNumber: 28,
    sectionName: "Disaster Recovery & Migrations",
    title: "Database Migration Service (DMS)",
    duration: "00:05:15",
    domain: "Resilient",
    description:
      "DMS - migrate databases with minimal downtime. Homogeneous (MySQL → MySQL) or heterogeneous (Oracle → Aurora).",
  },
  {
    lessonNumber: 347,
    sectionNumber: 28,
    sectionName: "Disaster Recovery & Migrations",
    title: "Database Migration Service (DMS) - Hands On",
    duration: "00:04:35",
    domain: "Resilient",
    description:
      "Create replication instance, source/target endpoints, replication task. Continuous replication (CDC) from source.",
  },
  {
    lessonNumber: 348,
    sectionNumber: 28,
    sectionName: "Disaster Recovery & Migrations",
    title: "RDS & Aurora Migrations",
    duration: "00:02:35",
    domain: "Resilient",
    description:
      "RDS/Aurora migration options: DMS (ongoing replication), Read Replica promotion (minimal downtime), Snapshot restore (offline).",
  },
  {
    lessonNumber: 349,
    sectionNumber: 28,
    sectionName: "Disaster Recovery & Migrations",
    title: "On-Premises Strategies with AWS",
    duration: "00:03:05",
    domain: "Resilient",
    description:
      "Hybrid strategies: VPN (over internet), DX (private), Storage Gateway (cache/backup), DataSync (transfer).",
  },
  {
    lessonNumber: 350,
    sectionNumber: 28,
    sectionName: "Disaster Recovery & Migrations",
    title: "AWS Backup",
    duration: "00:03:11",
    domain: "Resilient",
    description:
      "AWS Backup - centralized backup service. Supports EC2, RDS, EFS, FSx, Storage Gateway. Lifecycle policies, cross-region backup.",
  },
  {
    lessonNumber: 351,
    sectionNumber: 28,
    sectionName: "Disaster Recovery & Migrations",
    title: "AWS Backup - Hands On",
    duration: "00:04:26",
    domain: "Resilient",
    description:
      "Create backup plan with schedule and lifecycle. Assign resources, monitor backup jobs, restore from recovery point.",
  },
  {
    lessonNumber: 352,
    sectionNumber: 28,
    sectionName: "Disaster Recovery & Migrations",
    title: "Application Migration Service (MGN)",
    duration: "00:03:04",
    domain: "Resilient",
    description:
      "MGN - CloudEndure migration. Block-level replication for servers to AWS. Recommended for lift-and-shift migrations.",
  },
  {
    lessonNumber: 353,
    sectionNumber: 28,
    sectionName: "Disaster Recovery & Migrations",
    title: "Transferring Large Datasets into AWS",
    duration: "00:02:55",
    domain: "Cost",
    description:
      "Data transfer options: VPN/DX (online), Snowball (offline), DataSync (agent-based), S3 Transfer Acceleration (speed up).",
  },
  {
    lessonNumber: 354,
    sectionNumber: 28,
    sectionName: "Disaster Recovery & Migrations",
    title: "VMware Cloud on AWS",
    duration: "00:01:49",
    domain: "Resilient",
    description:
      "VMware Cloud on AWS - run VMware workloads on AWS bare metal. Same vSphere, vSAN, NSX. Hybrid use case.",

    // SECTION 29: More Solutions Architecture (355-359)
  },
  {
    lessonNumber: 355,
    sectionNumber: 29,
    sectionName: "More Solutions Architecture",
    title: "Event Processing in AWS",
    duration: "00:05:41",
    domain: "Resilient",
    description:
      "Event processing patterns: S3 + EventBridge, Kinesis + Lambda, SQS + DLQ, EventBridge to step functions.",
  },
  {
    lessonNumber: 356,
    sectionNumber: 29,
    sectionName: "More Solutions Architecture",
    title: "Caching Strategies in AWS",
    duration: "00:03:04",
    domain: "Performance",
    description:
      "Caching options: CloudFront (CDN), ElastiCache (app cache), DAX (DynamoDB), Global Accelerator (network).",
  },
  {
    lessonNumber: 357,
    sectionNumber: 29,
    sectionName: "More Solutions Architecture",
    title: "Blocking an IP Address in AWS",
    duration: "00:05:06",
    domain: "Security",
    description:
      "Block IPs using: WAF (web ACL), Security Group (deny rule), NACL (allow/deny), Network Firewall.",
  },
  {
    lessonNumber: 358,
    sectionNumber: 29,
    sectionName: "More Solutions Architecture",
    title: "High Performance Computing (HPC) on AWS",
    duration: "00:06:47",
    domain: "Performance",
    description:
      "HPC services: EC2 (C5n, M5n), ParallelCluster, EFA (network), FSx for Lustre (storage), Placement Groups.",
  },
  {
    lessonNumber: 359,
    sectionNumber: 29,
    sectionName: "More Solutions Architecture",
    title: "EC2 Instance High Availability",
    duration: "00:06:50",
    domain: "Resilient",
    description:
      "EC2 HA: ASG (multiple AZs), ELB (health checks), Route 53 (failover), EFS (shared storage), RDS Multi-AZ.",

    // SECTION 30: Other Services (360-374)
  },
  {
    lessonNumber: 360,
    sectionNumber: 30,
    sectionName: "Other Services",
    title: "Other Services Section Introduction",
    duration: "00:00:37",
    domain: "Foundation",
    description:
      "Other AWS services: CloudFormation, SES, Pinpoint, Amplify, Cost Explorer, Batch, Outposts.",
  },
];

async function main() {
  console.log("🌱 Seeding Part 9: Lessons 321-360...");

  let count = 0;
  for (const lesson of lessonsPart9) {
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

  console.log(`✅ Part 9 Complete! Inserted ${count} lessons (321-360)`);
  console.log(`📌 Total so far: 360 lessons`);
  console.log("📌 Next: Run part 10 for lessons 361-387");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
