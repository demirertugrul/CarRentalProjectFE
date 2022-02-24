import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private httpClient: HttpClient) {}

  apiUrl = 'https://localhost:44379/api/';

  addPayment(payment: Payment): Observable<ResponseModel> {
    let apiUrl = this.apiUrl + 'payments/add';
    return this.httpClient.post<ResponseModel>(apiUrl, payment);
  }
}
