"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function NoteCreateButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const onSubmit = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
      })

      if (!response?.ok) {
        throw new Error("There was an error while creating note")
      }

      const createdNote = await response.json()

      router.refresh()
      router.push(`/note/edit/${createdNote.id}`)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant="outline" onClick={onSubmit} disabled={isLoading}>
      {isLoading ? (
        <Icons.spinner className="mr-2 size-4 animate-spin" />
      ) : (
        <Icons.plus className="mr-2 size-4" />
      )}
      <span>Create note</span>
    </Button>
  )
}
