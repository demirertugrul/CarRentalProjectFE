import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from '../models/rentalDetail';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44379/api/';

  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListResponseModel<RentalDetail>> {
    let apiUrl = this.apiUrl + 'carrentals/getrentaldetail';
    return this.httpClient.get<ListResponseModel<RentalDetail>>(apiUrl);
  }

  getAll(): Observable<ListResponseModel<Rental>> {
    let apiUrl = this.apiUrl + 'carrentals/getall';
    return this.httpClient.get<ListResponseModel<Rental>>(apiUrl);
  }

  getLastRentalByCarId(carId: number): Observable<SingleResponseModel<Rental>> {
    let apiUrl = this.apiUrl + 'carrentals/getlastrentalbycarid?carId=' + carId;
    return this.httpClient.get<SingleResponseModel<Rental>>(apiUrl);
  }

  addRental(rental: Rental): Observable<ResponseModel> {
    let apiUrl = this.apiUrl + 'carrentals/add';
    return this.httpClient.post<ResponseModel>(apiUrl, rental);
  }

  delete(rental: Rental) {
    let apiUrl = this.apiUrl + 'carrentals/delete';
    return this.httpClient.post<ResponseModel>(apiUrl, rental);
  }
}
