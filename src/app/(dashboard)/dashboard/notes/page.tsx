import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { getNotesByParams } from "@/lib/actions/notes"
import { authOptions } from "@/lib/auth"

export default async function NotesPageById() {
  const user = await getServerSession(authOptions)

  const lastUserNote = await getNotesByParams({
    params: {
      where: { creatorId: { equals: user?.user.id } },
      take: 1,
      orderBy: { createdAt: "desc" },
    },
  })

  if (lastUserNote[0]) {
    redirect(`/dashboard/notes/${lastUserNote[0].id}`)
  }

  return <></>
}
