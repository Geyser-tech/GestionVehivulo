export class GetVehicleInspectionByIdQuery {
  Id: number;
  licensePlate: string;
  area: string;
  responsible: string;
  type: string;
  brand: string;
  model: string;
  color: string;
  year: string;
  engineNumber: string;
  serialNumber: string;
  certificateNumber: string;
  provider: string;
  reviewDate: Date;
  expirationDate: Date;
  documentsUrl: string;
  stateVehicleInspection: string;
  registrationState: boolean;
}
