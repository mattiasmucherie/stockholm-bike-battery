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
  bikesData: { id: string; createdAt: Date; bikes: number }[]
}

const BikeChart: FC<BikeChartProps> = (props) => {
  const [bikesLastDays, setBikesLastDays] = useState(props.bikesData)
  const [days, setDays] = useState(0)

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setDays(parseInt((event.target as HTMLElement).innerText))
  }
  const formatData = (
    data: { id: string; createdAt: Date; bikes: number }[]
  ): { x: string; y: string }[] => {
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
      axios
        .get(`${serverUrl}/api/getBikesLog?days=${days}`)
        .then((res) => setBikesLastDays(res.data))
    }
  }, [days])
  return (
    <div className={styles.container}>
      <div className={styles.buttonsRow}>
        <p>
          Showing last {days || 7} {days > 1 ? "days" : "day"}
        </p>
        <button onClick={handleOnClick}>30</button>
        <button onClick={handleOnClick}>7</button>
        <button onClick={handleOnClick}>1</button>
      </div>
      <Line data={data} options={Config} />
    </div>
  )
}

export default BikeChart
