import { dashboardConfig } from "@/config/dashboard"
import { DashboardNav } from "@/components/layouts/dashboard-nav/dashboard-nav"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"

interface DashbordLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashbordLayoutProps) {
  return (
    <div className="flex flex-col">
      <MaxWidthWrapper>
        <div className="my-7 grid flex-1 gap-12 lg:grid-cols-[160px_1fr]">
          <aside className="w-170px hidden flex-col lg:flex">
            <DashboardNav items={dashboardConfig.sidebarNav} />
          </aside>
          <main className="flex w-full flex-1 flex-col">{children}</main>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
