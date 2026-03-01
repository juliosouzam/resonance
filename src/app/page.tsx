import { count } from "drizzle-orm";
import { database } from "@/lib/database";
import { voices as voicesSchema } from "@/lib/database/schemas";

export default async function Home() {
  const voices = await database.query.voices.findMany();
  const [{ total }] = await database
    .select({ total: count() })
    .from(voicesSchema);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Voices ({total})</h1>
      <ul className="list-disc pl-4">
        {voices.map((voice) => (
          <li key={voice.id}>
            {voice.name} - {voice.variant}
          </li>
        ))}
      </ul>
    </div>
  );
}
