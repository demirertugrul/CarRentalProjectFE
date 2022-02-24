import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/brand';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl: string = 'https://localhost:44379/api/';
  constructor(private httpClient: HttpClient) {}

  getBrands(): Observable<ListResponseModel<Brand>> {
    let apiUrl = this.apiUrl + 'brands/getall';
    return this.httpClient.get<ListResponseModel<Brand>>(apiUrl);
  }

  getBrandById(id: number): Observable<SingleResponseModel<Brand>> {
    let apiUrl = this.apiUrl + 'brands/getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<Brand>>(apiUrl);
  }

  add(brand: Brand): Observable<ResponseModel> {
    let apiUrl = this.apiUrl + 'brands/add';
    return this.httpClient.post<ResponseModel>(apiUrl, brand);
  }

  update(brand: Brand): Observable<ResponseModel> {
    let apiUrl = this.apiUrl + 'brands/update';
    return this.httpClient.post<ResponseModel>(apiUrl, brand);
  }

  delete(brand: Brand): Observable<ResponseModel> {
    let apiUrl = this.apiUrl + 'brands/delete';
    return this.httpClient.post<ResponseModel>(apiUrl, brand);
  }
}
