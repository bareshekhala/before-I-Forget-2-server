import type { Request, Response, NextFunction } from "express";
import { createClient } from "@supabase/supabase-js";
import { env } from "../config/env.js";
import { prisma } from "../lib/prisma.js";

// the sign up is done with the supabase and in the frontend -> here we should check the token again
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_PUBLISHABLE_KEY);

async function verifyToken(req: Request, res: Response, next: NextFunction) {
  //we get Bearer asbjkb.... => we need only the token part => []
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Token doesn't exist or is not valid" });
    return;
  }

  // now we use the supabase to check if a token is real and hasn't expired
  const { data, error } = await supabase.auth.getClaims(token);
  if (error || !data) {
    res.status(401).json({ message: "Token doesn't exist or is not valid" });
    return;
  }

  const id = data.claims.sub;
  const email = data.claims.email ?? "";

  await prisma.user.upsert({
    where: { id },
    update: {},
    create: { id, email },
  });

  // moving the user info to the route
  res.locals.payload = { id, email };
  next();
}

export default verifyToken;
