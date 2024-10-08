import { SignInForm } from "./_components/sign-in-form"

export const metadata = {
  title: "Sign in",
}

export default function SignInPage() {
  return (
    <div className="mx-auto flex w-[350px] flex-col items-center justify-center space-y-6">
      <div className="mb-10 flex flex-col space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Good to see you again
        </h1>
      </div>
      <SignInForm />
    </div>
  )
}
