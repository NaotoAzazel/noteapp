import { Inter, Playfair_Display } from "next/font/google"

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
})

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})
