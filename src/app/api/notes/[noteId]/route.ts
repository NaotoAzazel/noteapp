import { getServerSession } from "next-auth"
import { z } from "zod"

import { canUserAccessNote, updateNoteById } from "@/lib/actions/notes"
import { authOptions } from "@/lib/auth"
import { noteSchema } from "@/lib/validation/note"

const routeContextSchema = z.object({
  params: z.object({
    noteId: z.string(),
  }),
})

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context)

    const json = await req.json()
    const data = noteSchema.parse(json)

    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return Response.json({ message: "Not authorized" }, { status: 403 })
    }

    const noteId = params.noteId
    const userId = session.user.id

    const сanUserChangeNote = canUserAccessNote({ noteId, userId })
    if (!сanUserChangeNote) {
      return Response.json({ message: "No access" }, { status: 403 })
    }

    const updatedNote = await updateNoteById({ noteId, updatedData: data })
    if (!updatedNote) {
      throw new Error(`Failed to update note with id: ${noteId}`)
    }

    return new Response(null, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
      })
    }
  }
}
