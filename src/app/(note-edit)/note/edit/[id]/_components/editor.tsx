"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Note } from "@prisma/client"
import { useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"

import { formatDate } from "@/lib/formatters"
import { noteSchema, NoteSchema } from "@/lib/validation/note"
import { useEditor } from "@/hooks/use-editor"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface EditorProps extends Note {}

export function Editor({ content, title, updatedAt, id }: EditorProps) {
  const [isSaving, setIsSaving] = useState<boolean>(false)

  const { editorRef } = useEditor(content)
  const _titleRef = useRef<HTMLTextAreaElement>(null)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteSchema>({
    resolver: zodResolver(noteSchema),
    defaultValues: { content, title },
  })

  const onSubmit = async (data: NoteSchema) => {
    setIsSaving(true)

    try {
      const blocks = await editorRef.current?.save()
      if (!blocks) {
        return
      }

      toggleReadOnlyMode(true)

      const response = await fetch(`/api/notes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          content: blocks,
        }),
      })

      if (!response?.ok) {
        throw new Error("Cant save note. Try again")
      }

      router.refresh()
    } catch (error) {
      console.error("Error while saving note", error)
    } finally {
      setIsSaving(false)
      toggleReadOnlyMode(false)
    }
  }

  const toggleReadOnlyMode = async (readOnly: boolean) => {
    if (editorRef.current) {
      await editorRef.current.readOnly.toggle(readOnly)
    }
  }

  const { ref: titleRef, ...rest } = register("title")

  const formattedUpdatedAt = formatDate(updatedAt, { month: "short" })

  return (
    <div className="my-10 flex flex-col gap-4">
      <div className="w-full rounded-md border border-zinc-200 bg-zinc-50 p-4">
        <form
          className="flex w-full flex-col gap-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-row items-center justify-between gap-2">
            <span className="text-sm text-muted-foreground md:text-base">
              Last edited on {formattedUpdatedAt}
            </span>
            <Button
              disabled={isSaving || !!errors.content}
              size="sm"
              type="submit"
              onClick={handleSubmit(onSubmit)}
            >
              {isSaving && (
                <Icons.spinner className="mr-2 size-4 animate-spin" />
              )}
              Save changes
            </Button>
          </div>

          <TextareaAutosize
            ref={(e) => {
              titleRef(e)

              // @ts-ignore
              _titleRef.current = e
            }}
            {...rest}
            disabled={isSaving}
            placeholder="Title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />
          <div
            id="editor"
            className="ml-6 flex min-h-[600px] w-full items-start justify-start"
          />
        </form>
      </div>
    </div>
  )
}
