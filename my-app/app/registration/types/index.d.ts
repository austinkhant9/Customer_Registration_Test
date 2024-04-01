type TRegistrationStep = {
  id: number;
  primaryLabel: string;
  secondaryLabel: string;
};

type TTownship = {
  eng: string;
  mm: string;
};

type TDistricts = {
  eng: string;
  mm: string;
  townships: Array<TTownship>;
};

type TRegion = {
  eng: string;
  mm: string;
  lat: string;
  lng: string;
  nrc_code: string;
  capital: string;
  districts: Array<TDistricts>;
};

type TCustomer = {
  id: string,
  fullName: string,
  nrc: string,
  phoneNo: string,
  email: string,
  region: string,
  state: string,
  township: string,
  address: string,
}

export { TRegistrationStep, TRegion, TDistricts, TTownship, TCustomer };
