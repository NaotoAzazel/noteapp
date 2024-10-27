import { SearchBar } from "./search-bar"
import { SortSelect } from './sort-select'

export function ToolbarActions() {
  return (
    <div className="flex flex-row gap-2">
      <SearchBar />
      <SortSelect />
    </div>
  )
}
