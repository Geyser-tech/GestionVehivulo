export class CreateFuelPrice {
  contractId: number;
  clientId: number;
  conceptId: number;
  effectiveDate: string;
  unitPrice: number;
  document: any;
  registrationDate: string;
  constructor(
    contractId: number,
    clientId: number,
    conceptId: number,
    effectiveDate: string,
    unitPrice: number,
    documentUrl: any,
    registrationDate: string
  ) {
    this.contractId = contractId;
    this.clientId = clientId;
    this.conceptId = conceptId;
    this.effectiveDate = effectiveDate;
    this.unitPrice = unitPrice;
    this.document = documentUrl;
    this.registrationDate = registrationDate;
  }
}
