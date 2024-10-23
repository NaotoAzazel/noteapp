import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function NoteCreateButton() {
  return (
    <Button variant="outline">
      <Icons.plus className="mr-2 size-4" />
      <span>Create note</span>
    </Button>
  )
}
