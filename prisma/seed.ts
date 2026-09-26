import books from "../DB/books.json" with { type: "json" }
import movies from "../DB/movies.json" with { type: "json" }
import songs from "../DB/songs.json" with { type: "json" }
import moods from "../DB/moods.json" with { type: "json" }
import { prisma } from "../lib/prisma.js";

// in the JSON files a mood is a number (1–10), in the database we find it by its name
function moodsOf(ids: number[]) {
  return ids.map((id) => {
    const mood = moods.find((mood) => mood.id === id);
    if (!mood) throw new Error(`Unknown mood id: ${id}`);
    return { name: mood.name };
  });
}

async function main() {
  for (const mood of moods) {
    await prisma.mood.upsert({
      where: { name: mood.name },
      update: {},
      create: { name: mood.name },
    });
  }

  for (const book of books) {
    const data = {
      title: book.title,
      author: book.author,
      description: book.description,
      image: book.image,
      category: book.category,
      pageCount: book.pageCount ?? null,
    };

    await prisma.book.upsert({
      where: { id: String(book.id) },
      update: { ...data, moods: { set: moodsOf(book.moodId) } },
      create: { id: String(book.id), ...data, moods: { connect: moodsOf(book.moodId) } },
    });
  }

  for (const movie of movies) {
    const data = {
      title: movie.title,
       category: movie.category,
      overview: movie.overview,
      poster_path: movie.poster_path,
    };

    await prisma.movie.upsert({
      where: { id: String(movie.id) },
      update: { ...data, moods: { set: moodsOf(movie.moodId) } },
      create: { id: String(movie.id), ...data, moods: { connect: moodsOf(movie.moodId) } },
    });
  }

  for (const song of songs) {
    const data = {
      title: song.title,
      singerOrComposer: song.singerOrComposer,
      image: song.image,
      url: song.url,
    };

    await prisma.song.upsert({
      where: { id: String(song.id) },
      update: { ...data, moods: { set: moodsOf(song.moodId) } },
      create: { id: String(song.id), ...data, moods: { connect: moodsOf(song.moodId) } },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

