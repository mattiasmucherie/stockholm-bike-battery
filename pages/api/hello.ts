import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

import { RootObject } from "../../types/MobilityOptions"
import { PurpleType, StationData } from "../../types/StationsMobilityOptions"

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
  const stationIds = stations.map((station) => station.id)
  const data = await Promise.all(
    stationIds.map(async (id) => {
      const res = await axios.get<RootObject>(
        `https://stockholmebikes.se/map/detail/${id}?_data=routes/map/detail.$optionId`
      )
      return { id, address: res.data.mobilityOption.station.address }
    })
  )
  console.warn(stationIds.length)
  res.json(data)
}
