interface NoteLayoutProps {
  children: React.ReactNode
}

export default function NoteLayout({ children }: NoteLayoutProps) {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-row">
      <aside className="rounded-md border p-4 lg:w-64">
        <h1 className="text-xl font-medium tracking-tight">Notes</h1>
      </aside>
      <div className="flex max-h-[calc(100vh-7rem)] w-full flex-col overflow-y-auto p-4 sm:p-4">
        {children}
      </div>
    </div>
  )
}
