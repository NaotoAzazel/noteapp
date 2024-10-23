import { Prisma } from "@prisma/client"

import { db } from "@/lib/db"

interface GetNotesByParams {
  params: Prisma.NoteFindManyArgs
}

async function getNotesByParams({ params }: GetNotesByParams) {
  const notes = await db.note.findMany(params)
  return notes
}

interface GetNotesByUserIdParams {
  userId: string
}

async function getNotesByUserId({ userId }: GetNotesByUserIdParams) {
  const userNotes = await getNotesByParams({
    params: {
      where: {
        creatorId: {
          equals: userId,
        },
      },
    },
  })

  return userNotes
}

interface CreateNoteParams {
  params: Prisma.NoteCreateArgs
}

async function createNote({ params }: CreateNoteParams) {
  const createdNote = await db.note.create(params)
  return createdNote
}

export { getNotesByParams, getNotesByUserId, createNote }
