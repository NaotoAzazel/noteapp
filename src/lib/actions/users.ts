import { Prisma } from "@prisma/client"
import bcrypt from "bcryptjs"

import { User } from "@/types/auth"
import { db } from "@/lib/db"

function comparePasswords(password: string, hashedPassword: string) {
  return bcrypt.compareSync(password, hashedPassword)
}

function saltAndHashPassword(password: string) {
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

interface GetUserByParams {
  params: Prisma.UserFindFirstArgs
}

async function getUserByParams({ params }: GetUserByParams) {
  const user = await db.user.findFirst(params)
  return user
}

interface CreateUser extends User {}

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

export { comparePasswords, saltAndHashPassword, getUserByParams, createUser }
