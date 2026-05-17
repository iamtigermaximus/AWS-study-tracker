import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const lessonsPart2 = [
  {
    lessonNumber: 41,
    sectionNumber: 5,
    sectionName: "EC2 Fundamentals",
    title: "EC2 Instances Launch Types Hands On",
    duration: "00:08:54",
    domain: "Cost",
    description:
      "Launch On-Demand instance. Request Spot Instance, see pricing history. Compare pricing options.",
  },

  // SECTION 6: EC2 - Advanced (42-49)
  {
    lessonNumber: 42,
    sectionNumber: 6,
    sectionName: "EC2 - Advanced",
    title: "Private vs Public vs Elastic IP",
    duration: "00:04:43",
    domain: "Resilient",
    description:
      "Private IP (internal network), Public IP (internet accessible, changes on stop/start), Elastic IP (static public IP).",
  },
  {
    lessonNumber: 43,
    sectionNumber: 6,
    sectionName: "EC2 - Advanced",
    title: "Private vs Public vs Elastic IP Hands On",
    duration: "00:06:07",
    domain: "Resilient",
    description:
      "Launch EC2, note public IP. Stop instance, note IP changes. Allocate Elastic IP, associate to instance.",
  },
  {
    lessonNumber: 44,
    sectionNumber: 6,
    sectionName: "EC2 - Advanced",
    title: "EC2 Placement Groups",
    duration: "00:05:51",
    domain: "Resilient",
    description:
      "Placement Group strategies: Cluster (same rack - low latency), Spread (distinct hardware), Partition.",
  },
  {
    lessonNumber: 45,
    sectionNumber: 6,
    sectionName: "EC2 - Advanced",
    title: "EC2 Placement Groups - Hands On",
    duration: "00:01:43",
    domain: "Resilient",
    description:
      "Create Cluster placement group, launch 2 EC2 instances. Test network latency.",
  },
  {
    lessonNumber: 46,
    sectionNumber: 6,
    sectionName: "EC2 - Advanced",
    title: "Elastic Network Interfaces (ENI) - Overview",
    duration: "00:02:17",
    domain: "Resilient",
    description:
      "ENI = virtual network card. Attributes: primary private IPv4, secondary IPv4, Elastic IP, Security Groups.",
  },
  {
    lessonNumber: 47,
    sectionNumber: 6,
    sectionName: "EC2 - Advanced",
    title: "Elastic Network Interfaces (ENI) - Hands On",
    duration: "00:05:24",
    domain: "Resilient",
    description:
      "Create ENI, attach to EC2. Add secondary IP. Move ENI to another EC2 instance.",
  },
  {
    lessonNumber: 48,
    sectionNumber: 6,
    sectionName: "EC2 - Advanced",
    title: "EC2 Hibernate",
    duration: "00:03:14",
    domain: "Resilient",
    description:
      "Hibernate - pause instance, RAM state saved to EBS. Faster boot. Requirements and use cases.",
  },
  {
    lessonNumber: 49,
    sectionNumber: 6,
    sectionName: "EC2 - Advanced",
    title: "EC2 Hibernate - Hands On",
    duration: "00:04:09",
    domain: "Resilient",
    description:
      "Enable hibernation at launch. Launch EC2, create files. Hibernate, start - files still exist.",
  },

  // SECTION 7: EC2 Instance Storage (50-63)
  {
    lessonNumber: 50,
    sectionNumber: 7,
    sectionName: "EC2 Instance Storage",
    title: "EBS Overview",
    duration: "00:04:49",
    domain: "Resilient",
    description:
      "Elastic Block Store - network-attached persistent storage. Survives instance termination. AZ-specific.",
  },
  {
    lessonNumber: 51,
    sectionNumber: 7,
    sectionName: "EC2 Instance Storage",
    title: "EBS Hands On",
    duration: "00:05:35",
    domain: "Resilient",
    description:
      "Create EBS volume, attach to EC2. Format, mount, create file. Detach, attach to different instance.",
  },
  {
    lessonNumber: 52,
    sectionNumber: 7,
    sectionName: "EC2 Instance Storage",
    title: "EBS Snapshots",
    duration: "00:02:09",
    domain: "Resilient",
    description:
      "Snapshots - incremental backup of EBS volume to S3. First full, subsequent incremental.",
  },
  {
    lessonNumber: 53,
    sectionNumber: 7,
    sectionName: "EC2 Instance Storage",
    title: "EBS Snapshots - Hands On",
    duration: "00:03:39",
    domain: "Resilient",
    description:
      "Take snapshot of EBS volume. Create new volume from snapshot. Copy to different region.",
  },
  {
    lessonNumber: 54,
    sectionNumber: 7,
    sectionName: "EC2 Instance Storage",
    title: "AMI Overview",
    duration: "00:02:46",
    domain: "Resilient",
    description:
      "AMI - template for EC2 instances. Includes OS, applications, data. Build custom AMIs.",
  },
  {
    lessonNumber: 55,
    sectionNumber: 7,
    sectionName: "EC2 Instance Storage",
    title: "AMI Hands On",
    duration: "00:05:00",
    domain: "Resilient",
    description:
      "Launch EC2, install Apache, create custom AMI. Launch new instance from AMI - Apache pre-installed.",
  },
  {
    lessonNumber: 56,
    sectionNumber: 7,
    sectionName: "EC2 Instance Storage",
    title: "EC2 Instance Store",
    duration: "00:02:48",
    domain: "Resilient",
    description:
      "Instance Store - physically attached storage. Very high IOPS. Ephemeral - data lost on stop.",
  },
  {
    lessonNumber: 57,
    sectionNumber: 7,
    sectionName: "EC2 Instance Storage",
    title: "EBS Volume Types",
    duration: "00:05:04",
    domain: "Resilient",
    description:
      "SSD-backed: gp2/gp3 (General Purpose), io1/io2 (Provisioned IOPS). HDD-backed: st1, sc1.",
  },
  {
    lessonNumber: 58,
    sectionNumber: 7,
    sectionName: "EC2 Instance Storage",
    title: "EBS Multi-Attach",
    duration: "00:01:46",
    domain: "Resilient",
    description:
      "Multi-Attach - attach same io1/io2 volume to up to 16 EC2 instances in same AZ.",
  },
  {
    lessonNumber: 59,
    sectionNumber: 7,
    sectionName: "EC2 Instance Storage",
    title: "EBS Encryption",
    duration: "00:03:48",
    domain: "Security",
    description:
      "EBS encryption uses KMS. Data at rest encrypted, in-flight encrypted. Snapshots encrypted.",
  },
  {
    lessonNumber: 60,
    sectionNumber: 7,
    sectionName: "EC2 Instance Storage",
    title: "Amazon EFS",
    duration: "00:05:19",
    domain: "Resilient",
    description:
      "Elastic File System - managed NFS for Linux EC2. Serverless, scalable. Multi-AZ.",
  },
  {
    lessonNumber: 61,
    sectionNumber: 7,
    sectionName: "EC2 Instance Storage",
    title: "Amazon EFS - Hands On",
    duration: "00:13:06",
    domain: "Resilient",
    description:
      "Create EFS file system. Launch 2 EC2 instances in different AZs. Mount EFS on both.",
  },
  {
    lessonNumber: 62,
    sectionNumber: 7,
    sectionName: "EC2 Instance Storage",
    title: "EFS vs EBS",
    duration: "00:02:12",
    domain: "Resilient",
    description:
      "EBS: single instance, one AZ, block storage. EFS: multi-instance, multi-AZ, file storage.",
  },
  {
    lessonNumber: 63,
    sectionNumber: 7,
    sectionName: "EC2 Instance Storage",
    title: "EBS & EFS - Section Cleanup",
    duration: "00:01:32",
    domain: "Resilient",
    description:
      "Terminate EC2 instances, delete EBS volumes, delete EFS file systems to avoid charges.",
  },

  // SECTION 8: High Availability & Scalability (64-80)
  {
    lessonNumber: 64,
    sectionNumber: 8,
    sectionName: "High Availability & Scalability",
    title: "High Availability and Scalability",
    duration: "00:05:06",
    domain: "Resilient",
    description:
      "Scalability: Vertical (bigger instance) vs Horizontal (more instances). High Availability: across AZs.",
  },
  {
    lessonNumber: 65,
    sectionNumber: 8,
    sectionName: "High Availability & Scalability",
    title: "Elastic Load Balancing (ELB) Overview",
    duration: "00:06:16",
    domain: "Resilient",
    description:
      "ELB types: ALB (Layer 7), NLB (Layer 4, millions RPS), GWLB (Layer 3 - virtual appliances).",
  },
  {
    lessonNumber: 66,
    sectionNumber: 8,
    sectionName: "High Availability & Scalability",
    title: "Application Load Balancer (ALB)",
    duration: "00:05:50",
    domain: "Resilient",
    description:
      "ALB features: path-based routing, host-based routing, query string/header routing. Target groups.",
  },
  {
    lessonNumber: 67,
    sectionNumber: 8,
    sectionName: "High Availability & Scalability",
    title: "Application Load Balancer (ALB) - Hands On - Part 1",
    duration: "00:08:35",
    domain: "Resilient",
    description:
      "Create ALB, configure listener (port 80), create target group with 2 EC2 instances in different AZs.",
  },
  {
    lessonNumber: 68,
    sectionNumber: 8,
    sectionName: "High Availability & Scalability",
    title: "Application Load Balancer (ALB) - Hands On - Part 2",
    duration: "00:05:38",
    domain: "Resilient",
    description:
      "Add path-based routing: /api/ to API target group, /static/ to static target group.",
  },
  {
    lessonNumber: 69,
    sectionNumber: 8,
    sectionName: "High Availability & Scalability",
    title: "Network Load Balancer (NLB)",
    duration: "00:03:25",
    domain: "Resilient",
    description:
      "NLB features: TCP/UDP/TLS, ultra-high performance, static IP per AZ, preserve client IP.",
  },
  {
    lessonNumber: 70,
    sectionNumber: 8,
    sectionName: "High Availability & Scalability",
    title: "Network Load Balancer (NLB) - Hands On",
    duration: "00:06:04",
    domain: "Resilient",
    description:
      "Create NLB (internet-facing), configure TCP listener, register EC2 targets. Test load balancing.",
  },
  {
    lessonNumber: 71,
    sectionNumber: 8,
    sectionName: "High Availability & Scalability",
    title: "Gateway Load Balancer (GWLB)",
    duration: "00:03:48",
    domain: "Resilient",
    description:
      "GWLB - deploy and scale third-party virtual appliances (firewalls, IDS/IPS). Uses GENEVE protocol.",
  },
  {
    lessonNumber: 72,
    sectionNumber: 8,
    sectionName: "High Availability & Scalability",
    title: "Elastic Load Balancer - Sticky Sessions",
    duration: "00:05:52",
    domain: "Resilient",
    description:
      "Sticky Sessions (Session Affinity) - always route same client to same target. Uses cookies.",
  },
  {
    lessonNumber: 73,
    sectionNumber: 8,
    sectionName: "High Availability & Scalability",
    title: "Elastic Load Balancer - Cross Zone Load Balancing",
    duration: "00:05:54",
    domain: "Resilient",
    description:
      "Cross-Zone LB - distribute traffic evenly across instances in all AZs (not just within AZ).",
  },
  {
    lessonNumber: 74,
    sectionNumber: 8,
    sectionName: "High Availability & Scalability",
    title: "Elastic Load Balancer - SSL Certificates",
    duration: "00:06:05",
    domain: "Security",
    description:
      "SSL/TLS termination on ELB - HTTPS listener, ACM certificate. SNI for multiple certificates.",
  },
  {
    lessonNumber: 75,
    sectionNumber: 8,
    sectionName: "High Availability & Scalability",
    title: "Elastic Load Balancer - SSL Certificates - Hands On",
    duration: "00:02:00",
    domain: "Security",
    description:
      "Request public SSL certificate from ACM. Add HTTPS listener to ALB, attach certificate.",
  },
  {
    lessonNumber: 76,
    sectionNumber: 8,
    sectionName: "High Availability & Scalability",
    title: "Elastic Load Balancer - Connection Draining",
    duration: "00:02:23",
    domain: "Resilient",
    description:
      "Connection Draining - time to complete in-flight requests before deregistering target.",
  },
  {
    lessonNumber: 77,
    sectionNumber: 8,
    sectionName: "High Availability & Scalability",
    title: "Auto Scaling Groups (ASG) Overview",
    duration: "00:04:43",
    domain: "Resilient",
    description:
      "ASG components: Launch Template, Scaling Policies, desired/min/max capacity. Health Checks.",
  },
  {
    lessonNumber: 78,
    sectionNumber: 8,
    sectionName: "High Availability & Scalability",
    title: "Auto Scaling Groups Hands On",
    duration: "00:08:57",
    domain: "Resilient",
    description:
      "Create Launch Template with Apache. Create ASG with min=1, desired=2, max=4. Test manual scaling.",
  },
  {
    lessonNumber: 79,
    sectionNumber: 8,
    sectionName: "High Availability & Scalability",
    title: "Auto Scaling Groups - Scaling Policies",
    duration: "00:04:24",
    domain: "Resilient",
    description:
      "Policy types: Simple, Step, Target Tracking (maintain metric value), Scheduled (time-based).",
  },
  {
    lessonNumber: 80,
    sectionNumber: 8,
    sectionName: "High Availability & Scalability",
    title: "Auto Scaling Groups - Scaling Policies Hands On",
    duration: "00:09:16",
    domain: "Resilient",
    description:
      "Configure Target Tracking policy for 50% CPU. Generate CPU load, watch ASG scale out.",
  },
];

async function main() {
  console.log("🌱 Seeding Part 2: Lessons 41-80...");

  let count = 0;
  for (const lesson of lessonsPart2) {
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

  console.log(`✅ Part 2 Complete! Inserted ${count} lessons (41-80)`);
  console.log(`📌 Total so far: 80 lessons`);
  console.log("📌 Next: Run part 3 for lessons 81-120");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
