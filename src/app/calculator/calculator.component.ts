import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { formGrossAmountChanged, formNetAmountChanged, formVatAmountChanged, formVatRateChanged } from '../state/form/form.actions';
import { AmountType } from '../models/calculation-request.model';
import { Observable } from 'rxjs';
import { FormState } from '../state/form/form.reducer';
import { selectNetAmount, selectGrossAmount, selectVatAmount, selectError } from '../state/form/form.selector';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-calculator',
    standalone: true,
    styleUrl: 'calculator.component.css',
    templateUrl: 'calculator.component.html',
    imports: [
        AsyncPipe,   
        ReactiveFormsModule,
        CommonModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,    
        MatCardModule,
        MatIconModule,
    ],
  })
  export class CalculatorComponent implements OnInit {
    /** A FormGroup. */
    public form!: FormGroup;
    /** An array of possible VAT rates. */
    public vatRates = [10, 13, 20];
    /** Tracks the type of the last amount that was modified. */
    public lastAmountType: AmountType = AmountType.Unknown;
    /** Tracks the value of the last amount that was modified. */
    public lastAmountValue: number | null = null;
    /** Observables that emits the current value of the net amount. */
    public netAmount$: Observable<number | null>;
    /** Observable that emits the current value of the gross amount. */
    public grossAmount$: Observable<number | null>;
    /** Observable that emits the current value of the VAT amount. */
    public vatAmount$: Observable<number | null>;
    /** Observable that emits any errors related to form validation or calculation. */
    public error$: Observable<unknown>;

    /**
     * Constructor.
     * @param store Injecting NgRx store to dispatch actions and select state.
     * @param fb Injecting FormBuilder service to help create reactive forms.
     */
    constructor(private store: Store<FormState>, private fb: FormBuilder) {
        this.netAmount$ = this.store.select(selectNetAmount);
        this.grossAmount$ = this.store.select(selectGrossAmount);
        this.vatAmount$ = this.store.select(selectVatAmount);
        this.error$ = this.store.select(selectError);
    }

    /**
     * Lifecycle hook that is called once the component has been initialized
     */
    public ngOnInit() {
        this.form = this.fb.group({
            netAmount: [null],
            grossAmount: [null],
            vatAmount: [null],
            vatRate: [this.vatRates[0], Validators.required]
        });

        // Listen to individual form controls and dispatch actions accordingly
        this.form.get('netAmount')!.valueChanges
        .pipe(
            debounceTime(300)
        )
        .subscribe((value) => {
            this.lastAmountType = AmountType.Net;
            this.lastAmountValue = value;
            this.store.dispatch(formNetAmountChanged({ netAmount: value, vatRate: this.form.get('vatRate')!.value }));
        });

        this.form.get('grossAmount')!.valueChanges
        .pipe(
            debounceTime(300)
        )
        .subscribe((value) => {
            this.lastAmountType = AmountType.Gross;
            this.lastAmountValue = value;
            this.store.dispatch(formGrossAmountChanged({ grossAmount: value, vatRate:  this.form.get('vatRate')!.value }));
        });

        this.form.get('vatAmount')!.valueChanges
        .pipe(
            debounceTime(300)
        )
        .subscribe((value) => {
            this.lastAmountType = AmountType.Vat;
            this.lastAmountValue = value;
            this.store.dispatch(formVatAmountChanged({ vatAmount: value, vatRate:  this.form.get('vatRate')!.value }));
        });

        this.form.get('vatRate')!.valueChanges.subscribe((value) => {
            this.store.dispatch(formVatRateChanged({ vatRate: value, lastAmountType: this.lastAmountType, lastAmountValue: this.lastAmountValue }));
        });

        // Subscribe to store and update the form values when the state changes
        this.netAmount$.subscribe((netAmount) => {
            if (netAmount !== null) {
            this.form.get('netAmount')!.setValue(netAmount, { emitEvent: false });
            }
        });

        this.grossAmount$.subscribe((grossAmount) => {
            if (grossAmount !== null) {
            this.form.get('grossAmount')!.setValue(grossAmount, { emitEvent: false });
            }
        });

        this.vatAmount$.subscribe((vatAmount) => {
            if (vatAmount !== null) {
            this.form.get('vatAmount')!.setValue(vatAmount, { emitEvent: false });
            }
        });
    }
}