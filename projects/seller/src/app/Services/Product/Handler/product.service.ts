import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../Api/api.service';
import { AddProduct } from '../Models/AddProduct';
import { Observable } from 'rxjs';
import { Response } from '../../../Core/BasicResponse/Response';
import { Routing } from '../../../Meta/Routing';
import { UpdateProduct } from '../Models/UpdateProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly Api = inject(ApiService);

  addProduct(request: AddProduct): Observable<Response<string>> {
    return this.Api.Post<Response<string>>(Routing.Product.AddProduct, request);
  }

  updateProduct(request: UpdateProduct): Observable<Response<string>> {
    return this.Api.Put<Response<string>>(Routing.Product.UpdateProduct, request);
  }

}
