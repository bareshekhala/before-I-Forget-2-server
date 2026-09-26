import express, {
  type Express,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { Router } from 'express';
const router = express.Router()

//Get -> api/movies -> all the movies

//Get -> api/movies/movieId -> specific movie
//Put ->  api/movies/movieId -> edit a movie from DB
//Get -> api/favmovies -> all the movies that were added by the user
//Get -> api/favmovies/favmovieId -> a movie from favorites
//Put -> api/favmovies/favmovieId -> edit a movie from favorites
//Post -> api/favmovies -> add a new movie or add a movie from the DB to favorites 
//Delete -> api/favmovies/favmovieId -> delete a movie from favorites