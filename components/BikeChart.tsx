import axios from "axios"
import {
  Chart,
  ChartData,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from "chart.js"
import { getUnixTime } from "date-fns"
import { FC, MouseEventHandler, useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import "chartjs-adapter-date-fns"

import { Config } from "../lib/ChartConfig"
import { serverUrl } from "../lib/serverUrl"
import { BikesLog } from "../types/BikesLog"
import styles from "./BikeChart.module.scss"

Chart.register(
  LinearScale,
  TimeScale,
  LineElement,
  PointElement,
  Tooltip,
  Title,
  Legend,
  Filler
)

interface BikeChartProps {
  bikesData: BikesLog[]
}

const BikeChart: FC<BikeChartProps> = (props) => {
  const [bikesLastDays, setBikesLastDays] = useState(props.bikesData)
  const [days, setDays] = useState(0)
  const [loading, setLoading] = useState(false)

  const maxBikes = bikesLastDays.reduce((a, b) =>
    a.bikes > b.bikes ? a : b
  ).bikes
  const minBikes = bikesLastDays.reduce((a, b) =>
    a.bikes < b.bikes ? a : b
  ).bikes

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setDays(parseInt((event.target as HTMLElement).innerText))
  }
  const formatData = (data: BikesLog[]): { x: number; y: number }[] => {
    return data.map((el) => ({
      x: getUnixTime(new Date(el.createdAt)) * 1000,
      y: el.bikes,
    }))
  }
  const data: ChartData<"line", { x: number; y: number }[], unknown> = {
    datasets: [
      {
        label: "Bikes in stations",
        data: formatData(bikesLastDays),
        tension: 0.5,
        fill: true,
        backgroundColor: "rgba(242,84,45,0.1)",
        borderColor: "#F2542D",
      },
    ],
  }

  useEffect(() => {
    if (days) {
      setLoading(true)
      axios
        .get(`${serverUrl}/api/getBikesLog?days=${days}`)
        .then((res) => setBikesLastDays(res.data))
        .finally(() => setLoading(false))
    }
  }, [days])
  return (
    <div className={styles.container}>
      <h1>Showing bikes in stations</h1>
      <div className={styles.wrapper}>
        <p>
          Only showing bikes in station and I have excluded tow stations that
          are not used by user imo. The first station I chose to exclude is
          called <code>Out of station</code>. It is a station that according to
          the map is close to Västerberga and in my opinion, the usability of
          the application is to take a bike that is in a station, so this one
          does not count. The other station I chose to exclude is Västberga
          Industrikvarter since this seems more like a test station for them. It
          is often very full and 2 meters from the previous mentioned station as
          well.
        </p>
        <p>
          Otherwise all the other stations are included in the data included in
          the graph.
        </p>
        <p>
          {loading
            ? "Loading..."
            : `Showing last ${days || 7} ${days > 1 ? "days" : "day"}`}
        </p>
        <div className={styles.buttonsRow}>
          <button onClick={handleOnClick} disabled={loading}>
            30
          </button>
          <button onClick={handleOnClick} disabled={loading}>
            7
          </button>
          <button onClick={handleOnClick} disabled={loading}>
            1
          </button>
        </div>
        <div>
          <p>Max: {maxBikes} bikes</p>
          <p>Min: {minBikes} bikes</p>
        </div>
      </div>
      <Line data={data} options={Config} />
    </div>
  )
}

export default BikeChart
