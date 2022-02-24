import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/costumer';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { CustomerDetail } from '../models/costumerDetail';
import { CustomerForUpdateDto } from '../models/costumerForUpdateDto';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl: string = 'https://localhost:44379/api/customers/';

  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<ListResponseModel<Customer>> {
    return this.httpClient.get<ListResponseModel<Customer>>(
      this.apiUrl + 'getall'
    );
  }

  getCustomerDetailsByUserId(
    userId: number
  ): Observable<SingleResponseModel<CustomerDetail>> {
    let apiUrl = this.apiUrl + 'getcustomerdetailsbyuserid?userId=' + userId;
    return this.httpClient.get<SingleResponseModel<CustomerDetail>>(apiUrl);
  }

  update(
    customerForUpdateDto: CustomerForUpdateDto
  ): Observable<ResponseModel> {
    let apiUrl = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(apiUrl, customerForUpdateDto);
  }
}
