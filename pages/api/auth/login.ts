import type { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "lib/dbConnect"
import User from "models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

type Res = {
  status: "err" | "ok"
  msg: string
  token?: string
}

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    email: string
    password: string
  }
}

interface User {
  _id: string
  email: string
  password?: string
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse<Res>) {
  await dbConnect()
  const JWT_SECRET: string = String(process.env.JWT_SECRET)
  try {
    const email: string = req.body.email.toLowerCase()
    const password: string = req.body.password

    if (!email || !password) {
      return res.json({
        status: "err",
        msg: "Username or password is missing",
      })
    }

    const tempuser = await User.findOne({
      email: req.body.email,
    })
    if (!tempuser) {
      return res.json({ status: "err", msg: "Email or password wrong" })
    }
    if (await bcrypt.compare(password, tempuser.password)) {
      const token = jwt.sign(
        {
          id: tempuser._id,
        },
        JWT_SECRET,
        {
          expiresIn: 31556926, // 1 year in seconds
        }
      )

      return res.json({
        status: "ok",
        token: token,
        msg: "Everything went fine",
      })
    } else {
      return res.json({ status: "err", msg: "Email or password wrong" })
    }
  } catch (error) {
    res.json({ status: "err", msg: "Something went wrong" })
  }
}
