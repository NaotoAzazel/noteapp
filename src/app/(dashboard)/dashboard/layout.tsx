import { dashboardConfig } from "@/config/dashboard"
import { DashboardNav } from "@/components/layouts/dashboard-nav/dashboard-nav"

interface DashbordLayoutProps {
  children: React.ReactNode
}

export default function DashbordLayout({ children }: DashbordLayoutProps) {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-row">
      <aside className="border bg-zinc-50 p-4 lg:w-64">
        <DashboardNav items={dashboardConfig.sidebarNav} />
      </aside>
      <div className="flex max-h-[calc(100vh-7rem)] w-full flex-col overflow-y-auto p-4 sm:p-4">
        {children}
      </div>
    </div>
  )
}
