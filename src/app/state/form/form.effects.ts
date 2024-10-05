import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { formNetAmountChanged, formVatAmountChanged, formGrossAmountChanged, formVatRateChanged, calculationFailure, calculationSuccess } from './form.actions';
import { CalculationService } from '../../services/calculation.service';
import { AmountType, CalculationRequest } from '../../models/calculation-request.model';

@Injectable()
export class FormEffects {
    constructor(
        private actions$: Actions,
        private calculationService: CalculationService
    ) {}

    // Effect for Net Amount change
    netAmountChanged$ = createEffect(() =>
        this.actions$.pipe(
            ofType(formNetAmountChanged),
            switchMap((action) => {
                const validationError = this.validateAmount(action.netAmount, 'Net amount');
                if (validationError) {
                    return of(calculationFailure({ error: validationError }));
                }

                return this.calculateAmounts(
                    this.buildCalculationRequest(
                        action.netAmount, 
                        AmountType.Net, 
                        action.vatRate
                    )
                );
            })
        )
    );

    // Effect for Gross Amount change
    grossAmountChanged$ = createEffect(() =>
        this.actions$.pipe(
            ofType(formGrossAmountChanged),
            switchMap((action) => {
                const validationError = this.validateAmount(action.grossAmount, 'Gross amount');
                if (validationError) {
                    return of(calculationFailure({ error: validationError }));
                }

                return this.calculateAmounts(
                    this.buildCalculationRequest(
                        action.grossAmount, 
                        AmountType.Gross,
                        action.vatRate)
                );
            })
        )
    );

    // Effect for VAT Amount change
    vatAmountChanged$ = createEffect(() =>
        this.actions$.pipe(
            ofType(formVatAmountChanged),
            switchMap((action) => {
                const validationError = this.validateAmount(action.vatAmount, 'VAT amount');
                if (validationError) {
                    return of(calculationFailure({ error: validationError }));
                }

                return this.calculateAmounts(
                    this.buildCalculationRequest(
                        action.vatAmount, 
                        AmountType.Vat, 
                        action.vatRate
                    )
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
                    return of(calculationFailure({ error: 'No amount has been changed yet.' }));
                }

                return this.calculateAmounts(
                    this.buildCalculationRequest(
                        action.lastAmountValue, 
                        action.lastAmountType, 
                        action.vatRate
                    )
                );
            })
        )
    );

    /**
     * Private helper method to build CalculationRequest.
     * @param amount The amount value (net, gross, or VAT)
     * @param type The type of amount (Net, Gross, or VAT)
     * @param vatRate The VAT rate to apply
     * @returns CalculationRequest
     */
    private buildCalculationRequest(amount: number | null, type: AmountType, vatRate: number): CalculationRequest {
        return {
        amount: amount ?? 0,
        type: type,
        vatRate: vatRate,
        };
    }

    /**
     * Private helper method to handle calculation service call and errors.
     * @param request Request object
     * @returns Observable with either calculationSuccess or calculationFailure action
     */
    private calculateAmounts(request: CalculationRequest) {
        return this.calculationService.calculate(request).pipe(
        map((response) => calculationSuccess({ response })),
        catchError((response) => {
            const error = response.message || 'Unknown error occurred';
            return of(calculationFailure({ error }));
        })
        );
    }

    /**
     * Private helper method to validate the amount
     * @param amount The amount to validate
     * @param label A label to use in the error message
     * @returns null if valid, otherwise an error message
     */
    private validateAmount(amount: number | null | undefined, label: string): string | null {
        if (!amount || amount <= 0) {
            return `${label} must be a positive number.`;
        }

        return null;
    }
}
