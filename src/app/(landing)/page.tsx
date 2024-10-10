import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"

export default function Home() {
  return (
    <section className="relative items-center justify-center">
      <MaxWidthWrapper>
        <div className="container my-44 flex max-w-3xl flex-col items-center text-center">
          <div className="mb-16 flex flex-col gap-5 text-center">
            <h1 className="font-heading text-4xl font-semibold tracking-tight text-slate-800 sm:text-6xl">
              Note Nest - save all your notes in one place
            </h1>
            <p className="max-w-prose text-base text-muted-foreground">
              Take full control of your notes with effortless organization and
              accessibility. Just copy, paste, and manage your thoughts
              seamlessly in one place!
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-5">
            <Link
              href="sign-up"
              // eslint-disable-next-line
              className={cn(
                buttonVariants(),
                "group h-14 px-16 shadow-lg transition-shadow duration-300 hover:shadow-xl hover:ring-2 hover:ring-primary/50 hover:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-offset-2"
              )}
            >
              <span className="flex items-center gap-2 text-base font-medium">
                Start for free today
                <Icons.arrowRight className="ml-2 size-4 shrink-0 text-white transition-transform duration-300 ease-in-out group-hover:translate-x-[2px]" />
              </span>
            </Link>

            <div className="flex flex-col items-center gap-1">
              <div className="flex">
                <Icons.star className="size-4 text-primary" />
                <Icons.star className="size-4 text-primary" />
                <Icons.star className="size-4 text-primary" />
                <Icons.star className="size-4 text-primary" />
                <Icons.star className="size-4 text-primary" />
              </div>
              <p className="text-sm font-medium">
                join 10.000+ people around the world
              </p>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}
