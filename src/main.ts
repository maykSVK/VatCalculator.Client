import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CalculatorComponent } from './app/calculator/calculator.component';
import { formReducer } from './app/state/form/form.reducer';
import { FormEffects } from './app/state/form/form.effects';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(CalculatorComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(
      StoreModule.forRoot({formState: formReducer}),
      StoreModule.forFeature('formState', formReducer),
      EffectsModule.forRoot([FormEffects]),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: true,
      })
    ), provideAnimationsAsync(),
  ],
});
