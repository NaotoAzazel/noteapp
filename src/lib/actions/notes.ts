import { Note, Prisma } from "@prisma/client"

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

interface GetNoteByIdParams {
  noteId: string
}

async function getNoteById({ noteId }: GetNoteByIdParams) {
  const noteById = await db.note.findFirst({
    where: { id: { equals: noteId } },
  })

  return noteById
}

interface GetUserNotesWithFiltersParams {
  creatorId: string
  searchedTitle?: string
  sortByTitle: Prisma.SortOrder
  sortByUpdatedAt: Prisma.SortOrder
  page: number
  notesPerPage: number
}

async function getUserNotesWithFilters({
  creatorId,
  searchedTitle = undefined,
  sortByTitle,
  sortByUpdatedAt,
  page,
  notesPerPage,
}: GetUserNotesWithFiltersParams) {
  const skip = (page - 1) * notesPerPage

  const whereClause = {
    title: {
      startsWith: searchedTitle,
      mode: Prisma.QueryMode.insensitive,
    },
    creatorId,
  }

  const totalNotesCount = await db.note.count({
    where: whereClause,
  })

  const notes = await db.note.findMany({
    where: whereClause,
    orderBy: [{ title: sortByTitle }, { updatedAt: sortByUpdatedAt }],
    take: notesPerPage,
    skip,
  })

  const totalPages = Math.ceil(totalNotesCount / notesPerPage)

  const hasPrevPage = page > 1
  const hasNextPage = page < totalPages

  return {
    data: notes,
    metadata: {
      totalPages,
      hasPrevPage,
      hasNextPage,
    },
  }
}

interface CanUserViewNoteParams {
  userId: string
  noteId: string
}

async function canUserAccessNote({ noteId, userId }: CanUserViewNoteParams) {
  const note = await db.note.findFirst({
    where: {
      id: {
        equals: noteId,
      },
      creatorId: {
        equals: userId,
      },
    },
  })

  return !!note
}

interface CreateNoteParams {
  creatorId: string
}

async function createNote({ creatorId }: CreateNoteParams) {
  const now = new Date().getTime()

  const createdNote = await db.note.create({
    data: {
      title: "Untitled",
      content: { blocks: [], time: now, version: "2.29.1" },
      creatorId,
    },
    select: {
      id: true,
    },
  })
  return createdNote
}

interface UpdateNoteByIdParams {
  noteId: string
  updatedData: Partial<Note>
}

async function updateNoteById({ noteId, updatedData }: UpdateNoteByIdParams) {
  const updatedNote = await db.note.update({
    where: { id: noteId },
    data: updatedData,
  })

  return updatedNote
}

export {
  getNotesByParams,
  getNotesByUserId,
  getNoteById,
  getUserNotesWithFilters,
  canUserAccessNote,
  createNote,
  updateNoteById,
}
