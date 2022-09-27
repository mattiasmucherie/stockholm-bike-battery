// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios"
import type { NextApiRequest, NextApiResponse } from "next"

import { RootObject } from "../../types/MobilityOptions"
import { PurpleType, StationData } from "../../types/StationsMobilityOptions"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const axiosRes = await axios.get<StationData>(
    "https://stockholmebikes.se/map?_data=routes/map"
  )
  const vehicles = axiosRes.data.mobilityOptions.data.filter(
    (station) =>
      station.type === PurpleType.StationOptions &&
      station.id !== "21f117a0-b615-47a1-8b38-c0b6f41bca6c" &&
      station.id !== "a0436277-fd2c-48d8-a93b-2287d73c57f3"
  )
  const amountOfBikes = vehicles.reduce((prev, curr) => {
    if (curr.relationships.options) {
      return prev + curr.relationships.options?.data.length
    }
    return prev
  }, 0)
  const amountOfBikes2 = vehicles.reduce((prev, current) => {
    if (current.attributes.occupancy) {
      return prev + current.attributes.occupancy
    }
    return prev
  }, 0)
  const stationNames = await Promise.all(
    vehicles.map(async (s) => {
      const stationInfo = await axios.get<RootObject>(
        `https://stockholmebikes.se/map/detail/${s.id}?_data=routes/map/detail.$optionId`
      )
      console.warn(
        "just fetched: " + stationInfo.data.mobilityOption.station.address
      )
      return {
        address: stationInfo.data.mobilityOption.station.address,
        id: s.id,
      }
    })
  )

  console.warn(amountOfBikes, amountOfBikes2)
  res.send(stationNames)
}
