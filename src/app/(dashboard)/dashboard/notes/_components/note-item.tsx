import Link from "next/link"
import { Note } from "@prisma/client"

import { formatDate } from "@/lib/formatters"
import { Skeleton } from "@/components/ui/skeleton"

interface NoteItemProps extends Note {}

export function NoteItem({ id, title, createdAt }: NoteItemProps) {
  const formattedDate = formatDate(createdAt, {
    month: "short",
  })

  return (
    <Link
      href={id}
      className="flex flex-col gap-1 rounded-md border p-3 px-5 transition-colors duration-200 hover:bg-accent"
    >
      <span className="font-medium">{title}</span>
      <p className="min-w-[200px] text-sm text-muted-foreground">
        {formattedDate}
      </p>
    </Link>
  )
}

NoteItem.Skeleton = function NoteItem() {
  return (
    <div className="flex flex-col gap-1 rounded-md border p-3 px-5">
      <Skeleton className="h-6 w-44" />
      <Skeleton className="h-4 w-28" />
    </div>
  )
}
