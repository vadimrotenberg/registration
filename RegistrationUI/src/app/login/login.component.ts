import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {equalValidator} from "../validators/equalValidator";
import {RegistrationStepModel} from "../models/registration-step.model";
import {CountryModel} from "../models/country.model";
import {CityModel} from "../models/city.model";
import {RegistrationService} from "../services/registration.service";
import {UserModel, UserRegistrationResponse} from "../models/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userFormGroupFirst: FormGroup;
  userFormGroupSecond: FormGroup;
  step: RegistrationStepModel = RegistrationStepModel.First;
  errorMessage?: string;
  resultMessage: {msg: string, id: number} = {msg: '', id: 0};
  user?: UserRegistrationResponse = undefined;

  private _countries: CountryModel[] = [];
  private _cities: CityModel[] = [];

  constructor(private fb: FormBuilder, private registrationService: RegistrationService) {
    this.userFormGroupFirst = fb.group({
      email: ['', [Validators.email, Validators.required]],
      passwordsGroup: fb.group({
        password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{2,}$')]],
        confirmPassword: ['']
      }, {validator: equalValidator }),
     agree: [false, Validators.requiredTrue]
    });

    this.userFormGroupSecond = fb.group({
      countryId: [0, [Validators.min(1), Validators.pattern('[0-9]+')]],
      cityId: [0, [Validators.min(1), Validators.pattern('[0-9]+')]]
    });
  }

  ngOnInit(): void {
  }

  get secondStep(): boolean {
    return this.step === RegistrationStepModel.Second;
  }
 get finished(): boolean {
    return this.step === RegistrationStepModel.Finish;
 }

  get countries(): CountryModel[] {
    return this._countries;
  }

  get cities(): CityModel[] {
    return this._cities;
  }

   toSecondStep(): void {
      this.step = RegistrationStepModel.Second;
      this.registrationService.getAllCountries()
        .subscribe(result => {
          if (result.status === 'OK') {
            this._countries = result.countries;
          } else {
            this.errorMessage = result.error;
          }
        });
   }

  loadCities({value}: any){
    this.registrationService.getCitiesInCountry(value)
      .subscribe(result => {
        if (result.status === 'OK') {
          this._cities = result.cities;
        } else {
          this.errorMessage = result.error;
        }
      })
  }

  registerUser(): void {
   let user = new UserModel();
  // @ts-ignore
   Object.keys(this.userFormGroupFirst.controls).forEach(c => user[c] = this.userFormGroupFirst.controls[c].value);
    // @ts-ignore
    Object.keys(this.userFormGroupSecond.controls).forEach(c => user[c] = this.userFormGroupSecond.controls[c].value);
    this.registrationService.registerUser(user)
      .subscribe(message => {
        this.resultMessage.msg = message.resultMessage||'';
        this.resultMessage.id = message.id||0;
        this.step = RegistrationStepModel.Finish;
      });
  }

  fetchUser(userId: number): void {
    this.registrationService.fetchUser(userId)
      .subscribe(r => {
        if (r) {
          this.user = r;
          const city = this.cities.find(c => c.cityId === r.cityId);

          if (city) {
            this.user.cityName = city.cityName;
          }

          const country = this.countries.find(c => c.countryId === r.countryId);
          if (country) {
            this.user.countryName = country.countryName;
          }
        }
      });
  }
}
