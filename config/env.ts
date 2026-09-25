//here we check the .env file inputs with zod

import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  DIRECT_URL: z.string().min(1),
  PORT: z.coerce.number().default(8008), //what we get from .env is string => we change it to number
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  ORIGIN:z.string()
});

export const env = envSchema.parse(process.env);