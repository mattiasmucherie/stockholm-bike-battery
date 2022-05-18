import type { NextPage } from "next"
import { GetServerSideProps } from "next"
import Head from "next/head"
import styles from "../styles/Home.module.scss"
import Link from "next/link"
import { data } from "../constants/station"
import axios from "axios"
import { PurpleType, StationData } from "../types/StationsMobilityOptions"

interface HomeProps {
  stations: ({
    id: string
    occupancy: number
    capacity: number
    address: string
  } | null)[]
}
const Home: NextPage<HomeProps> = ({ stations }) => {
  const occupancyColor = (occupancy: number): string => {
    if (occupancy > 5) {
      return styles.highOcc
    }
    if (occupancy < 1) {
      return styles.lowOcc
    }
    return ""
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Stockholm E-bike status</title>
        <meta name="description" content="Status of bikes at stations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Stockholm e-bike status</h1>
        <h4>Just click on a station to see the battery percentage of a bike</h4>
        <ul className={styles.stationList}>
          {stations.map((station) => {
            if (station) {
              return (
                <li key={station.id}>
                  <Link href={`/station/${station.id}`}>{station.address}</Link>
                  <span className={occupancyColor(station.occupancy)}>
                    {station.occupancy}/{station.capacity}
                  </span>
                </li>
              )
            }
          })}
        </ul>
      </main>
      <footer className={styles.footer}>
        <p>Battery levels are not always available</p>
        <p>
          Powered by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://stockholmebikes.se/"
          >
            Stockholm eBike
          </a>
          &apos;s API
        </p>
        <p>
          Made by{" "}
          <a
            href="https://github.com/mattiasmucherie"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Mattias Mucherie
          </a>
        </p>
      </footer>
    </div>
  )
}

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

  return {
    props: { stations },
  }
}

export default Home
