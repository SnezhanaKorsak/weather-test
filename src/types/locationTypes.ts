export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Place = {
  id: string;
  place_name: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
};

export interface CurrentLocation {
  name: string;
  country: string;
  lat: number;
  lon: number;
}
