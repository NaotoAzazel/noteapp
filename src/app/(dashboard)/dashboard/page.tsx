import { getServerSession } from "next-auth"

import { getNotesByParams } from "@/lib/actions/notes"
import { authOptions } from "@/lib/auth"

import { Top } from "./_components/top"

export default async function HomeDashboardPage() {
  const user = await getServerSession(authOptions)
  const userNotes = await getNotesByParams({
    params: {
      where: {
        creatorId: {
          equals: user?.user.id,
        },
      },
    },
  })

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Top
        username={user?.user.username || "no username"}
        notesAmmount={userNotes.length}
      />
    </div>
  )
}
