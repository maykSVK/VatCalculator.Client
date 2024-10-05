import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalculationRequest } from '../models/calculation-request.model';
import { CalculationResponse } from '../models/calculation-response.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CalculationService {
    /**
     * Constructor.
     * @param http Inject HttpClient for making HTTP requests.
     */
    constructor(private http: HttpClient) {}

    /**
     * Performs the VAT calculation.
     * @param request The calculation request object containing the amount, type, and VAT rate.
     * @returns Observable of the CalculationResponse, containing the calculated net, gross, and VAT amounts.
     */
    public calculate(request: CalculationRequest): Observable<CalculationResponse> {
        return this.http.post<CalculationResponse>(environment.apiUrl + 'VatCalculation/calculate', request);
    }
}