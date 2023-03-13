export class FuelPrice {
  id?: number;
  Contract: string;
  Concept: string;
  EfectiveDate: string;
  Worth: number;
  Document: string;
  constructor(pid: number, pContract: string, pConcept: string, pEfectiveDate: string, pWorth: number, pDocument: string) {
    this.id = pid;
    this.Contract = pContract;
    this.Concept = pConcept;
    (this.EfectiveDate = pEfectiveDate), (this.Worth = pWorth);
    this.Document = pDocument;
  }
}
