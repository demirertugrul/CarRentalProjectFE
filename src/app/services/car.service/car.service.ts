import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandResponseModel } from 'src/app/models/brandResponseModel';
import { CarResponseModel } from 'src/app/models/carResponseModel';
import { ColorResponseModel } from 'src/app/models/colorResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  CAR_API_URL: string = 'https://localhost:44379/api/cars/getall';
  BRAND_API_URL: string = 'https://localhost:44379/api/brands/getall';
  COLOR_API_URL: string = 'https://localhost:44379/api/colors/getall';
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<CarResponseModel> {
    return this.httpClient.get<CarResponseModel>(this.CAR_API_URL);
  }

  getBrands(): Observable<BrandResponseModel> {
    return this.httpClient.get<BrandResponseModel>(this.BRAND_API_URL);
  }

  getColors(): Observable<ColorResponseModel> {
    return this.httpClient.get<ColorResponseModel>(this.COLOR_API_URL);
  }
}
