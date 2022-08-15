import { Line } from "react-chartjs-2"
import { Config } from "./ChartConfig"
import { FC, MouseEventHandler, useEffect, useState } from "react"
import styles from "./BikeChart.module.scss"
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ChartData,
  Tooltip,
  Title,
  Legend,
  Filler,
} from "chart.js"
import axios from "axios"
import { serverUrl } from "../lib/serverUrl"
import { BikesLog } from "../types/BikesLog"

Chart.register(
  CategoryScale,
  LinearScale,
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
  const formatData = (data: BikesLog[]): { x: string; y: string }[] => {
    return data.map((el) => {
      return {
        x: new Date(el.createdAt).toLocaleString(),
        y: el.bikes.toString(),
      }
    })
  }

  const data: ChartData<"line", { x: string; y: string }[], unknown> = {
    datasets: [
      {
        label: "Bike in stations",
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
