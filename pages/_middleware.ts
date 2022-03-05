import { NextRequest, NextResponse } from "next/server"
import User from "models/User"
import jwt from "jsonwebtoken"

export async function middleware(req: NextRequest) {
  const token: string = String(localStorage.getItem("token"))
  const tempuser: any = jwt.verify(token, String(process.env.JWT_SECRET))
  const _id = tempuser?.id

  const checkuser = await User.findOne({
    _id,
  })

  let loggedin = false
  if (checkuser) {
    loggedin = true
  } else {
    loggedin = false
  }
  const { pathname } = req.nextUrl
  if (pathname == "/" && !loggedin) {
    return NextResponse.redirect(process.env.NEXTAUTH_URL + "/login")
  }

  //if (!session) return NextResponse.redirect(process.env.NEXTAUTH_URL + "/login")
  return NextResponse.next()
}
