import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalculationRequest } from '../models/calculation-request.model';
import { CalculationResponse } from '../models/calculation-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  private apiUrl = 'http://localhost:5000/api/VatCalculation/calculate';

  constructor(private http: HttpClient) {}

  calculate(request: CalculationRequest): Observable<CalculationResponse> {
    return this.http.post<CalculationResponse>(this.apiUrl, request);
  }
}