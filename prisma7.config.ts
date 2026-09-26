import "dotenv/config";
import { defineConfig } from "prisma/config";
import { env } from "./config/env.js";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts"
  },
  datasource: {
    
    url: env.DIRECT_URL
  },
});