import { GetServerSideProps } from "next"
import axios from "axios"
import { serverUrl } from "../lib/serverUrl"
import BikeChart from "../components/BikeChart"

const Chart = (props: any) => {
  return <BikeChart bikesData={props.bikesData} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const bikesData = await axios.get(`${serverUrl}/api/getBikesLog`)
  return { props: { bikesData: bikesData.data } }
}

export default Chart
