import express, { type Express } from 'express';

// .env is checked with zod inside config/env.ts
import { env } from "./config/env.js";
import config from "./config/index.js";
import indexRouter from "./Routes/index.routes.js";
import handleErrors from "./errors/errors.js";

const app: Express = express();

// Loads and applies global middleware (CORS, JSON parsing, etc.) for server configurations
config(app)

// Test Route. Can be left and used for waking up the server if idle
app.get('/', (req, res, next) => {
  res.json("Hello All good in here!");
});

// Defines and applies route handlers
app.use("/api", indexRouter)

//error handling (must be placed after routes)
handleErrors(app)

// Optional for serverless deployments like Vercel.
app.listen(env.PORT, () => {
  console.log(`Server listening. Local access on http://localhost:${env.PORT}`);
});
