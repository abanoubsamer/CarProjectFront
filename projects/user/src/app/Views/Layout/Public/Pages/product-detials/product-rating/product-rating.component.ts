import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ReviewDto } from '../../../../../../Core/Dtos/ReviewDto';
import { PopupComponent } from './popup/popup.component';
import { ReviewStatistic } from '../../../../../../Services/Rating/Queries/Model/ReviewStatistic';
import { RatingQueryService } from '../../../../../../Services/Rating/Queries/Handler/rating-query.service';
import { SharedDataService } from '../../../../../../Services/SharedDataService/shared-data.service';

@Component({
  selector: 'app-product-rating',
  imports: [CommonModule, PopupComponent],
  templateUrl: './product-rating.component.html',
  styleUrl: './product-rating.component.css',
})

export class ProductRatingComponent {
  //#region Failds
  @Input() Productid = '';
  username:string=''
  @Output() UpdateReview =  new EventEmitter<{name:string,rate:number,data:string,commint:string}>()
  averageRating: number = 0;
  isPopupVisible = false;
  reviews: ReviewStatistic = {
    namberReviews: 0,
    averageRating: 0,
    percentages: {},
  };

  //#endregion

  //#region Injector
  private readonly _DataShardServices = inject(SharedDataService)
  private readonly _RateService = inject(RatingQueryService);
  //#endregion

  //#region LiveHook
  ngOnInit(): void {
    this._DataShardServices.currentCUser.subscribe((res)=>{
      this.username = res.name
    })
    this._RateService.GetReviewStatistic(this.Productid).subscribe((res) => {
      this.reviews = res.data;
    });
  }
  //#endregion

  //#region Method
  fullStars(rate: number) {
    return Math.floor(rate);
  }
  showPopup() {
    this.isPopupVisible = true;
  }
  UpdateStatistic(Update :any){
    this._RateService.GetReviewStatistic(this.Productid).subscribe((res) => {
      this.reviews = res.data;
    });
    this.UpdateReview.emit({name:this.username,data:Update.data,rate:Update.rate,commint:Update.commint})
  }
  hidePopup() {
    this.isPopupVisible = false;
  }

  //#endregion
}
