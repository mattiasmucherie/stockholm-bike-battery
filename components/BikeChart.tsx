import { Line } from "react-chartjs-2"
import { Config } from "./ChartConfig"
import { FC } from "react"
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
        data: formatData(props.bikesData),
        tension: 0.5,
        fill: true,
        backgroundColor: "rgba(242,84,45,0.1)",
        borderColor: "#F2542D",
      },
    ],
  }

  return (
    <div className={styles.container}>
      <Line data={data} options={Config} />
    </div>
  )
}

export default BikeChart
