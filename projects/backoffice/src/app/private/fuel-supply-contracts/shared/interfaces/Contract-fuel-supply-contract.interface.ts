export class FuelSupplyContract {
  [x: string]: any;
  Id?: string;
  ContractNumber: string;
  IssueDate: string;
  ExpirationDate: string;
  Quantity: string;
  UnitPrice: string;
  Concept: string;
  IdentityDocument: string;
  BusinessName: string;
  Address: string;
  Email: string;
  Phone: string;
  Observation: string;
  Amount: string;
  total: string;
  constructor(
    pId: string,
    pContractNumber: string,
    pIssueDate: string,
    pExpirationDate: string,
    pConcept: string,
    pQuantity: string,
    pUnitPrice: string,
    pIdentityDocument: string,
    pBusinessName: string,
    pAddress: string,
    pEmail: string,
    pPhone: string,
    pObservation: string
  ) {
    this.Id = pId;
    this.ContractNumber = pContractNumber;
    this.IssueDate = pIssueDate;
    this.ExpirationDate = pExpirationDate;
    this.Quantity = pQuantity;
    this.UnitPrice = pUnitPrice;
    this.Concept = pConcept;
    this.IdentityDocument = pIdentityDocument;
    this.BusinessName = pBusinessName;
    this.Address = pAddress;
    this.Email = pEmail;
    this.Phone = pPhone;
    this.Observation = pObservation;
  }
}
export class GetAllFuelSupplyContract {
  Id?: number;
  ContractNumber: string;
  ContractorName: string;
  ConceptName: string;
  IssueDate: string;
  ExpirationDate: string;
  TotalQuantity: string;
  QuantityAvailable: string;
  ContractState: string;
  RegistrationState: string;
}
