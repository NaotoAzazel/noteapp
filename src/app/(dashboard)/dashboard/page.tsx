import { getServerSession, Session } from "next-auth"

import { getNotesByUserId } from "@/lib/actions/notes"
import { authOptions } from "@/lib/auth"

import { Top } from "./_components/top"

export const metadata = {
  title: "Dashboard",
}

export default async function HomeDashboardPage() {
  const user = (await getServerSession(authOptions)) as Session
  const userNotes = await getNotesByUserId({
    userId: user.user.id,
  })

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Top
        username={user.user.username || "no username"}
        notesAmmount={userNotes.length}
      />
    </div>
  )
}
