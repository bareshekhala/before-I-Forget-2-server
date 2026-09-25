/*
  Warnings:

  - You are about to drop the `_BookToMood` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MoodToMovie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MoodToSong` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MoodTofavBook` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MoodTofavMovie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MoodTofavSong` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MoodTomyMind` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BookToMood" DROP CONSTRAINT "_BookToMood_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToMood" DROP CONSTRAINT "_BookToMood_B_fkey";

-- DropForeignKey
ALTER TABLE "_MoodToMovie" DROP CONSTRAINT "_MoodToMovie_A_fkey";

-- DropForeignKey
ALTER TABLE "_MoodToMovie" DROP CONSTRAINT "_MoodToMovie_B_fkey";

-- DropForeignKey
ALTER TABLE "_MoodToSong" DROP CONSTRAINT "_MoodToSong_A_fkey";

-- DropForeignKey
ALTER TABLE "_MoodToSong" DROP CONSTRAINT "_MoodToSong_B_fkey";

-- DropForeignKey
ALTER TABLE "_MoodTofavBook" DROP CONSTRAINT "_MoodTofavBook_A_fkey";

-- DropForeignKey
ALTER TABLE "_MoodTofavBook" DROP CONSTRAINT "_MoodTofavBook_B_fkey";

-- DropForeignKey
ALTER TABLE "_MoodTofavMovie" DROP CONSTRAINT "_MoodTofavMovie_A_fkey";

-- DropForeignKey
ALTER TABLE "_MoodTofavMovie" DROP CONSTRAINT "_MoodTofavMovie_B_fkey";

-- DropForeignKey
ALTER TABLE "_MoodTofavSong" DROP CONSTRAINT "_MoodTofavSong_A_fkey";

-- DropForeignKey
ALTER TABLE "_MoodTofavSong" DROP CONSTRAINT "_MoodTofavSong_B_fkey";

-- DropForeignKey
ALTER TABLE "_MoodTomyMind" DROP CONSTRAINT "_MoodTomyMind_A_fkey";

-- DropForeignKey
ALTER TABLE "_MoodTomyMind" DROP CONSTRAINT "_MoodTomyMind_B_fkey";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "moodId" INTEGER[];

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "moodId" INTEGER[];

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "moodId" INTEGER[];

-- AlterTable
ALTER TABLE "favBook" ADD COLUMN     "moodId" INTEGER[];

-- AlterTable
ALTER TABLE "favMovie" ADD COLUMN     "moodId" INTEGER[];

-- AlterTable
ALTER TABLE "favSong" ADD COLUMN     "moodId" INTEGER[];

-- AlterTable
ALTER TABLE "myMind" ADD COLUMN     "moodId" INTEGER[];

-- DropTable
DROP TABLE "_BookToMood";

-- DropTable
DROP TABLE "_MoodToMovie";

-- DropTable
DROP TABLE "_MoodToSong";

-- DropTable
DROP TABLE "_MoodTofavBook";

-- DropTable
DROP TABLE "_MoodTofavMovie";

-- DropTable
DROP TABLE "_MoodTofavSong";

-- DropTable
DROP TABLE "_MoodTomyMind";
