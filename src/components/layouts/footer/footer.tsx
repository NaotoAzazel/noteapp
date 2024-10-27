import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import logo from "@/app/icon.png"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 py-8">
      <MaxWidthWrapper className="pt-10">
        <div className="col-span-2 space-y-6">
          <Link href="/" className="flex flex-row gap-2">
            <Image src={logo} className="size-6" alt="logo" />
            <span className="font-medium">{siteConfig.name}</span>
          </Link>
          <p className="max-w-xs text-sm text-gray-600">
            Note Nest - save all your notes in one place
          </p>
        </div>
        <div className="mt-4 border-t border-gray-200 pt-8">
          <p className="text-sm leading-5 text-gray-500">
            © {currentYear} Note Nest
          </p>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}
