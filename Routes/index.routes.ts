//  Organize and connect all the routes
import express, { type Express} from 'express';
import { Router } from 'express';
const router = express.Router()
//Routes
import bookRoutes from "./book.routes.js"
router.use("/books",bookRoutes)

export default router