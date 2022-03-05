import type { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "lib/dbConnect"
import User from "models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { isBlank } from "lib/isEmpty"

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
  email: string
  password: string
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse<Res>) {
  await dbConnect()
  const JWT_SECRET: string = String(process.env.JWT_SECRET)
  try {
    if (isBlank(req.body.email) || isBlank(req.body.password)) return res.json({ status: "err", msg: "Enter valid inputs" })
    if (req.body.password.length < 6) return res.json({ status: "err", msg: "Password has to be at least 6 characters long" })
    const email: string = req.body.email.toLowerCase()
    const password: string = req.body.password

    if (!email || !password) {
      return res.json({
        status: "err",
        msg: "Username or password is missing",
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const signedUpUser = new User({
      email: req.body.email,
      password: hashedPassword,
    })

    await signedUpUser
      .save()
      .then(async () => {
        const tempuser = await User.findOne({
          email: req.body.email,
        })

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
      })
      .catch((err: Error) => {
        if (err.message.startsWith("E11000")) {
          return res.json({ status: "err", msg: "Email is already in use" })
        }
      })
  } catch (error) {
    res.json({ status: "err", msg: "Something went wrong" })
  }
}
