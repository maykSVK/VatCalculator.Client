import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FormState } from './form.reducer';

/** Feature selector to select the formState from the store */
export const selectFormState = createFeatureSelector<FormState>('formState');

/** Individual selectors to select pieces of state */
export const selectNetAmount = createSelector(
    selectFormState,
    (state: FormState) => state.netAmount
);

export const selectGrossAmount = createSelector(
    selectFormState,
    (state: FormState) => state.grossAmount
);

export const selectVatAmount = createSelector(
    selectFormState,
    (state: FormState) => state.vatAmount
);

export const selectError = createSelector(
    selectFormState,
    (state: FormState) => state.error
);
