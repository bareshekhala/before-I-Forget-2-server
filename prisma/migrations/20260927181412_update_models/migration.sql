/*
  Warnings:

  - Changed the type of `category` on the `myMind` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "myMindCategory" AS ENUM ('THOUGHT', 'DREAM', 'MEMORY', 'WEBSITE');

-- AlterTable
ALTER TABLE "myMind" DROP COLUMN "category",
ADD COLUMN     "category" "myMindCategory" NOT NULL;

-- CreateIndex
CREATE INDEX "myMind_userId_idx" ON "myMind"("userId");
