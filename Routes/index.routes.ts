//  Organize and connect all the routes
import express, { type Express} from 'express';
import { Router } from 'express';
const router = express.Router()
//Routes

//books
import bookRoutes from "./book.routes.js"
router.use("/books",bookRoutes)

//movies
import movieRoutes from "./movie.routes.js"
router.use("/movies",movieRoutes)

//songs
import songRoutes from "./song.routes.js"
router.use("/songs",songRoutes)

//myMind
import mymindRoutes from "./mymind.routes.js"
router.use("/mymind",mymindRoutes)

//moods
import moodRoutes from "./mood.routes.js"
router.use("/moods", moodRoutes)

export default router