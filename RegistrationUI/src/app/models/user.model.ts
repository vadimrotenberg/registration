export class UserModel {
  email: string = '';
  passwordsGroup?: PasswordsGroup;
  countryId: number = 0;
  cityId: number = 0;
  constructor() {
 }
}

export class PasswordsGroup {
  password: string = '';
  confirmPassword: string = '';
}

export class UserRegistrationResponse extends UserModel {
  resultMessage?: string;
  id?: number;
  cityName?: string;
  countryName?: string;
}
