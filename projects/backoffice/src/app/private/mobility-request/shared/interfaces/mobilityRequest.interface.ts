export class MobilityRequest {
  id?: number;
  VehicleId: number;
  ServiceNumber: string;
  AreaId: number;
  CommissionedStaff: string;
  ServiceDate: string;
  ServiceHour: string;
  Objective: string;
  DriverId: number;
  DepartureTime: string;
  ArrivalTime: string;
  DepartureKM: string;
  ArrivalKM: string;
  Entity: string;
  District: string;
  Observation: string;
  Address: string;
  DocumentsUrl?: string;
  Document?: any;
  constructor(
    pVehicleId: number,
    pServiceNumber: string,
    pAreaId: number,
    pCommissionedStaff: string,
    pServiceDate: string,
    pServiceHour: string,
    pObjective: string,
    pDriverId: number,
    pDepartureTime: string,
    pArrivalTime: string,
    pDepartureKM: string,
    pArrivalKM: string,
    pEntity: string,
    pDistrict: string,
    pObservation: string,
    pAddress: string,
    pDocumentsUrl: string,
    pDocument: any
  ) {
    this.VehicleId = pVehicleId;
    this.ServiceNumber = pServiceNumber;
    this.AreaId = pAreaId;
    this.CommissionedStaff = pCommissionedStaff;
    this.ServiceDate = pServiceDate;
    this.ServiceHour = pServiceHour;
    this.Objective = pObjective;
    this.DriverId = pDriverId;
    this.DepartureTime = pDepartureTime;
    this.ArrivalTime = pArrivalTime;
    this.DepartureKM = pDepartureKM;
    this.ArrivalKM = pArrivalKM;
    this.Entity = pEntity;
    this.District = pDistrict;
    this.Observation = pObservation;
    this.Address = pAddress;
    this.DocumentsUrl = pDocumentsUrl;
    this.Document = pDocument;
  }
}
