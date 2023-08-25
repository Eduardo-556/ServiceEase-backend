import * as env from "env-var";

export const DATABASE_URL = env.get("DATABASE_URL").required().asString();

export const ADMINJS_COOKIE_PASSWORD = env
  .get("ADMINJS_COOKIE_PASSWORD")
  .required()
  .asString();

export const JWT_SECRET = env.get("JWT_SECRET").required().asString();
