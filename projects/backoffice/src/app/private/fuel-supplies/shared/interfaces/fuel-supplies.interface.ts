export class Catering {
  Concept: string;
  Quantity: number;
  PU: number;
  Amount: number;
  constructor(pConcept: string, pQuantity: number, pPU: number, pAmount: number) {
    this.Concept = pConcept;
    this.Quantity = pQuantity;
    this.PU = pPU;
    this.Amount = pAmount;
  }
}
export class FuelSupplies {
  LicensePlate: string;
  Area: string;
  VehicleType: string;
  NEngine: string;
  Mark: string;
  Model: string;
  Color: string;
  Year: number;
  Serie: string;
  DispatchNote: string;
  DispatchDate: String;
  DispatchTime: String;
  Vendor: string;
  Odometer: string;
  Contractor: string;
  Drive: string;
  Catering: Catering;
  constructor(
    pLicensePlate: string,
    pArea: string,
    pVehicleType: string,
    pNEngine: string,
    pMark: string,
    pModel: string,
    pColor: string,
    pYear: number,
    pSerie: string,
    pDispatchNote: string,
    pDispatchDate: String,
    pDispatchTime: String,
    pVendor: string,
    pOdometer: string,
    pContractor: string,
    pDrive: string,
    pCatering: Catering
  ) {
    this.LicensePlate = pLicensePlate;
    this.Area = pArea;
    this.VehicleType = pVehicleType;
    this.NEngine = pNEngine;
    this.Mark = pMark;
    this.Model = pModel;
    this.Color = pColor;
    this.Year = pYear;
    this.Serie = pSerie;
    this.DispatchNote = pDispatchNote;
    this.DispatchDate = pDispatchDate;
    this.DispatchTime = pDispatchTime;
    this.Vendor = pVendor;
    this.Odometer = pOdometer;
    this.Contractor = pContractor;
    this.Drive = pDrive;
    this.Catering = pCatering;
  }
}
