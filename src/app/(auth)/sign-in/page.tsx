import { signInPageSchema, SignInPageSchema } from "@/lib/validation/pages"

import { SignInForm } from "./_components/sign-in-form"

export const metadata = {
  title: "Sign in",
}

interface SignInPageProps {
  searchParams: SignInPageSchema
}

export default function SignInPage({ searchParams }: SignInPageProps) {
  const parsedParams = signInPageSchema.parse(searchParams)

  return (
    <div className="mx-auto flex w-[350px] flex-col items-center justify-center space-y-6">
      {parsedParams["auth-required"] && (
        <div className="-mt-24 mb-6 grid max-w-xs gap-3 rounded-lg bg-zinc-300/25 p-4 ring-1 ring-inset ring-zinc-300/50 dark:bg-zinc-500/10 dark:ring-zinc-300/10">
          <p className="grid gap-3 text-sm">
            You must be logged in to access this page
          </p>
        </div>
      )}

      <div className="mb-10 flex flex-col space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome Back! Please Sign In
        </h1>
      </div>
      <SignInForm />
    </div>
  )
}
