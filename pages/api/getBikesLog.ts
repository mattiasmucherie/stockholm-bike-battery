import type { NextApiRequest, NextApiResponse } from "next"

import prisma from "../../lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const d = new Date()
  d.setDate(d.getDate() - 7)
  const result = await prisma.batteryPost.findMany({
    where: { createdAt: { lte: new Date(), gte: d } },
  })
  res.json(result)
}
