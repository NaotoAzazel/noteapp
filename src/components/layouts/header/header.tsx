import Image from "next/image"
import Link from "next/link"
import logo from "@/assets/images/logo.png"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { SignOutButton } from "@/components/layouts/header/sign-out-button"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"

export async function Header() {
  const isAuth = await getServerSession(authOptions)

  return (
    <div className="sticky inset-x-0 top-0 z-50 flex h-14 w-full items-center border-b border-gray-200 bg-white/75 px-2 backdrop-blur-lg">
      <MaxWidthWrapper>
        <header className="flex w-full justify-between text-slate-800">
          <Link
            href="/"
            className="flex flex-row items-center justify-center gap-2"
          >
            <Image src={logo} className="size-6" alt="logo" />
            <span className="font-medium">Note Nest</span>
          </Link>
          <nav className="ml-auto flex flex-row items-center gap-6">
            {!isAuth ? (
              <>
                <Link
                  href="/sign-in"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                    className: "hidden sm:flex",
                  })}
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className={buttonVariants({ size: "sm", className: "px-4" })}
                >
                  <span className="flex items-center font-medium">
                    Get started
                    <Icons.arrowRight className="ml-2 size-4 shrink-0 text-white transition-transform duration-300 ease-in-out group-hover:translate-x-[2px]" />
                  </span>
                </Link>
              </>
            ) : (
              <>
                <SignOutButton />
                <Link
                  href="/dashboard"
                  className={buttonVariants({ size: "sm", className: "px-4" })}
                >
                  Dashboard
                </Link>
              </>
            )}
          </nav>
        </header>
      </MaxWidthWrapper>
    </div>
  )
}
