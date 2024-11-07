"use client"

import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"

export function SignOutButton() {
  const onClick = async () => {
    await signOut({ redirect: true, callbackUrl: "/" })

    const currentYear = new Date().getFullYear()
    localStorage.removeItem(`birthdayNotification-${currentYear}`)
  }

  return (
    <Button variant="ghost" size="sm" onClick={onClick}>
      Sign out
    </Button>
  )
}
