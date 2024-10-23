import { getNotesByUserId } from "@/lib/actions/notes"
import { NoItemsPlaceholder } from "@/components/no-items-placeholder"

import { NoteCreateButton } from "../../_components/note-create-button"
import { NoteItem } from "./note-item"

interface NotesFeedProps {
  userNotesPromise: ReturnType<typeof getNotesByUserId>
}

export async function NotesFeed({ userNotesPromise }: NotesFeedProps) {
  const userNotes = await userNotesPromise

  return (
    <div className="flex flex-col gap-2">
      {userNotes.length > 0 ? (
        <>
          {userNotes.map((note, i) => (
            <NoteItem {...note} key={i} />
          ))}
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
