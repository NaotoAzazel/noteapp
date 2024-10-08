"use client"

import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"

export function SignOutButton() {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
    >
      Sign out
    </Button>
  )
}
