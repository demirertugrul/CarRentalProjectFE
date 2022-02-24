import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetails';
import { CarFilter } from '../models/carFilter';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl: string = 'https://localhost:44379/api/';

  constructor(private httpClient: HttpClient) {}

  getCarDetails(): Observable<ListResponseModel<CarDetail>> {
    let apiUrl = this.apiUrl + 'cars/getcardetails';
    return this.httpClient.get<ListResponseModel<CarDetail>>(apiUrl);
  }

  getCarDetailsByBrandId(
    brandId: number
  ): Observable<ListResponseModel<CarDetail>> {
    let apiUrl = this.apiUrl + 'cars/getcarsbybrandid?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(apiUrl);
  }

  getCarDetailsByColorId(
    colorId: number
  ): Observable<ListResponseModel<CarDetail>> {
    let apiUrl = this.apiUrl + 'cars/getcarsbycolorid?colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(apiUrl);
  }

  getCarDetailById(carId: number): Observable<SingleResponseModel<CarDetail>> {
    let apiUrl = this.apiUrl + 'cars/getcardetailbycarid?carId=' + carId;
    return this.httpClient.get<SingleResponseModel<CarDetail>>(apiUrl);
  }

  getCarById(carId: number): Observable<SingleResponseModel<Car>> {
    let apiUrl = this.apiUrl + 'cars/getbyid?id=' + carId;
    return this.httpClient.get<SingleResponseModel<Car>>(apiUrl);
  }

  getCarDetailsByFiltered(
    carFilter: CarFilter
  ): Observable<ListResponseModel<CarDetail>> {
    let apiUrl = this.apiUrl + 'cars/getcardetailsbyfiltered';
    return this.httpClient.post<ListResponseModel<CarDetail>>(
      apiUrl,
      carFilter
    );
  }

  add(car: Car): Observable<ResponseModel> {
    let apiUrl = this.apiUrl + 'cars/add';
    return this.httpClient.post<ResponseModel>(apiUrl, car);
  }

  update(car: Car): Observable<ResponseModel> {
    let apiUrl = this.apiUrl + 'cars/update';
    return this.httpClient.post<ResponseModel>(apiUrl, car);
  }

  delete(car: Car): Observable<ResponseModel> {
    let apiUrl = this.apiUrl + 'cars/delete';
    return this.httpClient.post<ResponseModel>(apiUrl, car);
  }
}
