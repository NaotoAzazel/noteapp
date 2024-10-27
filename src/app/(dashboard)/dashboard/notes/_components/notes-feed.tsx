import { getServerSession, Session } from "next-auth"

import { paginationConfig } from "@/config/paginations"
import { getUserNotesWithFilters } from "@/lib/actions/notes"
import { authOptions } from "@/lib/auth"
import { NoItemsPlaceholder } from "@/components/no-items-placeholder"

import { NoteCreateButton } from "../../_components/note-create-button"
import { NoteItem } from "./note-item"
import { PaginationControls } from "./pagination-controls"
import { ToolbarActions } from "./toolbar-actions/toolbar-actions"

interface NotesFeedProps {
  page: number
  search: string
}

export async function NotesFeed({ page, search }: NotesFeedProps) {
  const user = (await getServerSession(authOptions)) as Session

  const { data, metadata } = await getUserNotesWithFilters({
    creatorId: user.user.id,
    notesPerPage: paginationConfig.dashboardNotes.notesPerPage,
    page,
    searchedTitle: search,
    sortByTitle: "asc",
    sortByUpdatedAt: "desc",
  })

  return (
    <div className="flex flex-col gap-2">
      <ToolbarActions />
      {data.length > 0 ? (
        <>
          {data.map((note, i) => (
            <NoteItem {...note} key={i} />
          ))}
          <PaginationControls page={page} {...metadata} />
        </>
      ) : (
        <NoItemsPlaceholder
          title="No notes found"
          description="Try changing the filters or adding a note"
        >
          <NoteCreateButton />
        </NoItemsPlaceholder>
      )}
    </div>
  )
}
