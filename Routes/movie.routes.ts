import express from "express";
import { prisma } from "../lib/prisma.js";
import verifyToken from "../middlewares/auth.middlewares.js";
const router = express.Router();

//favMovies

// every /favmovies route needs a logged-in user
router.use("/favmovies", verifyToken);

//Get -> api/movies/favmovies -> all the movies that were added by the user
router.get("/favmovies", async (req, res, next) => {
  try {
    const response = await prisma.favMovie.findMany({
      where: { userId: res.locals.payload.id },
      include: { moods: true },
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//Get -> api/movies/favmovies/favmovieId -> a movie from favorites
router.get("/favmovies/:favmovieId", async (req, res, next) => {
  try {
    const { favmovieId } = req.params;
    const response = await prisma.favMovie.findUnique({
      where: { id: favmovieId, userId: res.locals.payload.id },
      include: { moods: true },
    });
    if (!response) {
      res.status(404).json({ message: "Movie not found in your favourites" });
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//Patch -> api/movies/favmovies/favmovieId -> edit a movie from favorites
router.patch("/favmovies/:favmovieId", async (req, res, next) => {
  try {
    const { favmovieId } = req.params;
    const owned = await prisma.favMovie.findFirst({
      where: { id: favmovieId, userId: res.locals.payload.id },
    });
    if (!owned) {
      res.status(404).json({ message: "Movie not found in your favourites" });
      return;
    }

    const { title, category, overview, poster_path, moods = [] } = req.body;
     if (!title || !category || moods.length === 0) {
      res
        .status(400)
        .json({ message: "Title, category and moods are required" });
      return;
    }
    
    const response = await prisma.favMovie.update({
      where: { id: favmovieId },
      data: {
        title,
        category,
        overview,
        poster_path,
        moods: moods ? { set: moods.map((name: string) => ({ name })) } : undefined,
      },
      include: { moods: true },
    });
    res.status(200).json({ message: "updated successfully", response });
  } catch (error) {
    next(error);
  }
});

//Post -> api/movies/favmovies -> add a new movie or add a movie from the DB to favorites
router.post("/favmovies", async (req, res, next) => {
  try {
    const {
      title,
      category,
      overview,
      poster_path,
      moods = [],
    } = req.body;
    if (!title || !category || moods.length === 0) {
      res
        .status(400)
        .json({ message: "Title, category and moods are required" });
      return;
    }

    const response = await prisma.favMovie.create({
      data: {
        userId: res.locals.payload.id,
        title,
        category,
        overview,
        poster_path,
        moods: { connect: moods.map((name: string) => ({ name })) },
      },
      include: { moods: true },
    });
    res.status(201).json({ message: "created successfully", movie: response });
  } catch (error) {
    next(error);
  }
});

//Delete -> api/movies/favmovies/favmovieId -> delete a movie from favorites
router.delete("/favmovies/:favmovieId", async (req, res, next) => {
  try {
    const { favmovieId } = req.params;
    const owned = await prisma.favMovie.findFirst({
      where: { id: favmovieId, userId: res.locals.payload.id },
    });
    if (!owned) {
      res.status(404).json({ message: "Movie not found in your favourites" });
      return;
    }

    const response = await prisma.favMovie.delete({ where: { id: favmovieId } });
    res.status(200).json({ message: "deleted successfully", response });
  } catch (error) {
    next(error);
  }
});

//movies

//Get -> api/movies -> all the movies
router.get("/", async (req, res, next) => {
  try {
    const response = await prisma.movie.findMany({ include: { moods: true } });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//Get -> api/movies/:movieId -> specific movie from the original DB
router.get("/:movieId", async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const response = await prisma.movie.findUnique({
      where: { id: movieId },
      include: { moods: true },
    });
    if (!response) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

export default router;
