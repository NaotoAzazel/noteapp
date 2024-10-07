"use client"

import { useState } from "react"
import Link from "next/link"

import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"

export function Header() {
  const [isAuth, setIsAuth] = useState<boolean>(false)

  return (
    <div className="sticky inset-x-0 top-0 z-50 flex h-14 w-full items-center border-b border-gray-200 bg-white/75 px-2 backdrop-blur-lg">
      <MaxWidthWrapper>
        <header className="flex w-full justify-between text-slate-800">
          <Link href="/" className="flex flex-row items-center">
            {/* TODO: paste here logo */}
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
                  onClick={() => setIsAuth(true)}
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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAuth(false)}
                >
                  Sign out
                </Button>
                <Link
                  href="/notes"
                  className={buttonVariants({ size: "sm", className: "px-4" })}
                >
                  Notes
                </Link>
              </>
            )}
          </nav>
        </header>
      </MaxWidthWrapper>
    </div>
  )
}
