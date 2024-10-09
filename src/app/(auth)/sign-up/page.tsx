import { SignUpForm } from "./_components/sign-up-form"

export const metadata = {
  title: "Sign up",
}

export default function SignUpPage() {
  return (
    <div className="mx-auto flex w-[350px] flex-col items-center justify-center space-y-6">
      <div className="mb-10 flex flex-col space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Create Your Account
        </h1>
      </div>
      <SignUpForm />
    </div>
  )
}
