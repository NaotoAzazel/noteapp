import { SidebarNavItem } from "@/types/navbar"

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: "home",
    },
    {
      title: "Notes",
      href: "/dashboard/notes",
      icon: "notebook",
    },
  ],
}
