import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "../../lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { days = "7" } = req.query
  if (typeof days === "string") {
    const d = new Date()
    d.setDate(d.getDate() - parseInt(days))
    const result = await prisma.batteryPost.findMany({
      where: { createdAt: { lte: new Date(), gte: d } },
      orderBy: { createdAt: "asc" },
    })
    res.json(result)
  }
}
