import { relations } from "drizzle-orm";
import {
  index,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { generations } from "./generations";

export const voiceCategoryEnum = pgEnum("voice_category", [
  "AUDIOBOOK",
  "CONVERSATIONAL",
  "CUSTOMER_SERVICE",
  "GENERAL",
  "NARRATIVE",
  "CHARACTERS",
  "MEDITATION",
  "MOTIVATIONAL",
  "PODCAST",
  "ADVERTISING",
  "VOICEOVER",
  "CORPORATE",
]);

export const voiceVariantEnum = pgEnum("voice_variant", ["SYSTEM", "CUSTOM"]);

export const voices = pgTable(
  "voices",
  {
    id: varchar("id", { length: 32 }).primaryKey(),
    orgId: varchar("org_id"),
    name: varchar("name").notNull(),
    description: varchar("description"),
    category: voiceCategoryEnum("category").default("GENERAL").notNull(),
    language: varchar("language").notNull().default("en-US"),
    variant: voiceVariantEnum("variant").notNull(),
    r2ObjectKey: varchar("r2_object_key"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
      .notNull()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [
    index("voices_variant_idx").on(table.variant),
    index("voices_org_id_idx").on(table.orgId),
  ],
);

export const voiceRelations = relations(voices, ({ many }) => ({
  generations: many(generations),
}));
