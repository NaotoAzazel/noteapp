import { Suspense } from "react"

import {
  dashboardNotesSchema,
  DashboardNotesSchema,
} from "@/lib/validation/pages"

import { NoteCreateButton } from "../_components/note-create-button"
import DashboardShell from "../../_components/dashboard-shell"
import { Header } from "../../_components/header"
import { NoteItem } from "./_components/note-item"
import { NotesFeed } from "./_components/notes-feed"

interface NotesDashboardPageProps {
  searchParams: DashboardNotesSchema
}

export default async function NotesDashboardPage({
  searchParams,
}: NotesDashboardPageProps) {
  // TODO: title, updatedAt, abc
  const { page } = dashboardNotesSchema.parse({ page: searchParams.page })

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
        <NotesFeed page={page} />
      </Suspense>
    </DashboardShell>
  )
}
