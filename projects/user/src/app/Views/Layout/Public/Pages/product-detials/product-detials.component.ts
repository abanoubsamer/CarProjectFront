import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRatingComponent } from './product-rating/product-rating.component';
import { CustomerReviewsComponent } from './customer-reviews/customer-reviews.component';

@Component({
  selector: 'app-product-detials',
  imports: [CommonModule, ProductRatingComponent, CustomerReviewsComponent],
  templateUrl: './product-detials.component.html',
  styleUrl: './product-detials.component.css',
})
export class ProductDetialsComponent {}
