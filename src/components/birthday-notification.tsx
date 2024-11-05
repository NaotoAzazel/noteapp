"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function BirthdayNotification() {
  const [isShowNotification, setIsShowNotification] = useState<boolean>(false)

  const { data: session } = useSession()
  const userBirthday = session?.user.dateOfBirthday

  useEffect(() => {
    if (!userBirthday) return

    const today = new Date()
    const birthday = new Date(userBirthday)
    const isBirthdayToday =
      today.getDate() === birthday.getDate() &&
      today.getMonth() === birthday.getMonth()

    const yearKey = `birthdayNotification-${today.getFullYear()}`

    if (isBirthdayToday && !localStorage.getItem(yearKey)) {
      setIsShowNotification(true)
      localStorage.setItem(yearKey, "shown")
    }
  }, [userBirthday])

  return (
    <Dialog
      open={isShowNotification}
      onOpenChange={(open) => setIsShowNotification(open)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">🎉 Happy birthday!</DialogTitle>
          <DialogDescription className="text-lg">
            May this day bring you joy, happiness and new achievements! We wish
            you health, good luck and warmth in every moment!
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
