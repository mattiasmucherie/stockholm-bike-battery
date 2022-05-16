import type { NextPage } from "next"
import Head from "next/head"
import styles from "../styles/Home.module.scss"
import Link from "next/link"
import { data } from "../constants/station"

const Home: NextPage = () => {
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
          {data.map((station) => (
            <li key={station.id}>
              <Link href={`/station/${station.id}`}>{station.address}</Link>
            </li>
          ))}
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

export default Home
