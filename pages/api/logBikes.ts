// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"
import { PurpleType, StationData } from "../../types/StationsMobilityOptions"
import prisma from "../../lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const test = await axios.get<StationData>(
    "https://stockholmebikes.se/map?_data=routes/map"
  )
  const stations = test.data.mobilityOptions.data.filter(
    (station) =>
      station.type === PurpleType.StationOptions &&
      station.id !== "21f117a0-b615-47a1-8b38-c0b6f41bca6c"
  )
  const amountOfBikes = stations.reduce((prev, current) => {
    if (current.attributes.occupancy) {
      return prev + current.attributes.occupancy
    }
    return prev
  }, 0)
  const result = await prisma.batteryPost.create({
    data: {
      bikes: amountOfBikes,
    },
  })
  res.json(result)
}
