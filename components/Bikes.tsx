import { Vehicle } from "../types/MobilityOptions"
import React from "react"
import styles from "./Bikes.module.scss"

interface BikesProps {
  bikes: Vehicle[]
}

const Bikes: React.FC<BikesProps> = ({ bikes }) => {
  const sortedBikes = bikes.sort((a, b) => {
    return b.energyGauge! - a.energyGauge!
  })
  const batteryClass = (level: number) => {
    if (level > 60) {
      return styles.highBattery
    }
    if (level < 20) {
      return styles.lowBattery
    }
    return ""
  }
  return (
    <>
      {sortedBikes.map((bike) => (
        <p key={bike.id}>
          <span>🚲 {bike.licensePlate} - </span>
          <span className={batteryClass(bike.energyGauge!)}>
            {bike.energyGauge}%
          </span>
        </p>
      ))}
    </>
  )
}

export default Bikes
