import NextAuth from "next-auth"

import { User } from "@/types/auth"

declare module "next-auth" {
  interface User extends User {}

  interface Session {
    user: User
    token: string
  }
}
