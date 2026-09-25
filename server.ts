import { env } from "./config/env.js";
//  Loads environment variables from a .env file into process.env
try {
  process.loadEnvFile()
} catch(error) {
  console.warn(".env file not found, using default environment values")
}


import express, { type Express } from 'express';
const app: Express = express();

// Loads and applies global middleware (CORS, JSON parsing, etc.) for server configurations
import config from "./config/index.js";
config(app)

// Test Route. Can be left and used for waking up the server if idle
app.get('/', (req, res, next) => {
  res.json("Hello All good in here!");
});

// Defines and applies route handlers
import router from "./Routes/index.routes.js";
const indexRouter = router
app.use("/api", indexRouter)


//error handling (must be placed after routes)
import handleErrors from "./errors/errors.js";
handleErrors(app)

// Optional for serverless deployments like Vercel.
app.listen(env.PORT, () => {
  console.log(`Server listening. Local access on http://localhost:${env.PORT}`);
});