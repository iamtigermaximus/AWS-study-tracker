/*
  Warnings:

  - You are about to drop the column `topicNumber` on the `ConceptNote` table. All the data in the column will be lost.
  - You are about to drop the column `topicNumbers` on the `Project` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lessonNumber]` on the table `CurriculumTopic` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ConceptNote" DROP COLUMN "topicNumber",
ADD COLUMN     "topicId" TEXT;

-- AlterTable
ALTER TABLE "CurriculumTopic" ADD COLUMN     "description" TEXT,
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "lessonNumber" INTEGER,
ADD COLUMN     "sectionName" TEXT,
ADD COLUMN     "sectionNumber" INTEGER,
ALTER COLUMN "estimatedHours" SET DEFAULT 2,
ALTER COLUMN "estimatedHours" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "topicNumbers",
ADD COLUMN     "topicIds" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "CurriculumTopic_lessonNumber_key" ON "CurriculumTopic"("lessonNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_key" ON "Project"("name");

-- AddForeignKey
ALTER TABLE "ConceptNote" ADD CONSTRAINT "ConceptNote_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "CurriculumTopic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
