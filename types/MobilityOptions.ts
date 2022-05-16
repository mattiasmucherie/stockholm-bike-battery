export interface RootObject {
  mobilityOption: MobilityOption;
}

export interface MobilityOption {
  type: string;
  id: string;
  capacity: number;
  occupancy: number;
  leg: Leg;
  station: Station;
  options: Option[];
  tariff: Tariff;
  relationshipNames: string[];
}

export interface Leg {
  from: From;
}

export interface From {
  coord: Coord;
}

export interface Coord {
  lat: number;
  lon: number;
}

export interface Option {
  type: string;
  id: string;
  energyGauge: number;
  engineType: string;
  licensePlate: string;
  leg: Leg;
  cost: Cost;
  tariff: Tariff;
  relationshipNames: string[];
}

export interface Cost {
  type: string;
  attributes: Attributes;
}

export interface Attributes {
  active: number;
  pause: number;
  unlockFee: number;
  currency: string;
}

export interface Tariff {
  type: string;
  id: string;
}

export interface Station {
  type: string;
  id: string;
  name: string;
  capacity: number;
  imageURL: string;
  occupancy: number;
  radius: number;
  location: Location;
  status: StationStatus;
  moreDetails: string;
  address: string;
  vehicles: Vehicle[];
  relationshipNames: string[];
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface StationStatus {
  name: string;
}

export interface Vehicle {
  type: string;
  id: string;
  provider?: string;
  manufacturer?: string;
  model?: string;
  licensePlate?: string;
  vehicleIdentificationNumber?: string;
  image?: string;
  status?: VehicleStatus;
  location?: Location;
  lastConnectionTime?: Date;
  energyGauge?: number;
  lastMaintenanceTime?: null;
  lockStatus?: string;
  label?: string;
  relationshipNames?: string[];
}

export interface VehicleStatus {
  name: string;
  reason: string;
}
