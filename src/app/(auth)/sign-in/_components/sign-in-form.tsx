"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"

import { cn } from "@/lib/utils"
import { SignInSchema, signInSchema } from "@/lib/validation/auth"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

export function SignInForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  })

  async function onSubmit(data: SignInSchema) {
    setIsLoading(true)

    try {
      await signIn("credentials", {
        ...data,
        redirect: true,
        callbackUrl: "/",
      })
    } catch (error) {
      console.error("Error when trying to authorise", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid w-full gap-6">
      <form className="grid gap-2" onSubmit={handleSubmit(onSubmit)}>
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
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            placeholder="super-strong-password"
            {...register("password")}
            className={cn("transition-all duration-150", {
              "focus-visible::ring-red-500": errors.password,
            })}
          />
          {errors?.password && (
            <p className="px-1 text-xs text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
        >
          {isLoading && <Icons.spinner className="mr-2 size-4 animate-spin" />}
          <span>Sign in</span>
        </Button>
        <Link href="/sign-up" className={buttonVariants({ variant: "link" })}>
          Dont have an account? Sign up
        </Link>
      </form>
    </div>
  )
}
