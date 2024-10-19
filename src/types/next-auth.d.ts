import NextAuth from "next-auth"

import { UserAccount } from "@/types/auth"

declare module "next-auth" {
  interface User extends UserAccount {}

  interface Session {
    user: User
    token: string
  }
}
