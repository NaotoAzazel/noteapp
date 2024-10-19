import { Prisma } from "@prisma/client"

import { db } from "@/lib/db"

interface GetNotesByParams {
  params: Prisma.NoteFindManyArgs
}

async function getNotesByParams({ params }: GetNotesByParams) {
  const notes = await db.note.findMany(params)
  return notes
}

export { getNotesByParams }
