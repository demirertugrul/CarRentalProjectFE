import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Costumer } from 'src/app/models/costumer';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CostumerService {
  API_URL: string = 'https://localhost:44379/api/costumers/getall';

  constructor(private httpClient: HttpClient) {}

  getCostumers(): Observable<ListResponseModel<Costumer>> {
    return this.httpClient.get<ListResponseModel<Costumer>>(this.API_URL);
  }
}
