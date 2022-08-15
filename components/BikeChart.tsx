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
      <div className={styles.wrapper}>
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
      </div>
      <Line data={data} options={Config} />
    </div>
  )
}

export default BikeChart
