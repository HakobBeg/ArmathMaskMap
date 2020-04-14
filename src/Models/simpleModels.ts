export interface CountOfPlace {
  id: string;
  name: string;
  count: number;
  flag?: boolean;
  countFlag?: boolean;
  nameFlag?: boolean;
}

export interface City {

  id: string;
  name: string;
  count: number;
  list: CountOfPlace[];
  flag?: boolean;
  nameFlag?: boolean;
  plId?: string;
}

export interface CityData {
  cities: City[];
}
