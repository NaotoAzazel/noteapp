import type { Metadata } from "next"

import "../styles/globals.css"

import { inter, playfairDisplay } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Footer } from "@/components/layouts/footer/footer"
import { Header } from "@/components/layouts/header/header"

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
          "relative h-full font-sans antialiased",
          inter.variable,
          playfairDisplay.variable
        )}
      >
        <main className="relative flex min-h-screen flex-col">
          <Header />
          <div className="flex-1 grow">{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  )
}
