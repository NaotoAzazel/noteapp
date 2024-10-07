import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"

export default function Home() {
  return (
    <section className="relative h-screen items-center justify-center">
      <MaxWidthWrapper>
        <div className="container my-44 flex max-w-4xl flex-col items-center gap-5 text-center">
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-slate-800 sm:text-7xl">
            Note Nest - <span className="text-primary">save</span> all your
            notes here
          </h1>
          <p className="text-muted-foreground">
            The best place to store all your notes!
          </p>
          <Link
            href="sign-up"
            className={cn(
              buttonVariants(),
              "group h-14 gap-2 px-8 shadow-lg transition-shadow duration-300 hover:shadow-xl hover:ring-2 hover:ring-primary/50 hover:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-offset-2"
            )}
          >
            <span className="flex items-center gap-2 text-lg font-medium">
              Start for free today
              <Icons.arrowRight className="ml-2 size-4 shrink-0 text-white transition-transform duration-300 ease-in-out group-hover:translate-x-[2px]" />
            </span>
          </Link>

          <div className="flex items-center">
            <p className="text-sm font-medium">
              join 10.000+ people around the world
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  )
}
