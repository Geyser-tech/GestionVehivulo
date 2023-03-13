export class Maintenance {
  id?: number;
  LicensePlate: string;
  Area?: string;
  Responsible?: string;
  Type?: string;
  Brand?: string;
  Model?: string;
  Color?: string;
  Year?: string;
  NEngine?: string;
  Serie?: string;
  TypeMaintenance: string;
  MaintenanceClass: string;
  TypeMotor: string;
  KM: string;
  Date: string;
  TotalAmount: string;
  Contract: string;
  Vendor: string;
  Activities: [];
  SpareParts: [];
  DocumentSparePart: string;
  DocumentConformity: string;
  DocumentVehicle: string;
  constructor(
    pid: number,
    pLicensePlate: string,
    pArea: string,
    pResponsible: string,
    pType: string,
    pBrand: string,
    pModel: string,
    pColor: string,
    pYear: string,
    pNEngine: string,
    pSerie: string,
    pTypeMaintenance: string,
    pMaintenanceClass: string,
    pTypeMotor: string,
    pKM: string,
    pDate: string,
    pTotalAmount: string,
    pContract: string,
    pVendor: string,
    pActivities: [],
    pSpareParts: [],
    pDocumentSparePart: string,
    pDocumentConformity: string,
    pDocumentVehicle: string
  ) {
    this.id = pid;
    this.LicensePlate = pLicensePlate;
    this.Area = pArea;
    this.Responsible = pResponsible;
    this.Type = pType;
    this.Brand = pBrand;
    this.Model = pModel;
    this.Color = pColor;
    this.Year = pYear;
    this.NEngine = pNEngine;
    this.Serie = pSerie;
    this.TypeMaintenance = pTypeMaintenance;
    this.MaintenanceClass = pMaintenanceClass;
    this.TypeMotor = pTypeMotor;
    this.KM = pKM;
    this.Date = pDate;
    this.TotalAmount = pTotalAmount;
    this.Contract = pContract;
    this.Vendor = pVendor;
    this.Activities = pActivities;
    this.SpareParts = pSpareParts;
    this.DocumentSparePart = pDocumentSparePart;
    this.DocumentConformity = pDocumentConformity;
    this.DocumentVehicle = pDocumentVehicle;
  }
}
