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

/**
 * Type for handling form value changes.
 * 
 * @param amount - The value of the form control that changed.
 * @param vatRate - The current VAT rate selected in the form.
 */
type FormValueChangeHandler = (amount: number | null, vatRate: number ) => void;

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
        this.setupFormValueChanges('netAmount', (netAmount, vatRate) => {
            this.store.dispatch(formNetAmountChanged({ netAmount, vatRate }));
        }, AmountType.Net);
        
        this.setupFormValueChanges('grossAmount', (grossAmount, vatRate) => {
            this.store.dispatch(formGrossAmountChanged({ grossAmount, vatRate }));
        }, AmountType.Gross);
        
        this.setupFormValueChanges('vatAmount', (vatAmount, vatRate) => {
            this.store.dispatch(formVatAmountChanged({ vatAmount, vatRate }));
        }, AmountType.Vat);

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

    /**
     * Subscribes to changes in a specific form control, debounces the input.
     *
     * @param formControlName - The name of the form control to listen for changes (e.g., 'netAmount', 'grossAmount').
     * @param handler - The function to call when the form control value changes.
     * @param amountType - The type of the amount (Net, Gross, VAT) that the form control corresponds to.
     */
    private setupFormValueChanges(formControlName: string, handler: FormValueChangeHandler, amountType: AmountType) {
        this.form.get(formControlName)!.valueChanges
        .pipe(debounceTime(300))
        .subscribe((value) => {
            this.lastAmountType = amountType;
            this.lastAmountValue = value;
            handler(value, this.form.get('vatRate')!.value);
        });
    }
}