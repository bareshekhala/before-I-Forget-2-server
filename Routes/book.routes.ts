import express from "express";
import { prisma } from "../lib/prisma.js";
import verifyToken from "../middlewares/auth.middlewares.js";
const router = express.Router();

//favBooks

// every /favbooks route needs a logged-in user
router.use("/favbooks", verifyToken);

//Get -> api/books/favbooks -> all the books that were added by the user
router.get("/favbooks", async (req, res, next) => {
  try {
    const response = await prisma.favBook.findMany({
      where: { userId: res.locals.payload.id },
      include: { moods: true },
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//Get -> api/books/favbooks/favbooksId -> a book from favorites
router.get("/favbooks/:favbookId", async (req, res, next) => {
  try {
    const { favbookId } = req.params;
    const response = await prisma.favBook.findUnique({
      where: { id: favbookId, userId: res.locals.payload.id },
      include: { moods: true },
    });
    if (!response) {
      res.status(404).json({ message: "Book not found in your favourites" });
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//Patch -> api/books/favbooks/favbookId -> edit a book from favorites
router.patch("/favbooks/:favbookId", async (req, res, next) => {
  try {
    const { favbookId } = req.params;
    const owned = await prisma.favBook.findFirst({
      where: { id: favbookId, userId: res.locals.payload.id },
    });
    if (!owned) {
      res.status(404).json({ message: "Book not found in your favourites" });
      return;
    }

    const { title, author, description, image, category, pageCount, moods } = req.body;
    const response = await prisma.favBook.update({
      where: { id: favbookId },
      data: {
        title,
        author,
        description,
        image,
        category,
        pageCount: pageCount === undefined ? undefined : Number(pageCount) || null,
        moods: moods ? { set: moods.map((name: string) => ({ name })) } : undefined,
      },
      include: { moods: true },
    });
    res.status(200).json({ message: "updated successfully", response });
  } catch (error) {
    next(error);
  }
});

//Post -> api/books/favbooks -> add a new book or add a book from the DB to favorites
router.post("/favbooks", async (req, res, next) => {
  try {
    const {
      title,
      author,
      description,
      image,
      category,
      pageCount,
      moods = [],
    } = req.body;
    if (!title || !category || moods.length === 0) {
      res
        .status(400)
        .json({ message: "Title, category and moods are required" });
      return;
    }

    const response = await prisma.favBook.create({
      data: {
        userId: res.locals.payload.id,
        title,
        author,
        description,
        image,
        category,
        pageCount: pageCount ? Number(pageCount) : null,
        moods: { connect: moods.map((name: string) => ({ name })) },
      },
      include: { moods: true },
    });
    res.status(201).json({ message: "created successfully", book: response });
  } catch (error) {
    next(error);
  }
});

//Delete -> api/books/favbooks/favbookId -> delete a book from favorites
router.delete("/favbooks/:favbookId", async (req, res, next) => {
  try {
    const { favbookId } = req.params;
    const owned = await prisma.favBook.findFirst({
      where: { id: favbookId, userId: res.locals.payload.id },
    });
    if (!owned) {
      res.status(404).json({ message: "Book not found in your favourites" });
      return;
    }

    const response = await prisma.favBook.delete({ where: { id: favbookId } });
    res.status(200).json({ message: "deleted successfully", response });
  } catch (error) {
    next(error);
  }
});

//books 

//Get -> api/books -> all the books
router.get("/", async (req, res, next) => {
  try {
    const response = await prisma.book.findMany({ include: { moods: true } });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//Get -> api/books/:booksId -> specific book from the original DB
router.get("/:bookId", async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const response = await prisma.book.findUnique({
      where: { id: bookId },
      include: { moods: true },
    });
    if (!response) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
