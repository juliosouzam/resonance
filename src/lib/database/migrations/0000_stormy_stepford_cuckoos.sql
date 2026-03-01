CREATE TYPE "public"."voice_category" AS ENUM('AUDIOBOOK', 'CONVERSATIONAL', 'CUSTOMER_SERVICE', 'GENERAL', 'NARRATIVE', 'CHARACTERS', 'MEDITATION', 'MOTIVATIONAL', 'PODCAST', 'ADVERTISING', 'VOICEOVER', 'CORPORATE');--> statement-breakpoint
CREATE TYPE "public"."voice_variant" AS ENUM('SYSTEM', 'CUSTOM');--> statement-breakpoint
CREATE TABLE "generations" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"org_id" varchar NOT NULL,
	"voice_id" varchar NOT NULL,
	"text" varchar NOT NULL,
	"voice_name" varchar NOT NULL,
	"r2_object_key" varchar,
	"temperature" numeric NOT NULL,
	"top_p" numeric NOT NULL,
	"top_k" integer NOT NULL,
	"repetition_penalty" numeric NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "voices" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"org_id" varchar,
	"name" varchar NOT NULL,
	"description" varchar,
	"category" "voice_category" DEFAULT 'GENERAL' NOT NULL,
	"language" varchar DEFAULT 'en-US' NOT NULL,
	"variant" "voice_variant" NOT NULL,
	"r2_object_key" varchar,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
ALTER TABLE "generations" ADD CONSTRAINT "generations_voice_id_voices_id_fk" FOREIGN KEY ("voice_id") REFERENCES "public"."voices"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "generation_org_id_idx" ON "generations" USING btree ("org_id");--> statement-breakpoint
CREATE INDEX "generation_voice_id_idx" ON "generations" USING btree ("voice_id");--> statement-breakpoint
CREATE INDEX "voices_variant_idx" ON "voices" USING btree ("variant");--> statement-breakpoint
CREATE INDEX "voices_org_id_idx" ON "voices" USING btree ("org_id");