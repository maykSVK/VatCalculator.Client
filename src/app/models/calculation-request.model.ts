export enum AmountType {
    Unknown = 0,
    Net = 1,
    Gross = 2,
    Vat = 3,
  }
  
  export interface CalculationRequest {
    amount: number;
    type: AmountType;
    vatRate: number;
  }
  