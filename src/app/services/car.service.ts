import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  BASE_URL: string = 'https://localhost:44379/api/';
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.BASE_URL + 'cars/getcardetails';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByFilter(
    brandId: number,
    colorId: number
  ): Observable<ListResponseModel<Car>> {
    let newPath =
      this.BASE_URL +
      'cars/getcarsbyfilterwithdetails?brandid=' +
      brandId +
      '&colorid=' +
      colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId: number): Observable<ListResponseModel<Car>> {
    let newPath =
      this.BASE_URL + 'Cars/getcarsbybrandidwithdetails?brandId=' + brandId;

    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId: number): Observable<ListResponseModel<Car>> {
    let newPath =
      this.BASE_URL + 'Cars/getcarsbycoloridwithdetails?colorId=' + colorId;

    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetailByCarId(carId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.BASE_URL + 'cars/GetCardetailsByCarId?carId=' + carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
