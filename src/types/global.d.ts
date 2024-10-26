import { OutputData } from "@editorjs/editorjs"

import "@prisma/client"

import { EditorContent } from "@/types/editor"

declare global {
  namespace PrismaJson {
    interface NoteContent extends EditorContent {}
  }
}
