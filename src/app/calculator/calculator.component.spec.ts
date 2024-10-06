// In this part I would add client tests similar to those that are commented. 
// Unfortunatelly I was not able to make my running in reasonable time due to upstream dependency conflicts.

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { CalculatorComponent } from './calculator.component';
// import { StoreModule } from '@ngrx/store';
// import { ReactiveFormsModule } from '@angular/forms';
// import { MatCardModule } from '@angular/material/card';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatIconModule } from '@angular/material/icon';
// import { of } from 'rxjs';
// import { AmountType } from '../models/calculation-request.model';

// describe('CalculatorComponent', () => {
//   let component: CalculatorComponent;
//   let fixture: ComponentFixture<CalculatorComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [CalculatorComponent],
//       imports: [
//         ReactiveFormsModule,
//         MatCardModule,
//         MatInputModule,
//         MatSelectModule,
//         MatIconModule,
//         StoreModule.forRoot({}),
//       ],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(CalculatorComponent);
//     component = fixture.componentInstance;

//   // Mock the observable properties directly
//   component.netAmount$ = of(null);
//   component.grossAmount$ = of(null);
//   component.vatAmount$ = of(null);
//   component.error$ = of(null);

//     fixture.detectChanges();
//   });

//   it('should create the calculator component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize form with default values', () => {
//     expect(component.form).toBeDefined();
//     expect(component.form.get('vatRate')?.value).toBe(10); // Default VAT rate
//     expect(component.form.get('netAmount')?.value).toBeNull();
//     expect(component.form.get('grossAmount')?.value).toBeNull();
//     expect(component.form.get('vatAmount')?.value).toBeNull();
//   });

//   it('should calculate gross and VAT when net amount is entered', () => {
//     const netAmountControl = component.form.get('netAmount');
//     netAmountControl?.setValue(100);
//     const vatRateControl = component.form.get('vatRate');
//     vatRateControl?.setValue(20);

//     // Simulate action dispatched when netAmount changes
//     fixture.detectChanges();

//     // Expect actions to be dispatched
//     expect(component.lastAmountType).toBe(AmountType.Net);
//     expect(component.lastAmountValue).toBe(100);
//     // Additional logic to check the calculated values of grossAmount and vatAmount
//   });

//   it('should show error for missing net and gross amount with valid VAT', () => {
//     component.form.get('netAmount')?.setValue(null);
//     component.form.get('grossAmount')?.setValue(null);
//     component.form.get('vatRate')?.setValue(20);

//     // Simulate invalid inputs
//     fixture.detectChanges();

//     expect(component.error$).toBeTruthy();
//   });

//   // Additional tests for invalid VAT, multiple inputs, and other scenarios.
// });
