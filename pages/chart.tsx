import axios from "axios"
import { GetServerSideProps, NextPage } from "next"

import BikeChart from "../components/BikeChart"
import { serverUrl } from "../lib/serverUrl"
import { BikesLog } from "../types/BikesLog"

interface ChartProps {
  bikesData: BikesLog[]
}

const Chart: NextPage<ChartProps> = ({ bikesData }) => {
  return <BikeChart bikesData={bikesData} />
}

export const getServerSideProps: GetServerSideProps = async () => {
  const bikesData = await axios.get<BikesLog>(
    `${serverUrl}/api/getBikesLog?days=7`
  )
  return { props: { bikesData: bikesData.data } }
}

export default Chart
