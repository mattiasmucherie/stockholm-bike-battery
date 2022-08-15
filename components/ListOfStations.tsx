import Link from "next/link"
import { FC, useEffect, useState } from "react"

import { useLocalStorage } from "../hooks/useLocalStorage"
import styles from "../styles/Home.module.scss"

interface ListOfStationsProps {
  stations: ({
    id: string
    occupancy: number
    capacity: number
    address: string
  } | null)[]
}

const ListOfStations: FC<ListOfStationsProps> = ({ stations }) => {
  const [favStations] = useLocalStorage<string[]>("favoriteStations", [])
  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])

  const favoriteStations = stations.filter(
    (station) => station && favStations.includes(station?.id)
  )
  const nonFavoriteStations = stations.filter(
    (station) => station && !favStations.includes(station?.id)
  )
  const occupancyColor = (occupancy: number): string => {
    if (occupancy > 5) {
      return styles.highOcc
    }
    if (occupancy < 1) {
      return styles.lowOcc
    }
    return ""
  }
  if (!isSSR) {
    return (
      <>
        {!!favoriteStations.length && (
          <>
            <h3>Favorites</h3>
            <ul className={styles.stationList}>
              {favoriteStations.map((station) => {
                if (station) {
                  return (
                    <li key={station.id}>
                      <Link href={`/station/${station.id}`}>
                        {station.address}
                      </Link>
                      <span className={occupancyColor(station.occupancy)}>
                        {station.occupancy}/{station.capacity}
                      </span>
                    </li>
                  )
                }
              })}
            </ul>
            <h3>Other Stations</h3>
          </>
        )}
        {!!nonFavoriteStations.length && (
          <>
            <ul className={styles.stationList}>
              {nonFavoriteStations.map((station) => {
                if (station) {
                  return (
                    <li key={station.id}>
                      <Link href={`/station/${station.id}`}>
                        {station.address}
                      </Link>
                      <span className={occupancyColor(station.occupancy)}>
                        {station.occupancy}/{station.capacity}
                      </span>
                    </li>
                  )
                }
              })}
            </ul>
          </>
        )}
      </>
    )
  }
  return null
}

export default ListOfStations
