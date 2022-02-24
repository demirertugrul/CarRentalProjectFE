import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from 'src/app/models/color';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  apiUrl: string = 'https://localhost:44379/api/';
  constructor(private httpClient: HttpClient) {}

  getColors(): Observable<ListResponseModel<Color>> {
    let apiUrl = this.apiUrl + 'colors/getall';
    return this.httpClient.get<ListResponseModel<Color>>(apiUrl);
  }

  getColorByColorId(id: number): Observable<SingleResponseModel<Color>> {
    let apiUrl = this.apiUrl + 'colors/getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<Color>>(apiUrl);
  }

  add(color: Color): Observable<ResponseModel> {
    let apiUrl = this.apiUrl + 'colors/add';
    return this.httpClient.post<ResponseModel>(apiUrl, color);
  }

  update(color: Color): Observable<ResponseModel> {
    let apiUrl = this.apiUrl + 'colors/update';
    return this.httpClient.post<ResponseModel>(apiUrl, color);
  }

  delete(color: Color): Observable<ResponseModel> {
    let apiUrl = this.apiUrl + 'colors/delete';
    return this.httpClient.post<ResponseModel>(apiUrl, color);
  }
}
