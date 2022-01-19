import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CostumerResponseModel } from 'src/app/models/costumerResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CostumerService {
  API_URL: string = 'https://localhost:44379/api/costumers/getall';

  constructor(private httpClient: HttpClient) {}

  getCostumers(): Observable<CostumerResponseModel> {
    return this.httpClient.get<CostumerResponseModel>(this.API_URL);
  }
}
