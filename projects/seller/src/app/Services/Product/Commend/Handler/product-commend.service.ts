import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../Api/api.service';
import { AddProductModel } from '../Models/AddProductModel';
import { map, Observable } from 'rxjs';
import { Response } from '../../../../Core/BasicResponse/Response';
import { Routing } from '../../../../Meta/Routing';
import { UpdateProductModel } from '../Models/UpdateProductModel';

@Injectable({
  providedIn: 'root',
})
export class ProductCommendService {
  private readonly ApiServices = inject(ApiService);

  AddProduct(requste: AddProductModel): Observable<Response<string>> {
    var formdata = new FormData();
    Object.entries(requste).forEach(([key, value]: any) => {
      if (key === 'FormImages') {
        for (let i = 0; i < value.length; i++) {
          formdata.append('FormImages', value[i]);
        }
      }
      formdata.append(key, value);
    });
    return this.ApiServices.Post<Response<string>>(
      Routing.Product.Add,
      formdata
    );
  }

  UpdateProduct(requste: UpdateProductModel): Observable<Response<string>> {
    var formdata = new FormData();

    Object.entries(requste).forEach(([key, value]: any) => {
      if (key === 'FormImages' && Array.isArray(value)) {
        value.forEach((file) => formdata.append('FormImages', file));
      } else if (key === 'IdIamgesDelteted' && Array.isArray(value)) {
        value.forEach((id) => formdata.append('IdIamgesDelteted', id));
      } else if (value !== null && value !== undefined) {
        formdata.append(key, value);
      }
    });

    return this.ApiServices.Put<Response<string>>(
      Routing.Product.Update,
      formdata
    );
  }
}
