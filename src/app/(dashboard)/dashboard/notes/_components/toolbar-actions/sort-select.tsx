"use client"

import { queryConfig } from "@/config/query"
import { useSort } from "@/hooks/use-sort"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
} from "@/components/ui/select"
import { Icons } from "@/components/icons"

export function SortSelect() {
  const sortOptions = queryConfig.dashboardNotes.sortOptions

  const { value, setValue, isPending } = useSort({
    sortOptions,
    clearSortButtonValue: "clear",
  })

  return (
    <Select disabled={isPending} value={value} onValueChange={setValue}>
      <SelectTrigger className="w-16">
        <Icons.sort className="size-4" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((sort) => (
          <SelectItem key={sort.value} value={sort.value}>
            {sort.label}
          </SelectItem>
        ))}
        {sortOptions.length > 1 && (
          <>
            <SelectSeparator />
            <SelectItem value="clear">Clear</SelectItem>
          </>
        )}
      </SelectContent>
    </Select>
  )
}
