interface NotePageParams {
  params: {
    id: string
  }
}

export default function NotePage({ params }: NotePageParams) {
  return <span>{params.id}</span>
}
