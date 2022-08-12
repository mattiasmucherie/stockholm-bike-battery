import type { NextPage } from "next"
import { GetServerSideProps } from "next"
import Head from "next/head"
import styles from "../styles/Home.module.scss"
import { data } from "../constants/station"
import axios from "axios"
import { PurpleType, StationData } from "../types/StationsMobilityOptions"
import ListOfStations from "../components/ListOfStations"
import Footer from "../components/Footer"
import Link from "next/link"

interface HomeProps {
  stations: ({
    id: string
    occupancy: number
    capacity: number
    address: string
  } | null)[]
  amountOfBikes?: number
}
const Home: NextPage<HomeProps> = ({ stations, amountOfBikes }) => (
  <div className={styles.container}>
    <Head>
      <title>Stockholm E-bike status</title>
      <meta name="description" content="Status of bikes at stations" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>Stockholm e-bike status</h1>
      <h4>Just click on a station to see the battery percentage of a bike</h4>
      <h5>There are currently {amountOfBikes} bikes available</h5>
      <h3>
        See a graph of availability over time <Link href="/chart">here</Link>
      </h3>
      <ListOfStations stations={stations} />
    </main>
    <Footer />
  </div>
)

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await axios.get<StationData>(
    "https://stockholmebikes.se/map?_data=routes/map"
  )

  const stations = res.data.mobilityOptions.data
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
  const amountOfBikes = stations.reduce((prev, current) => {
    if (current?.occupancy) {
      return prev + current.occupancy
    }
    return prev
  }, 0)
  return {
    props: { stations, amountOfBikes },
  }
}

export default Home
