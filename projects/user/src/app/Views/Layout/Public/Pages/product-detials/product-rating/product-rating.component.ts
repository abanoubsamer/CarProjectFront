import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReviewDto } from '../../../../../../Core/Dtos/ReviewDto';
import { PopupComponent } from './popup/popup.component';

@Component({
  selector: 'app-product-rating',
  imports: [CommonModule, PopupComponent],
  templateUrl: './product-rating.component.html',
  styleUrl: './product-rating.component.css',
})
export class ProductRatingComponent {
  //#region Failds
  @Input() Ratings: ReviewDto[] = [];
  @Input() Productid = '';
  averageRating: number = 0;
  isPopupVisible = false;
  percentages: { [key: number]: number } = {};
  //#endregion

  //#region Injector

  //#endregion

  //#region LiveHook
  ngOnInit(): void {
    this.percentages = this.calculateRatingPercentage(this.Ratings);
    if (this.Ratings.length > 0) {
      this.averageRating =
        this.Ratings.reduce((sum, x) => sum + x.rating, 0) /
        this.Ratings.length;
    }
  }
  //#endregion

  //#region Method
  fullStars(rate: number) {
    return Math.floor(rate);
  }
  showPopup() {
    this.isPopupVisible = true;
  }

  hidePopup() {
    this.isPopupVisible = false;
  }
  calculateRatingPercentage(reviews: ReviewDto[]): { [key: number]: number } {
    const totalReviews = reviews.length;
    const ratingCounts: { [key: number]: number } = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    reviews.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        ratingCounts[review.rating]++;
      }
    });

    const ratingPercentages: { [key: number]: number } = {};
    for (let rating = 1; rating <= 5; rating++) {
      ratingPercentages[rating] =
        totalReviews > 0 ? (ratingCounts[rating] / totalReviews) * 100 : 0;
    }

    return ratingPercentages;
  }
  //#endregion
}
