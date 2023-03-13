export class UpdateFuelPrice {
  id: number;
  // contractId: number;
  // clientId: number;
  // conceptId: number;
  effectiveDate: any;
  unitPrice: number;
  documentUrl: string;
  documentsUrl?: string;
  documents: any;
  //registrationDate: string;
  constructor(
    contractId: number,
    clientId: number,
    conceptId: number,
    effectiveDate: string,
    unitPrice: number,
    documentUrl: string,
    registrationDate: string,
    documents: any,
    documentsUrl: string,
    id: number
  ) {
    this.id = id;
    // this.contractId = contractId;
    // this.clientId = clientId;
    // this.conceptId = conceptId;
    // this.effectiveDate = effectiveDate;
    this.unitPrice = unitPrice;
    this.documentUrl = documentUrl;
    this.documentsUrl = documentsUrl;
    this.documents = documents;
    //  this.registrationDate = registrationDate;
  }
}
