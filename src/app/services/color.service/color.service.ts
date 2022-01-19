import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColorResponseModel } from 'src/app/models/colorResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  API_URL: string = 'https://localhost:44379/api/colors/getall';
  constructor(private httpClient: HttpClient) {}

  getColors(): Observable<ColorResponseModel> {
    return this.httpClient.get<ColorResponseModel>(this.API_URL);
  }
}
