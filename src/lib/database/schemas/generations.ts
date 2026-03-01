import { relations } from "drizzle-orm";
import {
  decimal,
  index,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { voices } from "./voices";

export const generations = pgTable(
  "generations",
  {
    id: varchar("id", { length: 32 }).primaryKey(),
    orgId: varchar("org_id").notNull(),
    voiceId: varchar("voice_id")
      .references(() => voices.id, { onDelete: "set null" })
      .notNull(),
    text: varchar("text").notNull(),
    voiceName: varchar("voice_name").notNull(),
    r2ObjectKey: varchar("r2_object_key"),
    temperature: decimal("temperature").notNull(),
    topP: decimal("top_p").notNull(),
    topK: integer("top_k").notNull(),
    repetitionPenalty: decimal("repetition_penalty").notNull(),

    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
      .notNull()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [
    index("generation_org_id_idx").on(table.orgId),
    index("generation_voice_id_idx").on(table.voiceId),
  ],
);

export const generationRelations = relations(generations, ({ one }) => ({
  voice: one(voices, {
    fields: [generations.voiceId],
    references: [voices.id],
  }),
}));
