import express from "express";
import { prisma } from "../lib/prisma.js";
const router = express.Router();

//Get -> api/moods -> all the moods
router.get("/", async (req, res, next) => {
  try {
    const response = await prisma.mood.findMany();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

export default router