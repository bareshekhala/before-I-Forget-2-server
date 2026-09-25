import { env } from "./config/env.js";


//  Loads environment variables from a .env file into process.env
try {
  process.loadEnvFile()
} catch(error) {
  console.warn(".env file not found, using default environment values")
}


import express, { type Express, type Request, type Response } from 'express';
import index from "./config/index.js"
import { prisma } from "./lib/prisma.js"
const app: Express = express();
app.use(express.json());

app.get('/', (req: Request, res: Response, next) => {
  res.json("Hello All good in here!");
});


// Optional for serverless deployments like Vercel.
app.listen(env.PORT, () => {
  console.log(`Server listening. Local access on http://localhost:${env.PORT}`);
});