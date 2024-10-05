import { createReducer, on } from '@ngrx/store';
import { formNetAmountChanged, formGrossAmountChanged, formVatAmountChanged, formVatRateChanged, calculationSuccess, calculationFailure } from './form.actions';
import { AmountType } from '../../models/calculation-request.model';
import { CalculationResponse } from '../../models/calculation-response.model';

export interface FormState {
  netAmount: number | null;
  grossAmount: number | null;
  vatAmount: number | null;
  vatRate: number;  
  error: any;
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
    })),
  
    // Handle Gross Amount Change
    on(formGrossAmountChanged, (state, { grossAmount }) => ({
        ...state,
        grossAmount,
    })),
  
    // Handle VAT Amount Change
    on(formVatAmountChanged, (state, { vatAmount }) => ({
        ...state,
        vatAmount,
    })),
  
    // Handle VAT Rate Change
    on(formVatRateChanged, (state, { vatRate }) => ({
        ...state,
        vatRate,
    })),

    // Handle calculation success and update all amounts
    on(calculationSuccess, (state, { response }: { response: CalculationResponse }) => ({
        ...state,
        netAmount: response.netAmount,
        grossAmount: response.grossAmount,
        vatAmount: response.vatAmount
      })),

    // Handle calculation success and update all amounts
    on(calculationFailure, (state, { error }: { error: any }) => ({
        ...state,
        error: error,
    })),
  );
