-- CreateTable
CREATE TABLE "SectionLab" (
    "id" TEXT NOT NULL,
    "sectionNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT,
    "instructions" TEXT,
    "deliverables" TEXT[],
    "estimatedTime" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Not Started',
    "completedAt" TIMESTAMP(3),
    "screenshotUrl" TEXT,
    "liveUrl" TEXT,
    "githubUrl" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SectionLab_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SectionLab_sectionNumber_key" ON "SectionLab"("sectionNumber");
