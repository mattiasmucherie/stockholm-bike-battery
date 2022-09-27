import { NextApiRequest, NextApiResponse } from "next"

import { getBikes } from "../../lib/apiHelpers/getBikes"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const stations = await getBikes()
  res.json(stations)
}
