import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { CarImage } from '../models/carImage';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  apiUrl: string = 'https://localhost:44379/api/';
  constructor(private httpClient: HttpClient) {}

  getImagesByCarId(carId: number): Observable<ListResponseModel<CarImage>> {
    let apiUrl = this.apiUrl + 'carImages/getbycarid?carId=' + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(apiUrl);
  }

  // getCarImagesByColorId() {}
}
