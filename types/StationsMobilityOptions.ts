export interface StationData {
  mobilityOptions: StationMobilityOptions
  mainServiceArea: MainServiceArea
  googleMapsApiKey: string
  isLoggedIn: boolean
  locale: string
  localesAvailable: string[]
}

export interface MainServiceArea {
  id: string
  attributes: MainServiceAreaAttributes
  type: string
}

export interface MainServiceAreaAttributes {
  name: string
  status: string
  type: string
  maxCapacity: number
  occupancy: number
  geojson: string
}

export interface StationMobilityOptions {
  data: Datum[]
  meta: Meta
  included: any[]
}

export interface Datum {
  id: string
  type: PurpleType
  attributes: DatumAttributes
  relationships: Relationships
}

export interface DatumAttributes {
  energyGauge?: number
  engineType?: EngineType
  licensePlate?: string
  leg: Leg
  cost?: Cost
  capacity?: number
  occupancy?: number
}

export interface Cost {
  type: CostType
  attributes: CostAttributes
}

export interface CostAttributes {
  active: number
  pause: number
  unlockFee: number
  currency: Currency
}

export enum Currency {
  Sek = "SEK",
}

export enum CostType {
  PerMinute = "per-minute",
}

export enum EngineType {
  NoEngine = "no-engine",
}

export interface Leg {
  from: From
}

export interface From {
  coord: Coord
}

export interface Coord {
  lat: number
  lon: number
}

export interface Relationships {
  vehicle?: Station
  tariff: Station
  station?: Station
  options?: Options
}

export interface Options {
  data: DAT[]
}

export interface DAT {
  id: string
  type: DataType
}

export enum DataType {
  BicycleStations = "bicycle-stations",
  Bicycles = "bicycles",
  Tariffs = "tariffs",
  VehicleOptions = "vehicle-options",
}

export interface Station {
  data: DAT
}

export enum PurpleType {
  StationOptions = "station-options",
  VehicleOptions = "vehicle-options",
}

export interface Meta {
  total: number
}
