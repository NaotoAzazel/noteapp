"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import EditorJS, { EditorConfig, OutputData } from "@editorjs/editorjs"

export function useEditor<T extends OutputData | undefined>(
  data?: T,
  config?: EditorConfig
) {
  const editorRef = useRef<EditorJS>()
  const [isMounted, setIsMounted] = useState(false)

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const Table = (await import("@editorjs/table")).default
    const List = (await import("@editorjs/list")).default

    if (!editorRef.current) {
      const editor = new EditorJS({
        readOnly: config?.readOnly,
        holder: "editor",
        placeholder: 'Start typing here or use "/" command...',
        inlineToolbar: true,
        data,
        tools: {
          header: Header,
          list: List,
          table: Table,
        },
        onReady() {
          editorRef.current = editor
          config?.onReady?.()
        },
      })
    }
  }, [data, config])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    if (isMounted) {
      initializeEditor()
    }
    return () => {
      editorRef.current?.destroy()
      editorRef.current = undefined
    }
  }, [isMounted, initializeEditor])

  return { editorRef }
}
