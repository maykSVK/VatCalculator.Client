import { createReducer, on } from '@ngrx/store';
import { formNetAmountChanged, formGrossAmountChanged, formVatAmountChanged, formVatRateChanged, calculationSuccess, calculationFailure } from './form.actions';
import { CalculationResponse } from '../../models/calculation-response.model';

export interface FormState {
  netAmount: number | null;
  grossAmount: number | null;
  vatAmount: number | null;
  vatRate: number;  
  error: unknown;
}

export const initialState: FormState = {
  netAmount: null,
  grossAmount: null,
  vatAmount: null,
  vatRate: 0,
  error: null,
};

export const formReducer = createReducer(
    initialState,
    
    // Handle Net Amount Change
    on(formNetAmountChanged, (state, { netAmount }) => ({
        ...state,
        netAmount,
        error: null,
    })),
  
    // Handle Gross Amount Change
    on(formGrossAmountChanged, (state, { grossAmount }) => ({
        ...state,
        grossAmount,
        error: null,
    })),
  
    // Handle VAT Amount Change
    on(formVatAmountChanged, (state, { vatAmount }) => ({
        ...state,
        vatAmount,
        error: null,
    })),
  
    // Handle VAT Rate Change
    on(formVatRateChanged, (state, { vatRate }) => ({
        ...state,
        vatRate,
        error: null,
    })),

    // Handle calculation success and update all amounts
    on(calculationSuccess, (state, { response }: { response: CalculationResponse }) => ({
        ...state,
        netAmount: response.netAmount,
        grossAmount: response.grossAmount,
        vatAmount: response.vatAmount,
        error: null,
      })),

    // Handle calculation success and update all amounts
    on(calculationFailure, (state, { error }: { error: unknown }) => ({
        ...state,
        error: error,
    })),
);
