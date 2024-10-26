"use client"

import { usePagination } from "@/hooks/use-pagination"
import { Button } from "@/components/ui/button"

interface PaginationControlsProps {
  page: number
  totalPages: number
  hasPrevPage: boolean
  hasNextPage: boolean
}

export function PaginationControls({
  page,
  totalPages,
  hasPrevPage,
  hasNextPage,
}: PaginationControlsProps) {
  const { handleNextPage, handlePrevPage } = usePagination({ page, totalPages })

  return (
    <div className="flex flex-row justify-end gap-2">
      <Button
        disabled={!hasPrevPage}
        variant="outline"
        onClick={handlePrevPage}
      >
        Previous
      </Button>
      <Button
        disabled={!hasNextPage}
        variant="outline"
        onClick={handleNextPage}
      >
        Next
      </Button>
    </div>
  )
}
