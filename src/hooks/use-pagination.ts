"use client"

import { useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"

interface UsePaginationProps {
  page: number
  totalPages: number
}

export function usePagination({ page, totalPages }: UsePaginationProps) {
  const router = useRouter()
  const pathname = usePathname()

  const setCurrentPage = useCallback(
    (newPage: string) => {
      let params = new URLSearchParams(window.location.search)
      if (newPage.length) params.set("page", newPage)
      else params.delete("page")

      router.replace(`${pathname}?${params}`)
    },
    [router, pathname]
  )

  const handlePrevPage = () => {
    if (page > 1) {
      setCurrentPage((page - 1).toString())
    }
  }

  const handleNextPage = () => {
    if (page < totalPages) {
      setCurrentPage((page + 1).toString())
    }
  }

  return { handlePrevPage, handleNextPage }
}
