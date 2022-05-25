import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import {CountriesResponseModel} from "../models/countries-response.model";
import {CitiesResponseModel} from "../models/cities-response.model";
import {UserModel, UserRegistrationResponse} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) { }

  getAllCountries(): Observable<CountriesResponseModel> {
      let url = `${environment.apiUrl}/geoData/countries`;
      return this.httpClient.get<CountriesResponseModel>(url).pipe(
        catchError(error => of({countries: [], error: error, status: 'Failed'})),
       );
  }

  getCitiesInCountry(countryId: number): Observable<CitiesResponseModel> {
    let url = `${environment.apiUrl}/geoData/cities/${countryId}`;
    return this.httpClient.get<CitiesResponseModel>(url).pipe(
      catchError(error => of({cities: [], error: error, status: 'Failed'})),
    );
  }

  registerUser(user: UserModel): Observable<UserRegistrationResponse> {
    return this.httpClient.post<UserRegistrationResponse>(`${environment.apiUrl}/registration`, user);
  }

  fetchUser(userId: number): Observable<UserRegistrationResponse> {
    return this.httpClient.get<UserRegistrationResponse>(`${environment.apiUrl}/registration/${userId}`).pipe(
      catchError(error => of ({resultMessage: error.error, email: '', passwordsGroup: {password:'', confirmPassword:''}, cityId: 0, countryId: 0}))
    );
  }
}
