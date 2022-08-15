import { GetServerSideProps } from "next"
import axios from "axios"
import { FC } from "react"

import { serverUrl } from "../lib/serverUrl"
import BikeChart from "../components/BikeChart"
import { BikesLog } from "../types/BikesLog"

interface ChartProps {
  bikesData: BikesLog[]
}

const Chart: FC<ChartProps> = ({ bikesData }) => {
  return <BikeChart bikesData={bikesData} />
}

export const getServerSideProps: GetServerSideProps = async () => {
  const bikesData = await axios.get<BikesLog>(
    `${serverUrl}/api/getBikesLog?days=7`
  )
  return { props: { bikesData: bikesData.data } }
}

export default Chart
