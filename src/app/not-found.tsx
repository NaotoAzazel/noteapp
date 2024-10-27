import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"

export default function NotFound() {
  return (
    <MaxWidthWrapper className="flex h-screen items-center justify-center">
      <section className="max-w-screen-md space-y-4 text-center">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold leading-10 tracking-tight">404</h1>
          <p className="text-xl text-muted-foreground">
            <span>
              The page you requested does not exist or has been deleted.
              Possible, You typed in the wrong address.
            </span>
          </p>
        </div>

        <div>
          <Link href="/" className={buttonVariants()}>
            Main page
          </Link>
        </div>
      </section>
    </MaxWidthWrapper>
  )
}
