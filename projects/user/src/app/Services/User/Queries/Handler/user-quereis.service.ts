import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../Api/api.service';
import { Routing } from '../../../../Meta/Routing';
import { GetUserIdModel } from '../Models/GetUserIdModels';
import { Observable } from 'rxjs';
import { Response } from '../../../../Core/BasicResponse/Response';

@Injectable({
  providedIn: 'root',
})
export class UserQuereisService {
  private readonly _apiService = inject(ApiService);

  GetUserServices(id: string): Observable<Response<GetUserIdModel>> {
    return this._apiService.Get<Response<GetUserIdModel>>(
      Routing.User.GetUserById.replace('{Id}', id)
    );
  }
}
