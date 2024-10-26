import { getServerSession, Session } from "next-auth"

import { paginationConfig } from "@/config/paginations"
import { getUserNotesWithFilters } from "@/lib/actions/notes"
import { authOptions } from "@/lib/auth"
import { NoItemsPlaceholder } from "@/components/no-items-placeholder"

import { NoteCreateButton } from "../../_components/note-create-button"
import { NoteItem } from "./note-item"
import { PaginationControls } from "./pagination-controls"

interface NotesFeedProps {
  page: number
}

export async function NotesFeed({ page }: NotesFeedProps) {
  const user = (await getServerSession(authOptions)) as Session

  const { data, metadata } = await getUserNotesWithFilters({
    creatorId: user.user.id,
    notesPerPage: paginationConfig.dashboardNotes.notesPerPage,
    page,
    searchedTitle: "",
    sortByTitle: "asc",
    sortByUpdatedAt: "desc",
  })

  return (
    <div className="flex flex-col gap-2">
      {data.length > 0 ? (
        <>
          {data.map((note, i) => (
            <NoteItem {...note} key={i} />
          ))}
          <PaginationControls page={page} {...metadata} />
        </>
      ) : (
        <NoItemsPlaceholder
          title="No notes could be found"
          description="No notes have been created at the moment"
        >
          <NoteCreateButton />
        </NoItemsPlaceholder>
      )}
    </div>
  )
}
