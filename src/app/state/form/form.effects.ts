import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { formNetAmountChanged, formVatAmountChanged, formGrossAmountChanged, formVatRateChanged, calculationFailure, calculationSuccess } from './form.actions';
import { CalculationService } from '../../services/calculation.service';
import { AmountType, CalculationRequest } from '../../models/calculation-request.model';
import { of } from 'rxjs';

@Injectable()
export class FormEffects {
    constructor(
        private actions$: Actions,
        private calculationService: CalculationService) {}

    // Effect for Net Amount change
    netAmountChanged$ = createEffect(() =>
        this.actions$.pipe(
            ofType(formNetAmountChanged),
            switchMap((action) => {
                const request: CalculationRequest = {
                    amount: action.netAmount ?? 0,
                    type: AmountType.Net,
                    vatRate: action.vatRate
                };

                return this.calculationService.calculate(request).pipe(
                    map((response) => calculationSuccess({ response })),
                    catchError((error) => of(calculationFailure({ error })))
                );
            })
        )
    );

    // Effect for Gross Amount change
    grossAmountChanged$ = createEffect(() =>
        this.actions$.pipe(
            ofType(formGrossAmountChanged),
            switchMap((action) => {
                const request: CalculationRequest = {
                    amount: action.grossAmount ?? 0,
                    type: AmountType.Gross,
                    vatRate: action.vatRate
                };

                return this.calculationService.calculate(request).pipe(
                    map((response) => calculationSuccess({ response })),
                    catchError((error) => of(calculationFailure({ error })))
                );
            })
        )
    );

    // Effect for VAT Amount change
    vatAmountChanged$ = createEffect(() =>
        this.actions$.pipe(
            ofType(formVatAmountChanged),
            switchMap((action) => {
                const request: CalculationRequest = {
                    amount: action.vatAmount ?? 0,
                    type: AmountType.Vat,
                    vatRate: action.vatRate
                };

                return this.calculationService.calculate(request).pipe(
                    map((response) => calculationSuccess({ response })),
                    catchError((error) => of(calculationFailure({ error })))
                );
            })
        )
    );

    // Effect for VAT Rate change
    vatRateChanged$ = createEffect(() =>
        this.actions$.pipe(
            ofType(formVatRateChanged),
            switchMap((action) => {
                if (action.lastAmountType === AmountType.Unknown || action.lastAmountValue === null) {
                    return of(calculationFailure({ error: 'No amount has been changed yet!' }));
                }

                const request: CalculationRequest = {
                    amount: action.lastAmountValue ?? 0,
                    type: action.lastAmountType,
                    vatRate: action.vatRate
                };

                return this.calculationService.calculate(request).pipe(
                    map((response) => calculationSuccess({ response })),
                    catchError((error) => of(calculationFailure({ error })))
                );
            })
        )
    );
}