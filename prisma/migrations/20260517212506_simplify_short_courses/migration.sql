-- CreateTable
CREATE TABLE "ShortCourse" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "provider" TEXT,
    "type" TEXT,
    "status" TEXT DEFAULT 'Completed',
    "certificateUrl" TEXT,
    "credentialId" TEXT,
    "notes" TEXT,
    "tags" TEXT[],
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShortCourse_pkey" PRIMARY KEY ("id")
);
