import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../Api/api.service';
import { Observable } from 'rxjs';
import { PaginationResponse } from '../../../../Core/BasicResponse/PaginationResponse';
import { GetCategoryModel } from '../Models/GetCategoryModel';
import { Routing } from '../../../../Meta/Routing';
import { Response } from '../../../../Core/BasicResponse/Response';
import { CategoryDto } from '../../../../Core/Dtos/CategoryDto';

@Injectable({
  providedIn: 'root',
})
export class CategoryQuereisService {
  private readonly _apiService = inject(ApiService);

  GetCategoriesWithPagination(
    pageNumber: number,
    pageSize: number,
    filter?: object
  ): Observable<PaginationResponse<GetCategoryModel>> {
    return this._apiService.GetWithPagination<
      PaginationResponse<GetCategoryModel>
    >(Routing.Category.GetCategoryPagination, pageNumber, pageSize, filter);
  }
  GetCategoryById(id: string): Observable<Response<CategoryDto>> {
    return this._apiService.Get<Response<CategoryDto>>(
      Routing.Category.GetCategoryById.replace('{Id}', id)
    );
  }
}
