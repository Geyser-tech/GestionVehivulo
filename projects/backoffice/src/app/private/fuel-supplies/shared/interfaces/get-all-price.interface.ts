export class GetAllPriceInterface {
  id: number;
  effectiveDate: string;
  contract: string;
  concept: string;
  unitPrice: number;
  currentPriceState: string;
  documentUrl: string;
  constructor(
    effectiveDate: string,
    contract: string,
    concept: string,
    unitPrice: number,
    currentPriceState: string,
    documentUrl: string,
    id: number
  ) {
    (this.id = id), (this.effectiveDate = effectiveDate);
    this.contract = contract;
    this.concept = concept;
    this.unitPrice = unitPrice;
    this.currentPriceState = currentPriceState;
    this.documentUrl = documentUrl;
  }
}
