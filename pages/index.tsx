import axios from "axios"
import type { NextPage } from "next"
import { GetServerSideProps } from "next"
import Head from "next/head"
import Link from "next/link"
import useSWR from "swr"

import Footer from "../components/Footer"
import ListOfStations from "../components/ListOfStations"
import Spinner from "../components/Spinner"
import { getBikes } from "../lib/apiHelpers/getBikes"
import styles from "../styles/Home.module.scss"

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

interface HomeProps {
  stations: ({
    id: string
    occupancy: number
    capacity: number
    address: string
  } | null)[]
}
const Home: NextPage<HomeProps> = ({ stations: stationsData }) => {
  const { data: stations, isValidating } = useSWR<HomeProps["stations"]>(
    "/api/getBikes",
    fetcher,
    {
      fallbackData: stationsData,
      refreshInterval: 10000,
    }
  )
  const amountOfBikes = stations?.reduce((prev, current) => {
    if (current?.occupancy) {
      return prev + current.occupancy
    }
    return prev
  }, 0)
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
        <h5>There are currently {amountOfBikes} bikes available</h5>
        {isValidating && <Spinner />}
        <h3>
          See a graph of availability over time <Link href="/chart">here</Link>
        </h3>
        {stations && <ListOfStations stations={stations} />}
      </main>
      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const stations = await getBikes()
  return {
    props: { stations },
  }
}

export default Home
