import { Component, importProvidersFrom, inject, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { formGrossAmountChanged, formNetAmountChanged, formVatAmountChanged, formVatRateChanged } from '../state/form/form.actions';
import { AmountType } from '../models/calculation-request.model';
import { Observable } from 'rxjs';
import { FormState } from '../state/form/form.reducer';
import { selectNetAmount, selectGrossAmount, selectVatAmount, selectError } from '../state/form/form.selector';

@Component({
    selector: 'app-calculator',
    standalone: true,
    templateUrl: 'calculator.component.html',
    imports: [
      AsyncPipe,   
      ReactiveFormsModule,
      CommonModule,
      MatButtonModule,
      MatInputModule,
      MatSelectModule,
    ],
  })
  export class CalculatorComponent implements OnInit {
    form!: FormGroup;
    vatRates = [10, 13, 20];
    
    lastAmountType: AmountType = AmountType.Unknown;
    lastAmountValue: number | null = null;
  
    netAmount$: Observable<number | null>;
    grossAmount$: Observable<number | null>;
    vatAmount$: Observable<number | null>;
    error$: Observable<any>;

    constructor(private store: Store<FormState>, private fb: FormBuilder) {
      this.netAmount$ = this.store.select(selectNetAmount);
      this.grossAmount$ = this.store.select(selectGrossAmount);
      this.vatAmount$ = this.store.select(selectVatAmount);
      this.error$ = this.store.select(selectError);
    }

    ngOnInit() {
      this.form = this.fb.group({
        netAmount: [null],
        grossAmount: [null],
        vatAmount: [null],
        vatRate: [this.vatRates[0], Validators.required]
      });

      // Listen to individual form controls and dispatch actions accordingly
      this.form.get('netAmount')!.valueChanges.subscribe((value) => {
        this.lastAmountType = AmountType.Net;
        this.lastAmountValue = value;
        this.store.dispatch(formNetAmountChanged({ netAmount: value, vatRate:  this.form.get('vatRate')!.value }));
      });

      this.form.get('grossAmount')!.valueChanges.subscribe((value) => {
        this.lastAmountType = AmountType.Gross;
        this.lastAmountValue = value;
        this.store.dispatch(formGrossAmountChanged({ grossAmount: value, vatRate:  this.form.get('vatRate')!.value }));
      });

      this.form.get('vatAmount')!.valueChanges.subscribe((value) => {
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