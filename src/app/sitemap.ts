import { MetadataRoute } from "next"

import { absoluteUrl } from "@/lib/utils"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/dashboard",
    "/dashboard/notes",
    "/note/edit",
    "/sign-in",
    "sign-up",
  ].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date().toISOString(),
  }))

  return routes
}
