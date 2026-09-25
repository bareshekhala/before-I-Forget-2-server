/*
  Warnings:

  - You are about to drop the column `moodId` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `moodId` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `moodId` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `moodId` on the `favBook` table. All the data in the column will be lost.
  - You are about to drop the column `moodId` on the `favMovie` table. All the data in the column will be lost.
  - You are about to drop the column `moodId` on the `favSong` table. All the data in the column will be lost.
  - You are about to drop the column `moodId` on the `myMind` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "favBook" DROP CONSTRAINT "favBook_userId_fkey";

-- DropForeignKey
ALTER TABLE "favMovie" DROP CONSTRAINT "favMovie_userId_fkey";

-- DropForeignKey
ALTER TABLE "favSong" DROP CONSTRAINT "favSong_userId_fkey";

-- DropForeignKey
ALTER TABLE "myMind" DROP CONSTRAINT "myMind_userId_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "moodId";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "moodId";

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "moodId";

-- AlterTable
ALTER TABLE "favBook" DROP COLUMN "moodId";

-- AlterTable
ALTER TABLE "favMovie" DROP COLUMN "moodId";

-- AlterTable
ALTER TABLE "favSong" DROP COLUMN "moodId";

-- AlterTable
ALTER TABLE "myMind" DROP COLUMN "moodId";

-- CreateTable
CREATE TABLE "_BookToMood" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BookToMood_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MoodToMovie" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MoodToMovie_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MoodToSong" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MoodToSong_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MoodTomyMind" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MoodTomyMind_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MoodTofavBook" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MoodTofavBook_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MoodTofavMovie" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MoodTofavMovie_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MoodTofavSong" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MoodTofavSong_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BookToMood_B_index" ON "_BookToMood"("B");

-- CreateIndex
CREATE INDEX "_MoodToMovie_B_index" ON "_MoodToMovie"("B");

-- CreateIndex
CREATE INDEX "_MoodToSong_B_index" ON "_MoodToSong"("B");

-- CreateIndex
CREATE INDEX "_MoodTomyMind_B_index" ON "_MoodTomyMind"("B");

-- CreateIndex
CREATE INDEX "_MoodTofavBook_B_index" ON "_MoodTofavBook"("B");

-- CreateIndex
CREATE INDEX "_MoodTofavMovie_B_index" ON "_MoodTofavMovie"("B");

-- CreateIndex
CREATE INDEX "_MoodTofavSong_B_index" ON "_MoodTofavSong"("B");

-- CreateIndex
CREATE INDEX "favBook_userId_idx" ON "favBook"("userId");

-- CreateIndex
CREATE INDEX "favMovie_userId_idx" ON "favMovie"("userId");

-- CreateIndex
CREATE INDEX "favSong_userId_idx" ON "favSong"("userId");

-- AddForeignKey
ALTER TABLE "myMind" ADD CONSTRAINT "myMind_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favBook" ADD CONSTRAINT "favBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favMovie" ADD CONSTRAINT "favMovie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favSong" ADD CONSTRAINT "favSong_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToMood" ADD CONSTRAINT "_BookToMood_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToMood" ADD CONSTRAINT "_BookToMood_B_fkey" FOREIGN KEY ("B") REFERENCES "Mood"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MoodToMovie" ADD CONSTRAINT "_MoodToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "Mood"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MoodToMovie" ADD CONSTRAINT "_MoodToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MoodToSong" ADD CONSTRAINT "_MoodToSong_A_fkey" FOREIGN KEY ("A") REFERENCES "Mood"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MoodToSong" ADD CONSTRAINT "_MoodToSong_B_fkey" FOREIGN KEY ("B") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MoodTomyMind" ADD CONSTRAINT "_MoodTomyMind_A_fkey" FOREIGN KEY ("A") REFERENCES "Mood"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MoodTomyMind" ADD CONSTRAINT "_MoodTomyMind_B_fkey" FOREIGN KEY ("B") REFERENCES "myMind"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MoodTofavBook" ADD CONSTRAINT "_MoodTofavBook_A_fkey" FOREIGN KEY ("A") REFERENCES "Mood"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MoodTofavBook" ADD CONSTRAINT "_MoodTofavBook_B_fkey" FOREIGN KEY ("B") REFERENCES "favBook"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MoodTofavMovie" ADD CONSTRAINT "_MoodTofavMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "Mood"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MoodTofavMovie" ADD CONSTRAINT "_MoodTofavMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "favMovie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MoodTofavSong" ADD CONSTRAINT "_MoodTofavSong_A_fkey" FOREIGN KEY ("A") REFERENCES "Mood"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MoodTofavSong" ADD CONSTRAINT "_MoodTofavSong_B_fkey" FOREIGN KEY ("B") REFERENCES "favSong"("id") ON DELETE CASCADE ON UPDATE CASCADE;
