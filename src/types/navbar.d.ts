import { Icons } from "@/components/icons"

type SidebarNavItem = {
  title: string
  href: string
  icon: keyof typeof Icons
  disabled?: boolean
}

export { SidebarNavItem }
