import type { NextPage } from "next"
import axios from "axios"
import { RootObject, Vehicle } from "../../types/MobilityOptions"
import { GetServerSideProps } from "next"
import styles from "../../styles/Home.module.scss"
import Bikes from "../../components/Bikes"

interface StationProps {
  bikes?: Vehicle[]
  station?: string
  occupancy?: number
}

const Station: NextPage<StationProps> = ({ bikes, station, occupancy }) => {
  const bikeAvailable = !!bikes && bikes.some((bike) => !!bike.licensePlate)

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>{station}</h1>
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
    },
  }
}
export default Station
