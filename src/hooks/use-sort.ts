"use client"

import { useCallback, useEffect, useState, useTransition } from "react"
import { usePathname, useRouter } from "next/navigation"

interface UseSortProps {
  sortOptions: { value: string; label: string }[]
  clearSortButtonValue: string
}

export function useSort({ sortOptions, clearSortButtonValue }: UseSortProps) {
  const [value, setValue] = useState<string>("")

  const router = useRouter()
  const pathname = usePathname()

  const [isPending, startTransition] = useTransition()

  const handleClick = useCallback(
    (selectedValue: string) => {
      let params = new URLSearchParams(window.location.search)
      if (selectedValue.length) params.set("sort", selectedValue)
      else params.delete("sort")

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`)
      })
    },
    [pathname, router]
  )

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sortQuery = params.get("sort") ?? ""

    const isValid = sortOptions.find((param) => param.value === sortQuery)
    setValue(isValid ? sortQuery : "")
  }, [sortOptions])

  useEffect(() => {
    if (value === clearSortButtonValue) {
      setValue("")
    }

    handleClick(value)
  }, [value, handleClick, clearSortButtonValue])

  return { value, setValue, isPending }
}
