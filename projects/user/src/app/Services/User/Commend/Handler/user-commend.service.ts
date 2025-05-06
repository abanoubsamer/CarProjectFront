import { inject, Injectable } from '@angular/core';
import { AddShappingAddressUserModel } from '../Models/AddShappingAddressUserModel';
import { map, Observable } from 'rxjs';

import { AddPhoneUserModel } from '../Models/AddPhoneUserModel';
import { ApiService } from '../../../Api/api.service';
import { Response } from '../../../../Core/BasicResponse/Response';
import { Routing } from '../../../../Meta/Routing';

@Injectable({
  providedIn: 'root',
})
export class UserCommendService {
  //#region  Injectors
  private readonly _apiService = inject(ApiService);

  //#endregion

  AddPhoneUser(request: AddPhoneUserModel): Observable<Response<string>> {
    return this._apiService.Post<Response<string>>(
      Routing.User.AddPhones,
      request
    );
  }

  AddUserShippingAddress(
    request: AddShappingAddressUserModel
  ): Observable<Response<string>> {
    return this._apiService.Post<Response<string>>(
      Routing.User.AddShippingAddresses,
      request
    );
  }

  UpdatePictureUser(request: FormData): Observable<Response<string>> {
    return this._apiService.Put<Response<string>>(
      Routing.User.UpdateUser,
      request
    );
  }

  getAddressFromCoordinates(
    lat: number,
    lng: number
  ): Promise<AddShappingAddressUserModel> {
    return fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.address) {
          const address = data.address;
          console.log(data);

          const shippingAddress: AddShappingAddressUserModel = {
            street: address.road || '',
            city: address.state || address.city || '',
            state: address.state || '',
            country: address.country || '',
            postalCode: address.postcode || '',
            suburb: address.suburb || address.neighbourhood || '',
            houseNumber: address.house_number || '',
            lat: lat.toString(),
            lon: lng.toString(),
            userId: localStorage.getItem('userId') || '',
          };
          return shippingAddress;
        }
        throw new Error('❌ لم يتم العثور على العنوان.');
      })
      .catch((error) => {
        console.error('❌ خطأ في جلب العنوان:', error);
        throw error;
      });
  }
}
