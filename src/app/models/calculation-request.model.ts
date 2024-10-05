/**
 * Enum to define the different types of amounts in the form (Net, Gross, VAT).
 */
export enum AmountType {
    /** Default state when the amount type is not yet known. */
    Unknown = 0,
    /** Represents the net amount (before VAT). */
    Net = 1,
    /** Represents the gross amount (includes VAT). */
    Gross = 2,
    /** Represents the VAT amount itself. */
    Vat = 3,
}

/**
 * Interface to structure the data needed for a calculation request.
 */
export interface CalculationRequest {
    /** The value of the amount to be calculated. */
    amount: number;
    /** The type of the amount (Net, Gross, or VAT). */
    type: AmountType;
    /** The percentage of the VAT rate to apply in the calculation. */
    vatRate: number;
}
  