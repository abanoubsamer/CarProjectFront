import { Injectable } from '@angular/core';
import { ApiService } from '../../Api/api.service';
import { Routing } from '../../../Meta/Routing';
import { PagintationResponse } from '../../../Core/BasicResponse/PagintationResponse';
import { GetOrderSeller } from '../Model/GetOrderSeller';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private Api: ApiService) {}

  getOrderSellerPagination(pageNumber: number, pageSize: number ,  filter?:object): Observable<PagintationResponse<GetOrderSeller> >{
    const url = Routing.Orders.GetSellerOrdersPagination;
    return this.Api.GetWithPagination<PagintationResponse<GetOrderSeller>>(url, pageNumber, pageSize, filter);
  }
}
