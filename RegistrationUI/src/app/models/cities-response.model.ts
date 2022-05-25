import {CityModel} from "./city.model";

export class CitiesResponseModel {
  cities: CityModel[] = [];
  error?: any;
  status: string= '';
}
