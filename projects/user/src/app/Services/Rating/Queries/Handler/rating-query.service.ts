import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../Api/api.service';
import { Observable } from 'rxjs';
import { Response } from '../../../../Core/BasicResponse/Response';
import { ReviewStatistic } from '../Model/ReviewStatistic';
import { Routing } from '../../../../Meta/Routing';

@Injectable({
  providedIn: 'root'
})
export class RatingQueryService {
private readonly Api = inject(ApiService)
GetReviewStatistic(productID: string): Observable<Response<ReviewStatistic>> {
  return this.Api.Get<Response<ReviewStatistic>>(Routing.Review.GetReviewStatistic.replace("{Id}",productID))
}
}
