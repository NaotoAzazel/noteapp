"use client"

import { Control, Controller } from "react-hook-form"

import { cn } from "@/lib/utils"
import { SignUpSchema } from "@/lib/validation/auth"
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DateSelectProps {
  control: Control<SignUpSchema>
  name: keyof SignUpSchema
  children: React.ReactNode
  error: boolean
}

export function DateSelect({
  control,
  name,
  error,
  children,
}: DateSelectProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          onValueChange={(value) => field.onChange(Number(value))}
          value={field.value?.toString()}
        >
          <SelectTrigger
            className={cn("w-full", {
              "ring-1 ring-red-500": error,
            })}
          >
            <SelectValue placeholder={name} />
          </SelectTrigger>
          <SelectContent>{children}</SelectContent>
        </Select>
      )}
    />
  )
}
