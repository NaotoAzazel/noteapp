"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface TopProps {
  username: string
  notesAmmount: number
}

export function Top({ username, notesAmmount }: TopProps) {
  const nowTime = new Date().getHours()

  let greeting = "Good morning"
  if (nowTime >= 12 && nowTime < 18) {
    greeting = "Good afternoon"
  } else if (nowTime >= 18 || nowTime < 6) {
    greeting = "Good evening"
  }

  return (
    <div className="mt-32 flex flex-col items-center justify-center gap-3">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {greeting}, <span className="capitalize">{username}</span>
      </h1>
      <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
        {/* TODO: implement function to create note */}
        <Button variant="outline">
          <Icons.plus className="mr-2 size-4" />
          <span>Create note</span>
        </Button>
        <div className="flex flex-row items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium">
          <span className="flex flex-row items-center gap-2">
            {notesAmmount > 0 ? (
              <>
                <div className="size-2 rounded-full bg-primary opacity-70" />
                {notesAmmount} active notes
              </>
            ) : (
              <>No active notes</>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}
