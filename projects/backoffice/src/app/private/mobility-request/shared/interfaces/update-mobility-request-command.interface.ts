export class UpdateMobilityRequestCommand {
  Id: number;
  VehicleId: number;
  ServiceNumber: string;
  UserAreaId: number;
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
  DocumentsUrl: string;
  Documents: any;
  constructor(
    pVehicleId: number,
    pServiceNumber: string,
    pUserAreaId: number,
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
    pDocuments: any
  ) {
    this.VehicleId = pVehicleId;
    this.ServiceNumber = pServiceNumber;
    this.UserAreaId = pUserAreaId;
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
    this.Documents = pDocuments;
  }
}
