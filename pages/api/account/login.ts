import type { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "lib/dbConnect"
import { isEmpty } from "lib/isEmpty"
import User from "models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

type Res = {
  user?: any
  status: "err" | "ok"
  msg?: string
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
    const email: string = req.body.email
    const password: string = req.body.password

    if (!email || !password) {
      return res.status(400).json({
        status: "err",
        msg: "Request missing username or password",
      })
    }

    const tempuser = await User.findOne({
      email: req.body.email,
    })
    if (!tempuser) {
      return res.status(400).json({ status: "err", msg: "Email or password wrong" })
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

      return res.status(200).json({
        status: "ok",
        token: token,
      })
    } else {
      return res.json({ status: "err", msg: "Email or password wrong" })
    }
  } catch (error) {
    res.status(400).json({ status: "err", msg: "Something went wrong" })
  }
}
