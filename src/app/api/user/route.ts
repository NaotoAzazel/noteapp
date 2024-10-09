import { NextResponse } from "next/server"
import { z } from "zod"

import { createUser, getUserByParams, hashPassword } from "@/lib/actions/users"
import { signUpSchema } from "@/lib/validation/auth"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { email, password, day, month, year, ...rest } =
      signUpSchema.parse(body)

    const existingUserByEmail = await getUserByParams({
      params: {
        where: { email },
      },
    })
    if (existingUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this email already exists",
        },
        { status: 409 }
      )
    }

    const dateOfBirthday = new Date(year, month - 1, day)
    const dateToISO = dateOfBirthday.toISOString()

    const hashedPassword = await hashPassword(password)
    const newUser = await createUser({
      email,
      password: hashedPassword,
      dateOfBirthday: dateToISO,
      ...rest,
    })

    return NextResponse.json(
      { user: newUser, message: "User created successfully" },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return NextResponse.json(
      {
        message: `Something went wrong: ${error}`,
      },
      { status: 500 }
    )
  }
}
