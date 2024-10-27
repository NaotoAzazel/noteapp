import type { Metadata } from "next"

import "../styles/globals.css"

import { siteConfig } from "@/config/site"
import { inter, playfairDisplay } from "@/lib/fonts"
import { absoluteUrl, cn } from "@/lib/utils"
import { Footer } from "@/components/layouts/footer/footer"
import { Header } from "@/components/layouts/header/header"

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  title: { default: siteConfig.name, template: `%s - ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: [siteConfig.name],
  icons: {
    icon: "/icon.png",
  },
  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],
  openGraph: {
    type: "website",
    locale: "en-US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  manifest: absoluteUrl("/site.webmanifest"),
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
