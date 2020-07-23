export interface AuthData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoggedInUser{
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  registrationDate: Date;
  phone: number;
  image: string;
  jobTitle: string;
  uploadedProperties: number;
}
