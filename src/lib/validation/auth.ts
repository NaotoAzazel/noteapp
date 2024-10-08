import { z } from "zod"

const signInSchema = z.object({
  email: z.string().email({ message: "Wrong email" }),
  password: z.string().min(1).max(256),
})

export type SignInSchema = z.infer<typeof signInSchema>

export { signInSchema }
