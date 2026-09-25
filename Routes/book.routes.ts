import express, {
  type Express,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { Router } from 'express';
const router = express.Router()

//Get -> api/books -> all the books

//Get -> api/books/booksId -> specific book
//Put ->  api/books/booksId -> edit a book from DB
//Get -> api/favbooks -> all the books that were added by the user
//Get -> api/favbooks/favbooksId -> a book from favorites
//Put -> api/favbooks/favbooksId -> edit a book from favorites
//Post -> api/favbooks -> add a new book or add a book from the DB to favorites 
//Delete -> api/favbooks/favbooksId -> delete a book from favorites
