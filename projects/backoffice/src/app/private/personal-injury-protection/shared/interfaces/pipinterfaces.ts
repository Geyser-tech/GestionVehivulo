export class Pip {
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
  Insurance: string;
  PolicyNumber: string;
  StartPolicyValidity: string;
  EndPolicyValidity: string;
  StartCertificateValidity: string;
  EndCertificateValidity: string;
  IdentificationDocument: string;
  Date: string;
  Hour: string;
  Amount: string;
  Document: string;
  daysUntilExpiration?: string;
  areas?: string;
  insuranceCompany?: string;
  policyNumber?: string;
  licensePlate?: string;
  type?: string;
  state?: string;
  options?: string;

  constructor(
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
    pInsurance: string,
    pPolicyNumber: string,
    pStartPolicyValidity: string,
    pEndPolicyValidity: string,
    pStartCertificateValidity: string,
    pEndCertificateValidity: string,
    pIdentificationDocument: string,
    pDate: string,
    pHour: string,
    pAmount: string,
    pDocument: string
  ) {
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
    this.Insurance = pInsurance;
    this.PolicyNumber = pPolicyNumber;
    this.EndPolicyValidity = pEndPolicyValidity;
    this.StartPolicyValidity = pStartPolicyValidity;
    this.StartCertificateValidity = pStartCertificateValidity;
    this.EndCertificateValidity = pEndCertificateValidity;
    this.IdentificationDocument = pIdentificationDocument;
    this.Date = pDate;
    this.Hour = pHour;
    this.Amount = pAmount;
    this.Document = pDocument;
  }
}
