export class GetHistoryVehicleInspection {
  certificateNumber: string;
  provider: string;
  reviewDate: string;
  expirationDate: string;
  state: string;
  stateRegister: boolean;
  registrationState: string;
  constructor(
    certificateNumber: string,
    provider: string,
    reviewDate: string,
    expirationDate: string,
    state: string,
    stateRegister: boolean,
    registrationState: string
  ) {
    this.certificateNumber = certificateNumber;
    this.provider = provider;
    this.certificateNumber = certificateNumber;
    this.reviewDate = reviewDate;
    this.expirationDate = expirationDate;
    this.state = state;
    this.stateRegister = stateRegister;
    this.registrationState = registrationState;
  }
}
