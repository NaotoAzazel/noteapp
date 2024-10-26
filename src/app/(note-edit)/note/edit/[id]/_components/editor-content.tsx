import { notFound } from "next/navigation"

import { getNoteById } from "@/lib/actions/notes"

import { Editor } from "./editor"

interface EditorContentProps {
  notePromise: ReturnType<typeof getNoteById>
}

export async function EditorContent({ notePromise }: EditorContentProps) {
  const note = await notePromise

  if (!note) {
    return notFound()
  }

  return <Editor {...note} />
}
