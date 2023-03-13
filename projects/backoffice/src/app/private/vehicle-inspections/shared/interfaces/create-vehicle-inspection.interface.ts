export class CreateVehicleInspection {
  vehicleId: number;
  providerId: number;
  certificateNumber: string;
  registrationDate: string;
  reviewDate: string;
  expirationDate: string;
  document: any;
  constructor(
    vehicleId: number,
    providerId: number,
    certificateNumber: string,
    registrationDate: string,
    reviewDate: string,
    expirationDate: string,
    document: any
  ) {
    this.vehicleId = vehicleId;
    this.providerId = providerId;
    this.certificateNumber = certificateNumber;
    this.registrationDate = registrationDate;
    this.reviewDate = reviewDate;
    this.expirationDate = expirationDate;
    this.document = document;
  }
}
