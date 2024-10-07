import type { Metadata } from "next"

import "../styles/globals.css"

import { inter, playfairDisplay } from "@/lib/fonts"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Main page",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "relative h-full antialiased",
          inter.variable,
          playfairDisplay.variable
        )}
      >
        <main className="relative flex min-h-screen flex-col">
          <div className="flex-1 grow">{children}</div>
        </main>
      </body>
    </html>
  )
}
