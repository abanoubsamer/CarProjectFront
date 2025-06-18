import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NavigationService } from '../../../../../../../Services/Navigation/navigation.service';
import { ToastrService } from 'ngx-toastr';
import { ProductCommendService } from '../../../../../../../Services/Product/Commend/Handler/product-commend.service';
import { SharedDataService } from '../../../../../../../Services/SharedDataService/shared-data.service';

@Component({
  selector: 'app-popup',
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css',
})
export class PopupComponent {
  @Output() closePopup = new EventEmitter<void>();
  @Output() NewComment = new EventEmitter<{commint:string,rate:number,data:string}>();
  @Input() prodctId = '';

  //#region Injectors
  private readonly _ProductServices = inject(ProductCommendService);
  private readonly _Navigation = inject(NavigationService);
 
  private readonly _tostser = inject(ToastrService);
  //#endregion

  Addfeedback(feedbackText: string) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this._Navigation.NavigationByUrl('Auth');
      return;
    }
    const selectedRating = (
      document.querySelector('input[name="rating"]:checked') as HTMLInputElement
    )?.value;
    if (!selectedRating || !feedbackText) {
      return;
    }
    this._ProductServices
      .AddUserReview({
        productID: this.prodctId,
        comment: feedbackText,
        rating: Number(selectedRating),
        userID: userId,
      })
      .subscribe({
        next: (res) => {
          if (res.success) {
            this._tostser.success('Success Add Review');
            this.closePopup.emit();
            this.NewComment.emit({ commint:feedbackText,data:new Date().toISOString(),rate:Number(selectedRating)});
          }
        },
      });
  }
  close() {
    this.closePopup.emit();
  }
}
