-- CreateTable
CREATE TABLE "TopicNote" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TopicNote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TopicNote_courseId_idx" ON "TopicNote"("courseId");
