import { z } from "zod"

const dashboardNotesSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  search: z.string().catch(""),
})

export type DashboardNotesSchema = z.infer<typeof dashboardNotesSchema>

export { dashboardNotesSchema }
