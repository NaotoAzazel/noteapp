import "@prisma/client"

declare global {
  namespace PrismaJson {
    type NoteContent = Record<string, string>
  }
}
