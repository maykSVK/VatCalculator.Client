/**
 * Interface to represent the response received after a calculation is performed.
 */
export interface CalculationResponse {
    /** The calculated net amount (before VAT). */
    netAmount: number;
    /** The calculated gross amount (net amount + VAT). */
    grossAmount: number;
    /** The calculated VAT amount. */
    vatAmount: number;
}  