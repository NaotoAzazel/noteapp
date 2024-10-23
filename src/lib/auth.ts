import { PrismaAdapter } from "@auth/prisma-adapter"
import { AuthOptions, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import { comparePasswords, getUserByParams } from "@/lib/actions/users"
import { db } from "@/lib/db"

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/sign-in",
  },
  adapter: PrismaAdapter(db) as any,
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "text" },
        dateOfBirthday: { label: "DateOfBirthday", type: "text" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials) {
          return null
        }

        const email = credentials.email
        const existingUser = await getUserByParams({
          params: { where: { email } },
        })

        if (!existingUser) {
          return null
        }

        const isPasswordsMatch = comparePasswords(
          credentials.password,
          existingUser.password
        )

        return isPasswordsMatch ? existingUser : null
      },
    }),
  ],
  // Dont touch callbacks, idk how it works
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          user,
        }
      }

      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        ...token,
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
