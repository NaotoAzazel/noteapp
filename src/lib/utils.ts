import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const getDays = () =>
  Array.from({ length: 31 }, (_, i) => ({
    name: String(i + 1),
    value: i + 1,
  }))

// (1900 to current)
// -----------------------------
// If you want to change the start year,
// be sure to change the auth validation as well.
const currentYear = new Date().getFullYear()
const getYears = () =>
  Array.from({ length: currentYear - 1900 + 1 }, (_, i) => ({
    name: String(1900 + i),
    value: 1900 + i,
  })).reverse()

export { cn, getDays, getYears }
