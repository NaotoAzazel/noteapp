import { Prisma } from "@prisma/client"
import bcrypt, { hash } from "bcryptjs"

import { UserAccount } from "@/types/auth"
import { db } from "@/lib/db"

function comparePasswords(password: string, hashedPassword: string) {
  return bcrypt.compareSync(password, hashedPassword)
}

async function hashPassword(password: string) {
  const SALT_ROUNDS = 10
  return await hash(password, SALT_ROUNDS)
}

interface GetUserByParams {
  params: Prisma.UserFindFirstArgs
}

async function getUserByParams({ params }: GetUserByParams) {
  const user = await db.user.findFirst(params)
  return user
}

interface CreateUser extends UserAccount {}

async function createUser({
  dateOfBirthday,
  email,
  password,
  username,
}: CreateUser) {
  const createdUser = await db.user.create({
    data: { dateOfBirthday, email, password, username },
  })
  return createdUser
}

export { comparePasswords, hashPassword, getUserByParams, createUser }
