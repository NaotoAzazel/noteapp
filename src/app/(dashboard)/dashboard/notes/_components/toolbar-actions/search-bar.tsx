"use client"

import { useSearch } from "@/hooks/use-search"
import { Input } from "@/components/ui/input"

export function SearchBar() {
  const { inputValue, setInputValue } = useSearch()

  return (
    <Input
      placeholder="Find note by title..."
      type="text"
      onChange={(e) => setInputValue(e.target.value)}
      value={inputValue}
    />
  )
}
