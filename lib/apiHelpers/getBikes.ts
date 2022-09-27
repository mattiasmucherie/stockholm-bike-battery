import axios from "axios";

import { data } from "../../constants/station";
import { PurpleType, StationData } from "../../types/StationsMobilityOptions";

export const getBikes = async () => {
  const res = await axios.get<StationData>(
    "https://stockholmebikes.se/map?_data=routes/map"
  )

  return res.data.mobilityOptions.data
    .filter((station) => station.type === PurpleType.StationOptions)
    .map((station) => {
      const addressOfStation = data.find((s) => s.id == station.id)?.address
      if (
        addressOfStation &&
        Number.isInteger(station.attributes.occupancy) &&
        Number.isInteger(station.attributes.capacity)
      ) {
        return {
          id: station.id,
          occupancy: station.attributes.occupancy!,
          capacity: station.attributes.capacity!,
          address: addressOfStation,
        }
      }
      return null
    })
    .filter((s) => s)
    .sort((a, b) => {
      const sA = a!.address.replace(/^[\s\d]+/, "").toUpperCase()
      const sB = b!.address.replace(/^[\s\d]+/, "").toUpperCase()
      if (sA < sB) {
        return -1
      }
      if (sA > sB) {
        return 1
      }
      return 0
    })
}