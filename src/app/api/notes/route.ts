import { getServerSession } from "next-auth"

import { createNote } from "@/lib/actions/notes"
import { authOptions } from "@/lib/auth"

export async function POST() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return Response.json({ message: "Not authorized" }, { status: 403 })
    }

    const createdNote = await createNote({ creatorId: session.user.id })
    if (!createdNote) {
      throw new Error("Failed to create note")
    }

    return new Response(JSON.stringify(createdNote), { status: 200 })
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}
