import { defineConfig } from "drizzle-kit";
import { env } from "@/lib/env";

export default defineConfig({
  out: "./src/lib/database/migrations",
  schema: "./src/lib/database/schemas/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
