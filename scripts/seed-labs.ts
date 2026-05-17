import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const labs = [
  // SECTION 3: AWS Global Infrastructure
  {
    sectionNumber: 3,
    title: "AWS Global Infrastructure",
    description:
      "Explore AWS regions, Availability Zones, and Edge Locations by creating resources in multiple regions.",
    requirements: "AWS account with EC2 and S3 access",
    deliverables: ["screenshot", "notes"],
    estimatedTime: "20 min",
    difficulty: "Beginner",
    instructions: `# Lab 3: AWS Global Infrastructure

## Objective
Understand AWS Regions, Availability Zones, and Edge Locations.

## Steps
1. List all AWS regions using AWS CLI
2. Create S3 buckets in 3 different regions
3. Launch EC2 instances in different Availability Zones
4. Measure latency between regions

## Commands
\`\`\`bash
# List regions
aws ec2 describe-regions --query 'Regions[].RegionName'

# Create buckets in different regions
aws s3 mb s3://bucket-us-east --region us-east-1
aws s3 mb s3://bucket-eu-west --region eu-west-1
aws s3 mb s3://bucket-ap-southeast --region ap-southeast-1

# Launch EC2 in different AZs
aws ec2 run-instances --image-id ami-0c55b159cbfafe1f0 --instance-type t2.micro --availability-zone us-east-1a
aws ec2 run-instances --image-id ami-0c55b159cbfafe1f0 --instance-type t2.micro --availability-zone us-east-1b
\`\`\`

## Success Criteria
- [ ] S3 buckets created in 3 regions
- [ ] EC2 instances in 2 different AZs
- [ ] Screenshot of AWS Console showing resources
`,
  },

  // SECTION 4: IAM
  {
    sectionNumber: 4,
    title: "IAM: Users, Groups, Policies, and Roles",
    description:
      "Build a complete IAM structure with users, groups, policies, MFA, and service roles.",
    requirements: "AWS account with IAM admin access",
    deliverables: ["screenshot", "githubUrl", "notes"],
    estimatedTime: "30 min",
    difficulty: "Beginner",
    instructions: `# Lab 4: IAM Complete Configuration

## Objective
Create a production-ready IAM setup with least privilege principles.

## Steps

### Step 1: Create IAM Groups
\`\`\`bash
aws iam create-group --group-name Admins
aws iam create-group --group-name Developers
aws iam create-group --group-name Auditors
\`\`\`

### Step 2: Attach Policies to Groups
\`\`\`bash
# Admins - full access
aws iam attach-group-policy --group-name Admins --policy-arn arn:aws:iam::aws:policy/AdministratorAccess

# Developers - EC2 and S3 only
aws iam attach-group-policy --group-name Developers --policy-arn arn:aws:iam::aws:policy/AmazonEC2FullAccess
aws iam attach-group-policy --group-name Developers --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess

# Auditors - read-only
aws iam attach-group-policy --group-name Auditors --policy-arn arn:aws:iam::aws:policy/ReadOnlyAccess
\`\`\`

### Step 3: Create Users
\`\`\`bash
aws iam create-user --user-name alice
aws iam create-user --user-name bob
aws iam create-user --user-name charlie
\`\`\`

### Step 4: Add Users to Groups
\`\`\`bash
aws iam add-user-to-group --user-name alice --group-name Admins
aws iam add-user-to-group --user-name bob --group-name Developers
aws iam add-user-to-group --user-name charlie --group-name Auditors
\`\`\`

### Step 5: Enable MFA for Admin User
\`\`\`bash
aws iam create-virtual-mfa-device --virtual-mfa-device-name alice-mfa --outfile QRCode.png
\`\`\`

### Step 6: Create IAM Role for EC2
\`\`\`bash
cat > trust-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {"Service": "ec2.amazonaws.com"},
    "Action": "sts:AssumeRole"
  }]
}
EOF

aws iam create-role --role-name EC2-S3-Access --assume-role-policy-document file://trust-policy.json
aws iam attach-role-policy --role-name EC2-S3-Access --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess
\`\`\`

## Success Criteria
- [ ] 3 groups created with correct policies
- [ ] 3 users created and in correct groups
- [ ] MFA enabled for Admin user
- [ ] IAM Role for EC2 created
- [ ] Screenshot of IAM dashboard
- [ ] GitHub repo with CloudFormation/Terraform code
`,
  },

  // SECTION 5: EC2 Fundamentals
  {
    sectionNumber: 5,
    title: "EC2: Launch Web Server with User Data",
    description:
      "Launch EC2 instances, configure security groups, and deploy a website using user data.",
    requirements: "AWS account with EC2 access",
    deliverables: ["screenshot", "liveUrl", "githubUrl", "notes"],
    estimatedTime: "25 min",
    difficulty: "Beginner",
    instructions: `# Lab 5: EC2 Web Server

## Objective
Launch an EC2 instance with a web server using user data bootstrap script.

## Steps

### Step 1: Create Security Group
\`\`\`bash
# Create security group
aws ec2 create-security-group --group-name WebServerSG --description "Allow HTTP and SSH"

# Add SSH rule (port 22) - replace with your IP
aws ec2 authorize-security-group-ingress --group-name WebServerSG --protocol tcp --port 22 --cidr YOUR_IP/32

# Add HTTP rule (port 80)
aws ec2 authorize-security-group-ingress --group-name WebServerSG --protocol tcp --port 80 --cidr 0.0.0.0/0
\`\`\`

### Step 2: Create User Data Script
\`\`\`bash
cat > user-data.sh << 'EOF'
#!/bin/bash
yum update -y
yum install -y httpd
systemctl start httpd
systemctl enable httpd
echo "<h1>Lab 5 Complete!</h1><p>Instance ID: $(curl -s http://169.254.169.254/latest/meta-data/instance-id)</p>" > /var/www/html/index.html
EOF
\`\`\`

### Step 3: Launch EC2 Instance
\`\`\`bash
aws ec2 run-instances \
  --image-id ami-0c55b159cbfafe1f0 \
  --instance-type t2.micro \
  --security-groups WebServerSG \
  --user-data file://user-data.sh \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=WebServer}]'
\`\`\`

### Step 4: Get Public IP
\`\`\`bash
aws ec2 describe-instances --filters "Name=tag:Name,Values=WebServer" --query 'Reservations[0].Instances[0].PublicIpAddress'
\`\`\`

## Success Criteria
- [ ] Security group created with SSH and HTTP rules
- [ ] EC2 instance running with web server
- [ ] Website accessible via public IP
- [ ] Screenshot of website showing instance ID
- [ ] Live URL (public IP or DNS)
`,
  },

  // SECTION 6: EC2 Advanced
  {
    sectionNumber: 6,
    title: "EC2 Advanced: Elastic IP, Placement Groups, ENI",
    description:
      "Configure Elastic IPs, placement groups, and Elastic Network Interfaces.",
    requirements: "AWS account with EC2 access",
    deliverables: ["screenshot", "notes"],
    estimatedTime: "20 min",
    difficulty: "Intermediate",
    instructions: `# Lab 6: EC2 Advanced Features

## Objective
Master EC2 advanced features: Elastic IP, Placement Groups, and ENI.

## Steps

### Step 1: Allocate and Associate Elastic IP
\`\`\`bash
# Allocate Elastic IP
aws ec2 allocate-address --domain vpc

# Associate with instance
aws ec2 associate-address --instance-id <instance-id> --allocation-id <allocation-id>
\`\`\`

### Step 2: Create Placement Group
\`\`\`bash
# Cluster placement group (low latency)
aws ec2 create-placement-group --group-name ClusterGroup --strategy cluster

# Spread placement group (high availability)
aws ec2 create-placement-group --group-name SpreadGroup --strategy spread
\`\`\`

### Step 3: Launch Instances in Placement Group
\`\`\`bash
aws ec2 run-instances --image-id ami-0c55b159cbfafe1f0 --instance-type t2.micro --placement GroupName=ClusterGroup --count 2
\`\`\`

### Step 4: Create and Attach ENI
\`\`\`bash
# Create ENI
aws ec2 create-network-interface --subnet-id <subnet-id> --description "Secondary ENI"

# Attach to instance
aws ec2 attach-network-interface --instance-id <instance-id> --network-interface-id <eni-id> --device-index 1
\`\`\`

## Success Criteria
- [ ] Elastic IP allocated and associated
- [ ] Placement groups created
- [ ] Secondary ENI attached to instance
- [ ] Screenshots showing configuration
`,
  },

  // SECTION 7: EC2 Storage (EBS/EFS)
  {
    sectionNumber: 7,
    title: "EBS Volumes, Snapshots, and EFS",
    description:
      "Create EBS volumes, take snapshots, and configure EFS file systems.",
    requirements: "AWS account with EC2 access",
    deliverables: ["screenshot", "notes"],
    estimatedTime: "30 min",
    difficulty: "Intermediate",
    instructions: `# Lab 7: EC2 Storage

## Objective
Master EBS volumes, snapshots, and EFS for persistent storage.

## Steps

### Step 1: Create and Attach EBS Volume
\`\`\`bash
# Create EBS volume
aws ec2 create-volume --availability-zone us-east-1a --size 10 --volume-type gp3

# Attach to instance
aws ec2 attach-volume --volume-id vol-xxxxx --instance-id i-xxxxx --device /dev/xvdf
\`\`\`

### Step 2: Format and Mount EBS
\`\`\`bash
# SSH to instance
ssh -i key.pem ec2-user@<public-ip>

# Format volume
sudo mkfs -t xfs /dev/xvdf

# Mount volume
sudo mkdir /data
sudo mount /dev/xvdf /data
\`\`\`

### Step 3: Create EBS Snapshot
\`\`\`bash
aws ec2 create-snapshot --volume-id vol-xxxxx --description "Backup before changes"
\`\`\`

### Step 4: Create EFS File System
\`\`\`bash
# Create EFS
aws efs create-file-system --creation-token MyEFS

# Create mount targets in each AZ
aws efs create-mount-target --file-system-id fs-xxxxx --subnet-id subnet-xxxxx --security-group-id sg-xxxxx
\`\`\`

### Step 5: Mount EFS on EC2
\`\`\`bash
sudo yum install -y amazon-efs-utils
sudo mount -t efs fs-xxxxx:/ /mnt/efs
\`\`\`

## Success Criteria
- [ ] EBS volume created, attached, mounted
- [ ] EBS snapshot created
- [ ] EFS file system created and mounted
- [ ] Screenshots of volumes and mounts
`,
  },

  // SECTION 8: High Availability & Scalability
  {
    sectionNumber: 8,
    title: "ALB + Auto Scaling Group",
    description:
      "Build a highly available, scalable web application using ALB and Auto Scaling.",
    requirements: "AWS account with EC2, ELB, ASG access",
    deliverables: ["screenshot", "liveUrl", "githubUrl", "notes"],
    estimatedTime: "40 min",
    difficulty: "Intermediate",
    instructions: `# Lab 8: High Availability & Scalability

## Objective
Create a production-ready web application that automatically scales based on demand.

## Steps

### Step 1: Create Launch Template
\`\`\`bash
cat > user-data.sh << 'EOF'
#!/bin/bash
yum update -y
yum install -y httpd
systemctl start httpd
systemctl enable httpd
echo "<h1>Instance ID: \$(curl -s http://169.254.169.254/latest/meta-data/instance-id)</h1>" > /var/www/html/index.html
EOF

aws ec2 create-launch-template \
  --launch-template-name WebServerTemplate \
  --launch-template-data "ImageId=ami-0c55b159cbfafe1f0,InstanceType=t2.micro,UserData=$(base64 user-data.sh)"
\`\`\`

### Step 2: Create Target Group
\`\`\`bash
aws elbv2 create-target-group \
  --name web-targets \
  --protocol HTTP \
  --port 80 \
  --vpc-id vpc-xxxxx \
  --health-check-path /
\`\`\`

### Step 3: Create Application Load Balancer
\`\`\`bash
aws elbv2 create-load-balancer \
  --name web-alb \
  --subnets subnet-xxxxx subnet-yyyyy \
  --security-groups sg-xxxxx
\`\`\`

### Step 4: Create Listener
\`\`\`bash
aws elbv2 create-listener \
  --load-balancer-arn <alb-arn> \
  --protocol HTTP \
  --port 80 \
  --default-actions Type=forward,TargetGroupArn=<target-group-arn>
\`\`\`

### Step 5: Create Auto Scaling Group
\`\`\`bash
aws autoscaling create-auto-scaling-group \
  --auto-scaling-group-name web-asg \
  --launch-template LaunchTemplateName=WebServerTemplate \
  --target-group-arns <target-group-arn> \
  --min-size 2 \
  --max-size 6 \
  --desired-capacity 2 \
  --vpc-zone-identifier "subnet-xxxxx,subnet-yyyyy"
\`\`\`

### Step 6: Configure Scaling Policy
\`\`\`bash
aws autoscaling put-scaling-policy \
  --auto-scaling-group-name web-asg \
  --policy-name cpu-scaling \
  --policy-type TargetTrackingScaling \
  --target-tracking-configuration '{
    "PredefinedMetricSpecification": {
      "PredefinedMetricType": "ASGAverageCPUUtilization"
    },
    "TargetValue": 50.0
  }'
\`\`\`

## Success Criteria
- [ ] ALB accessible via DNS name
- [ ] Auto Scaling group maintains 2+ instances
- [ ] Health checks working
- [ ] Scaling policy configured (target tracking)
- [ ] Screenshots of ASG and ALB console
- [ ] Live URL of ALB endpoint
`,
  },

  // SECTION 9: RDS + Aurora + ElastiCache
  {
    sectionNumber: 9,
    title: "RDS Database with Read Replicas",
    description:
      "Launch RDS database, configure read replicas, and set up ElastiCache.",
    requirements: "AWS account with RDS and ElastiCache access",
    deliverables: ["screenshot", "liveUrl", "notes"],
    estimatedTime: "35 min",
    difficulty: "Intermediate",
    instructions: `# Lab 9: RDS Database

## Objective
Set up a production database with read replicas and caching.

## Steps

### Step 1: Create RDS Subnet Group
\`\`\`bash
aws rds create-db-subnet-group \
  --db-subnet-group-name my-subnet-group \
  --db-subnet-group-description "RDS subnet group" \
  --subnet-ids subnet-xxxxx subnet-yyyyy
\`\`\`

### Step 2: Create Security Group for RDS
\`\`\`bash
aws ec2 create-security-group --group-name RDSSG --description "RDS security group"
aws ec2 authorize-security-group-ingress --group-name RDSSG --protocol tcp --port 3306 --source-group <web-sg-id>
\`\`\`

### Step 3: Create RDS Instance
\`\`\`bash
aws rds create-db-instance \
  --db-instance-identifier mydatabase \
  --db-instance-class db.t3.micro \
  --engine mysql \
  --master-username admin \
  --master-user-password YourPassword123 \
  --allocated-storage 20 \
  --db-subnet-group-name my-subnet-group \
  --vpc-security-group-ids sg-xxxxx
\`\`\`

### Step 4: Create Read Replica
\`\`\`bash
aws rds create-db-instance-read-replica \
  --db-instance-identifier mydatabase-replica \
  --source-db-instance-identifier mydatabase \
  --db-instance-class db.t3.micro
\`\`\`

### Step 5: Create ElastiCache Cluster
\`\`\`bash
aws elasticache create-cache-cluster \
  --cache-cluster-id my-cache \
  --cache-node-type cache.t3.micro \
  --engine redis \
  --num-cache-nodes 1
\`\`\`

## Success Criteria
- [ ] RDS instance running (MySQL/PostgreSQL)
- [ ] Read replica created
- [ ] ElastiCache cluster created
- [ ] Screenshots of RDS dashboard
- [ ] Connection string for application
`,
  },

  // SECTION 10: Route 53
  {
    sectionNumber: 10,
    title: "Route 53: DNS Management",
    description:
      "Register a domain, create hosted zone, and configure routing policies.",
    requirements: "AWS account with Route 53 access and a domain",
    deliverables: ["screenshot", "liveUrl", "notes"],
    estimatedTime: "30 min",
    difficulty: "Intermediate",
    instructions: `# Lab 10: Route 53 DNS

## Objective
Master DNS management with Route 53 routing policies and health checks.

## Steps

### Step 1: Register Domain (or use existing)
\`\`\`bash
aws route53domains register-domain --domain-name myexample.com --duration-in-years 1
\`\`\`

### Step 2: Create Hosted Zone
\`\`\`bash
aws route53 create-hosted-zone --name myexample.com --caller-reference $(date +%s)
\`\`\`

### Step 3: Create A Record
\`\`\`bash
cat > record.json << EOF
{
  "Comment": "A record for web server",
  "Changes": [{
    "Action": "CREATE",
    "ResourceRecordSet": {
      "Name": "www.myexample.com",
      "Type": "A",
      "TTL": 300,
      "ResourceRecords": [{"Value": "54.123.45.67"}]
    }
  }]
}
EOF

aws route53 change-resource-record-sets --hosted-zone-id Z123456 --change-batch file://record.json
\`\`\`

### Step 4: Create Weighted Routing Policy
\`\`\`bash
# Blue (90% traffic)
# Green (10% traffic) - for canary deployment
\`\`\`

### Step 5: Configure Health Check
\`\`\`bash
aws route53 create-health-check \
  --caller-reference $(date +%s) \
  --health-check-config '{
    "IPAddress": "54.123.45.67",
    "Port": 80,
    "Type": "HTTP",
    "ResourcePath": "/health",
    "RequestInterval": 30,
    "FailureThreshold": 3
  }'
\`\`\`

## Success Criteria
- [ ] Domain resolves to your application
- [ ] Weighted routing configured
- [ ] Health check monitoring endpoint
- [ ] Screenshots of Route 53 console
`,
  },

  // SECTION 11: Solutions Architecture
  {
    sectionNumber: 11,
    title: "Solutions Architecture Design",
    description:
      "Design architecture diagrams for real-world scenarios using AWS services.",
    requirements: "Drawing tool (Draw.io, Lucidchart, or pen/paper)",
    deliverables: ["screenshot", "notes"],
    estimatedTime: "30 min",
    difficulty: "Intermediate",
    instructions: `# Lab 11: Solutions Architecture

## Objective
Design AWS architectures for common use cases.

## Scenarios to Design

### Scenario 1: Three-Tier Web Application
Design a three-tier web application architecture including:
- Web tier (S3 + CloudFront)
- Application tier (ALB + Auto Scaling EC2)
- Database tier (RDS Multi-AZ)

### Scenario 2: Serverless Microservices
Design a serverless microservices architecture with:
- API Gateway (REST API)
- Lambda functions (business logic)
- DynamoDB (NoSQL database)
- SQS (decoupling between services)

### Scenario 3: Disaster Recovery
Design a multi-region disaster recovery strategy with:
- Active-Passive failover
- Route 53 failover routing
- Cross-region replication (S3 CRR, RDS read replica)

### Scenario 4: Cost-Optimized Data Processing
Design a data processing pipeline with:
- S3 (data lake)
- Glue (ETL)
- Athena (serverless queries)
- QuickSight (visualization)

## Success Criteria
- [ ] Architecture diagrams for all 4 scenarios
- [ ] Explanation of design decisions (why choose each service)
- [ ] Cost estimation using AWS Pricing Calculator
- [ ] Screenshots of diagrams
- [ ] GitHub repo with diagrams
`,
  },

  // SECTION 12-13: S3 Fundamentals
  {
    sectionNumber: 12,
    title: "S3: Static Website Hosting",
    description:
      "Create S3 buckets, configure versioning, lifecycle policies, and host static websites.",
    requirements: "AWS account with S3 access",
    deliverables: ["screenshot", "liveUrl", "githubUrl", "notes"],
    estimatedTime: "25 min",
    difficulty: "Beginner",
    instructions: `# Lab 12: S3 Static Website

## Objective
Host a static website on S3 with versioning and lifecycle rules.

## Steps

### Step 1: Create Bucket
\`\`\`bash
aws s3 mb s3://my-static-website --region us-east-1
\`\`\`

### Step 2: Enable Static Website Hosting
\`\`\`bash
aws s3 website s3://my-static-website --index-document index.html --error-document error.html
\`\`\`

### Step 3: Make Bucket Public
\`\`\`bash
cat > bucket-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::my-static-website/*"
  }]
}
EOF

aws s3api put-bucket-policy --bucket my-static-website --policy file://bucket-policy.json
\`\`\`

### Step 4: Upload Website Files
\`\`\`bash
# Create index.html
echo '<h1>My S3 Website</h1>' > index.html

# Upload
aws s3 cp index.html s3://my-static-website/
aws s3 cp error.html s3://my-static-website/
\`\`\`

### Step 5: Enable Versioning
\`\`\`bash
aws s3api put-bucket-versioning --bucket my-static-website --versioning-configuration Status=Enabled
\`\`\`

### Step 6: Configure Lifecycle Rules
\`\`\`bash
cat > lifecycle.json << EOF
{
  "Rules": [{
    "Id": "MoveToGlacier",
    "Status": "Enabled",
    "Prefix": "",
    "Transitions": [{
      "Days": 30,
      "StorageClass": "GLACIER"
    }]
  }]
}
EOF

aws s3api put-bucket-lifecycle-configuration --bucket my-static-website --lifecycle-configuration file://lifecycle.json
\`\`\`

## Success Criteria
- [ ] Website accessible via S3 endpoint
- [ ] Versioning enabled
- [ ] Lifecycle policy configured
- [ ] Screenshot of S3 console
- [ ] Live website URL
`,
  },

  // SECTION 14: S3 Security
  {
    sectionNumber: 14,
    title: "S3 Security: Encryption and Access Control",
    description:
      "Configure S3 encryption, bucket policies, and pre-signed URLs.",
    requirements: "AWS account with S3 and KMS access",
    deliverables: ["screenshot", "notes"],
    estimatedTime: "25 min",
    difficulty: "Intermediate",
    instructions: `# Lab 14: S3 Security

## Objective
Secure S3 buckets with encryption, policies, and pre-signed URLs.

## Steps

### Step 1: Enable Default Encryption
\`\`\`bash
aws s3api put-bucket-encryption \
  --bucket my-secure-bucket \
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "AES256"
      }
    }]
  }'
\`\`\`

### Step 2: Create KMS Key
\`\`\`bash
aws kms create-key --description "S3 encryption key" --origin AWS_KMS
aws kms create-alias --alias-name alias/s3-key --target-key-id <key-id>
\`\`\`

### Step 3: Configure SSE-KMS
\`\`\`bash
aws s3api put-bucket-encryption \
  --bucket my-secure-bucket \
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "aws:kms",
        "KMSMasterKeyID": "alias/s3-key"
      }
    }]
  }'
\`\`\`

### Step 4: Create Bucket Policy (IP restriction)
\`\`\`bash
cat > ip-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Deny",
    "Principal": "*",
    "Action": "s3:*",
    "Resource": "arn:aws:s3:::my-secure-bucket/*",
    "Condition": {
      "NotIpAddress": {
        "aws:SourceIp": "YOUR_IP/32"
      }
    }
  }]
}
EOF

aws s3api put-bucket-policy --bucket my-secure-bucket --policy file://ip-policy.json
\`\`\`

### Step 5: Generate Pre-signed URL
\`\`\`bash
# Using AWS CLI
aws s3 presign s3://my-secure-bucket/private-file.pdf --expires-in 3600

# Using Python (more flexible)
python3 -c "
import boto3
url = boto3.client('s3').generate_presigned_url(
    ClientMethod='get_object',
    Params={'Bucket': 'my-secure-bucket', 'Key': 'private-file.pdf'},
    ExpiresIn=3600
)
print(url)
"
\`\`\`

## Success Criteria
- [ ] Default encryption enabled
- [ ] KMS key created and used
- [ ] Bucket policy with IP restriction
- [ ] Pre-signed URL generated and tested
- [ ] Screenshots of encryption settings
`,
  },

  // SECTION 15: CloudFront
  {
    sectionNumber: 15,
    title: "CloudFront CDN and Global Accelerator",
    description:
      "Configure CloudFront distribution with S3 origin and test cache behavior.",
    requirements: "AWS account with CloudFront and S3 access",
    deliverables: ["screenshot", "liveUrl", "notes"],
    estimatedTime: "25 min",
    difficulty: "Intermediate",
    instructions: `# Lab 15: CloudFront CDN

## Objective
Set up a global CDN using CloudFront and Global Accelerator.

## Steps

### Step 1: Create CloudFront Distribution
\`\`\`bash
aws cloudfront create-distribution \
  --origin-domain-name my-static-website.s3.amazonaws.com \
  --default-root-object index.html
\`\`\`

### Step 2: Configure Cache Behavior
\`\`\`bash
# Update distribution to set TTL
aws cloudfront update-distribution --id <distribution-id> --distribution-config file://config.json
\`\`\`

### Step 3: Create Cache Invalidation
\`\`\`bash
aws cloudfront create-invalidation --distribution-id <distribution-id> --paths "/*"
\`\`\`

### Step 4: Configure Custom Domain
\`\`\`bash
aws cloudfront update-distribution \
  --id <distribution-id> \
  --aliases mywebsite.com www.mywebsite.com
\`\`\`

### Step 5: Create Global Accelerator
\`\`\`bash
aws globalaccelerator create-accelerator --name MyAccelerator
\`\`\`

## Success Criteria
- [ ] CloudFront distribution deployed
- [ ] Content cached at edge locations
- [ ] Cache invalidation works
- [ ] Screenshots of CloudFront console
- [ ] Live CloudFront URL
`,
  },

  // SECTION 16: Storage Extras
  {
    sectionNumber: 16,
    title: "Storage Gateway and Data Transfer",
    description:
      "Configure Storage Gateway, DataSync, and understand data transfer options.",
    requirements: "AWS account with Storage Gateway, DataSync access",
    deliverables: ["screenshot", "notes"],
    estimatedTime: "20 min",
    difficulty: "Advanced",
    instructions: `# Lab 16: Storage Gateway

## Objective
Understand hybrid storage solutions: Storage Gateway and DataSync.

## Steps

### Step 1: Create File Gateway
\`\`\`bash
# Download VM for on-premises (simulated in AWS)
aws storagegateway activate-gateway \
  --activation-key <key> \
  --gateway-name MyFileGateway \
  --gateway-type FILE_S3 \
  --gateway-timezone GMT
\`\`\`

### Step 2: Configure DataSync
\`\`\`bash
# Create DataSync agent
aws datasync create-agent --name MyAgent --activation-key <key>

# Create location for source (on-premises)
aws datasync create-location-s3 --s3-bucket-arn <source-bucket>

# Create location for destination (S3)
aws datasync create-location-s3 --s3-bucket-arn <dest-bucket>

# Create task
aws datasync create-task --source-location-arn <source-arn> --destination-location-arn <dest-arn>
\`\`\`

### Step 3: Compare Transfer Options
Research and document the differences between:
- Snowcone (8TB)
- Snowball Edge (80TB)
- Snowmobile (100PB)
- DataSync (online)
- Direct Connect (dedicated connection)

## Success Criteria
- [ ] File Gateway configured (can be simulated)
- [ ] DataSync task created
- [ ] Understanding of when to use each transfer option
- [ ] Screenshots of configuration
`,
  },

  // SECTION 17: Decoupling Applications (SQS/SNS)
  {
    sectionNumber: 17,
    title: "SQS and SNS: Message Queues and Pub/Sub",
    description:
      "Build decoupled applications using SQS queues and SNS topics.",
    requirements: "AWS account with SQS, SNS access",
    deliverables: ["screenshot", "githubUrl", "notes"],
    estimatedTime: "30 min",
    difficulty: "Intermediate",
    instructions: `# Lab 17: SQS and SNS

## Objective
Implement message queuing and pub/sub patterns for decoupled architectures.

## Steps

### Step 1: Create SQS Queue
\`\`\`bash
# Standard Queue
aws sqs create-queue --queue-name MyStandardQueue

# FIFO Queue (ordered, exactly-once)
aws sqs create-queue --queue-name MyFifoQueue.fifo --attributes FifoQueue=true
\`\`\`

### Step 2: Send and Receive Messages
\`\`\`bash
# Send message
aws sqs send-message --queue-url <queue-url> --message-body "Hello World"

# Receive message
aws sqs receive-message --queue-url <queue-url> --max-number-of-messages 10

# Delete message after processing
aws sqs delete-message --queue-url <queue-url> --receipt-handle <receipt-handle>
\`\`\`

### Step 3: Configure Dead Letter Queue
\`\`\`bash
# Create DLQ
aws sqs create-queue --queue-name MyDLQ

# Set redrive policy on main queue
aws sqs set-queue-attributes \
  --queue-url <main-queue-url> \
  --attributes '{
    "RedrivePolicy": "{\\"deadLetterTargetArn\\":\\"<dlq-arn>\\",\\"maxReceiveCount\\":3}"
  }'
\`\`\`

### Step 4: Create SNS Topic
\`\`\`bash
aws sns create-topic --name MyTopic

# Subscribe email endpoint
aws sns subscribe --topic-arn <topic-arn> --protocol email --notification-endpoint user@example.com

# Subscribe SQS queue to topic
aws sns subscribe --topic-arn <topic-arn> --protocol sqs --notification-endpoint <queue-arn>

# Publish message
aws sns publish --topic-arn <topic-arn> --message "Hello Subscribers"
\`\`\`

### Step 5: Fan-out Pattern
\`\`\`bash
# One SNS topic, multiple SQS subscribers
# Useful for parallel processing of same event
\`\`\`

## Success Criteria
- [ ] SQS queue created and tested
- [ ] Dead Letter Queue configured
- [ ] SNS topic with multiple subscribers
- [ ] Fan-out pattern implemented
- [ ] Screenshots of messages
- [ ] GitHub repo with sample code
`,
  },

  // SECTION 18: Containers (ECS)
  {
    sectionNumber: 18,
    title: "ECS: Running Containers on AWS",
    description: "Deploy containerized applications using ECS Fargate and ECR.",
    requirements: "AWS account with ECS, ECR access. Docker installed locally.",
    deliverables: ["screenshot", "liveUrl", "githubUrl", "notes"],
    estimatedTime: "40 min",
    difficulty: "Advanced",
    instructions: `# Lab 18: ECS Containers

## Objective
Deploy a Docker container to ECS Fargate (serverless containers).

## Steps

### Step 1: Create Docker Image
\`\`\`bash
# Create Dockerfile
cat > Dockerfile << 'EOF'
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/
EXPOSE 80
EOF

# Create index.html
echo '<h1>ECS Fargate Demo</h1>' > index.html

# Build image
docker build -t my-app .
\`\`\`

### Step 2: Push to ECR
\`\`\`bash
# Create repository
aws ecr create-repository --repository-name my-app

# Login to ECR
aws ecr get-login-password | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Tag and push
docker tag my-app:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/my-app:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/my-app:latest
\`\`\`

### Step 3: Create ECS Cluster
\`\`\`bash
aws ecs create-cluster --cluster-name MyCluster
\`\`\`

### Step 4: Register Task Definition
\`\`\`bash
cat > task-definition.json << EOF
{
  "family": "my-app",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [{
    "name": "my-app",
    "image": "<account-id>.dkr.ecr.us-east-1.amazonaws.com/my-app:latest",
    "portMappings": [{
      "containerPort": 80,
      "protocol": "tcp"
    }]
  }]
}
EOF

aws ecs register-task-definition --cli-input-json file://task-definition.json
\`\`\`

### Step 5: Create Service
\`\`\`bash
aws ecs create-service \
  --cluster MyCluster \
  --service-name my-app-service \
  --task-definition my-app \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxxxx],securityGroups=[sg-xxxxx],assignPublicIp=ENABLED}"
\`\`\`

## Success Criteria
- [ ] Docker image built and pushed to ECR
- [ ] ECS task definition created
- [ ] Service running with 2+ tasks
- [ ] Application accessible via public IP
- [ ] Screenshots of ECS console
- [ ] Live application URL
- [ ] GitHub repo with Dockerfile
`,
  },

  // SECTION 19: Serverless (Lambda)
  {
    sectionNumber: 19,
    title: "Lambda Functions and API Gateway",
    description:
      "Create serverless functions with Lambda and expose them via API Gateway.",
    requirements: "AWS account with Lambda, API Gateway access",
    deliverables: ["screenshot", "liveUrl", "githubUrl", "notes"],
    estimatedTime: "30 min",
    difficulty: "Intermediate",
    instructions: `# Lab 19: Serverless Lambda

## Objective
Build serverless APIs using Lambda and API Gateway.

## Steps

### Step 1: Create Lambda Function
\`\`\`bash
# Create Python function
cat > lambda_function.py << 'EOF'
import json

def lambda_handler(event, context):
    return {
        'statusCode': 200,
        'body': json.dumps({
            'message': 'Hello from Lambda!',
            'event': event
        })
    }
EOF

# Zip and create function
zip function.zip lambda_function.py

aws lambda create-function \
  --function-name hello-lambda \
  --runtime python3.9 \
  --role <execution-role-arn> \
  --handler lambda_function.lambda_handler \
  --zip-file fileb://function.zip
\`\`\`

### Step 2: Test Lambda
\`\`\`bash
aws lambda invoke --function-name hello-lambda output.json
cat output.json
\`\`\`

### Step 3: Create API Gateway
\`\`\`bash
# Create REST API
aws apigateway create-rest-api --name MyAPI

# Get root resource ID
aws apigateway get-resources --rest-api-id <api-id>

# Create resource (/hello)
aws apigateway create-resource \
  --rest-api-id <api-id> \
  --parent-id <root-id> \
  --path-part hello

# Create method (GET)
aws apigateway put-method \
  --rest-api-id <api-id> \
  --resource-id <resource-id> \
  --http-method GET \
  --authorization-type NONE

# Integrate with Lambda
aws apigateway put-integration \
  --rest-api-id <api-id> \
  --resource-id <resource-id> \
  --http-method GET \
  --type AWS_PROXY \
  --integration-http-method POST \
  --uri arn:aws:apigateway:<region>:lambda:path/2015-03-31/functions/<lambda-arn>/invocations

# Deploy API
aws apigateway create-deployment \
  --rest-api-id <api-id> \
  --stage-name prod
\`\`\`

### Step 4: Add Lambda Permissions
\`\`\`bash
aws lambda add-permission \
  --function-name hello-lambda \
  --statement-id api-gateway \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:<region>:<account-id>:<api-id>/*/GET/hello"
\`\`\`

## Success Criteria
- [ ] Lambda function created and tested
- [ ] API Gateway endpoint created
- [ ] API returns JSON response
- [ ] Screenshots of Lambda logs
- [ ] Live API URL
- [ ] GitHub repo with Lambda code
`,
  },

  // SECTION 20: Serverless Architecture
  {
    sectionNumber: 20,
    title: "Complete Serverless Application",
    description:
      "Build an end-to-end serverless app with Cognito, API Gateway, Lambda, and DynamoDB.",
    requirements:
      "AWS account with Cognito, API Gateway, Lambda, DynamoDB access",
    deliverables: ["screenshot", "liveUrl", "githubUrl", "notes"],
    estimatedTime: "45 min",
    difficulty: "Advanced",
    instructions: `# Lab 20: Complete Serverless App

## Objective
Build a full-stack serverless application with authentication.

## Architecture
- Cognito (User authentication)
- API Gateway (REST endpoints)
- Lambda (Business logic)
- DynamoDB (Data storage)
- S3 + CloudFront (Frontend hosting)

## Steps

### Step 1: Create Cognito User Pool
\`\`\`bash
aws cognito-idp create-user-pool --pool-name MyUserPool
aws cognito-idp create-user-pool-client --user-pool-id <pool-id> --client-name MyAppClient --no-generate-secret
\`\`\`

### Step 2: Create DynamoDB Table
\`\`\`bash
aws dynamodb create-table \
  --table-name Items \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST
\`\`\`

### Step 3: Create Lambda Functions
\`\`\`python
# create-item.py
import json
import boto3
import uuid

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Items')

def lambda_handler(event, context):
    body = json.loads(event['body'])
    item = {
        'id': str(uuid.uuid4()),
        'data': body.get('data'),
        'createdAt': context.timestamp
    }
    table.put_item(Item=item)
    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps(item)
    }
\`\`\`

### Step 4: Create API Gateway (with Cognito Authorizer)
\`\`\`bash
# Create REST API
# Create authorizer using Cognito User Pool
# Create POST /items endpoint
\`\`\`

### Step 5: Deploy Frontend to S3 + CloudFront
\`\`\`html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Serverless App</title>
    <script src="https://sdk.amazonaws.com/js/aws-sdk-2.1000.0.min.js"></script>
</head>
<body>
    <h1>Serverless Application</h1>
    <div id="app"></div>
</body>
</html>
\`\`\`

## Success Criteria
- [ ] Cognito authentication working
- [ ] API Gateway endpoints protected
- [ ] Lambda functions working
- [ ] DynamoDB storing data
- [ ] Frontend deployed and working
- [ ] Screenshots of working app
- [ ] Live application URL
- [ ] GitHub repo with all code
`,
  },

  // SECTION 21: Databases
  {
    sectionNumber: 21,
    title: "Database Selection and Migration",
    description:
      "Choose the right database for different workloads and migrate data using DMS.",
    requirements: "AWS account with RDS, DynamoDB, DMS access",
    deliverables: ["screenshot", "notes"],
    estimatedTime: "25 min",
    difficulty: "Intermediate",
    instructions: `# Lab 21: Database Selection

## Objective
Learn when to use different AWS databases and how to migrate between them.

## Database Comparison Matrix
Create a decision matrix for:

| Use Case | Primary DB | Secondary/ Cache |
|----------|------------|------------------|
| E-commerce website (orders, inventory) | Aurora MySQL | ElastiCache (Redis) |
| Real-time leaderboard | DynamoDB | ElastiCache (Redis) |
| Social network graph | Neptune | - |
| Document store (JSON) | DocumentDB | - |
| Time-series IoT data | Timestream | - |
| Data warehouse (BI) | Redshift | - |
| Search functionality | OpenSearch | - |
| High-volume key-value | DynamoDB | - |

## Steps

### Step 1: Launch Source Database (MySQL)
\`\`\`bash
aws rds create-db-instance \
  --db-instance-identifier source-mysql \
  --db-instance-class db.t3.micro \
  --engine mysql \
  --allocated-storage 20 \
  --master-username admin \
  --master-user-password YourPassword123
\`\`\`

### Step 2: Load Sample Data
\`\`\`sql
CREATE DATABASE sampledb;
USE sampledb;
CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(100));
INSERT INTO users VALUES (1, 'Alice'), (2, 'Bob');
\`\`\`

### Step 3: Create Target DynamoDB Table
\`\`\`bash
aws dynamodb create-table \
  --table-name Users \
  --attribute-definitions AttributeName=id,AttributeType=N \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST
\`\`\`

### Step 4: Migrate Using DMS
\`\`\`bash
# Create replication instance
aws dms create-replication-instance \
  --replication-instance-identifier my-replication-instance \
  --replication-instance-class dms.t3.micro \
  --allocated-storage 50

# Create source and target endpoints
# Create replication task
# Start migration
\`\`\`

### Step 5: Compare Performance
Run benchmark queries on both databases and compare latency.

## Success Criteria
- [ ] Decision matrix completed
- [ ] Source database with sample data
- [ ] Target table created
- [ ] DMS task completed successfully
- [ ] Screenshots of migration
- [ ] Comparison notes
`,
  },

  // SECTION 22: Data & Analytics
  {
    sectionNumber: 22,
    title: "Data Analytics with Athena and Glue",
    description: "Query data lakes using Athena and transform data with Glue.",
    requirements: "AWS account with S3, Athena, Glue access",
    deliverables: ["screenshot", "notes"],
    estimatedTime: "25 min",
    difficulty: "Intermediate",
    instructions: `# Lab 22: Data Analytics

## Objective
Query data stored in S3 using serverless Athena and transform with Glue.

## Steps

### Step 1: Upload Sample Data to S3
\`\`\`bash
# Create sample CSV
cat > sales.csv << EOF
date,product,amount,region
2024-01-01,Widget,100,North
2024-01-01,Gadget,150,South
2024-01-02,Widget,200,North
2024-01-02,Gadget,75,South
EOF

aws s3 cp sales.csv s3://my-analytics-bucket/data/
\`\`\`

### Step 2: Create Glue Crawler
\`\`\`bash
aws glue create-crawler \
  --name sales-crawler \
  --role <glue-role-arn> \
  --database-name sales_db \
  --targets '{"S3Targets":[{"Path":"s3://my-analytics-bucket/data/"}]}'

aws glue start-crawler --name sales-crawler
\`\`\`

### Step 3: Query with Athena
\`\`\`sql
-- Total sales by product
SELECT product, SUM(amount) as total_sales
FROM sales
GROUP BY product;

-- Sales by date
SELECT date, SUM(amount) as daily_sales
FROM sales
GROUP BY date
ORDER BY date;

-- Region performance
SELECT region, COUNT(*) as transactions, SUM(amount) as revenue
FROM sales
GROUP BY region;
\`\`\`

### Step 4: Create Glue ETL Job
\`\`\`python
# Transform data (e.g., add tax calculation)
import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job

args = getResolvedOptions(sys.argv, ['JOB_NAME'])
sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)
job.init(args['JOB_NAME'], args)

# Read from source
source_df = glueContext.create_dynamic_frame.from_catalog(
    database="sales_db",
    table_name="sales"
)

# Transform (add tax column)
from pyspark.sql.functions import col
transformed_df = source_df.toDF()
transformed_df = transformed_df.withColumn('tax', col('amount') * 0.1)

# Write to destination
glueContext.write_dynamic_frame.from_options(
    frame=DynamicFrame.fromDF(transformed_df, glueContext, "transformed"),
    connection_type="s3",
    connection_options={"path": "s3://my-analytics-bucket/processed/"},
    format="parquet"
)

job.commit()
\`\`\`

## Success Criteria
- [ ] Sample data uploaded to S3
- [ ] Glue crawler created table
- [ ] Athena queries return results
- [ ] Screenshots of query results
- [ ] ETL job creates transformed data
`,
  },

  // SECTION 23: Machine Learning
  {
    sectionNumber: 23,
    title: "AI/ML Services: Rekognition and Comprehend",
    description: "Use AWS AI services for image analysis and text processing.",
    requirements: "AWS account with Rekognition, Comprehend access",
    deliverables: ["screenshot", "notes"],
    estimatedTime: "20 min",
    difficulty: "Beginner",
    instructions: `# Lab 23: AI/ML Services

## Objective
Use pre-trained AI services for image and text analysis.

## Steps

### Step 1: Analyze Image with Rekognition
\`\`\`bash
# Download sample image
curl -o image.jpg https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0

# Detect labels
aws rekognition detect-labels \
  --image '{"S3Object":{"Bucket":"my-images","Name":"image.jpg"}}'

# Detect faces
aws rekognition detect-faces \
  --image '{"S3Object":{"Bucket":"my-images","Name":"face.jpg"}}' \
  --attributes ALL

# Compare faces
aws rekognition compare-faces \
  --source-image '{"S3Object":{"Bucket":"my-images","Name":"source.jpg"}}' \
  --target-image '{"S3Object":{"Bucket":"my-images","Name":"target.jpg"}}'

# Detect text (OCR)
aws rekognition detect-text \
  --image '{"S3Object":{"Bucket":"my-images","Name":"document.jpg"}}'
\`\`\`

### Step 2: Analyze Text with Comprehend
\`\`\`bash
# Detect sentiment
aws comprehend detect-sentiment \
  --text "I love AWS services, they are amazing!" \
  --language-code en

# Detect entities (people, places, dates)
aws comprehend detect-entities \
  --text "John visited New York on December 15th" \
  --language-code en

# Detect key phrases
aws comprehend detect-key-phrases \
  --text "The quick brown fox jumps over the lazy dog" \
  --language-code en

# Detect language
aws comprehend detect-dominant-language \
  --text "Bonjour le monde"
\`\`\`

### Step 3: Translate with Translate
\`\`\`bash
# Translate text
aws translate translate-text \
  --text "Hello, how are you?" \
  --source-language-code en \
  --target-language-code es
\`\`\`

### Step 4: Generate Speech with Polly
\`\`\`bash
aws polly synthesize-speech \
  --text "Welcome to AWS Machine Learning" \
  --output-format mp3 \
  --voice-id Joanna \
  output.mp3
\`\`\`

## Success Criteria
- [ ] Image analysis with Rekognition
- [ ] Text sentiment analysis
- [ ] Translation working
- [ ] Speech generated
- [ ] Screenshots of results
`,
  },

  // SECTION 24: Monitoring (CloudWatch/CloudTrail/Config)
  {
    sectionNumber: 24,
    title: "AWS Monitoring: CloudWatch, CloudTrail, and Config",
    description: "Set up comprehensive monitoring, auditing, and compliance.",
    requirements: "AWS account with CloudWatch, CloudTrail, Config access",
    deliverables: ["screenshot", "notes"],
    estimatedTime: "30 min",
    difficulty: "Intermediate",
    instructions: `# Lab 24: AWS Monitoring

## Objective
Implement complete observability stack.

## Steps

### Step 1: Configure CloudWatch Metrics
\`\`\`bash
# Create custom metric
aws cloudwatch put-metric-data \
  --namespace "MyApp" \
  --metric-name "RequestCount" \
  --value 100 \
  --unit Count

# Create dashboard
aws cloudwatch put-dashboard \
  --dashboard-name MyDashboard \
  --dashboard-body '{
    "widgets": [{
      "type": "metric",
      "properties": {
        "metrics": [
          ["AWS/EC2", "CPUUtilization"],
          ["AWS/EC2", "NetworkIn"]
        ],
        "period": 300,
        "stat": "Average",
        "region": "us-east-1",
        "title": "EC2 Metrics"
      }
    }]
  }'
\`\`\`

### Step 2: Create CloudWatch Alarm
\`\`\`bash
aws cloudwatch put-metric-alarm \
  --alarm-name HighCPU \
  --alarm-description "Alert when CPU > 80%" \
  --metric-name CPUUtilization \
  --namespace AWS/EC2 \
  --statistic Average \
  --period 300 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 2 \
  --alarm-actions <sns-topic-arn>
\`\`\`

### Step 3: Configure CloudTrail
\`\`\`bash
# Create S3 bucket for logs
aws s3 mb s3://my-cloudtrail-logs --region us-east-1

# Create trail
aws cloudtrail create-trail \
  --name MyTrail \
  --s3-bucket-name my-cloudtrail-logs \
  --is-multi-region-trail

# Start logging
aws cloudtrail start-logging --name MyTrail

# Lookup events
aws cloudtrail lookup-events \
  --lookup-attributes AttributeKey=EventName,AttributeValue=CreateBucket
\`\`\`

### Step 4: Configure AWS Config
\`\`\`bash
# Enable Config recorder
aws configservice put-configuration-recorder \
  --configuration-recorder name=default,roleARN=<config-role-arn>

# Create delivery channel
aws configservice put-delivery-channel \
  --delivery-channel name=default,s3BucketName=my-config-bucket

# Start recording
aws configservice start-configuration-recorder --configuration-recorder-name default

# Create config rule (e.g., S3 bucket public read prohibited)
aws configservice put-config-rule \
  --config-rule '{
    "ConfigRuleName": "s3-bucket-public-read-prohibited",
    "Source": {
      "Owner": "AWS",
      "SourceIdentifier": "S3_BUCKET_PUBLIC_READ_PROHIBITED"
    }
  }'
\`\`\`

## Success Criteria
- [ ] CloudWatch dashboard created
- [ ] Alarms configured
- [ ] CloudTrail logging API calls
- [ ] Config rules evaluating resources
- [ ] Screenshots of monitoring dashboards
`,
  },

  // SECTION 25: Advanced Identity
  {
    sectionNumber: 25,
    title: "Advanced Identity: Organizations and SSO",
    description:
      "Configure multi-account access with AWS Organizations and IAM Identity Center.",
    requirements: "AWS account with Organizations, IAM Identity Center access",
    deliverables: ["screenshot", "notes"],
    estimatedTime: "25 min",
    difficulty: "Advanced",
    instructions: `# Lab 25: Advanced Identity

## Objective
Set up multi-account governance and centralized authentication.

## Steps

### Step 1: Create AWS Organization
\`\`\`bash
aws organizations create-organization --feature-set ALL

# Create organizational units (OUs)
aws organizations create-organizational-unit --parent-id <root-id> --name Production
aws organizations create-organizational-unit --parent-id <root-id> --name Development

# Create member accounts
aws organizations create-account --email admin@example.com --account-name ProdAccount
\`\`\`

### Step 2: Create Service Control Policies (SCPs)
\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Deny",
    "Action": ["ec2:RunInstances", "rds:CreateDBInstance"],
    "Resource": "*",
    "Condition": {
      "StringNotEquals": {
        "ec2:InstanceType": ["t2.micro", "t3.micro"]
      }
    }
  }]
}
\`\`\`

### Step 3: Configure IAM Identity Center (SSO)
\`\`\`bash
# Enable SSO
aws sso-admin create-instance --name MySSOInstance

# Create permission set
aws sso-admin create-permission-set \
  --instance-arn <instance-arn> \
  --name PowerUserAccess \
  --session-duration PT2H

# Assign users to accounts
aws sso-admin create-account-assignment \
  --instance-arn <instance-arn> \
  --target-id <account-id> \
  --target-type AWS_ACCOUNT \
  --permission-set-arn <permission-set-arn> \
  --principal-id <user-id> \
  --principal-type USER
\`\`\`

### Step 4: Configure IAM Identity Center with Active Directory (optional)
\`\`\`bash
# Connect to AWS Managed Microsoft AD
# Configure automatic sync
# Test user access
\`\`\`

## Success Criteria
- [ ] Organization created with OUs
- [ ] SCPs applied to restrict services
- [ ] IAM Identity Center configured
- [ ] Users can assume roles via SSO portal
- [ ] Screenshots of SSO portal
`,
  },

  // SECTION 26: Security & Encryption
  {
    sectionNumber: 26,
    title: "Security: Encryption, WAF, and Shield",
    description:
      "Implement encryption, web application firewall, and DDoS protection.",
    requirements: "AWS account with KMS, WAF, Shield access",
    deliverables: ["screenshot", "notes"],
    estimatedTime: "30 min",
    difficulty: "Intermediate",
    instructions: `# Lab 26: Security

## Objective
Implement comprehensive security controls.

## Steps

### Step 1: KMS Key Management
\`\`\`bash
# Create symmetric key
aws kms create-key --description "Application encryption key"

# Create alias
aws kms create-alias --alias-name alias/app-key --target-key-id <key-id>

# Encrypt data
aws kms encrypt \
  --key-id alias/app-key \
  --plaintext "Secret data" \
  --encryption-context Context=Test \
  --output text --query CiphertextBlob > encrypted.txt

# Decrypt data
aws kms decrypt \
  --ciphertext-blob fileb://encrypted.txt \
  --encryption-context Context=Test \
  --output text --query Plaintext
\`\`\`

### Step 2: Configure WAF Web ACL
\`\`\`bash
# Create rate-based rule (block IPs with >100 requests/5min)
aws wafv2 create-rule-group \
  --name RateLimitRule \
  --scope REGIONAL \
  --capacity 10 \
  --visibility-config SampledRequestsEnabled=true,CloudWatchMetricsEnabled=true,MetricName=RateLimitRule

# Create IP set (block specific IPs)
aws wafv2 create-ip-set \
  --name BlockedIPs \
  --scope REGIONAL \
  --ip-address-version IPV4 \
  --addresses ['192.0.2.0/24']

# Create Web ACL
aws wafv2 create-web-acl \
  --name MyWebACL \
  --scope REGIONAL \
  --default-action Allow={} \
  --visibility-config SampledRequestsEnabled=true,CloudWatchMetricsEnabled=true,MetricName=MyWebACL
\`\`\`

### Step 3: Configure Shield Advanced (if available)
\`\`\`bash
# Enable Shield Advanced protection
aws shield create-protection \
  --name ELB-Protection \
  --resource-arn <alb-arn>
\`\`\`

### Step 4: Secrets Manager
\`\`\`bash
# Store database password
aws secretsmanager create-secret \
  --name db-password \
  --secret-string '{"username":"admin","password":"SecurePass123"}'

# Retrieve secret
aws secretsmanager get-secret-value --secret-id db-password

# Rotate secret (requires Lambda)
aws secretsmanager rotate-secret --secret-id db-password
\`\`\`

## Success Criteria
- [ ] KMS keys created and used
- [ ] WAF ACL configured with rules
- [ ] Secrets Manager storing credentials
- [ ] Screenshots of security configuration
`,
  },

  // SECTION 27: VPC Networking
  {
    sectionNumber: 27,
    title: "VPC: Custom Networking",
    description:
      "Build a custom VPC with public/private subnets, NAT Gateway, and VPC Peering.",
    requirements: "AWS account with VPC, EC2 access",
    deliverables: ["screenshot", "liveUrl", "notes"],
    estimatedTime: "45 min",
    difficulty: "Advanced",
    instructions: `# Lab 27: VPC Networking

## Objective
Design and implement a production-ready VPC with proper networking.

## Steps

### Step 1: Create VPC and Subnets
\`\`\`bash
# Create VPC
aws ec2 create-vpc --cidr-block 10.0.0.0/16 --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=MyVPC}]'

# Create public subnets (in different AZs)
aws ec2 create-subnet --vpc-id <vpc-id> --cidr-block 10.0.1.0/24 --availability-zone us-east-1a --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=Public-1a}]'
aws ec2 create-subnet --vpc-id <vpc-id> --cidr-block 10.0.2.0/24 --availability-zone us-east-1b --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=Public-1b}]'

# Create private subnets
aws ec2 create-subnet --vpc-id <vpc-id> --cidr-block 10.0.11.0/24 --availability-zone us-east-1a --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=Private-1a}]'
aws ec2 create-subnet --vpc-id <vpc-id> --cidr-block 10.0.12.0/24 --availability-zone us-east-1b --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=Private-1b}]'
\`\`\`

### Step 2: Create Internet Gateway
\`\`\`bash
# Create and attach IGW
aws ec2 create-internet-gateway --tag-specifications 'ResourceType=internet-gateway,Tags=[{Key=Name,Value=MyIGW}]'
aws ec2 attach-internet-gateway --internet-gateway-id <igw-id> --vpc-id <vpc-id>

# Create route table for public subnets
aws ec2 create-route-table --vpc-id <vpc-id> --tag-specifications 'ResourceType=route-table,Tags=[{Key=Name,Value=Public-RT}]'
aws ec2 create-route --route-table-id <rtb-id> --destination-cidr-block 0.0.0.0/0 --gateway-id <igw-id>
aws ec2 associate-route-table --route-table-id <rtb-id> --subnet-id <public-subnet-1a-id>
aws ec2 associate-route-table --route-table-id <rtb-id> --subnet-id <public-subnet-1b-id>
\`\`\`

### Step 3: Create NAT Gateway (for private subnets)
\`\`\`bash
# Allocate Elastic IP for NAT
aws ec2 allocate-address --domain vpc

# Create NAT Gateway
aws ec2 create-nat-gateway --subnet-id <public-subnet-1a-id> --allocation-id <eip-allocation-id>

# Create private route table
aws ec2 create-route-table --vpc-id <vpc-id> --tag-specifications 'ResourceType=route-table,Tags=[{Key=Name,Value=Private-RT}]'
aws ec2 create-route --route-table-id <private-rtb-id> --destination-cidr-block 0.0.0.0/0 --nat-gateway-id <nat-gw-id>
aws ec2 associate-route-table --route-table-id <private-rtb-id> --subnet-id <private-subnet-1a-id>
aws ec2 associate-route-table --route-table-id <private-rtb-id> --subnet-id <private-subnet-1b-id>
\`\`\`

### Step 4: Create VPC Endpoint (for S3)
\`\`\`bash
aws ec2 create-vpc-endpoint \
  --vpc-id <vpc-id> \
  --service-name com.amazonaws.us-east-1.s3 \
  --route-table-ids <private-rtb-id>
\`\`\`

### Step 5: Test Connectivity
\`\`\`bash
# Launch EC2 in public subnet (should have internet)
aws ec2 run-instances --image-id ami-0c55b159cbfafe1f0 --instance-type t2.micro --subnet-id <public-subnet-id>

# Launch EC2 in private subnet (should have NAT internet via NAT Gateway)
aws ec2 run-instances --image-id ami-0c55b159cbfafe1f0 --instance-type t2.micro --subnet-id <private-subnet-id>

# SSH to public instance, then SSH to private instance (bastion pattern)
\`\`\`

### Step 6: Create VPC Peering (optional)
\`\`\`bash
# Create peering connection between VPCs
aws ec2 create-vpc-peering-connection --vpc-id <vpc1-id> --peer-vpc-id <vpc2-id>

# Accept request
aws ec2 accept-vpc-peering-connection --vpc-peering-connection-id <pcx-id>

# Add routes to both route tables
\`\`\`

## Success Criteria
- [ ] VPC with CIDR 10.0.0.0/16
- [ ] 2 public + 2 private subnets across AZs
- [ ] Internet Gateway + NAT Gateway configured
- [ ] Public instances have internet, private instances use NAT
- [ ] VPC endpoints for S3
- [ ] Screenshots of VPC architecture
- [ ] Working bastion host connection
`,
  },

  // SECTION 28: Disaster Recovery
  {
    sectionNumber: 28,
    title: "Disaster Recovery and Backup",
    description: "Implement backup strategies and disaster recovery plans.",
    requirements: "AWS account with Backup, DRS access",
    deliverables: ["screenshot", "notes"],
    estimatedTime: "25 min",
    difficulty: "Intermediate",
    instructions: `# Lab 28: Disaster Recovery

## Objective
Create comprehensive backup and DR strategies.

## Steps

### Step 1: Configure AWS Backup
\`\`\`bash
# Create backup plan
aws backup create-backup-plan \
  --backup-plan '{
    "BackupPlanName": "DailyBackupPlan",
    "Rules": [{
      "RuleName": "DailyBackupRule",
      "TargetBackupVaultName": "Default",
      "ScheduleExpression": "cron(0 2 * * ? *)",
      "StartWindowMinutes": 60,
      "CompletionWindowMinutes": 120,
      "Lifecycle": {
        "DeleteAfterDays": 30
      }
    }]
  }'

# Assign resources to plan
aws backup create-backup-selection \
  --backup-plan-id <plan-id> \
  --backup-selection '{
    "SelectionName": "ProtectEC2",
    "IamRoleArn": "arn:aws:iam::<account-id>:role/service-role/AWSBackupDefaultServiceRole",
    "Resources": ["arn:aws:ec2:*:*:instance/*"]
  }'
\`\`\`

### Step 2: Create DRS (Elastic Disaster Recovery)
\`\`\`bash
# Install agent on source server (on-premises)
# Configure replication settings
# Test failover to AWS
\`\`\`

### Step 3: Create Multi-AZ RDS
\`\`\`bash
# Launch RDS with Multi-AZ
aws rds create-db-instance \
  --db-instance-identifier my-multi-az-db \
  --db-instance-class db.t3.micro \
  --engine mysql \
  --multi-az \
  --allocated-storage 20
\`\`\`

### Step 4: Test Failover
\`\`\`bash
# Simulate AZ failure (reboot with failover)
aws rds reboot-db-instance --db-instance-identifier my-multi-az-db --force-failover
\`\`\`

### Step 5: Create DR Strategy Document
Document your DR strategy including:
- RTO (Recovery Time Objective)
- RPO (Recovery Point Objective)
- Backup frequency
- Failover procedures
- Testing schedule

## Success Criteria
- [ ] Backup plans created
- [ ] Resources assigned to backup
- [ ] Multi-AZ RDS configured
- [ ] Failover tested
- [ ] DR strategy documented
- [ ] Screenshots of backup plans
`,
  },

  // SECTION 29: Advanced Architecture
  {
    sectionNumber: 29,
    title: "Advanced Architecture Patterns",
    description: "Implement advanced patterns: event-driven, caching, and HPC.",
    requirements: "AWS account with relevant services",
    deliverables: ["screenshot", "githubUrl", "notes"],
    estimatedTime: "35 min",
    difficulty: "Advanced",
    instructions: `# Lab 29: Advanced Architecture

## Objective
Implement advanced architectural patterns.

## Steps

### Step 1: Event-Driven Architecture
\`\`\`bash
# S3 event triggers Lambda
aws s3api put-bucket-notification-configuration \
  --bucket my-bucket \
  --notification-configuration '{
    "LambdaFunctionConfigurations": [{
      "LambdaFunctionArn": "<lambda-arn>",
      "Events": ["s3:ObjectCreated:*"]
    }]
  }'
\`\`\`

### Step 2: Caching Strategy
\`\`\`bash
# Launch ElastiCache
aws elasticache create-cache-cluster \
  --cache-cluster-id my-cache \
  --cache-node-type cache.t3.micro \
  --engine redis \
  --num-cache-nodes 1

# Implement cache-aside pattern
# Code example (Python):
import redis
import boto3

r = redis.Redis(host='my-cache.xxxxx.cache.amazonaws.com', port=6379)

def get_user(user_id):
    # Check cache first
    cached = r.get(f"user:{user_id}")
    if cached:
        return cached
    
    # Cache miss - query database
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Users')
    response = table.get_item(Key={'id': user_id})
    
    # Store in cache
    r.setex(f"user:{user_id}", 3600, response['Item'])
    return response['Item']
\`\`\`

### Step 3: High Performance Computing (HPC)
\`\`\`bash
# Launch compute-optimized instances
aws ec2 run-instances \
  --image-id ami-0c55b159cbfafe1f0 \
  --instance-type c5n.large \
  --placement GroupName=ClusterGroup \
  --count 4

# Use placement groups for low latency
# Configure EFA (Elastic Fabric Adapter) for high-throughput networking
\`\`\`

### Step 4: Blue-Green Deployment
\`\`\`bash
# Blue environment (current)
# Green environment (new version)
# Weighted routing policy for gradual rollout
# Option to rollback
\`\`\`

## Success Criteria
- [ ] Event-driven trigger working
- [ ] Caching implemented and tested
- [ ] HPC cluster configured
- [ ] Blue-green deployment strategy documented
- [ ] Screenshots of architecture
- [ ] GitHub repo with code
`,
  },

  // SECTION 30: Other Services
  {
    sectionNumber: 30,
    title: "Additional AWS Services",
    description: "Explore CloudFormation, SES, Amplify, and other services.",
    requirements: "AWS account with various service access",
    deliverables: ["screenshot", "githubUrl", "notes"],
    estimatedTime: "25 min",
    difficulty: "Intermediate",
    instructions: `# Lab 30: Other Services

## Objective
Learn additional AWS services: CloudFormation, SES, Amplify, and Batch.

## Steps

### Step 1: CloudFormation Template
\`\`\`yaml
# template.yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'S3 bucket with website hosting'

Resources:
  WebsiteBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub "\${AWS::StackName}-website"
      WebsiteConfiguration:
        IndexDocument: index.html
        ErrorDocument: error.html
      VersioningConfiguration:
        Status: Enabled

  BucketPolicy:
    Type: AWS::S3::BucketPolicy
    Properties:
      Bucket: !Ref WebsiteBucket
      PolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal: '*'
            Action: s3:GetObject
            Resource: !Sub "\${WebsiteBucket.ARN}/*"

Outputs:
  WebsiteURL:
    Value: !GetAtt WebsiteBucket.WebsiteURL
    Description: URL for website
\`\`\`

### Step 2: Deploy CloudFormation
\`\`\`bash
aws cloudformation create-stack \
  --stack-name my-website \
  --template-body file://template.yaml

aws cloudformation describe-stacks --stack-name my-website
\`\`\`

### Step 3: Send Email with SES (Sandbox mode)
\`\`\`bash
# Verify email address
aws ses verify-email-identity --email-address your-email@example.com

# Send test email
aws ses send-email \
  --from your-email@example.com \
  --destination '{"ToAddresses":["recipient@example.com"]}' \
  --message '{"Subject":{"Data":"Test Email"},"Body":{"Text":{"Data":"Hello from SES!"}}}'
\`\`\`

### Step 4: Deploy App with Amplify
\`\`\`bash
# Initialize Amplify
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
\`\`\`

### Step 5: AWS Batch Job
\`\`\`bash
# Create compute environment
aws batch create-compute-environment \
  --compute-environment-name my-batch-env \
  --type MANAGED \
  --service-role <batch-role-arn> \
  --compute-resources type=EC2,minvCpus=0,maxvCpus=4,desiredvCpus=0,instanceTypes=t2.micro,subnets=subnet-xxxxx

# Create job queue
aws batch create-job-queue \
  --job-queue-name my-queue \
  --state ENABLED \
  --priority 1 \
  --compute-environment-order order=1,computeEnvironment=my-batch-env

# Submit job
aws batch submit-job \
  --job-name test-job \
  --job-queue my-queue \
  --job-definition <job-def-arn>
\`\`\`

## Success Criteria
- [ ] CloudFormation stack deployed
- [ ] SES email sent
- [ ] Amplify app deployed
- [ ] Batch job runs successfully
- [ ] Screenshots of each service
- [ ] GitHub repo with CloudFormation template
`,
  },

  // SECTION 31: Whitepapers
  {
    sectionNumber: 31,
    title: "Well-Architected Framework",
    description:
      "Review AWS Well-Architected Framework and apply to your architecture.",
    requirements: "Well-Architected Framework whitepapers",
    deliverables: ["notes"],
    estimatedTime: "30 min",
    difficulty: "Beginner",
    instructions: `# Lab 31: Well-Architected Framework

## Objective
Understand and apply the 6 pillars of the Well-Architected Framework.

## Review the Whitepapers

Read the following AWS whitepapers:

1. **Well-Architected Framework**
   - https://aws.amazon.com/architecture/well-architected/

2. **Security Pillar**
   - https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/

3. **Reliability Pillar**
   - https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/

4. **Performance Efficiency Pillar**
   - https://docs.aws.amazon.com/wellarchitected/latest/performance-efficiency-pillar/

5. **Cost Optimization Pillar**
   - https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/

6. **Operational Excellence Pillar**
   - https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/

## Application Exercise

Review your previous lab architectures against each pillar:

### Security
- [ ] Are you using IAM roles instead of root user?
- [ ] Is encryption enabled at rest and in transit?
- [ ] Are security groups configured with least privilege?

### Reliability  
- [ ] Are resources deployed across multiple AZs?
- [ ] Are there backup and recovery plans?
- [ ] Are there health checks and auto-scaling?

### Performance Efficiency
- [ ] Are you using the right instance types?
- [ ] Is caching implemented where needed?
- [ ] Are there performance monitoring metrics?

### Cost Optimization
- [ ] Are you using right-sized resources?
- [ ] Is there a budget and cost monitoring?
- [ ] Are you using Spot/Reserved instances where appropriate?

### Operational Excellence
- [ ] Is infrastructure defined as code?
- [ ] Are there monitoring and alerting systems?
- [ ] Is there documentation of procedures?

### Sustainability
- [ ] Are resources optimized for energy efficiency?
- [ ] Is data lifecycle management implemented?

## Success Criteria
- [ ] Whitepapers reviewed
- [ ] Well-Architected review completed for your architecture
- [ ] Improvement plan documented
- [ ] Screenshots of Well-Architected Tool review
`,
  },

  // SECTION 32: Exam Preparation
  {
    sectionNumber: 32,
    title: "Practice Exam and Review",
    description: "Take practice exams and identify weak areas.",
    requirements: "Access to practice exams",
    deliverables: ["notes"],
    estimatedTime: "60 min",
    difficulty: "Beginner",
    instructions: `# Lab 32: Exam Preparation

## Objective
Assess exam readiness and identify knowledge gaps.

## Steps

### Step 1: Take Practice Exam
Take a full-length practice exam (65 questions, 130 minutes):
- TutorialsDojo
- Udemy practice exams
- AWS Official practice exam

### Step 2: Analyze Results
\`\`\`
Domain 1: Security (30%) - Score: __%
Domain 2: Resilient (26%) - Score: __%
Domain 3: Performance (24%) - Score: __%
Domain 4: Cost (20%) - Score: __%

Overall Score: __%
\`\`\`

### Step 3: Identify Weak Areas
List questions you got wrong and why:
| Question | Your Answer | Correct Answer | Why wrong |
|----------|-------------|----------------|-----------|
|          |             |                |           |

### Step 4: Create Study Plan
Based on weak areas, focus on:
- Review specific lessons
- Re-watch videos
- Do additional hands-on

### Step 5: Schedule Exam
When consistently scoring 80%+:
- Register on AWS Certification portal
- Choose Pearson VUE or PSI
- Schedule exam date

## Success Criteria
- [ ] Practice exam taken
- [ ] Results analyzed
- [ ] Weak areas identified
- [ ] Study plan created
- [ ] Exam scheduled
`,
  },

  // SECTION 33: Congratulations
  {
    sectionNumber: 33,
    title: "Celebrate and Next Steps",
    description:
      "Celebrate your achievement and plan your AWS certification journey.",
    requirements: "None",
    deliverables: ["notes"],
    estimatedTime: "10 min",
    difficulty: "Beginner",
    instructions: `# Lab 33: Congratulations!

## 🎉 You've Completed All 33 Labs!

You have demonstrated proficiency in:
- AWS Global Infrastructure
- IAM Security
- EC2 Compute
- Storage (EBS/EFS/S3)
- High Availability (ALB/ASG)
- Databases (RDS/DynamoDB)
- Networking (VPC/Route 53)
- Serverless (Lambda/API Gateway)
- Security (KMS/WAF/Shield)
- Monitoring (CloudWatch/CloudTrail)
- And much more!

## Next Steps

### AWS Certification Path

Now that you have SAA-C03 knowledge, consider:

1. **AWS Developer Associate (DVA-C02)**
   - Focus on SDK, API development
   - CI/CD pipelines
   - AWS Code services

2. **AWS SysOps Administrator (SOA-C02)**
   - Operations and monitoring focus
   - Deployment and automation
   - Incident response

3. **AWS DevOps Engineer (DOP-C02)**
   - CI/CD pipelines
   - Infrastructure as Code
   - Monitoring and logging

4. **AWS Security Specialty (SCS-C02)**
   - Deep security focus
   - Encryption and compliance
   - Identity and access management

### Build Your Portfolio

1. Deploy your 3 flagship projects
2. Document your labs on GitHub
3. Write blog posts about your journey
4. Connect with AWS community
5. Update your LinkedIn

## Success Criteria
- [ ] All 33 labs marked complete
- [ ] 387 lessons reviewed
- [ ] 3 flagship projects deployed
- [ ] Practice exam scores improving
- [ ] Certification scheduled

**Congratulations, AWS Solutions Architect! 🚀**
`,
  },
];

async function main() {
  console.log("🌱 Seeding 33 section labs...");

  let count = 0;
  for (const lab of labs) {
    await prisma.sectionLab.upsert({
      where: { sectionNumber: lab.sectionNumber },
      update: lab,
      create: lab,
    });
    count++;
    console.log(`   ✅ Lab ${lab.sectionNumber}: ${lab.title}`);
  }

  console.log(`\n✅ Seeded ${count} section labs successfully!`);
  console.log(`\n📌 Next steps:`);
  console.log(`   1. Run: npx prisma generate`);
  console.log(`   2. Restart dev server: npm run dev`);
  console.log(`   3. Visit: http://localhost:3000/labs`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
