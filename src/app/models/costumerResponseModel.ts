import { Costumer } from './costumer';
import { ResponseModel } from './responseModel';

export interface CostumerResponseModel extends ResponseModel {
  data: Costumer[];
}
