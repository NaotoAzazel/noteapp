import { Suspense } from "react"
import { getServerSession, Session } from "next-auth"

import { getNotesByUserId } from "@/lib/actions/notes"
import { authOptions } from "@/lib/auth"

import { NoteCreateButton } from "../_components/note-create-button"
import DashboardShell from "../../_components/dashboard-shell"
import { Header } from "../../_components/header"
import { NoteItem } from "./_components/note-item"
import { NotesFeed } from "./_components/notes-feed"

export default async function NotesDashboardPage() {
  const user = (await getServerSession(authOptions)) as Session
  const userNotesPromise = getNotesByUserId({
    userId: user?.user.id,
  })

  return (
    <DashboardShell>
      <Header heading="Notes" text="Check all your notes">
        <NoteCreateButton />
      </Header>
      <Suspense
        fallback={
          <div className="flex flex-col gap-2">
            <NoteItem.Skeleton />
            <NoteItem.Skeleton />
            <NoteItem.Skeleton />
            <NoteItem.Skeleton />
          </div>
        }
      >
        <NotesFeed userNotesPromise={userNotesPromise} />
      </Suspense>
    </DashboardShell>
  )
}
