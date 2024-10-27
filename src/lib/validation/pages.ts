import { z } from "zod"

import { queryConfig } from "@/config/query"

const allowedSortValues = queryConfig.dashboardNotes.sortOptions.map(
  (_) => _.value
)

const dashboardNotesSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  search: z.string().catch(""),
  sort: z
    .enum(
      allowedSortValues.length > 0
        ? (allowedSortValues as [string, ...string[]])
        : ["default"]
    )
    .catch("createdAt.desc"),
})

export type DashboardNotesSchema = z.infer<typeof dashboardNotesSchema>

export { dashboardNotesSchema }
