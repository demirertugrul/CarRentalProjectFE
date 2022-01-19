import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandResponseModel } from 'src/app/models/brandResponseModel';
import { RentalResponseModel } from 'src/app/models/rentalResponseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  RENTAL_API_URL = 'https://localhost:44379/api/carrentals/getrentaldetails';
  USER_API_URL = 'https://localhost:44379/api/users/getall';
  BRAND_API_URL = 'https://localhost:44379/api/brands/getall';

  constructor(private httpclient: HttpClient) {}
  getRentals(): Observable<RentalResponseModel> {
    return this.httpclient.get<RentalResponseModel>(this.RENTAL_API_URL);
  }
  getUsers() {
    return this.httpclient.get<any>(this.USER_API_URL);
  }
  getBrands(): Observable<BrandResponseModel> {
    return this.httpclient.get<BrandResponseModel>(this.BRAND_API_URL);
  }
}
