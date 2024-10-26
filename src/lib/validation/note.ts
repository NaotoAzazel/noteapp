import { z } from "zod"

import { contentSchema } from "@/lib/validation/editor"

const noteSchema = z.object({
  title: z.string().min(1).max(128),
  content: contentSchema,
})

export type NoteSchema = z.infer<typeof noteSchema>

export { noteSchema }
