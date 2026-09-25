import express, { type Express } from "express";
import cors from "cors";
import morgan from "morgan";
import { env } from "./env.js";

// Middleware configuration
function config(app: Express) {
  // ℹ️ Enables Express to trust reverse proxies (e.g., when deployed behind services like Heroku or Vercel)
  app.set("trust proxy", 1);

  app.use(cors({ origin: env.ORIGIN }));
  app.use(express.json());
  app.use(morgan("dev"));

   // ℹ️ Parses incoming request bodies with URL-encoded data (form submissions)
  app.use(express.urlencoded({ extended: false }));
}

export default config;