import axios from "axios"
import type { NextPage } from "next"
import { GetServerSideProps } from "next"

import Bikes from "../../components/Bikes"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import styles from "../../styles/Home.module.scss"
import { Location, RootObject, Vehicle } from "../../types/MobilityOptions"

interface StationProps {
  bikes?: Vehicle[]
  station?: string
  occupancy?: number
  location: Location
  stationId?: string
}

const Station: NextPage<StationProps> = ({
  bikes,
  station,
  occupancy,
  location,
  stationId,
}) => {
  const bikeAvailable = !!bikes && bikes.some((bike) => !!bike.licensePlate)
  const coordString = `${location.latitude}%2C${location.longitude}`
  const [favoriteStations, setFavoriteStations] = useLocalStorage<string[]>(
    "favoriteStations",
    []
  )
  const stationIsFavorite = !!stationId && favoriteStations.includes(stationId)
  const handleOnClickFavorite = () => {
    if (stationId) {
      if (!stationIsFavorite) {
        setFavoriteStations([...favoriteStations, stationId])
      } else {
        setFavoriteStations(favoriteStations.filter((s) => s !== stationId))
      }
    }
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>
          {station} {stationIsFavorite && "⭐"}
        </h1>
        <button
          className={styles.favoriteButton}
          onClick={handleOnClickFavorite}
        >
          {stationIsFavorite ? "Remove" : "Set"} as favorite
        </button>
        <p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.google.com/maps/search/?api=1&query=${coordString}`}
          >
            Click for Directions
          </a>
        </p>

        {!!occupancy && (
          <div>
            There {occupancy > 1 ? "are" : "is"} {occupancy} bike
            {occupancy > 1 && "s"} here
          </div>
        )}
        <div>
          {bikeAvailable && !!bikes ? (
            <Bikes bikes={bikes} />
          ) : (
            <p>Unfortunately no bike info available</p>
          )}
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug = "907dcd54-cdd9-4521-975e-b60cee9da28c" } = context.params!
  const res = await axios.get<RootObject>(
    `https://stockholmebikes.se/map/detail/${slug}?_data=routes/map/detail.$optionId`
  )
  return {
    props: {
      bikes: res.data.mobilityOption.station.vehicles.filter(
        (bike) => !!bike.licensePlate
      ),
      station: res.data.mobilityOption.station.address,
      occupancy: res.data.mobilityOption.occupancy,
      location: res.data.mobilityOption.station.location,
      stationId: res.data.mobilityOption.station.id,
    },
  }
}
export default Station
