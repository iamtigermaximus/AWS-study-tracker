/*
  Warnings:

  - You are about to drop the column `topicId` on the `ConceptNote` table. All the data in the column will be lost.
  - You are about to drop the column `topicIds` on the `Project` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ConceptNote" DROP CONSTRAINT "ConceptNote_topicId_fkey";

-- AlterTable
ALTER TABLE "ConceptNote" DROP COLUMN "topicId",
ADD COLUMN     "topicNumber" INTEGER;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "topicIds",
ADD COLUMN     "topicNumbers" INTEGER[];
