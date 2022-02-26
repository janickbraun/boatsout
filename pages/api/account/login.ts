import type { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "lib/dbConnect"
import User from "models/User"

type Res = {
  user?: any
  success: boolean
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Res>) {
  await dbConnect()

  try {
    const tempuser = await User.findOne({
      email: req.body.email,
    })
    res.status(200).json({ success: true, user: tempuser })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}
