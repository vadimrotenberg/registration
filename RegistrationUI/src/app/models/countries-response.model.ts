import {CountryModel} from "./country.model";

export class CountriesResponseModel {
  countries: CountryModel[] = [];
  error?: any;
  status: string= '';
}
