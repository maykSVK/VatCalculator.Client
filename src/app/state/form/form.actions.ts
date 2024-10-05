import { createAction, props } from '@ngrx/store';
import { AmountType } from '../../models/calculation-request.model';
import { CalculationResponse } from '../../models/calculation-response.model';

export const formNetAmountChanged = createAction(
  '[Form] Net Amount Changed',
  props<{ netAmount: number | null, vatRate: number }>()
);

export const formGrossAmountChanged = createAction(
  '[Form] Gross Amount Changed',
  props<{ grossAmount: number | null, vatRate: number }>()
);

export const formVatAmountChanged = createAction(
  '[Form] VAT Amount Changed',
  props<{ vatAmount: number | null, vatRate: number }>()
);

export const formVatRateChanged = createAction(
  '[Form] VAT Rate Changed',
  props<{ vatRate: number, lastAmountType: AmountType, lastAmountValue: number | null }>()
);

export const calculationSuccess = createAction(
    '[Calculation] Calculation Success',
    props<{ response: CalculationResponse }>()
  );
  
export const calculationFailure = createAction(
'[Calculation] Calculation Failure',
props<{ error: any }>()
);