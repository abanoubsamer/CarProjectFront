import { Component } from '@angular/core';
import { SubmitRateComponent } from './submit-rate/submit-rate.component';

@Component({
  selector: 'app-product-rating',
  imports: [SubmitRateComponent],
  templateUrl: './product-rating.component.html',
  styleUrl: './product-rating.component.css',
})
export class ProductRatingComponent {
  display: boolean = false;
  displaySubmit() {
    this.display = !this.display;
  }
}
