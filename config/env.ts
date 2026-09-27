// here we read the .env file and make sure nothing important is missing
import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is missing in the .env file`);
  return value;
}

export const env = {
  DATABASE_URL: required("DATABASE_URL"),
  DIRECT_URL: required("DIRECT_URL"),
  ORIGIN: required("ORIGIN"),
  PORT: Number(process.env.PORT) || 8008,
  NODE_ENV: process.env.NODE_ENV || "development",
  SUPABASE_PUBLISHABLE_KEY: required("SUPABASE_PUBLISHABLE_KEY"),
  SUPABASE_URL: required("SUPABASE_URL")
};
