import { z } from "zod"

const signInSchema = z.object({
  email: z.string().email({ message: "Wrong email" }),
  password: z.string().min(1).max(256),
})

export type SignInSchema = z.infer<typeof signInSchema>

const signUpSchema = signInSchema.extend({
  username: z.string().min(1).max(48),
  day: z.number().min(1).max(31),
  month: z.number().min(1).max(12),
  year: z.number().min(1900).max(new Date().getFullYear()),
})

export type SignUpSchema = z.infer<typeof signUpSchema>

export { signInSchema, signUpSchema }
