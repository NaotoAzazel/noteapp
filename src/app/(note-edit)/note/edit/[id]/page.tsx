import { Suspense } from "react"
import { redirect } from "next/navigation"
import { getServerSession, Session } from "next-auth"

import { canUserAccessNote, getNoteById } from "@/lib/actions/notes"
import { authOptions } from "@/lib/auth"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"

import { EditorContent } from "./_components/editor-content"
import { EditorContentSkeleton } from "./_components/editor-content-skeleton"

export const metadata = {
  title: "Edit note",
}

interface EditNoteByIdPageProps {
  params: {
    id: string
  }
}

export default async function EditNoteByIdPage({
  params,
}: EditNoteByIdPageProps) {
  const user = (await getServerSession(authOptions)) as Session
  const notePromiseByUserId = getNoteById({ noteId: params.id })

  const canUserViewNote = await canUserAccessNote({
    noteId: params.id,
    userId: user.user.id,
  })

  if (!canUserViewNote) {
    redirect("/dashboard/notes")
  }

  return (
    <MaxWidthWrapper className="min-h-screen">
      <Suspense fallback={<EditorContentSkeleton />}>
        <EditorContent notePromise={notePromiseByUserId} />
      </Suspense>
    </MaxWidthWrapper>
  )
}
