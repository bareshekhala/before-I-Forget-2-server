/*
  Warnings:

  - Added the required column `userId` to the `favBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `favMovie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `favSong` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `myMind` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "favBook" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "favMovie" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "favSong" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "myMind" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "myMind" ADD CONSTRAINT "myMind_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favBook" ADD CONSTRAINT "favBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favMovie" ADD CONSTRAINT "favMovie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favSong" ADD CONSTRAINT "favSong_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
