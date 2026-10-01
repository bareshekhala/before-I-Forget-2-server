import express from "express";
import { prisma } from "../lib/prisma.js";
import verifyToken from "../middlewares/auth.middlewares.js";
const router = express.Router();

router.use(verifyToken);

// the only categories the database accepts (see enum myMindCategory)
const categories = ["THOUGHT", "DREAM", "MEMORY", "WEBSITE"];

//Get -> api/mymind -> everything the user saved
router.get("/", async (req, res, next) => {
  try {
    const response = await prisma.myMind.findMany({
      where: { userId: res.locals.payload.id },
      include: { moods: true },
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//Get -> api/mymind/dreams -> get the dreams
router.get("/dreams", async (req, res, next) => {
  try {
    const response = await prisma.myMind.findMany({
      where: { userId: res.locals.payload.id, category: "DREAM" },
      include: { moods: true },
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//Get -> api/mymind/thoughts -> get the thoughts
router.get("/thoughts", async (req, res, next) => {
  try {
    const response = await prisma.myMind.findMany({
      where: { userId: res.locals.payload.id, category: "THOUGHT" },
      include: { moods: true },
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//Get -> api/mymind/memories -> get the memories
router.get("/memories", async (req, res, next) => {
  try {
    const response = await prisma.myMind.findMany({
      where: { userId: res.locals.payload.id, category: "MEMORY" },
      include: { moods: true },
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//Get -> api/mymind/websites -> get the websites
router.get("/websites", async (req, res, next) => {
  try {
    const response = await prisma.myMind.findMany({
      where: { userId: res.locals.payload.id, category: "WEBSITE" },
      include: { moods: true },
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/:mymindId", async (req, res, next) => {
  try {
    const { mymindId } = req.params;
    const response = await prisma.myMind.findUnique({
      where: { id: mymindId, userId: res.locals.payload.id },
      include: { moods: true },
    });
    if (!response) {
      res.status(404).json({ message: "it is not found in your Archive" });
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//Post -> /api/mymind -> add a new object
router.post("/", async (req, res, next) => {
  try {
    const { title, image, description, url, date, category, moods = [] } = req.body;
    if (!title || !categories.includes(category) || moods.length === 0) {
      res.status(400).json({
        message:
          "Title, a valid category (THOUGHT, DREAM, MEMORY, WEBSITE) and moods are required",
      });
      return;
    }
    if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
      res.status(400).json({ message: "The Link is not Valid" });
      return;
    }

    const response = await prisma.myMind.create({
      data: {
        userId: res.locals.payload.id,
        title,
        image,
        description,
        url: url || null,
        date: date ? new Date(date) : null,
        category,
        moods: { connect: moods.map((name: string) => ({ name })) },
      },
      include: { moods: true },
    });
    res.status(201).json({ message: "created successfully", mymind: response });
  } catch (error) {
    next(error);
  }
});

//Patch -> api/mymind/:mymindId -> edit an object (any category)
router.patch("/:mymindId", async (req, res, next) => {
  try {
    const { mymindId } = req.params;
    const owned = await prisma.myMind.findFirst({
      where: { id: mymindId, userId: res.locals.payload.id },
    });
    if (!owned) {
      res.status(404).json({ message: "it is not found in your Archive" });
      return;
    }

    const { title, image, description, url, date, category, moods = [] } = req.body;
    if (!title || !categories.includes(category) || moods.length === 0) {
      res.status(400).json({
        message:
          "Title, a valid category (THOUGHT, DREAM, MEMORY, WEBSITE) and moods are required",
      });
      return;
    }
    if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
      res.status(400).json({ message: "The link has to start with http:// or https://" });
      return;
    }

    const response = await prisma.myMind.update({
      where: { id: mymindId },
      data: {
        title,
        image,
        description,
        url: url || null,
        category,
        date: date === undefined ? undefined : date ? new Date(date) : null,
        moods: { set: moods.map((name: string) => ({ name })) },
      },
      include: { moods: true },
    });
    res.status(200).json({ message: "updated successfully", response });
  } catch (error) {
    next(error);
  }
});

//Delete -> api/mymind/:mymindid -> delete an object
router.delete("/:mymindId", async (req, res, next) => {
  try {
    const { mymindId } = req.params;
    const owned = await prisma.myMind.findFirst({
      where: { id: mymindId, userId: res.locals.payload.id },
    });
    if (!owned) {
      res.status(404).json({ message: "it is not found in your Archive" });
      return;
    }
    const response = await prisma.myMind.delete({ where: { id: mymindId } });
    res.status(200).json({ message: "deleted successfully", response });
  } catch (error) {
    next(error);
  }
});

export default router;
