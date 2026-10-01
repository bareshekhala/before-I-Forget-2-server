import express from "express";
import { prisma } from "../lib/prisma.js";
import verifyToken from "../middlewares/auth.middlewares.js";
const router = express.Router();

//favSongs

//favsongs route needs a logged-in user
router.use("/favsongs", verifyToken);

//Get -> api/songs/favsongs -> all the songs that were added by the user
router.get("/favsongs", async (req, res, next) => {
  try {
    const response = await prisma.favSong.findMany({
      where: { userId: res.locals.payload.id },
      include: { moods: true },
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//Get -> api/songs/favsongs/favsongId -> a song from favorites
router.get("/favsongs/:favsongId", async (req, res, next) => {
  try {
    const { favsongId } = req.params;
    const response = await prisma.favSong.findUnique({
      where: { id: favsongId, userId: res.locals.payload.id },
      include: { moods: true },
    });
    if (!response) {
      res.status(404).json({ message: "Song not found in your favourites" });
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//Patch -> api/songs/favsongs/favsongId -> edit a song from favorites
router.patch("/favsongs/:favsongId", async (req, res, next) => {
  try {
    const { favsongId } = req.params;
    const owned = await prisma.favSong.findFirst({
      where: { id: favsongId, userId: res.locals.payload.id },
    });
    if (!owned) {
      res.status(404).json({ message: "Song not found in your favourites" });
      return;
    }

    const { title, singerOrComposer, image, url, moods = [] } = req.body;
    if (!title || moods.length === 0) {
      res
        .status(400)
        .json({ message: "Title and moods are required" });
      return;
    }

    const response = await prisma.favSong.update({
      where: { id: favsongId },
      data: {
        title,
        singerOrComposer: singerOrComposer || null,
        image,
        url,
        moods: moods ? { set: moods.map((name: string) => ({ name })) } : undefined,
      },
      include: { moods: true },
    });
    res.status(200).json({ message: "updated successfully", response });
  } catch (error) {
    next(error);
  }
});

//Post -> api/songs/favsongs -> add a new song or add a song from the DB to favorites
router.post("/favsongs", async (req, res, next) => {
  try {
    const {
      title,
      singerOrComposer,
      image,
      url,
      moods = [],
    } = req.body;
    if (!title || moods.length === 0) {
      res
        .status(400)
        .json({ message: "Title and moods are required" });
      return;
    }

    const response = await prisma.favSong.create({
      data: {
        userId: res.locals.payload.id,
        title,
        singerOrComposer: singerOrComposer || null,
        image,
        url,
        moods: { connect: moods.map((name: string) => ({ name })) },
      },
      include: { moods: true },
    });
    res.status(201).json({ message: "created successfully", song: response });
  } catch (error) {
    next(error);
  }
});

//Delete -> api/songs/favsongs/favsongId -> delete a song from favorites
router.delete("/favsongs/:favsongId", async (req, res, next) => {
  try {
    const { favsongId } = req.params;
    const owned = await prisma.favSong.findFirst({
      where: { id: favsongId, userId: res.locals.payload.id },
    });
    if (!owned) {
      res.status(404).json({ message: "Song not found in your favourites" });
      return;
    }

    const response = await prisma.favSong.delete({ where: { id: favsongId } });
    res.status(200).json({ message: "deleted successfully", response });
  } catch (error) {
    next(error);
  }
});

//songs

//Get -> api/songs -> all the songs
router.get("/", async (req, res, next) => {
  try {
    const response = await prisma.song.findMany({ include: { moods: true } });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//Get -> api/songs/:songId -> specific song from the original DB
router.get("/:songId", async (req, res, next) => {
  try {
    const { songId } = req.params;
    const response = await prisma.song.findUnique({
      where: { id: songId },
      include: { moods: true },
    });
    if (!response) {
      res.status(404).json({ message: "Song not found" });
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
