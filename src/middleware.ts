import { NextResponse } from "next/server"
import { withAuth } from "next-auth/middleware"

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token
    const isAuth = !!token

    const isAuthPage = req.nextUrl.pathname.startsWith("/sign-in")
    const isRegisterPage = req.nextUrl.pathname.startsWith("/sign-up")

    if (isAuthPage || isRegisterPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/", req.url))
      }

      return null
    }

    if (!isAuth) {
      return NextResponse.redirect(
        new URL("/sign-in?auth-required=true", req.url)
      )
    }
  },
  {
    callbacks: {
      authorized() {
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/sign-in", "/sign-up", "/dashboard/:path*"],
}
