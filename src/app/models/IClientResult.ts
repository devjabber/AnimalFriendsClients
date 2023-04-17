export interface IClientResult {
  results: IResult[];
  info: IInfo;
}

export interface ILocation {
  street: {
    number: number;
    name: string;
  };
  city: string;
  state: string;
  country: string;
  postcode: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  timezone: {
    offset: string;
    description: string;
  };
}

export interface ILogin {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

export interface IDob {
  date: Date;
  age: number;
}

export interface IRegistered {
  date: Date;
  age: number;
}

export interface IId {
  name: string;
  value?: any;
}

export interface IPicture {
  large?: any;
  medium?: any;
  thumbnail?: any;
}

export interface IResult {
  gender?: any;
  name?: {
    title?: any;
    first?: any;
    last?: any;
  };
  location?: ILocation;
  email?: any;
  login?: ILogin;
  dob?: IDob;
  registered?: IRegistered;
  phone?: any;
  cell?: any;
  id?: IId;
  picture?: IPicture;
  nat?: any;
}

export interface IInfo {
  seed: string;
  results: number;
  page: number;
  version: string;
}
