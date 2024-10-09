"use client"

import { useCallback, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { months } from "@/config/date"
import { cn, getDays, getYears } from "@/lib/utils"
import { SignUpSchema, signUpSchema } from "@/lib/validation/auth"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SelectItem } from "@/components/ui/select"
import { Icons } from "@/components/icons"

import { DateSelect } from "./date-select"

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const generateDays = useCallback(() => getDays(), [])
  const generateYears = useCallback(() => getYears(), [])

  const days = useMemo(() => generateDays(), [generateDays])
  const years = useMemo(() => generateYears(), [generateYears])

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  })

  async function onSubmit(data: SignUpSchema) {
    setIsLoading(true)

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response?.ok) {
        throw new Error("Registration failed")
      }

      router.push("/sign-in")
    } catch (error) {
      console.error("Error when trying to register", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid w-full gap-6">
      <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            placeholder="Vladislav"
            {...register("username")}
            className={cn("transition-all duration-150", {
              "focus-visible:ring-red-500": errors.email,
            })}
          />
          {errors?.username && (
            <p className="px-1 text-xs text-red-600">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            {...register("email")}
            className={cn("transition-all duration-150", {
              "focus-visible:ring-red-500": errors.email,
            })}
          />
          {errors?.email && (
            <p className="px-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            placeholder="super-strong-password"
            {...register("password")}
            className={cn("transition-all duration-150", {
              "focus-visible:ring-red-500": errors.password,
            })}
          />
          {errors?.password && (
            <p className="px-1 text-xs text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Date of birth</Label>
          <div className="flex flex-row gap-2">
            <DateSelect
              control={control}
              name="day"
              error={!!errors.day?.message}
            >
              {days.map((day) => (
                <SelectItem key={day.value} value={day.value.toString()}>
                  {day.name}
                </SelectItem>
              ))}
            </DateSelect>
            <DateSelect
              control={control}
              name="month"
              error={!!errors.month?.message}
            >
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value.toString()}>
                  {month.name}
                </SelectItem>
              ))}
            </DateSelect>
            <DateSelect
              control={control}
              name="year"
              error={!!errors.year?.message}
            >
              {years.map((year) => (
                <SelectItem key={year.value} value={year.value.toString()}>
                  {year.name}
                </SelectItem>
              ))}
            </DateSelect>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
        >
          {isLoading && <Icons.spinner className="mr-2 size-4 animate-spin" />}
          <span>Sign up</span>
        </Button>
        <Link href="/sign-in" className={buttonVariants({ variant: "link" })}>
          Already have an account? Sign in
        </Link>
      </form>
    </div>
  )
}
