import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { CarImage } from '../models/carImage';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  BASE_URL: string = 'https://localhost:44379/api/';
  constructor(private httpClient: HttpClient) {}
  getCarImages(): Observable<ListResponseModel<CarImage>> {
    let newPath = this.BASE_URL + 'carimages/getall';
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getCarImagesByCarId(carId: number): Observable<ListResponseModel<CarImage>> {
    let newPath = this.BASE_URL + 'carimages/getbycarid?carId=' + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
}
