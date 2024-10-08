import { MaxWidthWrapper } from "@/components/max-width-wrapper"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <MaxWidthWrapper className="flex h-screen">{children}</MaxWidthWrapper>
}
