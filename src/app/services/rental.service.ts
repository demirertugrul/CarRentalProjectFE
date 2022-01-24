import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/brand';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Rental } from 'src/app/models/rental';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  RENTAL_API_URL = 'https://localhost:44379/api/carrentals/getrentaldetails';

  constructor(private httpclient: HttpClient) {}
  getRentals(): Observable<ListResponseModel<Rental>> {
    return this.httpclient.get<ListResponseModel<Rental>>(this.RENTAL_API_URL);
  }
}
