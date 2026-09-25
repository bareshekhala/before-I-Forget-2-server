/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT,
    "description" TEXT,
    "image" TEXT,
    "category" TEXT NOT NULL,
    "pageCount" INTEGER,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "overview" TEXT,
    "poster_path" TEXT,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Song" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "singerOrComposer" TEXT NOT NULL,
    "image" TEXT,
    "url" TEXT,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "myMind" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "date" TIMESTAMP(3),

    CONSTRAINT "myMind_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favBook" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT,
    "description" TEXT,
    "image" TEXT,
    "category" TEXT NOT NULL,
    "pageCount" INTEGER,

    CONSTRAINT "favBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favMovie" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "overview" TEXT,
    "poster_path" TEXT,

    CONSTRAINT "favMovie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favSong" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "singerOrComposer" TEXT NOT NULL,
    "image" TEXT,
    "url" TEXT,

    CONSTRAINT "favSong_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mood" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Mood_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "Mood_name_key" ON "Mood"("name");

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
