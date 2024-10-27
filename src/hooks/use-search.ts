"use client"

import { useCallback, useEffect, useState, useTransition } from "react"
import { usePathname, useRouter } from "next/navigation"

export function useSearch() {
  const [inputValue, setInputValue] = useState<string>("")
  const [debouncedValue, setDebouncedValue] = useState<string>("")
  const [mounted, setMounted] = useState<boolean>(false)

  const router = useRouter()
  const pathname = usePathname()

  const [isPending, startTransition] = useTransition()

  const handleSearchParams = useCallback(
    (debouncedValue: string) => {
      let params = new URLSearchParams(window.location.search)
      if (debouncedValue.length > 0) {
        params.set("search", debouncedValue)
        params.set("page", "1")
      } else {
        params.delete("search")
        params.set("page", "1")
      }

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`)
      })
    },
    [pathname, router]
  )

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const searchQuery = params.get("search") ?? ""
    setInputValue(searchQuery)
  }, [])

  useEffect(() => {
    if (debouncedValue.length > 0 && !mounted) {
      setMounted(true)
    }
  }, [debouncedValue, mounted])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [inputValue])

  useEffect(() => {
    if (mounted) handleSearchParams(debouncedValue)
  }, [debouncedValue, handleSearchParams, mounted])

  return { inputValue, setInputValue }
}
